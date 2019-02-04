import copy
from dataclasses import fields, is_dataclass, Field
from typing import Dict, Any, TypeVar, Type, List, Optional, Mapping, Tuple, get_type_hints

from dacite.config import Config, make_inner_config, extract_nested_dict_for_prefix, validate_config
from dacite.data import Data
from dacite.dataclasses import get_default_value_for_field, create_instance
from dacite.exceptions import ForwardReferenceError, WrongTypeError, DaciteError, UnionMatchError
from dacite.types import cast_value, extract_generic_collection, is_optional, is_union, is_instance, \
    has_data_class, extract_data_class, has_data_class_collection, is_data_class_collection, \
    extract_data_class_collection

T = TypeVar('T')


def from_dict(data_class: Type[T], data: Data, config: Optional[Config] = None) -> T:
    """Create a data class instance from a dictionary.

    :param data_class: a data class type
    :param data: a dictionary of a input data
    :param config: a configuration of the creation process
    :return: an instance of a data class
    """
    config = config or Config()
    init_values: Data = {}
    post_init_values: Data = {}
    validate_config(data_class, data, config)
    try:
        data_class_hints = get_type_hints(data_class, globalns=config.forward_references)
    except NameError as error:
        raise ForwardReferenceError(str(error))
    for field in fields(data_class):
        field = copy.copy(field)
        field.type = data_class_hints[field.name]
        value, is_default = get_value_for_field(field, data, config)
        if not is_default:
            if value is not None:
                if field.name in config.transform:
                    value = config.transform[field.name](value)
                if is_union(field.type) and not is_optional(field.type):
                    value = inner_from_dict_for_union(
                        data=value,
                        field=field,
                        outer_config=config,
                    )
                elif has_data_class_collection(field.type):
                    value = inner_from_dict_for_collection(
                        collection=extract_data_class_collection(field.type),
                        data=value,
                        outer_config=config,
                        field=field,
                    )
                elif has_data_class(field.type):
                    value = inner_from_dict_for_dataclass(
                        data_class=extract_data_class(field.type),
                        data=value,
                        outer_config=config,
                        field=field,
                    )
                if field.name in config.cast:
                    value = cast_value(field.type, value)
            if not is_instance(field.type, value):
                raise WrongTypeError(field, value)
        if field.init:
            init_values[field.name] = value
        else:
            post_init_values[field.name] = value

    return create_instance(
        data_class=data_class,
        init_values=init_values,
        post_init_values=post_init_values,
    )


def get_value_for_field(field: Field, data: Data, config: Config) -> Tuple[Any, bool]:
    try:
        if field.name in config.prefixed or field.name in config.flattened:
            if field.name in config.prefixed:
                value = extract_nested_dict_for_prefix(config.prefixed[field.name], data)
            else:
                value = extract_flattened_fields(field, data, config.remap)
            if not value:
                return get_default_value_for_field(field), True
        else:
            key_name = config.remap.get(field.name, field.name)
            value = data[key_name]
        return value, False
    except KeyError:
        return get_default_value_for_field(field), True


def inner_from_dict_for_dataclass(data_class: Type[T], data: Data, outer_config: Config, field: Field) -> T:
    if is_instance(data_class, data):
        return data
    return from_dict(
        data_class=data_class,
        data=data,
        config=make_inner_config(field, outer_config),
    )


def inner_from_dict_for_collection(collection: Type[T], data: List[Data], outer_config: Config, field: Field) -> T:
    collection_cls = extract_generic_collection(collection)
    if isinstance(data, Mapping):
        return collection_cls((key, from_dict(
            data_class=extract_data_class(collection),
            data=value,
            config=make_inner_config(field, outer_config),
        )) for key, value in data.items())
    else:
        return collection_cls(inner_from_dict_for_dataclass(
            data_class=extract_data_class(collection),
            data=item,
            outer_config=outer_config,
            field=field,
        ) for item in data)


def inner_from_dict_for_union(data: Any, field: Field, outer_config: Config) -> Any:
    for t in field.type.__args__:
        try:
            if is_dataclass(t) and isinstance(data, dict):
                return inner_from_dict_for_dataclass(
                    data_class=t,
                    data=data,
                    outer_config=outer_config,
                    field=field,
                )
            elif is_data_class_collection(t) and is_instance(t, data):
                return inner_from_dict_for_collection(
                    collection=t,
                    data=data,
                    outer_config=outer_config,
                    field=field,
                )
            elif is_instance(t, data):
                return data
        except DaciteError:
            pass
    raise UnionMatchError(field)


def extract_flattened_fields(field: Field, data: Data, remap: Dict[str, str]):
    result = {}
    for inner_field in fields(extract_data_class(field.type)):
        field_name = remap.get(field.name + '.' + inner_field.name, inner_field.name)
        if field_name in data:
            result[field_name] = data[field_name]
    return result
