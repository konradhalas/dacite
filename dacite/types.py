from dataclasses import is_dataclass
from typing import Type, Any, Mapping, Optional, Union, Collection, TypeVar

T = TypeVar('T')


def cast_value(t: Type[T], value: Any) -> T:
    if is_optional(t):
        t = extract_optional(t)
    if is_generic_collection(t):
        collection_cls = extract_generic_collection(t)
        if issubclass(collection_cls, Mapping):
            key_cls = t.__args__[0]
            item_cls = t.__args__[1]
            return collection_cls({key_cls(key): item_cls(item) for key, item in value.items()})
        else:
            item_cls = t.__args__[0]
            return collection_cls(item_cls(item) for item in value)
    else:
        return t(value)


def extract_generic_collection(collection: Type) -> Type:
    try:
        return collection.__extra__
    except AttributeError:
        return collection.__origin__


def is_optional(t: Type) -> bool:
    return is_union(t) and type(None) in t.__args__


def extract_optional(optional: Optional[T]) -> T:
    for t in optional.__args__:
        if t is not None:
            return t


def is_generic(t: Type) -> bool:
    return hasattr(t, '__origin__')


def is_union(t: Type) -> bool:
    return is_generic(t) and t.__origin__ == Union


def is_instance(t: Type, value: Any) -> bool:
    if t == Any:
        return True
    elif is_union(t):
        types = tuple(t.__origin__ if is_generic(t) else t for t in t.__args__)
        return isinstance(value, types)
    elif is_generic(t):
        return isinstance(value, t.__origin__)
    else:
        return isinstance(value, t)


def has_data_class(t: Type) -> bool:
    if is_union(t):
        return has_inner_data_class(t)
    else:
        return is_dataclass(t)


def has_inner_data_class(t: Type) -> bool:
    return hasattr(t, '__args__') and any(is_dataclass(it) for it in t.__args__)


def extract_data_class(t: Type) -> Any:
    if has_data_class_collection(t):
        t = extract_data_class_collection(t)
    if has_inner_data_class(t):
        for inner_type in t.__args__:
            if is_dataclass(inner_type):
                return inner_type
    elif is_dataclass(t):
        return t


def has_data_class_collection(t: Type) -> bool:
    if is_union(t):
        return has_inner_data_class_collection(t)
    else:
        return is_data_class_collection(t)


def is_data_class_collection(t: Type) -> bool:
    return is_generic_collection(t) and has_inner_data_class(t)


def is_generic_collection(t: Type) -> bool:
    return is_generic(t) and issubclass(t.__origin__, Collection)


def has_inner_data_class_collection(t: Type) -> bool:
    return hasattr(t, '__args__') and any(is_data_class_collection(it) for it in t.__args__)


def extract_data_class_collection(t: Type) -> Any:
    if has_inner_data_class_collection(t):
        for inner_type in t.__args__:
            if is_data_class_collection(inner_type):
                return inner_type
    elif is_data_class_collection(t):
        return t
