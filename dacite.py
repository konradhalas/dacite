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


class ForwardRefError(DaciteError, TypeError):
    pass


@dataclass
class Config:
    remap: Dict[str, str] = dc_field(default_factory=dict)
    prefixed: Dict[str, str] = dc_field(default_factory=dict)
    cast: List[str] = dc_field(default_factory=list)
    transform: Dict[str, Callable[[Any], Any]] = dc_field(default_factory=dict)
    flattened: List[str] = dc_field(default_factory=list)
    forward_refs: Dict[str, Type] = dc_field(default_factory=dict)


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
                if _is_union(field.type, config) and not _is_optional(field.type, config):
                    value = _inner_from_dict_for_union(
                        data=value,
                        field=field,
                        outer_config=config,
                    )
                elif _has_data_class_collection(field.type, config):
                    value = _inner_from_dict_for_collection(
                        collection=_extract_data_class_collection(field.type, config),
                        data=value,
                        outer_config=config,
                        field=field,
                    )
                elif _has_data_class(field.type, config):
                    value = _inner_from_dict_for_dataclass(
                        data_class=_extract_data_class(field.type, config),
                        data=value,
                        outer_config=config,
                        field=field,
                    )
                if field.name in config.cast:
                    value = _cast_value(field.type, value, config)

            if not _is_instance(field.type, value, config):
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


def _cast_value(t: Type[T], value: Any, config: Config) -> T:
    if _is_optional(t, config):
        t = _extract_optional(t, config)
    if _is_generic_collection(t, config):
        collection_cls = _extract_generic_collection(t, config)
        if issubclass(collection_cls, Mapping):
            key_cls = t.__args__[0]
            item_cls = t.__args__[1]
            return collection_cls({key_cls(key): item_cls(item) for key, item in value.items()})
        else:
            item_cls = t.__args__[0]
            return collection_cls(item_cls(item) for item in value)
    else:
        return t(value)


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
            if not validator(input_data_field, input_data_keys) and not _has_field_default_value(field, config):
                raise InvalidConfigurationError(
                    parameter=parameter,
                    available_choices=input_data_keys,
                    value=input_data_field,
                )


def _has_field_default_value(field: Field, config: Config) -> bool:
    return field.default != MISSING or field.default_factory != MISSING or _is_optional(field.type, config)


def _get_value_for_field(field: Field, data: Data, config: Config) -> Tuple[Any, bool]:
    try:
        if field.name in config.prefixed or field.name in config.flattened:
            if field.name in config.prefixed:
                value = _extract_nested_dict_for_prefix(config.prefixed[field.name], data)
            else:
                value = _extract_flattened_fields(field, data, config.remap, config)
            if not value:
                return _get_default_value_for_field(field, config), True
        else:
            key_name = config.remap.get(field.name, field.name)
            value = data[key_name]
        return value, False
    except KeyError:
        return _get_default_value_for_field(field, config), True


def _get_default_value_for_field(field: Field, config: Config) -> Any:
    if field.default != MISSING:
        return field.default
    elif field.default_factory != MISSING:
        return field.default_factory()
    elif _is_optional(field.type, config):
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
        forward_refs=config.forward_refs
    )


def _inner_from_dict_for_dataclass(data_class: Type[T], data: Data, outer_config: Config, field: Field) -> T:
    if _is_instance(data_class, data, outer_config):
        return data
    return from_dict(
        data_class=data_class,
        data=data,
        config=_make_inner_config(field, outer_config),
    )


def _inner_from_dict_for_collection(collection: Type[T], data: List[Data], outer_config: Config, field: Field) -> T:
    collection_cls = _extract_generic_collection(collection, outer_config)
    if isinstance(data, Mapping):
        return collection_cls((key, from_dict(
            data_class=_extract_data_class(collection, outer_config),
            data=value,
            config=_make_inner_config(field, outer_config),
        )) for key, value in data.items())
    else:
        return collection_cls(_inner_from_dict_for_dataclass(
            data_class=_extract_data_class(collection, outer_config),
            data=item,
            outer_config=outer_config,
            field=field,
        ) for item in data)


def _extract_generic_collection(collection: Type, config: Config) -> Type:
    collection = _get_forward_ref_type(collection, config)
    try:
        return collection.__extra__
    except AttributeError:
        return collection.__origin__


def _inner_from_dict_for_union(data: Any, field: Field, outer_config: Config) -> Any:
    for t in field.type.__args__:
        t = _get_forward_ref_type(t, outer_config)
        try:
            if is_dataclass(t) and isinstance(data, dict):
                return _inner_from_dict_for_dataclass(
                    data_class=t,
                    data=data,
                    outer_config=outer_config,
                    field=field,
                )
            elif _is_data_class_collection(t, outer_config) and _is_instance(t, data, outer_config):
                return _inner_from_dict_for_collection(
                    collection=t,
                    data=data,
                    outer_config=outer_config,
                    field=field,
                )
            elif _is_instance(t, data, outer_config):
                return data
        except DaciteError:
            pass
    raise UnionMatchError(field)


def _extract_flattened_fields(field: Field, data: Dict[str, Any], remap: Dict[str, str], config: Config):
    result = {}
    for inner_field in fields(_extract_data_class(field.type, config)):
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


def _is_optional(t: Type, config: Config) -> bool:
    t = _get_forward_ref_type(t, config)
    return _is_union(t, config) and type(None) in t.__args__ and len(t.__args__) == 2


def _extract_optional(optional: Optional[T], config: Config) -> T:
    t = _get_forward_ref_type(optional, config)
    for t in optional.__args__:
        t = _get_forward_ref_type(t, config)
        if t is not None:
            return t


def _is_generic(t: Type, config: Config) -> bool:
    t = _get_forward_ref_type(t, config)
    return hasattr(t, '__origin__')


def _is_union(t: Type, config: Config) -> bool:
    t = _get_forward_ref_type(t, config)
    return _is_generic(t, config) and t.__origin__ == Union


def _get_forward_ref_type(t: Union[str, Type], config: Config) -> Type[Type]:
    if hasattr(t, "__forward_arg__"):
        t = t.__forward_arg__
    if not isinstance(t, str):
        return t
    try:
        t = config.forward_refs[t]
    except KeyError:
        raise ForwardRefError(f"no forward ref supplied for '{t}'")
    return t


def _is_instance(t: Union[str, Type], value: Any, config: Config) -> bool:
    t = _get_forward_ref_type(t, config)
    if t == Any:
        return True
    elif _is_union(t, config):
        types = tuple(
            t.__origin__ if _is_generic(t, config) else _get_forward_ref_type(t, config)
            for t in t.__args__
        )
        return isinstance(value, types)
    elif _is_generic(t, config):
        return isinstance(value, t.__origin__)
    else:
        return isinstance(value, t)


def _has_data_class(t: Type, config: Config) -> bool:
    t = _get_forward_ref_type(t, config)
    if _is_union(t, config):
        return _has_inner_data_class(t, config)
    else:
        return is_dataclass(t)


def _has_inner_data_class(t: Type, config: Config) -> bool:
    return hasattr(t, '__args__') and any(is_dataclass(_get_forward_ref_type(it, config)) for it in t.__args__)


def _extract_data_class(t: Type, config: Config) -> Any:
    t = _get_forward_ref_type(t, config)
    if _has_data_class_collection(t, config):
        t = _extract_data_class_collection(t, config)
    if _has_inner_data_class(t, config):
        for inner_type in t.__args__:
            inner_type = _get_forward_ref_type(inner_type, config)
            if is_dataclass(inner_type):
                return inner_type
    elif is_dataclass(t):
        return t


def _has_data_class_collection(t: Type, config: Config) -> bool:
    if _is_union(t, config):
        return _has_inner_data_class_collection(t, config)
    else:
        return _is_data_class_collection(t, config)


def _is_data_class_collection(t: Type, config: Config) -> bool:
    return _is_generic_collection(t, config) and _has_inner_data_class(t, config)


def _is_generic_collection(t: Type, config: Config) -> bool:
    t = _get_forward_ref_type(t, config)
    return _is_generic(t, config) and issubclass(t.__origin__, Collection)


def _has_inner_data_class_collection(t: Type, config: Config) -> bool:
    return hasattr(t, '__args__') and any(_is_data_class_collection(it, config) for it in t.__args__)


def _extract_data_class_collection(t: Type, config: Config) -> Any:
    t = _get_forward_ref_type(t, config)
    if _has_inner_data_class_collection(t, config):
        for inner_type in t.__args__:
            inner_type = _get_forward_ref_type(inner_type, config)
            if _is_data_class_collection(inner_type, config):
                return inner_type
    elif _is_data_class_collection(t, config):
        return t


def _get_type_name(t: Type) -> str:
    return t.__name__ if hasattr(t, '__name__') else str(t)


def _create_instance(data_class: Type[T], init_values: Data, post_init_values: Data) -> T:
    instance = data_class(**init_values)
    for key, value in post_init_values.items():
        setattr(instance, key, value)
    return instance
