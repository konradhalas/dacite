import copy
from dataclasses import fields, is_dataclass
from typing import TypeVar, Type, Optional, get_type_hints, Mapping, Any, Generic, Tuple

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
    is_generic,
    extract_metaclass,
)

T = TypeVar("T")

def _substitute_types(type_: Generic[T], type_mapping: Mapping[Type, Type]) -> Tuple[Type, Type]:
    mapped = tuple(
        (type_mapping[t] if t in type_mapping else t for t in type_.__args__))
    metatype = extract_metaclass(type_)
    return metatype[mapped], metatype


def _from_dict(data_class: Type[T], data: Data, config: Config,
               type_mapping: Mapping[Type, Type]) -> T:

    init_values: Data = {}
    post_init_values: Data = {}

    if is_generic(data_class):
        data_metaclass = extract_origin_collection(data_class)
        local_mapping = {
            generic: type_mapping[param] if param in type_mapping else param
            for generic, param in zip(data_metaclass.__parameters__, extract_generic(data_class))
        }
    else:
        data_metaclass = data_class
        local_mapping = {}

    try:
        data_class_hints = get_type_hints(data_metaclass, globalns=config.forward_references)
    except NameError as error:
        raise ForwardReferenceError(str(error))
    data_class_fields = fields(data_metaclass)
    if config.strict:
        extra_fields = set(data.keys()) - {f.name for f in data_class_fields}
        if extra_fields:
            raise UnexpectedDataError(keys=extra_fields)
    for field in data_class_fields:
        field = copy.copy(field)
        field.type = data_class_hints[field.name]
        if field.type in local_mapping:
            field.type = local_mapping[field.type]

        if is_generic(field.type) and not is_union(field.type):
            field.type, field_metatype = _substitute_types(field.type, type_mapping)
        else:
            field_metatype = field.type

        try:
            try:
                field_data = data[field.name]
                transformed_value = transform_value(type_hooks=config.type_hooks,
                                                    target_type=field.type,
                                                    value=field_data)
                value = _build_value(type_=field.type,
                                     data=transformed_value,
                                     config=config,
                                     type_mapping=type_mapping)
            except DaciteFieldError as error:
                error.update_path(field.name)
                raise
            if config.check_types and not is_instance(value, field_metatype):
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

    return create_instance(data_class=data_class,
                           init_values=init_values,
                           post_init_values=post_init_values)


def _build_value(type_: Type, data: Any, config: Config, type_mapping: Mapping[Type, Type]) -> Any:
    if is_union(type_):
        return _build_value_for_union(union=type_,
                                      data=data,
                                      config=config,
                                      type_mapping=type_mapping)
    elif is_generic_collection(type_) and is_instance(data, type_):
        return _build_value_for_collection(collection=type_,
                                           data=data,
                                           config=config,
                                           type_mapping=type_mapping)
    elif (is_dataclass(type_) or
          (is_generic(type_) and is_dataclass(extract_origin_collection(type_)))) and is_instance(
              data, Data):
        return _from_dict(data_class=type_, data=data, config=config, type_mapping=type_mapping)

    return data


def _build_value_for_union(union: Type, data: Any, config: Config,
                           type_mapping: Mapping[Type, Type]) -> Any:
    types = extract_generic(union)
    if is_optional(union) and len(types) == 2:
        return _build_value(type_=types[0], data=data, config=config, type_mapping=type_mapping)
    for inner_type in types:
        try:
            if is_generic(inner_type):
                inner_type, metatype = _substitute_types(inner_type, type_mapping)
            else:
                metatype = inner_type

            value = _build_value(type_=inner_type,
                                 data=data,
                                 config=config,
                                 type_mapping=type_mapping)
            if is_instance(value, metatype):
                return value
        except DaciteError:
            pass
    if not config.check_types:
        return data
    raise UnionMatchError(field_type=union, value=data)


def _build_value_for_collection(collection: Type, data: Any, config: Config,
                                type_mapping: Mapping[Type, Type]) -> Any:
    collection_cls = extract_origin_collection(collection)
    if is_instance(data, Mapping):
        return collection_cls((key,
                               _build_value(type_=extract_generic(collection)[1],
                                            data=value,
                                            config=config,
                                            type_mapping=type_mapping))
                              for key, value in data.items())
    return collection_cls(
        _build_value(type_=extract_generic(collection)[0],
                     data=item,
                     config=config,
                     type_mapping=type_mapping) for item in data)


def from_dict(data_class: Type[T], data: Data, config: Optional[Config] = None) -> T:
    """Create a data class instance from a dictionary.

    :param data_class: a data class type
    :param data: a dictionary of a input data
    :param config: a configuration of the creation process
    :return: an instance of a data class
    """
    config = config or Config()

    if is_generic(data_class):
        origin = extract_origin_collection(data_class)
        type_mapping = {
            generic: param
            for generic, param in zip(origin.__parameters__, extract_generic(data_class))
        }
    else:
        type_mapping = {}

    return _from_dict(data_class=data_class, data=data, config=config, type_mapping=type_mapping)
