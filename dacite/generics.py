import sys
from dataclasses import Field, is_dataclass
from typing import Any, Generic, List, Literal, TypeVar, get_type_hints

try:
    from typing import get_args, get_origin
except ImportError:
    from typing_extensions import get_args, get_origin

from .dataclasses import get_fields as dataclasses_get_fields


def _add_generics(type_origin: Any, type_args: tuple, generics: dict) -> None:
    """Adds (type var, concrete type) entries derived from a type's origin and args to the provided generics dict."""
    if type_origin and type_args and hasattr(type_origin, "__parameters__"):
        for param, arg in zip(type_origin.__parameters__, type_args):
            if param.__class__ is TypeVar:
                if param in generics and generics[param] != arg:
                    raise Exception("Generics error.")
                generics[param] = arg


def _dereference(type_name: str, data_class: type) -> type:
    """
    Try to find the class belonging to the reference in the provided module and,
    if not found, iteratively look in parent modules.
    """
    if data_class.__class__.__name__ == type_name:
        return data_class

    module_name = data_class.__module__
    parts = module_name.split(".")
    for i in range(len(parts)):
        try:
            module = sys.modules[".".join(parts[:-i]) if i else module_name]
            return getattr(module, type_name)
        except AttributeError:
            pass
    raise AttributeError("Could not find reference.")


def _concretize(hint: type, generics: dict[type, type], data_class: type) -> type:
    """Recursively replace type vars and forward references by concrete types."""

    if hint.__class__ is str:
        return _dereference(hint, data_class)

    if hint.__class__ is TypeVar:
        return generics.get(hint, hint)

    hint_origin = get_origin(hint)
    hint_args = get_args(hint)
    if hint_origin and hint_args and hint_origin is not Literal:
        concrete_hint_args = tuple(_concretize(a, generics, data_class) for a in hint_args)
        return hint_origin[concrete_hint_args]

    return hint


def orig(data_class: type) -> Any:
    if is_dataclass(data_class):
        return data_class
    return get_origin(data_class)


def get_concrete_type_hints(data_class: type, *args, **kwargs) -> dict[str, Any]:
    """
    An overwrite of typing.get_type_hints supporting generics and forward references,
    i.e. substituting concrete types in type vars and references.
    """
    generics = {}

    dc_origin = get_origin(data_class)
    dc_args = get_args(data_class)
    _add_generics(dc_origin, dc_args, generics)

    if hasattr(data_class, "__orig_bases__"):
        for base in data_class.__orig_bases__:
            base_origin = get_origin(base)
            base_args = get_args(base)
            if base_origin is not Generic:
                _add_generics(base_origin, base_args, generics)

    data_class = orig(data_class)
    hints = get_type_hints(data_class, *args, **kwargs)

    for key, hint in hints.copy().items():
        hints[key] = _concretize(hint, generics, data_class)

    return hints


def get_fields(data_class: type) -> List[Field]:
    """An overwrite of dacite's get_fields function, supporting generics."""
    return dataclasses_get_fields(orig(data_class))
