from typing import Dict, Any, TypeVar, Type, Union, Iterable, Callable, List

from dataclasses import fields, MISSING, is_dataclass, Field

T = TypeVar('T')


def make(data_class: Type[T],
         data: Dict[str, Any],
         rename: Dict[str, str] = None,
         prefixes: Dict[str, str] = None,
         cast: Iterable[str] = None,
         transform: Dict[str, Callable[[Any], Any]] = None) -> T:
    rename = rename or {}
    prefixes = prefixes or {}
    cast = cast or []
    transform = transform or {}
    values = {}
    for field in fields(data_class):
        try:
            if field.name in prefixes:
                value = _extract_nested_dict_for_prefix(prefixes[field.name], data)
            else:
                key_name = rename.get(field.name, field.name)
                value = data[key_name]
            if field.name in transform:
                value = transform[field.name](value)
            if is_dataclass(field.type):
                value = make(
                    data_class=field.type,
                    data=value,
                    rename=_extract_nested_dict(field, rename),
                    prefixes=_extract_nested_dict(field, prefixes),
                    cast=_extract_nested_list(field, cast),
                    transform=_extract_nested_dict(field, transform),
                )
            elif field.name in cast:
                value = field.type(value)
            elif not isinstance(value, field.type):
                raise TypeError(f'wrong type for field {field.name} - should be {field.type.__name__} '
                                f'instead of {type(value).__name__}')
            values[field.name] = value
        except KeyError:
            if _is_optional(field):
                values[field.name] = None
            elif field.default == MISSING:
                raise ValueError(f'missing value for field {field.name}')
    return data_class(**values)


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
