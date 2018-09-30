from typing import Dict, Any, TypeVar, Type, Union, Callable, List, Collection, Optional, Set, Tuple

from dataclasses import fields as dc_fields, MISSING, is_dataclass, Field, dataclass, field as dc_field, make_dataclass


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


def from_dict(data_class: Type[T], data: Data, config: Optional[Config] = None, add_extra_fields: bool = False) -> T:
    """Create a data class instance from a dictionary.

    :param data_class: a data class type
    :param data: a dictionary of a input data
    :param config: a configuration of the creation process
    :param add_extra_fields: a flag for adding extra fields to resulting data class instance (recursively produces \
    data classes, inherited from original data classes)
    :return: an instance of a data class
    """
    # noinspection PyTypeHints
    if isinstance(data, data_class):
        return data
    config = config or Config()
    values: Data = {}
    _validate_config(data_class, data, config)
    if add_extra_fields:
        data_class = _with_extra_fields(data_class=data_class, data=data, config=config)
    for field in dc_fields(data_class):
        value = _get_value_for_field(field, data, config)
        if field.name in config.transform:
            value = config.transform[field.name](value)
        if value is not None:
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
            value = field.type(value)
        elif not _is_instance(field.type, value):
            raise WrongTypeError(field, value)
        values[field.name] = value
    return data_class(**values)


def _with_extra_fields(data_class: Type[T], data: Data, config: Optional[Config]) -> Type[T]:
    # noinspection PyPep8Naming
    NewField = Tuple[str, type, Field]
    # noinspection PyPep8Naming
    NewFieldList = List[NewField]

    def wrap_field_in_optional_and_provide_default_none_value(field_name: str = None, field_type: type = None,
                                                              field: Field = None) -> NewField:
        new_field = dc_field()
        if field is not None:
            if field_name is None:
                field_name = field.name
            if field_type is None:
                field_type = field.type
        new_field.name = field_name
        new_field.type = field_type if _is_optional(field_type) else Optional[field_type]
        if field is None or (field.default is MISSING and field.default_factory is MISSING):
            new_field.default = None
        return new_field.name, new_field.type, new_field

    def extract_type_from_possible_optional_type(possible_optional_type: type):
        # noinspection PyUnresolvedReferences
        return (possible_optional_type.__args__[0]
                if _is_optional(possible_optional_type) else
                possible_optional_type)

    def data_class_fields(class_or_instance: Any):
        x = extract_type_from_possible_optional_type(possible_optional_type=class_or_instance)
        return dc_fields(class_or_instance=x)

    # We need to wrap all field types in Optional, because new (optional with default value) fields could be inserted
    # in the middle of the data class
    def get_fields_wrapped_in_optional_with_default_none_value() -> NewFieldList:
        return [wrap_field_in_optional_and_provide_default_none_value(field=field)
                for field in data_class_fields(class_or_instance=data_class)]

    def data_key_name_for_field(field: Field) -> str:
        if field.name in config.prefixed:
            prefix = config.prefixed[field.name]
            prefix_len = len(prefix)
            for key in data.keys():
                if key.startswith(prefix):
                    return key[prefix_len:]
        else:
            return config.remap.get(field.name, field.name)

    def get_data_key_names_for_fields() -> List[str]:
        return [data_key_name_for_field(field=field) for field in data_class_fields(class_or_instance=data_class)]

    def get_new_data_classes_fields() -> NewFieldList:
        def get_new_data_class_field(field: Field) -> NewField:
            # noinspection PyShadowingNames
            result = wrap_field_in_optional_and_provide_default_none_value(
                field_type=Optional[_with_extra_fields(data_class=field.type,
                                                       data=data[data_key_name_for_field(field=field)],
                                                       config=config)],
                field=field)
            return result if result[2] != field else None

        def is_data_class_or_optional_data_class(field_type: type):
            return is_dataclass(obj=extract_type_from_possible_optional_type(possible_optional_type=field_type))

        result = (get_new_data_class_field(field=field) for field in data_class_fields(class_or_instance=data_class)
                  if is_data_class_or_optional_data_class(field_type=field.type))
        return [field for field in result if field is not None]

    def get_extra_fields() -> NewFieldList:
        # noinspection PyShadowingNames
        def drop_field_by_name(list_of_fields: NewFieldList, name: str) -> None:
            def find_field_by_name() -> int:
                for i, (field_name, _, _) in enumerate(list_of_fields):
                    if field_name == name:
                        return i

            drop_index = find_field_by_name()
            if drop_index is not None:
                list_of_fields.pop(drop_index)

        fields_for_data_keys = [
            wrap_field_in_optional_and_provide_default_none_value(field_name=field_name, field_type=field_type)
            for field_name, field_type in
            zip(data.keys(), (Optional[type(value)] for value in data.values()))]
        data_key_names_for_fields = get_data_key_names_for_fields()
        for name in data_key_names_for_fields:
            drop_field_by_name(list_of_fields=fields_for_data_keys, name=name)
        return fields_for_data_keys

    def merge_field_lists(*args) -> NewFieldList:
        result = []
        for field_list in args:
            for new_field in field_list:
                replaced = False
                for i, existing_field in enumerate(result):
                    if new_field[0] == existing_field[0]:
                        result[i] = new_field
                        replaced = True
                if not replaced:
                    result.append(new_field)
        return result

    def new_data_class_name():
        return extract_type_from_possible_optional_type(possible_optional_type=data_class).__name__ + 'WithExtraFields'

    new_data_class_fields = get_new_data_classes_fields()
    new_extra_fields = get_extra_fields()
    if new_data_class_fields or new_extra_fields:
        fields_wrapped_in_optional_with_default_none_value = get_fields_wrapped_in_optional_with_default_none_value()
        fields = merge_field_lists(fields_wrapped_in_optional_with_default_none_value, new_data_class_fields,
                                   new_extra_fields)
        bases = (extract_type_from_possible_optional_type(possible_optional_type=data_class), )
        return make_dataclass(cls_name=new_data_class_name(), fields=fields, bases=bases)
    else:
        return data_class


def _validate_config(data_class: Type[T], data: Data, config: Config):
    _validate_config_field_name(data_class, config, 'remap')
    _validate_config_data_key(data, config, 'remap')
    _validate_config_field_name(data_class, config, 'prefixed')
    _validate_config_data_key(data, config, 'prefixed', lambda v, c: any(n.startswith(v) for n in c))
    _validate_config_field_name(data_class, config, 'cast')
    _validate_config_field_name(data_class, config, 'transform')
    _validate_config_field_name(data_class, config, 'flattened')


def _validate_config_field_name(data_class: Type[T], config: Config, parameter: str) -> None:
    data_class_fields = {field.name for field in dc_fields(data_class)}
    for data_class_field in getattr(config, parameter):
        if '.' not in data_class_field:
            if data_class_field not in data_class_fields:
                raise InvalidConfigurationError(
                    parameter=parameter,
                    available_choices=data_class_fields,
                    value=data_class_field,
                )


def _validate_config_data_key(data: Data, config: Config, parameter: str, validator=lambda v, c: v in c) -> None:
    input_data_keys = set(data.keys())
    for data_class_field, input_data_field in getattr(config, parameter).items():
        if '.' not in data_class_field:
            if not validator(input_data_field, input_data_keys):
                raise InvalidConfigurationError(
                    parameter=parameter,
                    available_choices=input_data_keys,
                    value=input_data_field,
                )


def _get_value_for_field(field: Field, data: Data, config: Config) -> Any:
    try:
        if field.name in config.prefixed:
            return _extract_nested_dict_for_prefix(config.prefixed[field.name], data)
        elif field.name in config.flattened:
            return _extract_flattened_fields(field, data, config.remap)
        else:
            key_name = config.remap.get(field.name, field.name)
            return data[key_name]
    except KeyError:
        if _is_optional(field.type):
            return None
        elif field.default != MISSING:
            return field.default
        elif field.default_factory != MISSING:
            return field.default_factory()
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
    return collection_cls(from_dict(
        data_class=_extract_data_class(collection),
        data=item,
        config=_make_inner_config(field, outer_config),
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
            elif _is_data_class_collection(t) and isinstance(data, list):
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
    for inner_field in dc_fields(_extract_data_class(field.type)):
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


def _is_generic(t: Type) -> bool:
    return hasattr(t, '__origin__')


def _is_union(t: Type) -> bool:
    return _is_generic(t) and t.__origin__ == Union


def _is_instance(t: Type, value: Any) -> bool:
    if _is_union(t):
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
