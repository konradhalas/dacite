from dataclasses import dataclass, field as dc_field, fields, Field
from typing import Dict, Any, Callable, List, Optional, Type

from dacite.data import Data
from dacite.dataclasses import has_field_default_value
from dacite.exceptions import InvalidConfigurationError


@dataclass
class Config:
    remap: Dict[str, str] = dc_field(default_factory=dict)
    prefixed: Dict[str, str] = dc_field(default_factory=dict)
    cast: List[str] = dc_field(default_factory=list)
    transform: Dict[str, Callable[[Any], Any]] = dc_field(default_factory=dict)
    flattened: List[str] = dc_field(default_factory=list)
    forward_references: Optional[Dict[str, Any]] = None


def validate_config(data_class: Type, data: Data, config: Config):
    validate_config_field_name(data_class, config, 'remap')
    validate_config_data_key(data_class, data, config, 'remap')
    validate_config_field_name(data_class, config, 'prefixed')
    validate_config_data_key(data_class, data, config, 'prefixed', lambda v, c: any(n.startswith(v) for n in c))
    validate_config_field_name(data_class, config, 'cast')
    validate_config_field_name(data_class, config, 'transform')
    validate_config_field_name(data_class, config, 'flattened')


def validate_config_field_name(data_class: Type, config: Config, parameter: str) -> None:
    data_class_fields = {field.name for field in fields(data_class)}
    for data_class_field in getattr(config, parameter):
        if '.' not in data_class_field:
            if data_class_field not in data_class_fields:
                raise InvalidConfigurationError(
                    parameter=parameter,
                    available_choices=data_class_fields,
                    value=data_class_field,
                )


def validate_config_data_key(data_class: Type, data: Data, config: Config, parameter: str,
                             validator=lambda v, c: v in c) -> None:
    input_data_keys = set(data.keys())
    data_class_fields = {field.name: field for field in fields(data_class)}
    for field_name, input_data_field in getattr(config, parameter).items():
        if '.' not in field_name:
            field = data_class_fields[field_name]
            if not validator(input_data_field, input_data_keys) and not has_field_default_value(field):
                raise InvalidConfigurationError(
                    parameter=parameter,
                    available_choices=input_data_keys,
                    value=input_data_field,
                )


def make_inner_config(field: Field, config: Config) -> Config:
    return Config(
        remap=extract_nested_dict(field, config.remap),
        prefixed=extract_nested_dict(field, config.prefixed),
        cast=extract_nested_list(field, config.cast),
        transform=extract_nested_dict(field, config.transform),
        flattened=extract_nested_list(field, config.flattened),
    )


def extract_nested_dict(field: Field, params: Dict[str, Any]) -> Dict[str, Any]:
    prefix = field.name + '.'
    return extract_nested_dict_for_prefix(prefix=prefix, data=params)


def extract_nested_dict_for_prefix(prefix: str, data: Dict[str, Any]) -> Dict[str, Any]:
    result = {}
    prefix_len = len(prefix)
    for key, val in data.items():
        if key.startswith(prefix):
            result[key[prefix_len:]] = val
    return result


def extract_nested_list(field: Field, params: List[str]) -> List[str]:
    result = []
    prefix = field.name + '.'
    prefix_len = len(prefix)
    for name in params:
        if name.startswith(prefix):
            result.append(name[prefix_len:])
    return result
