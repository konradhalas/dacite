"""Conversion plans.

`compile_plan(data_class, config)` introspects the type annotations of a data class *once* and produces a
`DataclassPlan`: a tree of small immutable nodes in which every decision that only depends on the type and the
`Config` (type hook, Optional, union / collection / data class dispatch, cast, which default applies, which keys are
expected, how a value has to be checked) is already taken. Running a plan only looks at the data.

The nodes reproduce the algorithm of dacite 1.x step by step (see `tests/differential`); that includes its quirks.

Plans are cached in the data class itself (`cls.__dict__["__dacite_plans__"]`, one entry per `Config`), so they live
exactly as long as the class and nothing global keeps dynamically created classes alive.
"""

import threading
import weakref
from collections import OrderedDict
from collections.abc import Collection, Hashable, Mapping
from dataclasses import _FIELD, _FIELD_INITVAR, _FIELDS, MISSING, Field, is_dataclass  # type: ignore
from itertools import zip_longest
from typing import Any, Callable, Dict, List, Optional, Tuple, get_origin

import dacite._typeinfo as ti
from dacite.cache import get_cache_size
from dacite.config import Config
from dacite.exceptions import (
    DaciteError,
    DaciteFieldError,
    ForwardReferenceError,
    MapKey,
    MissingValueError,
    StrictUnionMatchError,
    UnexpectedDataError,
    UnionMatchError,
    WrongTypeError,
)
from dacite.generics import get_concrete_type_hints

Checker = Callable[[Any], bool]

_PROBE = object()


# --- value checkers (replacement for `is_instance`, resolved once per type) -------------------------------------------
def _false(_value: Any) -> bool:
    return False


def _true(_value: Any) -> bool:
    return True


def _isinstance_checker(cls: type) -> Checker:
    def check(value: Any) -> bool:
        return isinstance(value, cls)

    return check


def _numeric_checker(cls: type) -> Checker:
    def check(value: Any) -> bool:
        return isinstance(value, (int, float, cls))

    return check


# Plain builtin classes: for these `_build_checker` always yields the quick `isinstance` check (with the numeric tower
# for float/complex) and no structural check, so the result is shared instead of being derived again for every field.
_PRIMITIVE_CHECKERS: Dict[type, Checker] = {
    int: _isinstance_checker(int),
    str: _isinstance_checker(str),
    bool: _isinstance_checker(bool),
    bytes: _isinstance_checker(bytes),
    type(None): _isinstance_checker(type(None)),
    float: _numeric_checker(float),
    complex: _numeric_checker(complex),
}


class _Compiler:
    """Builds checkers and conversion nodes for one `Config`. Memoises by type within a single compilation."""

    def __init__(self, config: Config) -> None:
        self.config = config
        self._nodes: Dict[Any, "Node"] = {}
        self._checkers: Dict[Any, Checker] = {}

    # checkers: each reproduces `dacite.types.is_instance(value, type_)` for a fixed `type_`
    def checker(self, type_: Any) -> Checker:
        if type_.__class__ is type:
            primitive = _PRIMITIVE_CHECKERS.get(type_)
            if primitive is not None:
                return primitive
        try:
            cached = self._checkers.get(type_)
        except TypeError:  # unhashable annotation
            return self._build_checker(type_)
        if cached is None:
            cached = self._checkers[type_] = self._build_checker(type_)
        return cached

    def _build_checker(self, type_: Any) -> Checker:
        quick = self._quick_checker(type_)
        structural = self._structural_checker(type_)
        if structural is None:
            return quick or _false
        if quick is None:
            return structural

        def check(value: Any) -> bool:
            return quick(value) or structural(value)

        return check

    @staticmethod
    def _quick_checker(type_: Any) -> Optional[Checker]:
        """First step of `is_instance`: plain `isinstance` (with the numeric tower of PEP 484). `None` when
        `isinstance(x, type_)` is not allowed for this annotation (subscripted generics, Literal, Any, ...)."""
        try:
            isinstance(_PROBE, type_)
        except TypeError:
            return None
        if type_ in [float, complex]:

            def numeric(value: Any) -> bool:
                return isinstance(value, (int, float, type_))

            return numeric

        def quick(value: Any) -> bool:
            return isinstance(value, type_)

        return quick

    def _structural_checker(self, type_: Any) -> Optional[Checker]:  # pylint: disable=too-many-return-statements
        if type_ == Any:
            return _true
        if ti.is_union(type_):
            members = tuple(self.checker(member) for member in ti.extract_generic(type_))

            def union(value: Any) -> bool:
                for member in members:
                    if member(value):
                        return True
                return False

            return union
        if ti.is_generic_collection(type_):
            return self._collection_checker(type_)
        if ti.is_new_type(type_):
            return self.checker(ti.extract_new_type(type_))
        if ti.is_literal(type_):
            literals = ti.extract_generic(type_)
            return lambda value: value in literals
        if ti.is_init_var(type_):
            return self.checker(ti.extract_init_var(type_))
        if ti.is_type_generic(type_):
            base = ti.extract_generic(type_)[0]
            return lambda value: ti.is_subclass(value, base)
        if ti.is_generic_dataclass(type_):
            origin = get_origin(type_)
            return lambda value: isinstance(value, origin)  # type: ignore[arg-type]
        return None

    def _collection_checker(self, type_: Any) -> Checker:
        origin = ti.extract_origin_collection(type_)
        generics = ti.extract_generic(type_)
        if not generics:
            return lambda value: isinstance(value, origin)
        tuple_check: Optional[Checker] = None
        if ti.is_tuple(type_):
            if len(generics) == 1 and generics[0] == ():

                def tuple_check(value: Any) -> bool:  # type: ignore[misc]
                    return len(value) == 0

            elif len(generics) == 2 and generics[1] is ...:
                variadic_item = self.checker(generics[0])

                def tuple_check(value: Any) -> bool:  # type: ignore[misc]
                    return all(variadic_item(item) for item in value)

            else:
                item_checkers = tuple(self.checker(t) for t in generics)
                length = len(item_checkers)

                def tuple_check(value: Any) -> bool:  # type: ignore[misc]
                    return len(value) == length and all(check(item) for item, check in zip(value, item_checkers))

        key_value = ti.extract_generic(type_, defaults=(Any, Any))
        key_value_checkers = tuple(self.checker(t) for t in key_value) if len(key_value) == 2 else None
        item_checker = self.checker(generics[0])

        def check(value: Any) -> bool:
            if not isinstance(value, origin):
                return False
            if tuple_check is not None and isinstance(value, tuple):
                return tuple_check(value)
            if isinstance(value, Mapping):
                if key_value_checkers is None:
                    key_type, value_type = key_value  # raises the same ValueError as dacite 1.x
                    raise AssertionError((key_type, value_type))  # pragma: no cover
                key_check, value_check = key_value_checkers
                for key, item in value.items():
                    if not key_check(key) or not value_check(item):
                        return False
                return True
            for item in value:
                if not item_checker(item):
                    return False
            return True

        return check

    # nodes: each reproduces `_build_value(type_, data, config)` for a fixed `type_`
    def node(self, type_: Any) -> "Node":
        if type_.__class__ is type and type_ in _PRIMITIVE_CHECKERS and not self.config.cast:
            if not self.config.type_hooks or type_ not in self.config.type_hooks:
                return _PASSTHROUGH  # no hook, no cast, not optional/union/collection/data class: nothing to do
        try:
            cached = self._nodes.get(type_)
        except TypeError:
            return self._build_node(type_)
        if cached is None:
            cached = self._nodes[type_] = self._build_node(type_)
        return cached

    def _build_node(self, type_: Any) -> "Node":
        config = self.config
        if ti.is_init_var(type_):
            type_ = ti.extract_init_var(type_)
        hook = config.type_hooks[type_] if type_ in config.type_hooks else None
        body: Optional[Any] = None
        if ti.is_union(type_):
            body = self._union_body(type_)
        elif ti.is_generic_collection(type_):
            body = self._collection_body(type_)
        elif is_dataclass(ti.orig(type_)):
            body = _DataclassBody(type_, config)
        cast: Optional[Callable[[Any], Any]] = None
        for cast_type in config.cast:
            if ti.is_subclass(type_, cast_type):
                cast = ti.extract_origin_collection(type_) if ti.is_generic_collection(type_) else type_
                break
        return Node(hook, ti.is_optional(type_), body, cast)

    def _union_body(self, union: Any) -> "_UnionBody":
        types = ti.extract_generic(union)
        return _UnionBody(
            union=union,
            types=types,
            nodes=tuple(self.node(member) for member in types),
            checkers=tuple(self.checker(member) for member in types),
            single=ti.is_optional(union) and len(types) == 2,
            single_index=1 if types[0] is type(None) else 0,
            strict_match=self.config.strict_unions_match,
            check_types=self.config.check_types,
        )

    def _collection_body(self, collection: Any) -> "_CollectionBody":
        is_mapping = ti.is_subclass(collection, Mapping)
        is_tuple = ti.is_subclass(collection, tuple)
        is_collection = ti.is_subclass(collection, Collection)
        value_node = self.node(ti.extract_generic(collection, defaults=(Any, Any))[1]) if is_mapping else None
        tuple_nodes: Tuple[Optional["Node"], ...] = ()
        variadic = False
        if is_tuple:
            types = ti.extract_generic(collection)
            variadic = len(types) == 2 and types[1] == Ellipsis
            tuple_nodes = (self.node(types[0]),) if variadic else tuple(self.node(t) for t in types)
        item_node = self.node(ti.extract_generic(collection, defaults=(Any,))[0]) if is_collection else None
        return _CollectionBody(is_mapping, is_tuple, is_collection, value_node, tuple_nodes, variadic, item_node)


# --- nodes ---------------------------------------------------------------------------------------------------------
class Node:  # pylint: disable=too-few-public-methods
    """`_build_value` for one fixed type: hook -> Optional shortcut -> union/collection/data class -> cast."""

    __slots__ = ("hook", "optional", "body", "cast")

    def __init__(
        self,
        hook: Optional[Callable[[Any], Any]],
        optional: bool,
        body: Optional[Any],
        cast: Optional[Callable[[Any], Any]],
    ) -> None:
        self.hook = hook
        self.optional = optional
        self.body = body
        self.cast = cast

    def build(self, data: Any) -> Any:
        hook = self.hook
        if hook is not None:
            data = hook(data)
        if self.optional and data is None:
            return data
        body = self.body
        if body is not None:
            data = body.build(data)
        cast = self.cast
        if cast is not None:
            data = cast(data)
        return data


_PASSTHROUGH = Node(None, False, None, None)


_NOT_FOUND = object()


def _member_prefilter(node: "Node") -> Optional[Tuple[frozenset, Tuple[Tuple[Any, tuple], ...]]]:
    """For a union member that is a plain nested data class: what the member needs to *possibly* succeed on an exact
    `dict`. `(required keys, ((key, allowed literal values), ...))`. A member whose required key is missing, or whose
    `Literal` discriminator field holds another value (with `check_types`), is certain to be rejected by the
    interpreter anyway, so skipping it only saves building (and catching the exception of) a doomed attempt."""
    if node.hook is not None or node.cast is not None or node.optional or not isinstance(node.body, _DataclassBody):
        return None
    try:
        plan = node.body.resolve()
    except Exception:  # pylint: disable=broad-except  # unresolvable: the member fails inside `build`, as before
        return None
    required = frozenset(key for _n, key, _node, _c, _t, init, kind, _d in plan.fields if init and kind == _NO_DEFAULT)
    literals = []
    if plan.check_types:
        for _n, key, field_node, _c, field_type, _i, _k, _d in plan.fields:
            plain = field_node.hook is None and not field_node.optional and field_node.cast is None
            if plain and field_node.body is None and ti.is_literal(field_type):
                literals.append((key, ti.extract_generic(field_type)))
    return (required, tuple(literals)) if required or literals else None


class _UnionBody:  # pylint: disable=too-few-public-methods,too-many-instance-attributes
    __slots__ = (
        "union",
        "types",
        "nodes",
        "checkers",
        "single",
        "single_index",
        "strict_match",
        "check_types",
        "prefilters",
    )

    def __init__(  # type: ignore[no-untyped-def]
        self, union, types, nodes, checkers, single, single_index, strict_match, check_types
    ):  # pylint: disable=too-many-arguments,too-many-positional-arguments
        self.union = union
        self.prefilters: Optional[tuple] = None
        self.single_index = single_index
        self.types = types
        self.nodes = nodes
        self.checkers = checkers
        self.single = single
        self.strict_match = strict_match
        self.check_types = check_types

    def build(self, data: Any) -> Any:
        if self.single:
            # `Optional[X]` / `Union[None, X]`: convert as X. (dacite 1.x took `types[0]`, which for `Union[None, X]` is
            # NoneType, i.e. no conversion - but its lru_cache shared the entry between the equal `Optional[X]` and
            # `Union[None, X]`, so the outcome depended on which form was seen first in the process.)
            return self.nodes[self.single_index].build(data)
        union_matches: Dict[Any, Any] = {}
        prefilters = self.prefilters
        if prefilters is None:
            prefilters = self.prefilters = tuple(_member_prefilter(node) for node in self.nodes)
        exact = data.__class__ is dict
        for inner_type, node, check, prefilter in zip(self.types, self.nodes, self.checkers, prefilters):
            if prefilter is not None and exact:
                required, literals = prefilter
                if not required.issubset(data):
                    continue
                for key, values in literals:
                    found = data.get(key, _NOT_FOUND)
                    if found is not _NOT_FOUND and found not in values:
                        break
                else:
                    literals = None
                if literals is not None:  # a discriminator holds a value this member can not accept
                    continue
            try:
                # noinspection PyBroadException
                try:
                    value = node.build(data)
                except Exception:  # pylint: disable=broad-except
                    continue
                if check(value):
                    if self.strict_match:
                        union_matches[inner_type] = value
                    else:
                        return value
            except DaciteError:
                pass
        if self.strict_match and union_matches:
            if len(union_matches) > 1:
                raise StrictUnionMatchError(union_matches)
            return union_matches.popitem()[1]
        if not self.check_types:
            return data
        raise UnionMatchError(field_type=self.union, value=data)


# The helpers below are generators fed with an iterator that the *caller* creates, so `iter(data)` / `data.items()` /
# `zip_longest(...)` are evaluated eagerly, exactly like the outermost iterable of a generator expression in 1.x.
def _indexed(node: Node, iterator: Any) -> Any:
    for index, item in enumerate(iterator):
        try:
            yield node.build(item)
        except DaciteFieldError as error:
            error.update_path(index)
            raise


def _plain(node: Node, iterator: Any) -> Any:
    for item in iterator:
        yield node.build(item)


def _mapped(node: Node, items: Any) -> Any:
    for key, value in items:
        try:
            yield key, node.build(value)
        except DaciteFieldError as error:
            error.update_path(MapKey(key))
            raise


def _zipped(pairs: Any, sequence: bool) -> Any:
    for index, (item, node) in enumerate(pairs):
        try:
            yield (node or _PASSTHROUGH).build(item)
        except DaciteFieldError as error:
            if sequence:
                error.update_path(index)
            raise


class _CollectionBody:  # pylint: disable=too-few-public-methods,too-many-instance-attributes
    __slots__ = ("is_mapping", "is_tuple", "is_collection", "value_node", "tuple_nodes", "variadic", "item_node")

    def __init__(  # type: ignore[no-untyped-def]
        self, is_mapping, is_tuple, is_collection, value_node, tuple_nodes, variadic, item_node
    ):  # pylint: disable=too-many-arguments,too-many-positional-arguments
        self.is_mapping = is_mapping
        self.is_tuple = is_tuple
        self.is_collection = is_collection
        self.value_node = value_node
        self.tuple_nodes = tuple_nodes
        self.variadic = variadic
        self.item_node = item_node

    @staticmethod
    def _items(node: Node, data: Any) -> Any:
        iterator = iter(data)
        return _indexed(node, iterator) if isinstance(data, (list, tuple)) else _plain(node, iterator)

    def build(self, data: Any) -> Any:
        data_type = data.__class__
        if self.is_mapping and isinstance(data, Mapping):
            return data_type(_mapped(self.value_node, data.items()))  # type: ignore[arg-type]
        if self.is_tuple:
            if not data:
                return data_type()
            if self.variadic:
                return data_type(self._items(self.tuple_nodes[0], data))  # type: ignore[arg-type]
            return data_type(_zipped(zip_longest(data, self.tuple_nodes), isinstance(data, (list, tuple))))
        if self.is_collection and isinstance(data, Collection):
            return data_type(self._items(self.item_node, data))  # type: ignore[arg-type]
        return data


class _DataclassBody:  # pylint: disable=too-few-public-methods
    """Nested data class: the plan of the nested class is resolved lazily (recursion, forward references that are not
    resolvable yet, and errors only for data that actually reaches the field - like in dacite 1.x)."""

    __slots__ = ("data_class", "config", "plan")

    def __init__(self, data_class: Any, config: Config) -> None:
        self.data_class = data_class
        self.config = config
        self.plan: Optional["DataclassPlan"] = None

    def resolve(self) -> "DataclassPlan":
        plan = self.plan
        if plan is None:
            plan = self.plan = get_plan(self.data_class, self.config)
        return plan

    def build(self, data: Any) -> Any:
        if data.__class__ is dict or isinstance(data, Mapping):
            return (self.plan or self.resolve()).run(data)
        return data


# --- plan ----------------------------------------------------------------------------------------------------------
_DEFAULT_VALUE, _DEFAULT_FACTORY, _DEFAULT_NONE, _NO_DEFAULT = range(4)


_compile_threshold: Optional[int] = 100  # pylint: disable=invalid-name


def set_compile_threshold(threshold: Optional[int]) -> None:
    """Number of calls after which the plan of a data class is compiled to generated Python code.

    `100` (default): a type is interpreted for its first 99 conversions and compiled on the 100th. Compiling costs
    about 0.2 ms per type and saves about 2 microseconds per conversion of a small type (the interpreter is already
    fast), so this is roughly the break-even point: types that are used rarely never pay for it, types that are used a
    lot do. `0`: compile as soon as the plan is built (e.g. for a long running service). `None`: never compile.
    Affects plans built afterwards; call `clear_cache()` to apply it to existing ones. `Converter.compile()` always
    compiles (unless the threshold is `None`)."""
    global _compile_threshold  # pylint: disable=global-statement
    _compile_threshold = threshold


def get_compile_threshold() -> Optional[int]:
    return _compile_threshold


class DataclassPlan:  # pylint: disable=too-few-public-methods,too-many-instance-attributes
    """`run(data)` converts one mapping. It starts as the interpreter below, behind a call counter; once the counter
    reaches the compile threshold `run` is replaced by a function generated from the plan (`dacite._codegen`)."""

    __slots__ = ("data_class", "fields", "strict_names", "frozen", "check_types", "run", "compiled", "calls")

    def __init__(  # type: ignore[no-untyped-def]
        self, data_class, fields, strict_names, frozen, check_types
    ):  # pylint: disable=too-many-arguments,too-many-positional-arguments
        self.data_class = data_class
        self.fields = fields
        self.strict_names = strict_names
        self.frozen = frozen
        self.check_types = check_types
        self.compiled: Optional[Callable[[Any], Any]] = None
        self.calls = 0
        threshold = _compile_threshold
        if threshold is None:
            self.run = self.interpret
        elif threshold <= 0:
            self.run = self.interpret
            self.tier_up()
        else:
            self.run = self._tiered

    def _tiered(self, data: Any) -> Any:
        compiled = self.compiled
        if compiled is not None:  # a caller kept a reference to this bound method across the switch
            return compiled(data)
        self.calls += 1
        threshold = _compile_threshold
        if threshold is not None and self.calls >= threshold:
            self.tier_up()
            return self.run(data)
        return self.interpret(data)

    def tier_up(self) -> None:
        """Compile the plan (idempotent). Falls back to the interpreter if code generation is not possible."""
        with _LOCK:
            if self.compiled is None:
                from dacite import _codegen  # pylint: disable=import-outside-toplevel,cyclic-import

                try:
                    self.compiled = _codegen.compile_function(self)
                except Exception:  # pylint: disable=broad-except  # e.g. exec() unavailable: stay interpreted
                    self.compiled = None
                    self.run = self.interpret
                    return
            self.run = self.compiled

    def interpret(self, data: Any) -> Any:  # pylint: disable=too-many-branches,too-many-locals
        strict_names = self.strict_names
        if strict_names is not None:
            extra_fields = set(data.keys()) - strict_names
            if extra_fields:
                raise UnexpectedDataError(keys=extra_fields)
        check_types = self.check_types
        init_values: Dict[str, Any] = {}
        post_init_values: Optional[Dict[str, Any]] = None
        for name, key, node, check, field_type, init, default_kind, default in self.fields:
            if key in data:
                try:
                    value = node.build(data[key])
                except DaciteFieldError as error:
                    error.update_path(name)
                    raise
                if check_types and not check(value):
                    raise WrongTypeError(field_path=name, field_type=field_type, value=value)
            elif default_kind == _DEFAULT_VALUE:
                value = default
            elif default_kind == _DEFAULT_FACTORY:
                value = default()
            elif default_kind == _DEFAULT_NONE:
                value = None
            else:
                if not init:
                    continue
                raise MissingValueError(name) from None
            if init:
                init_values[name] = value
            elif not self.frozen:
                if post_init_values is None:
                    post_init_values = {}
                post_init_values[name] = value

        instance = self.data_class(**init_values)

        if post_init_values:
            for name, value in post_init_values.items():
                setattr(instance, name, value)

        return instance


def _data_class_fields(data_class: Any) -> List[Field]:
    fields = getattr(ti.orig(data_class), _FIELDS)
    return [f for f in fields.values() if f._field_type is _FIELD or f._field_type is _FIELD_INITVAR]


def compile_plan(data_class: Any, config: Config) -> DataclassPlan:  # pylint: disable=too-many-locals
    try:
        hints = get_concrete_type_hints(data_class, localns=config.forward_references or None)
    except NameError as error:
        raise ForwardReferenceError(str(error)) from None
    fields = _data_class_fields(data_class)
    compiler = _Compiler(config)
    convert_key = config.convert_key
    specs = []
    for field in fields:
        field_type = hints[field.name]
        if field.default != MISSING:
            default_kind, default = _DEFAULT_VALUE, field.default
        elif field.default_factory != MISSING:  # type: ignore
            default_kind, default = _DEFAULT_FACTORY, field.default_factory  # type: ignore
        elif ti.is_optional(field_type):
            default_kind, default = _DEFAULT_NONE, None
        else:
            default_kind, default = _NO_DEFAULT, None
        specs.append(
            (
                field.name,
                convert_key(field.name) if convert_key is not None else field.name,
                compiler.node(field_type),
                compiler.checker(field_type),
                field_type,
                field.init,
                default_kind,
                default,
            )
        )
    return DataclassPlan(
        data_class,
        tuple(specs),
        frozenset(f.name for f in fields) if config.strict else None,
        ti.orig(data_class).__dataclass_params__.frozen,
        config.check_types,
    )


# --- plan cache ----------------------------------------------------------------------------------------------------
_ATTRIBUTE = "__dacite_plans__"
_LOCK = threading.RLock()
_OWNERS: "weakref.WeakSet[Any]" = weakref.WeakSet()
_FALLBACK: "OrderedDict[Tuple[Any, Hashable], DataclassPlan]" = OrderedDict()


def get_plan(data_class: Any, config: Config) -> DataclassPlan:
    """Return the (cached) plan for `data_class` and `config`. Compilation errors are never cached."""
    if isinstance(data_class, type):
        plans = data_class.__dict__.get(_ATTRIBUTE)
        key: Hashable = config._key  # pylint: disable=protected-access
    else:
        owner = get_origin(data_class)
        plans = owner.__dict__.get(_ATTRIBUTE) if isinstance(owner, type) else None
        key = (data_class, config._key)  # pylint: disable=protected-access
    if plans is not None:
        plan = plans.get(key)
        if plan is not None:
            return plan  # type: ignore[no-any-return]
    return _compile_and_store(data_class, config, key)


def _owner_of(data_class: Any) -> Any:
    return data_class if isinstance(data_class, type) else get_origin(data_class)


def _compile_and_store(data_class: Any, config: Config, key: Hashable) -> DataclassPlan:
    owner = _owner_of(data_class)
    with _LOCK:
        plans = owner.__dict__.get(_ATTRIBUTE) if isinstance(owner, type) else None
        if plans is not None and key in plans:
            return plans[key]  # type: ignore[no-any-return]
        if (owner, key) in _FALLBACK:
            return _FALLBACK[(owner, key)]
        plan = compile_plan(data_class, config)
        limit = get_cache_size()
        if isinstance(owner, type):
            if plans is None:
                plans = {}
                if _attach(owner, plans):
                    _OWNERS.add(owner)
                else:
                    plans = None
            if plans is not None:
                if limit is not None and len(plans) >= max(limit, 1):
                    plans.pop(next(iter(plans)))
                plans[key] = plan
                return plan
        # classes that refuse attributes: bounded global LRU (holds strong references)
        _FALLBACK[(owner, key)] = plan
        if limit is not None and len(_FALLBACK) > max(limit, 1):
            _FALLBACK.popitem(last=False)
        return plan


def _attach(owner: Any, plans: Dict[Hashable, DataclassPlan]) -> bool:
    """Store the plan dict in the class. `type.__setattr__` bypasses metaclass hooks (e.g. enum-like metaclasses that
    forbid assignment) and only fails for classes that are truly immutable."""
    try:
        type.__setattr__(owner, _ATTRIBUTE, plans)
    except (TypeError, AttributeError):
        return False
    return True


def clear_plans() -> None:
    with _LOCK:
        for owner in list(_OWNERS):
            try:
                type.__delattr__(owner, _ATTRIBUTE)
            except (TypeError, AttributeError):  # pragma: no cover
                pass
        _OWNERS.clear()
        _FALLBACK.clear()
