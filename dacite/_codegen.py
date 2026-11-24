"""Code generation for conversion plans.

`compile_function(plan)` turns a `DataclassPlan` into the source of one Python function and `exec`s it. The generated
function has a *fast path* for the common, exact shapes (`data.__class__ is dict`, exact `list`/`dict`/`tuple`,
primitive leaves, nested data classes) with the type checks fused into the conversion. Everything else - an exotic
mapping, a hook or cast, a union with data classes, an unexpected value type - is handed to the very same node and
checker objects the interpreter uses, so the result and the exceptions (type, path, `field_type`, `value`) are the
same as without code generation. The fast path may only be a quicker way to the same outcome.
"""

from typing import Any, Callable, Dict, List, Optional, Tuple

import dacite._typeinfo as ti
from dacite._plan import (
    _DEFAULT_FACTORY,
    _DEFAULT_NONE,
    _DEFAULT_VALUE,
    _NO_DEFAULT,
    _CollectionBody,
    _DataclassBody,
    NO_MATCH,
    _UnionBody,
    DataclassPlan,
    Node,
    _data_class_fields,
    _true,
)
from dacite.exceptions import (
    DaciteFieldError,
    MapKey,
    MissingValueError,
    UnexpectedDataError,
    WrongTypeError,
)

_MISSING = object()
_NoneType = type(None)

# Classes that need no conversion and can be tested without the full checker. Value: classes whose *exact* type is
# accepted without calling isinstance (anything else is checked precisely), and the accepted superclasses.
_PRIMITIVES: Dict[type, Tuple[frozenset, Tuple[type, ...]]] = {
    int: (frozenset({int}), (int,)),
    str: (frozenset({str}), (str,)),
    bool: (frozenset({bool}), (bool,)),
    bytes: (frozenset({bytes}), (bytes,)),
    float: (frozenset({float, int}), (int, float)),
    _NoneType: (frozenset({_NoneType}), (_NoneType,)),
}


def _passthrough(node: Node) -> bool:
    return node.hook is None and not node.optional and node.body is None and node.cast is None


def _is_primitive(type_: Any) -> bool:
    return type_.__class__ is type and type_ in _PRIMITIVES


def _leaf(node: Node, type_: Any) -> Optional[Tuple[Any, ...]]:
    """Classify an element/value node of a collection:
    ("any",), ("prim", cls), ("dc", plain data class body, node, optional) or ("udc", union of data classes, node,
    optional)."""
    if _passthrough(node):
        if type_ is Any:
            return ("any",)
        if _is_primitive(type_):
            return ("prim", type_)
        return None
    if node.hook is not None or node.cast is not None:
        return None
    body = node.body
    if not node.optional and isinstance(body, _DataclassBody):
        return ("dc", body, node, False)
    if isinstance(body, _UnionBody):
        if node.optional and body.single:  # Optional[DataClass]
            inner = body.nodes[body.single_index]
            if (
                inner.hook is None
                and inner.cast is None
                and not inner.optional
                and isinstance(inner.body, _DataclassBody)
            ):
                return ("dc", inner.body, node, True)
            return None
        if not body.single and body.uses_data_classes_only():
            return ("udc", body, node, node.optional)
    return None


def _check_classes(values: Any, prim: type) -> bool:
    """`True` when every value is an instance of `prim` (numeric tower for float)."""
    fast, accepted = _PRIMITIVES[prim]
    classes = set(map(type, values))
    if classes <= fast:
        return True
    return all(isinstance(value, accepted) for value in values)


def _general(node: Node, checker: Callable[[Any], bool], ftype: Any, name: str, check_types: bool):  # type: ignore
    """Exactly what the interpreter does for one field value."""

    def run(value: Any) -> Any:
        try:
            value = node.build(value)
        except DaciteFieldError as error:
            error.update_path(name)
            raise
        if check_types and not checker(value):
            raise WrongTypeError(field_path=name, field_type=ftype, value=value)
        return value

    return run


# --- "pure" converters: collections of primitives, checked and copied without side effects ---------------------------
# A pure converter returns the converted value, or raises `_Bail` as soon as anything is not exactly what it expects
# (other container class, wrong length, a value of an unexpected class). The caller then hands the *original* value
# to the interpreter, which produces the result or the exact error. Pure converters call no hooks, `__init__` or user
# code, so bailing out halfway cannot duplicate side effects.
class _Bail(Exception):
    pass


def _pure_primitive(prim: type) -> Callable[[Any], Any]:
    fast, accepted = _PRIMITIVES[prim]

    def one(value: Any) -> Any:
        if value.__class__ in fast or isinstance(value, accepted):
            return value
        raise _Bail

    return one


def _pure_item(node: Node, type_: Any) -> Optional[Tuple[str, Any]]:
    if _passthrough(node):
        if type_ is Any:
            return ("any", None)
        if _is_primitive(type_):
            return ("prim", type_)
        return None
    if ti.is_generic_collection(type_):
        converter = _pure_container(node, type_)
        if converter is not None:
            return ("fn", converter)
    return None


def _pure_container(  # pylint: disable=too-many-return-statements,too-many-branches
    node: Node, type_: Any
) -> Optional[Callable[[Any], Any]]:
    body = node.body
    if not isinstance(body, _CollectionBody) or node.hook is not None or node.cast is not None or node.optional:
        return None
    origin = ti.extract_origin_collection(type_)
    generics = ti.extract_generic(type_)
    if origin in (list, set, frozenset) and len(generics) == 1 and body.item_node is not None:
        if not body.is_collection or body.is_mapping or body.is_tuple:
            return None
        item = _pure_item(body.item_node, generics[0])
        return None if item is None else _pure_sequence(origin, item)
    if origin is tuple and body.is_tuple:
        if body.variadic and len(generics) == 2 and body.tuple_nodes[0] is not None:
            item = _pure_item(body.tuple_nodes[0], generics[0])  # type: ignore[arg-type]
            return None if item is None else _pure_sequence(tuple, item)
        if not body.variadic and generics and generics != ((),) and len(body.tuple_nodes) == len(generics):
            items = [_pure_item(n, g) for n, g in zip(body.tuple_nodes, generics) if n is not None]
            if len(items) == len(generics) and all(item is not None for item in items):
                return _pure_fixed_tuple(items)  # type: ignore[arg-type]
        return None
    if origin is dict and body.is_mapping and len(generics) == 2 and body.value_node is not None:
        key_type, value_type = generics
        if key_type is not Any and not _is_primitive(key_type):
            return None
        item = _pure_item(body.value_node, value_type)
        return None if item is None else _pure_dict(key_type if _is_primitive(key_type) else None, item)
    return None


def _pure_sequence(container: type, item: Tuple[str, Any]) -> Callable[[Any], Any]:
    kind, detail = item
    if kind == "fn":

        def nested(value: Any) -> Any:
            if value.__class__ is not container:
                raise _Bail
            elements: Any = value  # (mypy narrows `value` to `object` after the `__class__` test)
            return container([detail(element) for element in elements])

        return nested
    fast: Optional[frozenset] = None
    accepted: Tuple[type, ...] = ()
    if kind == "prim":
        fast, accepted = _PRIMITIVES[detail]

    def flat(value: Any) -> Any:
        if value.__class__ is not container:
            raise _Bail
        out = container(value)
        if fast is not None and not set(map(type, out)) <= fast and not all(isinstance(e, accepted) for e in out):
            raise _Bail
        return out

    return flat


def _pure_fixed_tuple(items: List[Tuple[str, Any]]) -> Callable[[Any], Any]:
    converters: List[Optional[Callable[[Any], Any]]] = []
    for kind, detail in items:
        converters.append(None if kind == "any" else _pure_primitive(detail) if kind == "prim" else detail)
    length = len(converters)

    def fixed(value: Any) -> Any:
        if value.__class__ is not tuple or len(value) != length:
            raise _Bail
        return tuple(  # pylint: disable=consider-using-generator
            [e if c is None else c(e) for c, e in zip(converters, value)]
        )  # pylint: disable=consider-using-generator

    return fixed


def _pure_dict(key_prim: Optional[type], item: Tuple[str, Any]) -> Callable[[Any], Any]:
    kind, detail = item

    def mapping(value: Any) -> Any:
        if value.__class__ is not dict:
            raise _Bail
        if key_prim is not None and not _check_classes(value.keys(), key_prim):
            raise _Bail
        if kind == "fn":
            return {k: detail(v) for k, v in value.items()}
        out = dict(value)
        if kind == "prim" and not _check_classes(out.values(), detail):
            raise _Bail
        return out

    return mapping


def _pure_function(converter: Callable[[Any], Any], general: Callable[[Any], Any]) -> Callable[[Any], Any]:
    def convert(value: Any) -> Any:
        try:
            return converter(value)
        except _Bail:
            return general(value)

    return convert


def _collection_function(  # pylint: disable=too-many-return-statements,too-many-locals,too-many-arguments,too-many-positional-arguments
    node: Node, checker: Callable[[Any], bool], type_: Any, ftype: Any, name: str, check_types: bool
) -> Optional[Callable[[Any], Any]]:
    """Function converting + checking a whole collection field for exact container input; any other input goes
    through the general (interpreter) path."""
    body = node.body
    if not isinstance(body, _CollectionBody) or node.hook is not None or node.cast is not None or node.optional:
        return None
    origin = ti.extract_origin_collection(type_)
    generics = ti.extract_generic(type_)
    general = _general(node, checker, ftype, name, check_types)
    pure = _pure_container(node, type_)
    if origin is dict and body.is_mapping and len(generics) == 2 and body.value_node is not None:
        key_type, value_type = generics
        leaf = _leaf(body.value_node, value_type)
        if leaf is not None and leaf[0] in ("dc", "udc") and (key_type is Any or _is_primitive(key_type)):
            return _dict_function(leaf, key_type, body.value_node, checker, ftype, name, check_types, general)
        return _pure_function(pure, general) if pure is not None else None
    item_node: Optional[Node]
    if origin is list and body.is_collection and not body.is_mapping and not body.is_tuple and len(generics) == 1:
        item_node, item_type, container = body.item_node, generics[0], list
    elif origin is tuple and body.is_tuple and body.variadic and len(generics) == 2:
        item_node, item_type, container = body.tuple_nodes[0], generics[0], tuple  # type: ignore[assignment]
    else:
        return _pure_function(pure, general) if pure is not None else None
    leaf = _leaf(item_node, item_type) if item_node is not None else None
    if leaf is not None and leaf[0] in ("dc", "udc"):
        return _sequence_function(container, leaf, item_node, checker, ftype, name, check_types, general)  # type: ignore[arg-type]
    if pure is not None:
        return _pure_function(pure, general)
    if leaf is not None and item_node is not None:  # list/tuple of primitives or Any (pure converter not applicable)
        return _sequence_function(container, leaf, item_node, checker, ftype, name, check_types, general)
    return None


def _sequence_function(  # pylint: disable=too-many-arguments,too-many-positional-arguments,too-many-locals
    container: type, leaf: Tuple[Any, ...], item_node: Node, checker, ftype, name, check_types, general
):  # type: ignore[no-untyped-def]
    kind = leaf[0]
    if kind in ("any", "prim"):
        prim = leaf[1] if kind == "prim" else None
        check_items = check_types and prim is not None

        def convert(value: Any) -> Any:
            if value.__class__ is container:
                out = container(value)
                if check_items and not _check_classes(out, prim):  # type: ignore[arg-type]
                    raise WrongTypeError(field_path=name, field_type=ftype, value=out)
                return out
            return general(value)

        return convert

    body, optional, is_dc = leaf[1], leaf[3], kind == "dc"

    def convert_items(value: Any) -> Any:
        if value.__class__ is not container:
            return general(value)
        out: List[Any] = []
        index = 0
        run = None
        produced = True  # every element came out of a nested plan, i.e. is known to be an instance
        elements: Any = value  # (mypy narrows `value` to `object` after the `__class__` test above)
        try:
            for item in elements:
                if item.__class__ is dict:
                    if is_dc:
                        if run is None:
                            run = (body.plan or body.resolve()).run
                        out.append(run(item))
                        index += 1
                        continue
                    matched = body.match(item)
                    if matched is not NO_MATCH:
                        out.append(matched)
                        index += 1
                        continue
                elif item is None and optional:
                    out.append(None)
                    index += 1
                    continue
                produced = False
                out.append(item_node.build(item))
                index += 1
        except DaciteFieldError as error:
            error.update_path(index)
            error.update_path(name)
            raise
        result = container(out) if container is not list else out
        if check_types and not produced and not checker(result):
            raise WrongTypeError(field_path=name, field_type=ftype, value=result)
        return result

    return convert_items


def _dict_function(  # pylint: disable=too-many-arguments,too-many-positional-arguments
    leaf: Tuple[Any, ...], key_type: Any, value_node: Node, checker, ftype, name, check_types, general
):  # type: ignore[no-untyped-def]
    key_prim = key_type if _is_primitive(key_type) else None
    body, optional, is_dc = leaf[1], leaf[3], leaf[0] == "dc"

    def convert_values(value: Any) -> Any:
        if value.__class__ is not dict:
            return general(value)
        out: Dict[Any, Any] = {}
        current = None
        run = None
        produced = True
        try:
            for current, item in value.items():
                if item.__class__ is dict:
                    if is_dc:
                        if run is None:
                            run = (body.plan or body.resolve()).run
                        out[current] = run(item)
                        continue
                    matched = body.match(item)
                    if matched is not NO_MATCH:
                        out[current] = matched
                        continue
                elif item is None and optional:
                    out[current] = None
                    continue
                produced = False
                out[current] = value_node.build(item)
        except DaciteFieldError as error:
            error.update_path(MapKey(current))
            error.update_path(name)
            raise
        if check_types:
            keys_ok = key_prim is None or _check_classes(out.keys(), key_prim)
            if not keys_ok or (not produced and not checker(out)):
                raise WrongTypeError(field_path=name, field_type=ftype, value=out)
        return out

    return convert_values


def _union_function(body: _UnionBody, general: Callable[[Any], Any]) -> Callable[[Any], Any]:
    """Field function for a union of data classes: the first member that converts an exact `dict` wins (and is an
    instance by construction); anything else, including "no member matched", is decided by the interpreter."""

    def convert(value: Any) -> Any:
        if value.__class__ is dict:
            matched = body.match(value)
            if matched is not NO_MATCH:
                return matched
        return general(value)

    return convert


class _Source:  # pylint: disable=too-few-public-methods
    """Collects generated lines and the objects they refer to."""

    def __init__(self, plan: DataclassPlan) -> None:
        self.plan = plan
        self.namespace: Dict[str, Any] = {
            "_M": _MISSING,
            "_cls": plan.data_class,
            "_WTE": WrongTypeError,
            "_DFE": DaciteFieldError,
            "_MVE": MissingValueError,
            "_UDE": UnexpectedDataError,
            "_interpret": plan.interpret,
        }
        self._counter = 0

    def bind(self, value: Any, prefix: str = "o") -> str:
        self._counter += 1
        name = f"_{prefix}{self._counter}"
        self.namespace[name] = value
        return name


def _primitive_test(variable: str, type_: type) -> str:
    """Exact-class test that is true when `variable` is NOT obviously a `type_`. A `True` result only means "take the
    precise (slow) path": subclasses, e.g. enums deriving from `int`, are decided there by `isinstance`."""
    if type_ is _NoneType:
        return f"{variable} is not None"
    if type_ is float:
        return f"{variable}.__class__ is not float and {variable}.__class__ is not int"
    return f"{variable}.__class__ is not {type_.__name__}"


def _field_lines(  # pylint: disable=too-many-arguments,too-many-positional-arguments,too-many-locals
    src: _Source, index: int, name: str, node: Node, checker: Any, ftype: Any
) -> List[str]:
    """Lines (no indentation) converting and checking `v<index>` which holds the raw value of a present key.

    Everything that is not the exact, common case is delegated to `slow`: the interpreter's node and checker for this
    field, wrapped in a function (`_general`), which converts, checks and raises exactly like the interpreter."""
    check_types = src.plan.check_types
    variable = f"v{index}"
    slow_name: List[str] = []

    def slow_line() -> str:
        if not slow_name:
            slow_name.append(src.bind(_general(node, checker, ftype, name, check_types), "g"))
        return f"{variable} = {slow_name[0]}({variable})"

    def general_lines() -> List[str]:
        return [slow_line()]

    def inline_list_lines(inner: Node, inner_type: Any) -> Optional[List[str]]:
        """`List[<primitive or Any>]` written out in the generated function (no call for the common exact list)."""
        body = inner.body
        if not isinstance(body, _CollectionBody) or inner.hook is not None or inner.cast is not None:
            return None
        generics = ti.extract_generic(inner_type)
        if not (
            ti.extract_origin_collection(inner_type) is list
            and body.is_collection
            and not body.is_mapping
            and not body.is_tuple
            and len(generics) == 1
            and body.item_node is not None
        ):
            return None
        leaf = _leaf(body.item_node, generics[0])
        if leaf is None or leaf[0] in ("dc", "udc"):
            return None
        lines = [f"if {variable}.__class__ is list:", f"    {variable} = list({variable})"]
        if check_types and leaf[0] == "prim":
            fast, accepted = _PRIMITIVES[leaf[1]]
            fast_name, accepted_name = src.bind(fast, "k"), src.bind(accepted, "a")
            lines += [
                f"    if not set(map(type, {variable})) <= {fast_name}:",
                f"        if not all(isinstance(x, {accepted_name}) for x in {variable}):",
                f"            {slow_line()}",
            ]
        return lines + ["else:", f"    {slow_line()}"]

    def fast_lines(  # pylint: disable=too-many-return-statements
        inner: Node, inner_checker: Any, inner_type: Any
    ) -> Optional[List[str]]:
        if _passthrough(inner):
            if not check_types or inner_checker is _true:
                return ["pass"]
            if _is_primitive(inner_type):
                return [f"if {_primitive_test(variable, inner_type)}:", f"    {slow_line()}"]
            return [f"if not {src.bind(inner_checker, 'c')}({variable}):", f"    {slow_line()}"]
        if inner.hook is not None or inner.cast is not None or inner.optional:
            return None
        body = inner.body
        if isinstance(body, _DataclassBody):
            body_name = src.bind(body, "b")
            return [
                f"if {variable}.__class__ is dict:",
                "    try:",
                f"        {variable} = ({body_name}.plan or {body_name}.resolve()).run({variable})",
                "    except _DFE as error:",
                f"        error.update_path({name!r})",
                "        raise",
                "else:",
                f"    {slow_line()}",
            ]
        if isinstance(body, _UnionBody) and not body.strict_match and not body.single:
            members = body.nodes
            if all(_passthrough(m) for m in members) and all(_is_primitive(t) for t in body.types):
                classes = set(body.types)
                if float in classes:
                    classes.add(int)
                accepted = src.bind(tuple(sorted(classes, key=lambda c: c.__name__)), "u")
                return [f"if not isinstance({variable}, {accepted}):", f"    {slow_line()}"]
            return None
        if isinstance(body, _CollectionBody):
            inline = inline_list_lines(inner, inner_type)
            if inline is not None:
                return inline
            function = _collection_function(inner, inner_checker, inner_type, ftype, name, check_types)
            if function is not None:
                return [f"{variable} = {src.bind(function, 'f')}({variable})"]
        return None

    # Union[DataClassA, DataClassB, ...] (optionally with None): the first member that converts the dict wins
    union = node.body
    if (
        node.hook is None
        and node.cast is None
        and isinstance(union, _UnionBody)
        and not union.single
        and union.uses_data_classes_only()
    ):
        function = _union_function(union, _general(node, checker, ftype, name, check_types))
        call = f"{variable} = {src.bind(function, 'f')}({variable})"
        return [f"if {variable} is not None:", f"    {call}"] if node.optional else [call]

    # Optional[X] / Union[None, X]: None is always accepted; X is converted like a field of type X
    if node.hook is None and node.cast is None and node.optional:
        body = node.body
        if isinstance(body, _UnionBody) and body.single:
            lines = fast_lines(
                body.nodes[body.single_index], body.checkers[body.single_index], body.types[body.single_index]
            )
            if lines is not None:
                return [f"if {variable} is not None:"] + ["    " + line for line in lines]
    return fast_lines(node, checker, ftype) or general_lines()


def _positional_construction(plan: DataclassPlan) -> bool:
    """True when `__init__` is the one `@dataclass` generated and no field is keyword-only, i.e. the init parameters
    are exactly the `init` fields in definition order (calling positionally is then the same as by keyword)."""
    cls = ti.orig(plan.data_class)
    code = getattr(cls.__dict__.get("__init__"), "__code__", None)
    if code is None or code.co_filename != "<string>":
        return False
    return not any(getattr(f, "kw_only", False) is True for f in _data_class_fields(plan.data_class))


def compile_function(plan: DataclassPlan) -> Callable[[Any], Any]:  # pylint: disable=too-many-locals
    src = _Source(plan)
    lines = ["def run(data):", "    if data.__class__ is not dict:", "        return _interpret(data)"]
    if plan.strict_names is not None:
        lines += [
            f"    extra_fields = set(data.keys()) - {src.bind(plan.strict_names, 's')}",  # same expression as 1.x
            "    if extra_fields:",
            "        raise _UDE(keys=extra_fields)",
        ]
    # Required keys are read first, in one `try`: reading has no side effects, so when one is missing the whole call is
    # simply handed to the interpreter (which raises exactly what 1.x raises, in 1.x order).
    required = [i for i, f in enumerate(plan.fields) if f[5] and f[6] == _NO_DEFAULT]
    if required:
        lines += ["    try:"]
        lines += [f"        v{i} = data[{plan.fields[i][1]!r}]" for i in required]
        lines += ["    except KeyError:", "        return _interpret(data)"]
    if len(required) != len(plan.fields):
        lines.append("    get = data.get")
    arguments: List[str] = []
    post_init: List[Tuple[int, str]] = []
    positional = _positional_construction(plan)
    for index, (name, key, node, checker, field_type, init, default_kind, default) in enumerate(plan.fields):
        variable = f"v{index}"
        body = _field_lines(src, index, name, node, checker, field_type)
        if index in required:
            lines += ["    " + line for line in body]
        else:
            lines += [f"    {variable} = get({key!r}, _M)", f"    if {variable} is _M:"]
            if default_kind == _DEFAULT_VALUE:
                lines.append(f"        {variable} = {src.bind(default, 'd')}")
            elif default_kind == _DEFAULT_FACTORY:
                lines.append(f"        {variable} = {src.bind(default, 'd')}()")
            elif default_kind == _DEFAULT_NONE:
                lines.append(f"        {variable} = None")
            else:  # no default and not an init field: nothing to set
                lines.append("        pass")
            lines.append("    else:")
            lines += ["        " + line for line in body]
        if init:
            arguments.append(variable if positional else f"{name}={variable}")
        elif not plan.frozen:
            post_init.append((index, name))
    lines.append(f"    instance = _cls({', '.join(arguments)})")
    for index, name in post_init:
        lines += [f"    if v{index} is not _M:", f"        setattr(instance, {name!r}, v{index})"]
    lines.append("    return instance")
    source = "\n".join(lines) + "\n"
    code = compile(source, f"<dacite plan {getattr(plan.data_class, '__name__', 'data class')}>", "exec")
    exec(code, src.namespace)  # pylint: disable=exec-used
    return src.namespace["run"]  # type: ignore[no-any-return]
