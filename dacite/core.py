from dataclasses import is_dataclass
from itertools import zip_longest
from typing import (
    Hashable,
    Sequence,
    SupportsIndex,
    TypeVar,
    Type,
    Optional,
    Mapping,
    Any,
    Collection,
    MutableMapping,
    Union,
)

from dacite.cache import cache
from dacite.config import Config
from dacite.data import Data
from dacite.dataclasses import (
    get_default_value_for_field,
    DefaultValueNotFoundError,
    is_frozen,
)
from dacite.exceptions import (
    ForwardReferenceError,
    WrongTypeError,
    DaciteError,
    UnionMatchError,
    MissingValueError,
    DaciteFieldError,
    UnexpectedDataError,
    StrictUnionMatchError,
)
from dacite.types import (
    is_instance,
    is_generic_collection,
    is_union,
    extract_generic,
    is_optional,
    extract_origin_collection,
    is_init_var,
    extract_init_var,
    is_subclass,
)

from dacite.generics import get_concrete_type_hints, get_fields, orig

T = TypeVar("T")


def from_dict(data_class: Type[T], data: Data, config: Optional[Config] = None) -> T:
    """Create a data class instance from a dictionary.

    :param data_class: a data class type
    :param data: a dictionary of a input data
    :param config: a configuration of the creation process
    :return: an instance of a data class
    """
    init_values: MutableMapping[str, Any] = {}
    post_init_values: MutableMapping[str, Any] = {}
    config = config or Config()

    try:
        data_class_hints = cache(get_concrete_type_hints)(data_class, localns=config.hashable_forward_references)
    except NameError as error:
        raise ForwardReferenceError(str(error)) from None
    data_class_fields = cache(get_fields)(data_class)

    if config.strict:
        extra_fields = set(data.keys()) - {f.name for f in data_class_fields}
        if extra_fields:
            raise UnexpectedDataError(data_class=data_class, keys=extra_fields)

    for field in data_class_fields:
        field_type = data_class_hints[field.name]
        key = config.convert_key(field.name)

        if key in data:
            try:
                value = _build_value(type_=field_type, data=data[key], config=config)
            except DaciteFieldError as error:
                error.update_path(field.name)
                raise
            if config.check_types and not is_instance(value, field_type):
                raise WrongTypeError(field_path=field.name, field_type=field_type, value=value)
        else:
            try:
                value = get_default_value_for_field(field, field_type)
            except DefaultValueNotFoundError:
                if not field.init:
                    continue
                raise MissingValueError(field.name) from None
        if field.init:
            init_values[field.name] = value
        elif not is_frozen(data_class):
            post_init_values[field.name] = value

    instance = data_class(**init_values)

    for key, value in post_init_values.items():
        setattr(instance, key, value)

    return instance


def _build_value(type_: Type, data: Any, config: Config) -> Any:
    if is_init_var(type_):
        type_ = extract_init_var(type_)
    if type_ in config.type_hooks:
        data = config.type_hooks[type_](data)
    if is_optional(type_) and data is None:
        return data
    if is_union(type_):
        data = _build_value_for_union(union=type_, data=data, config=config)
    elif is_generic_collection(type_):
        data = _build_value_for_collection(collection=type_, data=data, config=config)
    elif cache(is_dataclass)(orig(type_)) and isinstance(data, Mapping):
        data = from_dict(data_class=type_, data=data, config=config)
    for cast_type in config.cast:
        if is_subclass(type_, cast_type):
            if is_generic_collection(type_):
                data = extract_origin_collection(type_)(data)
            else:
                data = type_(data)
            break
    return data


def _build_value_for_union(union: Type, data: Any, config: Config) -> Any:
    types = extract_generic(union)
    if is_optional(union) and len(types) == 2:
        return _build_value(type_=types[0], data=data, config=config)
    union_matches = {}
    for inner_type in types:
        try:
            # noinspection PyBroadException
            try:
                value = _build_value(type_=inner_type, data=data, config=config)
            except Exception:  # pylint: disable=broad-except
                continue
            if is_instance(value, inner_type):
                if config.strict_unions_match:
                    union_matches[inner_type] = value
                else:
                    return value
        except DaciteError:
            pass
    if config.strict_unions_match and union_matches:
        if len(union_matches) > 1:
            raise StrictUnionMatchError(union_matches)
        return union_matches.popitem()[1]
    if not config.check_types:
        return data
    raise UnionMatchError(field_type=union, value=data)


def _build_member_value(type_: Type, key: Union[SupportsIndex, Hashable], value: Any, config: Config) -> Any:
    try:
        built_value = _build_value(type_=type, data=value, config=config)
    except DaciteFieldError as e:
        e._member_name = str(key)
        raise
    if config.check_types and not is_instance(built_value, type_):
        raise WrongTypeError(_member_name=str(key), field_type=type_, value=value)

    return built_value


def _build_value_for_mapping(mapping: Type, data: Any, config: Config) -> Any:
    data_type = data.__class__

    item_type = extract_generic(mapping, defaults=(Any, Any))[1]
    return data_type(
        (key, _build_member_value(type_=item_type, key=key, value=value, config=config)) for key, value in data.items()
    )


def _build_value_for_sequence(sequence: Type, data: Any, config: Config) -> Any:
    data_type = data.__class__

    item_type = extract_generic(sequence, defaults=(Any,))[0]
    return data_type(
        _build_member_value(type_=item_type, key=index, value=value, config=config) for index, value in enumerate(data)
    )


def _build_value_for_tuple(tuple: Type, data: Any, config: Config) -> Any:
    data_type = data.__class__
    if not data:
        return data_type()
    types = extract_generic(tuple, default=(Any, ...))
    if len(types) == 2 and types[1] == Ellipsis:
        return _build_value_for_sequence(tuple, data, config)
    else:
        return data_type(
            _build_member_value(type_=type_, key=index, value=item, config=config)
            for index, (item, type_) in enumerate(zip_longest(data, types))
        )


def _build_value_for_collection(collection: Type, data: Any, config: Config) -> Any:
    if isinstance(data, Mapping) and is_subclass(collection, Mapping):
        return _build_value_for_mapping(collection, data, config)
    elif is_subclass(collection, tuple):
        return _build_value_for_tuple(collection, data, config)
    elif isinstance(data, Collection) and is_subclass(collection, Collection):
        if isinstance(data, Sequence) and is_subclass(collection, Sequence):
            return _build_value_for_sequence(collection, data, config)
        else:
            data_type = data.__class__
            item_type = extract_generic(collection, defaults=(Any,))[0]
            try:
                return data_type(_build_value(type_=item_type, data=item, config=config) for item in data)  # type: ignore
            except Exception as e:
                raise DaciteFieldError() from e
    return data
