"""Uncached type predicates used while *building* plans.

These are line-for-line equivalents of the helpers in `dacite.types` (which wrap them in `functools.lru_cache` and are
kept for backward compatibility). Plans call them once per type, and the module never caches, so no class (in
particular dynamically created ones) is pinned by a global cache.
"""

from dataclasses import InitVar, is_dataclass
from types import UnionType
from typing import Any, Collection, Literal, Tuple, Type, Union, get_origin


def extract_origin_collection(collection: Any) -> Any:
    try:
        return collection.__extra__
    except AttributeError:
        return collection.__origin__


def is_generic(type_: Any) -> bool:
    return hasattr(type_, "__origin__")


def is_union(type_: Any) -> bool:
    if is_generic(type_) and type_.__origin__ == Union:
        return True
    return isinstance(type_, UnionType)


def extract_generic(type_: Any, defaults: Tuple = ()) -> tuple:
    try:
        if getattr(type_, "_special", False):
            return defaults
        if type_.__args__ == ():
            return (type_.__args__,)
        return type_.__args__ or defaults  # type: ignore
    except AttributeError:
        return defaults


def is_optional(type_: Any) -> bool:
    return is_union(type_) and type(None) in extract_generic(type_)


def is_generic_collection(type_: Any) -> bool:
    if not is_generic(type_):
        return False
    origin = extract_origin_collection(type_)
    try:
        return bool(origin and issubclass(origin, Collection))
    except (TypeError, AttributeError):
        return False


def is_subclass(sub_type: Any, base_type: Any) -> bool:
    if is_generic_collection(sub_type):
        sub_type = extract_origin_collection(sub_type)
    try:
        return issubclass(sub_type, base_type)
    except TypeError:
        return False


def is_tuple(type_: Any) -> bool:
    return is_subclass(type_, tuple)


def is_literal(type_: Any) -> bool:
    return is_generic(type_) and type_.__origin__ == Literal


def is_new_type(type_: Any) -> bool:
    return hasattr(type_, "__supertype__")


def extract_new_type(type_: Any) -> Any:
    return type_.__supertype__


def is_init_var(type_: Any) -> bool:
    return isinstance(type_, InitVar) or type_ is InitVar


def extract_init_var(type_: Any) -> Any:
    try:
        return type_.type
    except AttributeError:
        return Any


def is_type_generic(type_: Any) -> bool:
    try:
        return type_.__origin__ in (type, Type)
    except AttributeError:
        return False


def is_generic_dataclass(type_: Any) -> bool:
    return is_dataclass(get_origin(type_))


def orig(data_class: Any) -> Any:
    if is_dataclass(data_class):
        return data_class
    return get_origin(data_class)
