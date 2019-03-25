from dataclasses import is_dataclass
from typing import TypeVar, Type, Optional, Mapping, Any

from dacite.config import Config, ValueNotFoundError
from dacite.data import Data
from dacite.dataclasses import (
    create_instance,
    get_default_value_for_field,
    DefaultValueNotFoundError,
    fields_and_init_vars,
)
from dacite.exceptions import (
    ForwardReferenceError,
    WrongTypeError,
    DaciteError,
    UnionMatchError,
    MissingValueError,
    DaciteFieldError,
)
from dacite.types import (
    extract_origin_collection,
    is_instance,
    is_generic_collection,
    is_union,
    extract_generic,
    is_optional,
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
        config.validate(data_class, data)
    except NameError as error:
        raise ForwardReferenceError(str(error))
    for field in fields_and_init_vars(data_class, config.forward_references):
        try:
            try:
                value = _build_value(
                    type_=field.type, data=config.get_value(field, data), config=config.make_inner(field)
                )
            except DaciteFieldError as error:
                error.update_path(field.name)
                raise
            if config.check_types and not is_instance(value, field.type):
                raise WrongTypeError(field_path=field.name, field_type=field.type, value=value)
        except ValueNotFoundError:
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
