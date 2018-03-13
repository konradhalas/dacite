from typing import Dict, Any, TypeVar, Type, Union, Iterable, Callable, List, Generic, Collection

from dataclasses import fields, MISSING, is_dataclass, Field

T = TypeVar('T')


def make(data_class: Type[T],
         data: Union[Dict[str, Any], List[Dict[str, Any]]],
         rename: Dict[str, str] = None,
         prefixed: Dict[str, str] = None,
         cast: List[str] = None,
         transform: Dict[str, Callable[[Any], Any]] = None,
         flattened: List[str] = None) -> T:
    if isinstance(data, list):
        new_data = {}
        for single_data in data:
            new_data.update(single_data)
        data = new_data
    rename = rename or {}
    prefixed = prefixed or {}
    cast = cast or []
    transform = transform or {}
    flattened = flattened or []
    values = {}
    for field in fields(data_class):
        try:
            if field.name in prefixed:
                value = _extract_nested_dict_for_prefix(prefixed[field.name], data)
            elif field.name in flattened:
                value = _extract_flattened_fields(field, data, rename)
            else:
                key_name = rename.get(field.name, field.name)
                value = data[key_name]
            if field.name in transform:
                value = transform[field.name](value)
            if value is not None and _is_collection_of_data_classes(field.type):
                value = [_make_inner(
                    field=field,
                    value=item,
                    rename=rename,
                    prefixed=prefixed,
                    cast=cast,
                    transform=transform,
                    flattened=flattened,
                ) for item in value]
            elif value is not None and _is_data_class(field.type):
                value = _make_inner(
                    field=field,
                    value=value,
                    rename=rename,
                    prefixed=prefixed,
                    cast=cast,
                    transform=transform,
                    flattened=flattened,
                )
            elif field.name in cast:
                value = field.type(value)
            elif not _is_instance(field.type, value):
                raise TypeError(f'wrong type for field {field.name} - should be {field.type} instead of {type(value)}')
            values[field.name] = value
        except KeyError:
            if _is_optional(field.type):
                values[field.name] = None
            elif field.default == MISSING:
                raise ValueError(f'missing value for field {field.name}')
    return data_class(**values)


def _make_inner(field: Field,
                value: Any,
                rename: Dict[str, str],
                prefixed: Dict[str, str],
                cast: List[str],
                transform: Dict[str, Callable[[Any], Any]],
                flattened: Iterable[str]) -> T:
    return make(
        data_class=_extract_data_class(field.type),
        data=value,
        rename=_extract_nested_dict(field, rename),
        prefixed=_extract_nested_dict(field, prefixed),
        cast=_extract_nested_list(field, cast),
        transform=_extract_nested_dict(field, transform),
        flattened=_extract_nested_list(field, flattened),
    )


def _extract_flattened_fields(field: Field, data: Dict[str, Any], rename: Dict[str, str]):
    result = {}
    for inner_field in fields(_extract_data_class(field.type)):
        field_name = rename.get(field.name + '.' + inner_field.name, inner_field.name)
        if field_name in data:
            result[field_name] = data[field_name]
    return result


def _extract_nested_dict(field: Field, params: Dict[str, Any]) -> Dict[str, Any]:
    prefix = field.name + '.'
    return _extract_nested_dict_for_prefix(prefix=prefix, data=params)


def _extract_nested_dict_for_prefix(prefix: str, data: Dict[str, Any]) -> Dict[str, Any]:
    result = {}
    prefix_len = len(prefix)
    for key, val in data.items():
        if key.startswith(prefix):
            result[key[prefix_len:]] = val
    return result


def _extract_nested_list(field: Field, params: List[str]) -> List[str]:
    result = []
    prefix = field.name + '.'
    prefix_len = len(prefix)
    for name in params:
        if name.startswith(prefix):
            result.append(name[prefix_len:])
    return result


def _is_optional(t: Type):
    return _is_union(t) and type(None) in t.__args__


def _is_union(t: Type):
    return type(t) == type(Union)


def _is_generic(t: Type):
    return type(t) == type(Generic)


def _is_instance(t: Type, value: Any) -> bool:
    if _is_union(t):
        types = tuple(t.__origin__ if _is_generic(t) else t for t in t.__args__)
        return isinstance(value, types)
    elif _is_generic(t):
        return isinstance(value, t.__origin__)
    else:
        return isinstance(value, t)


def _is_data_class(t: Type):
    if _is_union(t):
        return _has_inner_data_class(t)
    else:
        return is_dataclass(t)


def _is_collection_of_data_classes(t: Type):
    return not _is_union(t) and issubclass(t, Collection) and _has_inner_data_class(t)


def _extract_data_class(t: Type) -> Any:
    if _has_inner_data_class(t):
        for inner_type in t.__args__:
            if is_dataclass(inner_type):
                return inner_type
    else:
        return t


def _has_inner_data_class(t: Type):
    return hasattr(t, '__args__') and any(is_dataclass(t) for t in t.__args__)
