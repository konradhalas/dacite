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
    """Classify an element/value node of a collection: ("any",), ("prim", cls) or ("dc", body, node)."""
    if _passthrough(node):
        if type_ is Any:
            return ("any",)
        if _is_primitive(type_):
            return ("prim", type_)
        return None
    if node.hook is None and node.cast is None and not node.optional and isinstance(node.body, _DataclassBody):
        return ("dc", node.body, node)
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


def _collection_function(  # pylint: disable=too-many-return-statements,too-many-locals,too-many-arguments,too-many-positional-arguments
    node: Node, checker: Callable[[Any], bool], type_: Any, ftype: Any, name: str, check_types: bool
) -> Optional[Callable[[Any], Any]]:
    """Function converting + checking a whole `List[T]`, `Tuple[T, ...]` or `Dict[K, T]` field for exact container
    input; any other input goes through the general (interpreter) path."""
    body = node.body
    if not isinstance(body, _CollectionBody) or node.hook is not None or node.cast is not None or node.optional:
        return None
    origin = ti.extract_origin_collection(type_)
    generics = ti.extract_generic(type_)
    general = _general(node, checker, ftype, name, check_types)
    if origin is dict and body.is_mapping and len(generics) == 2 and body.value_node is not None:
        key_type, value_type = generics
        leaf = _leaf(body.value_node, value_type)
        if leaf is None or not (key_type is Any or _is_primitive(key_type)):
            return None
        return _dict_function(leaf, key_type, body.value_node, checker, ftype, name, check_types, general)
    if origin is list and body.is_collection and not body.is_mapping and not body.is_tuple and len(generics) == 1:
        item_node, item_type, container = body.item_node, generics[0], list
    elif origin is tuple and body.is_tuple and body.variadic and len(generics) == 2:
        item_node, item_type, container = body.tuple_nodes[0], generics[0], tuple  # type: ignore[assignment]
    else:
        return None
    if item_node is None:
        return None
    leaf = _leaf(item_node, item_type)
    if leaf is None:
        return None
    return _sequence_function(container, leaf, item_node, checker, ftype, name, check_types, general)


def _sequence_function(  # pylint: disable=too-many-arguments,too-many-positional-arguments
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

    body = leaf[1]

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
                    if run is None:
                        run = (body.plan or body.resolve()).run
                    out.append(run(item))
                else:
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
    kind = leaf[0]
    key_prim = key_type if _is_primitive(key_type) else None
    if kind in ("any", "prim"):
        value_prim = leaf[1] if kind == "prim" else None

        def convert(value: Any) -> Any:
            if value.__class__ is not dict:
                return general(value)
            out = dict(value)
            if check_types and (
                (key_prim is not None and not _check_classes(out.keys(), key_prim))
                or (value_prim is not None and not _check_classes(out.values(), value_prim))
            ):
                raise WrongTypeError(field_path=name, field_type=ftype, value=out)
            return out

        return convert

    body = leaf[1]

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
                    if run is None:
                        run = (body.plan or body.resolve()).run
                    out[current] = run(item)
                else:
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
        if leaf is None or leaf[0] == "dc":
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
