import copy
from dataclasses import fields, is_dataclass
from typing import TypeVar, Type, Optional, get_type_hints, Mapping, Any

from dacite.config import Config
from dacite.data import Data
from dacite.dataclasses import get_default_value_for_field, create_instance, DefaultValueNotFoundError
from dacite.exceptions import (
    ForwardReferenceError,
    WrongTypeError,
    DaciteError,
    UnionMatchError,
    MissingValueError,
    DaciteFieldError,
    UnexpectedDataError,
)
from dacite.types import (
    extract_origin_collection,
    is_instance,
    is_generic_collection,
    is_union,
    extract_generic,
    is_optional,
    transform_value,
)

T = TypeVar("T")


def from_dict(data_class: Type[T], data: Data, config: Optional[Config] = None) -> T:
    """Create a data class instance from a dictionary.

    :param data_class: a data class type
    :param data: a dictionary of a input data
    :param config: a configuration of the creation process
    :return: an instance of a data class
    """
    init_values: Data = {}
    post_init_values: Data = {}
    config = config or Config()
    try:
        data_class_hints = get_type_hints(data_class, globalns=config.forward_references)
    except NameError as error:
        raise ForwardReferenceError(str(error))
    data_class_fields = fields(data_class)
    if config.strict:
        extra_fields = set(data.keys()) - {f.name for f in data_class_fields}
        if extra_fields:
            raise UnexpectedDataError(keys=extra_fields)
    for field in data_class_fields:
        field = copy.copy(field)
        field.type = data_class_hints[field.name]
        try:
            try:
                field_data = data[field.name]
                transformed_value = transform_value(
                    type_hooks=config.type_hooks, target_type=field.type, value=field_data
                )
                value = _build_value(type_=field.type, data=transformed_value, config=config)
            except DaciteFieldError as error:
                error.update_path(field.name)
                raise
            if config.check_types and not is_instance(value, field.type):
                raise WrongTypeError(field_path=field.name, field_type=field.type, value=value)
        except KeyError:
            try:
                value = get_default_value_for_field(field)
            except DefaultValueNotFoundError:
                if not field.init:
                    continue
                raise MissingValueError(field.name)
        if field.init:
            init_values[field.name] = value
        else:
            post_init_values[field.name] = value

    return create_instance(data_class=data_class, init_values=init_values, post_init_values=post_init_values)


def _build_value(type_: Type, data: Any, config: Config) -> Any:
    if is_union(type_):
        return _build_value_for_union(union=type_, data=data, config=config)
    elif is_generic_collection(type_) and is_instance(data, type_):
        return _build_value_for_collection(collection=type_, data=data, config=config)
    elif is_dataclass(type_) and is_instance(data, Data):
        return from_dict(data_class=type_, data=data, config=config)
    return data


def _build_value_for_union(union: Type, data: Any, config: Config) -> Any:
    types = extract_generic(union)
    if is_optional(union) and len(types) == 2:
        return _build_value(type_=types[0], data=data, config=config)
    for inner_type in types:
        try:
            value = _build_value(type_=inner_type, data=data, config=config)
            if is_instance(value, inner_type):
                return value
        except DaciteError:
            pass
    if not config.check_types:
        return data
    raise UnionMatchError(field_type=union, value=data)


def _build_value_for_collection(collection: Type, data: Any, config: Config) -> Any:
    collection_cls = extract_origin_collection(collection)
    if is_instance(data, Mapping):
        return collection_cls(
            (key, _build_value(type_=extract_generic(collection)[1], data=value, config=config))
            for key, value in data.items()
        )
    return collection_cls(_build_value(type_=extract_generic(collection)[0], data=item, config=config) for item in data)
