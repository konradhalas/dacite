from dataclasses import Field, MISSING, _FIELDS, _FIELD, _FIELD_INITVAR  # type: ignore
from typing import Type, Any, TypeVar, List, get_type_hints, Optional, Dict, Tuple

from dacite.data import Data
from dacite.exceptions import ForwardReferenceError
from dacite.types import is_optional

T = TypeVar("T", bound=Any)


class DefaultValueNotFoundError(Exception):
    pass


def get_default_value_for_field(field: Field) -> Any:
    if field.default != MISSING:
        return field.default
    elif field.default_factory != MISSING:  # type: ignore
        return field.default_factory()  # type: ignore
    elif is_optional(field.type):
        return None
    raise DefaultValueNotFoundError()


def create_instance(data_class: Type[T], init_values: Data, post_init_values: Data) -> T:
    instance = data_class(**init_values)
    for key, value in post_init_values.items():
        setattr(instance, key, value)
    return instance


def get_fields(data_class: Type, forward_references: Optional[Dict[str, Any]]) -> List[Tuple[Field, Type]]:
    try:
        data_class_hints = get_type_hints(data_class, globalns=dict(forward_references) if forward_references else None)
    except NameError as error:
        raise ForwardReferenceError(str(error))
    fields = getattr(data_class, _FIELDS)
    return [
        (f, data_class_hints[f.name])
        for f in fields.values()
        if f._field_type is _FIELD or f._field_type is _FIELD_INITVAR
    ]
