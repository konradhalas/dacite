from dataclasses import Field, MISSING
from typing import Type, Any, TypeVar

from dacite.data import Data
from dacite.exceptions import MissingValueError
from dacite.types import is_optional

T = TypeVar('T')


def has_field_default_value(field: Field) -> bool:
    return field.default != MISSING or field.default_factory != MISSING or is_optional(field.type)


def get_default_value_for_field(field: Field) -> Any:
    if field.default != MISSING:
        return field.default
    elif field.default_factory != MISSING:
        return field.default_factory()
    elif is_optional(field.type):
        return None
    else:
        raise MissingValueError(field.name)


def create_instance(data_class: Type[T], init_values: Data, post_init_values: Data) -> T:
    instance = data_class(**init_values)
    for key, value in post_init_values.items():
        setattr(instance, key, value)
    return instance
