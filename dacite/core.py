import copy
from dataclasses import fields, is_dataclass
from typing import TypeVar, Type, List, Optional, get_type_hints, Mapping

from dacite.config import Config
from dacite.data import Data
from dacite.dataclasses import get_default_value_for_field, create_instance
from dacite.exceptions import ForwardReferenceError, WrongTypeError, DaciteError, MissingValueError
from dacite.types import extract_origin_collection, is_instance, \
    is_generic_collection, is_union

T = TypeVar('T')


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
    config.validate(data_class, data)
    try:
        data_class_hints = get_type_hints(data_class, globalns=config.forward_references)
    except NameError as error:
        raise ForwardReferenceError(str(error))
    for field in fields(data_class):
        field = copy.copy(field)
        field.type = data_class_hints[field.name]
        try:
            value = config.get_value(field, data)
            if value is not None:
                value = _magic_inner_func(config.make_inner(field), field.type, value)
            if not is_instance(value, field.type):
                raise WrongTypeError(field, value)
        except MissingValueError:
            value = get_default_value_for_field(field)
        if field.init:
            init_values[field.name] = value
        else:
            post_init_values[field.name] = value

    return create_instance(
        data_class=data_class,
        init_values=init_values,
        post_init_values=post_init_values,
    )


def _magic_inner_func(config, type, value):
    if is_union(type):
        for inner_type in type.__args__:
            try:
                value = _magic_inner_func(
                    config=config,
                    type=inner_type,
                    value=value
                )
                if is_instance(value, inner_type):
                    break
            except DaciteError:
                pass
        else:
            raise WrongTypeError(None, value)
    elif is_generic_collection(type) and isinstance(value, extract_origin_collection(type)):
        value = inner_from_dict_for_collection(
            collection=type,
            data=value,
            outer_config=config,
        )
    elif is_dataclass(type) and isinstance(value, dict):
        value = inner_from_dict_for_dataclass(
            data_class=type,
            data=value,
            config=config,
        )
    return value


def inner_from_dict_for_dataclass(data_class: Type[T], data: Data, config: Config) -> T:
    if is_instance(data, data_class):
        return data
    return from_dict(
        data_class=data_class,
        data=data,
        config=config,
    )


def inner_from_dict_for_collection(collection: Type[T], data: List[Data], outer_config: Config) -> T:
    collection_cls = extract_origin_collection(collection)
    if isinstance(data, Mapping):
        return collection_cls((key, _magic_inner_func(
            type=collection.__args__[1],
            value=value,
            config=Config(),  # TODO: is it OK?
        )) for key, value in data.items())
    else:
        return collection_cls(_magic_inner_func(
            type=collection.__args__[0],
            value=item,
            config=Config(),  # TODO: is it OK?
        ) for item in data)
