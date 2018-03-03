from typing import Dict, Any, TypeVar, Type

from dataclasses import fields, MISSING, is_dataclass

T = TypeVar('T')


def make(data_class: Type[T], data: Dict[str, Any]) -> T:
    values = {}
    for field in fields(data_class):
        try:
            value = data[field.name]
            if is_dataclass(field.type):
                value = make(field.type, value)
            elif not isinstance(value, field.type):
                raise TypeError(f'wrong type for field {field.name} - should be {field.type.__name__} '
                                f'instead of {type(value).__name__}')
            values[field.name] = value
        except KeyError:
            if field.default == MISSING:
                raise ValueError(f'missing value for field {field.name}')
    return data_class(**values)
