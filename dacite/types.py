from typing import Type, Any, Optional, Union, TypeVar, Mapping, cast as typing_cast
from typing import get_origin

from dacite import _typeinfo
from dacite.cache import cache

T = TypeVar("T", bound=Any)


# Cached public helpers kept for backward compatibility (and used by `is_instance`). The implementations live in
# `dacite._typeinfo`; plans use the uncached versions so that no class is pinned by these `lru_cache`s.
extract_origin_collection = cache(_typeinfo.extract_origin_collection)
is_generic = cache(_typeinfo.is_generic)
is_union = cache(_typeinfo.is_union)
extract_generic = cache(_typeinfo.extract_generic)
is_optional = cache(_typeinfo.is_optional)
is_generic_collection = cache(_typeinfo.is_generic_collection)
is_subclass = cache(_typeinfo.is_subclass)
is_tuple = cache(_typeinfo.is_tuple)
is_literal = cache(_typeinfo.is_literal)
is_new_type = cache(_typeinfo.is_new_type)
extract_new_type = cache(_typeinfo.extract_new_type)
is_init_var = cache(_typeinfo.is_init_var)
extract_init_var = cache(_typeinfo.extract_init_var)
is_type_generic = cache(_typeinfo.is_type_generic)
is_generic_dataclass = cache(_typeinfo.is_generic_dataclass)


@cache
def extract_optional(optional: Type[Optional[T]]) -> T:
    other_members = [member for member in extract_generic(optional) if member is not type(None)]
    if other_members:
        return typing_cast(T, Union[tuple(other_members)])
    else:
        raise ValueError("can not find not-none value")


def is_instance(value: Any, type_: Type) -> bool:
    try:
        # As described in PEP 484 - section: "The numeric tower"
        if (type_ in [float, complex] and isinstance(value, (int, float))) or isinstance(value, type_):
            return True
    except TypeError:
        pass
    if type_ == Any:
        return True
    if is_union(type_):
        return any(is_instance(value, t) for t in extract_generic(type_))
    if is_generic_collection(type_):
        origin = extract_origin_collection(type_)
        if not isinstance(value, origin):
            return False
        if not extract_generic(type_):
            return True
        if isinstance(value, tuple) and is_tuple(type_):
            tuple_types = extract_generic(type_)
            if len(tuple_types) == 1 and tuple_types[0] == ():
                return len(value) == 0
            if len(tuple_types) == 2 and tuple_types[1] is ...:
                return all(is_instance(item, tuple_types[0]) for item in value)
            if len(tuple_types) != len(value):
                return False
            return all(is_instance(item, item_type) for item, item_type in zip(value, tuple_types))
        if isinstance(value, Mapping):
            key_type, val_type = extract_generic(type_, defaults=(Any, Any))
            for key, val in value.items():
                if not is_instance(key, key_type) or not is_instance(val, val_type):
                    return False
            return True
        return all(is_instance(item, extract_generic(type_, defaults=(Any,))[0]) for item in value)
    if is_new_type(type_):
        return is_instance(value, extract_new_type(type_))
    if is_literal(type_):
        return value in extract_generic(type_)
    if is_init_var(type_):
        return is_instance(value, extract_init_var(type_))
    if is_type_generic(type_):
        return is_subclass(value, extract_generic(type_)[0])
    if is_generic_dataclass(type_):
        return isinstance(value, get_origin(type_))  # type: ignore[arg-type]
    return False
