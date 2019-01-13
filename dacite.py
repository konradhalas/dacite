from dataclasses import fields, MISSING, is_dataclass, Field, dataclass, field as dc_field
from typing import Dict, Any, TypeVar, Type, Union, Callable, List, Collection, Optional, Set, Mapping, Tuple


class DaciteError(Exception):
    pass


class WrongTypeError(DaciteError):
    def __init__(self, field: Field, value: Any) -> None:
        super().__init__(f'wrong type for field "{field.name}" - should be "{_get_type_name(field.type)}" '
                         f'instead of "{_get_type_name(type(value))}"')
        self.field = field
        self.value = value


class MissingValueError(DaciteError):
    def __init__(self, field: Field) -> None:
        super().__init__(f'missing value for field {field.name}')
        self.field = field


class UnionMatchError(DaciteError):
    def __init__(self, field: Field) -> None:
        super().__init__(f'can not match the data to any type of "{field.name}" union: {_get_type_name(field.type)}')
        self.field = field


class InvalidConfigurationError(DaciteError):
    def __init__(self, parameter: str, available_choices: Set[str], value: str) -> None:
        super().__init__(f'invalid value in "{parameter}" configuration: "{value}". '
                         f'Choices are: {", ".join(available_choices)}.')
        self.parameter = parameter
        self.available_choices = available_choices
        self.value = value


@dataclass
class Config:
    remap: Dict[str, str] = dc_field(default_factory=dict)
    prefixed: Dict[str, str] = dc_field(default_factory=dict)
    cast: List[str] = dc_field(default_factory=list)
    transform: Dict[str, Callable[[Any], Any]] = dc_field(default_factory=dict)
    flattened: List[str] = dc_field(default_factory=list)


T = TypeVar('T')
Data = Dict[str, Any]


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
    _validate_config(data_class, data, config)
    for field in fields(data_class):
        value, is_default = _get_value_for_field(field, data, config)
        if not is_default:
            if value is not None:
                if field.name in config.transform:
                    value = config.transform[field.name](value)
                if _is_union(field.type) and not _is_optional(field.type):
                    value = _inner_from_dict_for_union(
                        data=value,
                        field=field,
                        outer_config=config,
                    )
                elif _has_data_class_collection(field.type):
                    value = _inner_from_dict_for_collection(
                        collection=_extract_data_class_collection(field.type),
                        data=value,
                        outer_config=config,
                        field=field,
                    )
                elif _has_data_class(field.type):
                    value = _inner_from_dict_for_dataclass(
                        data_class=_extract_data_class(field.type),
                        data=value,
                        outer_config=config,
                        field=field,
                    )
                if field.name in config.cast:
                    if _is_optional(field.type):
                        cls = _extract_optional(field.type)
                    else:
                        cls = field.type
                    value = cls(value)
            if not _is_instance(field.type, value):
                raise WrongTypeError(field, value)
        if field.init:
            init_values[field.name] = value
        else:
            post_init_values[field.name] = value

    return _create_instance(
        data_class=data_class,
        init_values=init_values,
        post_init_values=post_init_values,
    )


def _validate_config(data_class: Type[T], data: Data, config: Config):
    _validate_config_field_name(data_class, config, 'remap')
    _validate_config_data_key(data_class, data, config, 'remap')
    _validate_config_field_name(data_class, config, 'prefixed')
    _validate_config_data_key(data_class, data, config, 'prefixed', lambda v, c: any(n.startswith(v) for n in c))
    _validate_config_field_name(data_class, config, 'cast')
    _validate_config_field_name(data_class, config, 'transform')
    _validate_config_field_name(data_class, config, 'flattened')


def _validate_config_field_name(data_class: Type[T], config: Config, parameter: str) -> None:
    data_class_fields = {field.name for field in fields(data_class)}
    for data_class_field in getattr(config, parameter):
        if '.' not in data_class_field:
            if data_class_field not in data_class_fields:
                raise InvalidConfigurationError(
                    parameter=parameter,
                    available_choices=data_class_fields,
                    value=data_class_field,
                )


def _validate_config_data_key(data_class: Type[T], data: Data, config: Config, parameter: str,
                              validator=lambda v, c: v in c) -> None:
    input_data_keys = set(data.keys())
    data_class_fields = {field.name: field for field in fields(data_class)}
    for field_name, input_data_field in getattr(config, parameter).items():
        if '.' not in field_name:
            field = data_class_fields[field_name]
            if not validator(input_data_field, input_data_keys) and not _has_field_default_value(field):
                raise InvalidConfigurationError(
                    parameter=parameter,
                    available_choices=input_data_keys,
                    value=input_data_field,
                )


def _has_field_default_value(field: Field) -> bool:
    return field.default != MISSING or field.default_factory != MISSING or _is_optional(field.type)


def _get_value_for_field(field: Field, data: Data, config: Config) -> Tuple[Any, bool]:
    try:
        if field.name in config.prefixed or field.name in config.flattened:
            if field.name in config.prefixed:
                value = _extract_nested_dict_for_prefix(config.prefixed[field.name], data)
            else:
                value = _extract_flattened_fields(field, data, config.remap)
            if not value:
                return _get_default_value_for_field(field), True
        else:
            key_name = config.remap.get(field.name, field.name)
            value = data[key_name]
        return value, False
    except KeyError:
        return _get_default_value_for_field(field), True


def _get_default_value_for_field(field: Field) -> Any:
    if field.default != MISSING:
        return field.default
    elif field.default_factory != MISSING:
        return field.default_factory()
    elif _is_optional(field.type):
        return None
    else:
        raise MissingValueError(field)


def _make_inner_config(field: Field, config: Config) -> Config:
    return Config(
        remap=_extract_nested_dict(field, config.remap),
        prefixed=_extract_nested_dict(field, config.prefixed),
        cast=_extract_nested_list(field, config.cast),
        transform=_extract_nested_dict(field, config.transform),
        flattened=_extract_nested_list(field, config.flattened),
    )


def _inner_from_dict_for_dataclass(data_class: Type[T], data: Data, outer_config: Config, field: Field) -> T:
    if _is_instance(data_class, data):
        return data
    return from_dict(
        data_class=data_class,
        data=data,
        config=_make_inner_config(field, outer_config),
    )


def _inner_from_dict_for_collection(collection: Type[T], data: List[Data], outer_config: Config, field: Field) -> T:
    try:
        collection_cls = collection.__extra__
    except AttributeError:
        collection_cls = collection.__origin__
    if isinstance(data, Mapping):
        return collection_cls((key, from_dict(
            data_class=_extract_data_class(collection),
            data=value,
            config=_make_inner_config(field, outer_config),
        )) for key, value in data.items())
    else:
        return collection_cls(_inner_from_dict_for_dataclass(
            data_class=_extract_data_class(collection),
            data=item,
            outer_config=outer_config,
            field=field,
        ) for item in data)


def _inner_from_dict_for_union(data: Any, field: Field, outer_config: Config) -> Any:
    for t in field.type.__args__:
        try:
            if is_dataclass(t) and isinstance(data, dict):
                return _inner_from_dict_for_dataclass(
                    data_class=t,
                    data=data,
                    outer_config=outer_config,
                    field=field,
                )
            elif _is_data_class_collection(t) and _is_instance(t, data):
                return _inner_from_dict_for_collection(
                    collection=t,
                    data=data,
                    outer_config=outer_config,
                    field=field,
                )
            elif _is_instance(t, data):
                return data
        except DaciteError:
            pass
    raise UnionMatchError(field)


def _extract_flattened_fields(field: Field, data: Dict[str, Any], remap: Dict[str, str]):
    result = {}
    for inner_field in fields(_extract_data_class(field.type)):
        field_name = remap.get(field.name + '.' + inner_field.name, inner_field.name)
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


def _is_optional(t: Type) -> bool:
    return _is_union(t) and type(None) in t.__args__ and len(t.__args__) == 2


def _extract_optional(optional: Optional[T]) -> T:
    for t in optional.__args__:
        if t is not None:
            return t


def _is_generic(t: Type) -> bool:
    return hasattr(t, '__origin__')


def _is_union(t: Type) -> bool:
    return _is_generic(t) and t.__origin__ == Union


def _is_instance(t: Type, value: Any) -> bool:
    if t == Any:
        return True
    elif _is_union(t):
        types = tuple(t.__origin__ if _is_generic(t) else t for t in t.__args__)
        return isinstance(value, types)
    elif _is_generic(t):
        return isinstance(value, t.__origin__)
    else:
        return isinstance(value, t)


def _has_data_class(t: Type) -> bool:
    if _is_union(t):
        return _has_inner_data_class(t)
    else:
        return is_dataclass(t)


def _has_inner_data_class(t: Type) -> bool:
    return hasattr(t, '__args__') and any(is_dataclass(it) for it in t.__args__)


def _extract_data_class(t: Type) -> Any:
    if _has_data_class_collection(t):
        t = _extract_data_class_collection(t)
    if _has_inner_data_class(t):
        for inner_type in t.__args__:
            if is_dataclass(inner_type):
                return inner_type
    elif is_dataclass(t):
        return t


def _has_data_class_collection(t: Type) -> bool:
    if _is_union(t):
        return _has_inner_data_class_collection(t)
    else:
        return _is_data_class_collection(t)


def _is_data_class_collection(t: Type) -> bool:
    return not _is_union(t) and _is_generic(t) and issubclass(t.__origin__, Collection) and _has_inner_data_class(t)


def _has_inner_data_class_collection(t: Type) -> bool:
    return hasattr(t, '__args__') and any(_is_data_class_collection(it) for it in t.__args__)


def _extract_data_class_collection(t: Type) -> Any:
    if _has_inner_data_class_collection(t):
        for inner_type in t.__args__:
            if _is_data_class_collection(inner_type):
                return inner_type
    elif _is_data_class_collection(t):
        return t


def _get_type_name(t: Type) -> str:
    return t.__name__ if hasattr(t, '__name__') else str(t)


def _create_instance(data_class: Type[T], init_values: Data, post_init_values: Data) -> T:
    instance = data_class(**init_values)
    for key, value in post_init_values.items():
        setattr(instance, key, value)
    return instance
