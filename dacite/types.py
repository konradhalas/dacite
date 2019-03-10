from typing import Type, Any, Mapping, Optional, Union, Collection, TypeVar

T = TypeVar('T')


def cast_value(t: Type[T], value: Any) -> T:
    if is_optional(t):
        t = extract_optional(t)
    if is_generic_collection(t):
        collection_cls = extract_origin_collection(t)
        if issubclass(collection_cls, Mapping):
            key_cls, item_cls = extract_generic(t)
            return collection_cls({key_cls(key): item_cls(item) for key, item in value.items()})
        else:
            item_cls = extract_generic(t)[0]
            return collection_cls(item_cls(item) for item in value)
    else:
        return t(value)


def extract_origin_collection(collection: Type) -> Type:
    try:
        return collection.__extra__
    except AttributeError:
        return collection.__origin__


def is_optional(t: Type) -> bool:
    return is_union(t) and type(None) in extract_generic(t)


def extract_optional(optional: Optional[T]) -> T:
    for t in extract_generic(optional):
        if t is not None:
            return t


def is_generic(t: Type) -> bool:
    return hasattr(t, '__origin__')


def is_union(t: Type) -> bool:
    return is_generic(t) and t.__origin__ == Union


def is_new_type(t: Type) -> bool:
    return hasattr(t, '__supertype__')


def is_instance(value: Any, t: Type) -> bool:
    if t == Any:
        return True
    elif is_union(t):
        types = tuple(extract_origin_collection(t) if is_generic(t) else t for t in extract_generic(t))
        return isinstance(value, types)
    elif is_generic_collection(t):
        return isinstance(value, extract_origin_collection(t))
    elif is_new_type(t):
        return isinstance(value, t.__supertype__)
    else:
        try:
            return isinstance(value, t)
        except TypeError:
            return False


def is_generic_collection(t: Type) -> bool:
    if not is_generic(t):
        return False
    origin = extract_origin_collection(t)
    return origin and issubclass(origin, Collection)


def extract_generic(t: Type) -> tuple:
    return t.__args__
