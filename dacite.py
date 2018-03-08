from typing import Dict, Any, TypeVar, Type, Union, Iterable, Callable, List, Generic

from dataclasses import fields, MISSING, is_dataclass, Field

T = TypeVar('T')


def make(data_class: Type[T],
         data: Union[Dict[str, Any], List[Dict[str, Any]]],
         rename: Dict[str, str] = None,
         prefixed: Dict[str, str] = None,
         cast: Iterable[str] = None,
         transform: Dict[str, Callable[[Any], Any]] = None,
         flattened: Iterable[str] = None) -> T:
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
            if value is not None and _is_dataclass(field):
                value = make(
                    data_class=_extract_data_class(field),
                    data=value,
                    rename=_extract_nested_dict(field, rename),
                    prefixed=_extract_nested_dict(field, prefixed),
                    cast=_extract_nested_list(field, cast),
                    transform=_extract_nested_dict(field, transform),
                    flattened=_extract_nested_list(field, flattened),
                )
            elif field.name in cast:
                value = field.type(value)
            elif not _is_instance(field, value):
                raise TypeError(f'wrong type for field {field.name} - should be {field.type} instead of {type(value)}')
            values[field.name] = value
        except KeyError:
            if _is_optional(field):
                values[field.name] = None
            elif field.default == MISSING:
                raise ValueError(f'missing value for field {field.name}')
    return data_class(**values)


def _extract_flattened_fields(field: Field, data: Dict[str, Any], rename: Dict[str, str]):
    result = {}
    for inner_field in fields(_extract_data_class(field)):
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


def _is_optional(field: Field):
    return type(field.type) == type(Union) and type(None) in field.type.__args__


def _is_instance(field: Field, value: Any) -> bool:
    if type(field.type) == type(Union):
        types = tuple(t.__origin__ if type(t) == type(Generic) else t for t in field.type.__args__)
        return isinstance(value, types)
    elif type(field.type) == type(Generic):
        return isinstance(value, field.type.__origin__)
    else:
        return isinstance(value, field.type)


def _is_dataclass(field: Field):
    if type(field.type) == type(Union):
        return any(is_dataclass(t) for t in field.type.__args__)
    else:
        return is_dataclass(field.type)


def _extract_data_class(field: Field) -> Type[T]:
    if type(field.type) == type(Union):
        for inner_type in field.type.__args__:
            if is_dataclass(inner_type):
                return inner_type
    else:
        return field.type
