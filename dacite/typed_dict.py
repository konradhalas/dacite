"""Introspection shared by TypedDict construction and runtime type checking."""

import sys
from typing import Any, Dict, FrozenSet, Optional, Tuple, Type, TypeVar, Union, get_type_hints

try:
    from typing import get_args, get_origin  # type: ignore
except ImportError:
    from typing_extensions import get_args, get_origin  # type: ignore

from dacite.frozen_dict import FrozenDict


def is_typed_dict(type_: Type) -> bool:
    """Recognize stdlib and typing_extensions TypedDicts, including generic aliases."""
    origin = get_origin(type_) or type_
    return (
        isinstance(origin, type)
        and issubclass(origin, dict)
        and hasattr(origin, "__total__")
        and hasattr(origin, "__annotations__")
    )


def _wrapper_name(annotation: Any) -> str:
    wrapper = get_origin(annotation)
    name = getattr(wrapper, "_name", None) or getattr(wrapper, "__name__", "")
    return name if isinstance(name, str) else ""


def _concretize(annotation: Any, bindings: Dict[TypeVar, Any]) -> Any:
    if isinstance(annotation, TypeVar):
        return bindings.get(annotation, annotation)
    if _wrapper_name(annotation) in ("Required", "NotRequired", "Annotated", "ReadOnly"):
        return _concretize(get_args(annotation)[0], bindings)
    origin = get_origin(annotation)
    args = get_args(annotation)
    if not origin or not args or _wrapper_name(annotation) == "Literal":
        return annotation
    concrete = tuple(_concretize(arg, bindings) for arg in args)
    if concrete == args:
        return annotation
    if hasattr(annotation, "copy_with"):
        return annotation.copy_with(concrete)
    if _wrapper_name(annotation) == "UnionType":
        return Union[concrete]
    return origin[concrete]


def get_typed_dict_spec(type_: Type, localns: Optional[FrozenDict] = None) -> Tuple[Dict[str, Any], FrozenSet[str]]:
    origin = get_origin(type_) or type_
    bindings = dict(zip(getattr(origin, "__parameters__", ()), get_args(type_)))
    for base in getattr(origin, "__orig_bases__", ()):
        bindings.update(
            (param, _concretize(arg, bindings))
            for param, arg in zip(getattr(get_origin(base), "__parameters__", ()), get_args(base))
        )

    # Required/NotRequired may be forward annotations, in which case the class's
    # key sets are incomplete. Resolve the qualifiers before deciding presence.
    if sys.version_info >= (3, 9):
        extras = get_type_hints(origin, localns=localns, include_extras=True)
    else:
        try:
            from typing_extensions import get_type_hints as get_extra_hints  # pylint: disable=import-outside-toplevel
        except ImportError:
            extras = get_type_hints(origin, localns=localns)
        else:
            extras = get_extra_hints(origin, localns=localns, include_extras=True)
    required = set(getattr(origin, "__required_keys__", extras if origin.__total__ else ()))
    hints = {}
    for key, annotation in extras.items():
        hints[key] = _concretize(annotation, bindings)
        while get_origin(annotation) is not None:
            name = _wrapper_name(annotation)
            if name == "Required":
                required.add(key)
            elif name == "NotRequired":
                required.discard(key)
            elif name not in ("Annotated", "ReadOnly"):
                break
            annotation = get_args(annotation)[0]
    return hints, frozenset(required)
