from typing import Type, Any, Optional, Union, Collection, TypeVar, cast, Dict, Callable

T = TypeVar("T", bound=Any)


def transform_value(types_hooks: Dict[Type, Callable[[Any], Any]], type_: Type[T], value: Any) -> T:
    if is_optional(type_):
        type_ = extract_optional(type_)
    if is_generic_collection(type_):
        collection_cls = extract_origin_collection(type_)
        if issubclass(collection_cls, dict):
            key_cls, item_cls = extract_generic(type_)
            return cast(
                T,
                collection_cls(
                    {
                        transform_value(types_hooks, key_cls, key): transform_value(types_hooks, item_cls, item)
                        for key, item in value.items()
                    }
                ),
            )
        item_cls = extract_generic(type_)[0]
        return collection_cls(transform_value(types_hooks, item_cls, item) for item in value)
    elif type_ in types_hooks:
        value = types_hooks[type_](value)
    return value


def extract_origin_collection(collection: Type) -> Type:
    try:
        return collection.__extra__
    except AttributeError:
        return collection.__origin__


def is_optional(type_: Type) -> bool:
    return is_union(type_) and type(None) in extract_generic(type_)


def extract_optional(optional: Type[Optional[T]]) -> T:
    for type_ in extract_generic(optional):
        if type_ is not type(None):
            return type_
    raise ValueError("can not find not-none value")


def is_generic(type_: Type) -> bool:
    return hasattr(type_, "__origin__")


def is_union(type_: Type) -> bool:
    return is_generic(type_) and type_.__origin__ == Union


def is_new_type(type_: Type) -> bool:
    return hasattr(type_, "__supertype__")


def extract_new_type(type_: Type) -> Type:
    return type_.__supertype__


def is_instance(value: Any, type_: Type) -> bool:
    if type_ == Any:
        return True
    elif is_union(type_):
        types = []
        for inner_type in extract_generic(type_):
            if is_generic(inner_type):
                inner_type = extract_origin_collection(inner_type)
            if is_new_type(inner_type):
                inner_type = extract_new_type(inner_type)
            types.append(inner_type)
        return isinstance(value, tuple(types))
    elif is_generic_collection(type_):
        return isinstance(value, extract_origin_collection(type_))
    elif is_new_type(type_):
        return isinstance(value, extract_new_type(type_))
    else:
        try:
            return isinstance(value, type_)
        except TypeError:
            return False


def is_generic_collection(type_: Type) -> bool:
    if not is_generic(type_):
        return False
    origin = extract_origin_collection(type_)
    try:
        return bool(origin and issubclass(origin, Collection))
    except TypeError:
        return False


def extract_generic(type_: Type) -> tuple:
    return type_.__args__  # type: ignore
