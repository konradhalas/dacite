from dataclasses import dataclass, field as dc_field, fields, Field
from typing import Dict, Any, Callable, List, Optional, Type

from dacite.data import Data
from dacite.dataclasses import has_field_default_value
from dacite.exceptions import InvalidConfigurationError
from dacite.types import cast_value


class ValueNotFoundError(Exception):
    pass


@dataclass
class Config:
    remap: Dict[str, str] = dc_field(default_factory=dict)
    prefixed: Dict[str, str] = dc_field(default_factory=dict)
    cast: List[str] = dc_field(default_factory=list)
    transform: Dict[str, Callable[[Any], Any]] = dc_field(default_factory=dict)
    flattened: List[str] = dc_field(default_factory=list)
    forward_references: Optional[Dict[str, Any]] = None
    check_types: bool = True

    def validate(self, data_class: Type, data: Data) -> None:
        self._validate_field_name(data_class, 'remap')
        self._validate_data_key(data_class, data, 'remap')
        self._validate_field_name(data_class, 'prefixed')
        self._validate_data_key(data_class, data, 'prefixed', lambda v, c: any(n.startswith(v) for n in c))
        self._validate_field_name(data_class, 'cast')
        self._validate_field_name(data_class, 'transform')
        self._validate_field_name(data_class, 'flattened')

    def make_inner(self, field: Field) -> 'Config':
        return Config(
            remap=self._extract_nested_dict(field, self.remap),
            prefixed=self._extract_nested_dict(field, self.prefixed),
            cast=self._extract_nested_list(field, self.cast),
            transform=self._extract_nested_dict(field, self.transform),
            flattened=self._extract_nested_list(field, self.flattened),
            check_types=self.check_types,
        )

    def get_value(self, field: Field, data: Data) -> Any:
        if field.name in self.flattened or field.name in self.prefixed:
            if field.name in self.flattened:
                value = data
            else:
                value = self._extract_nested_dict_for_prefix(self.prefixed[field.name], data)
        else:
            try:
                key_name = self.remap.get(field.name, field.name)
                value = data[key_name]
            except KeyError:
                raise ValueNotFoundError()
            if field.name in self.transform:
                value = self.transform[field.name](value)
            if field.name in self.cast:
                value = cast_value(field.type, value)
        return value

    def _validate_field_name(self, data_class: Type, parameter: str) -> None:
        data_class_fields = {field.name for field in fields(data_class)}
        for data_class_field in getattr(self, parameter):
            if '.' not in data_class_field:
                if data_class_field not in data_class_fields:
                    raise InvalidConfigurationError(
                        parameter=parameter,
                        available_choices=data_class_fields,
                        value=data_class_field,
                    )

    def _validate_data_key(self, data_class: Type, data: Data, parameter: str, validator=lambda v, c: v in c) -> None:
        input_data_keys = set(data.keys())
        data_class_fields = {field.name: field for field in fields(data_class)}
        for field_name, input_data_field in getattr(self, parameter).items():
            if '.' not in field_name:
                field = data_class_fields[field_name]
                if not validator(input_data_field, input_data_keys) and not has_field_default_value(field):
                    raise InvalidConfigurationError(
                        parameter=parameter,
                        available_choices=input_data_keys,
                        value=input_data_field,
                    )

    def _extract_nested_dict(self, field: Field, params: Dict[str, Any]) -> Dict[str, Any]:
        prefix = field.name + '.'
        return self._extract_nested_dict_for_prefix(prefix=prefix, data=params)

    def _extract_nested_list(self, field: Field, params: List[str]) -> List[str]:
        result = []
        prefix = field.name + '.'
        prefix_len = len(prefix)
        for name in params:
            if name.startswith(prefix):
                result.append(name[prefix_len:])
        return result

    def _extract_nested_dict_for_prefix(self, prefix: str, data: Dict[str, Any]) -> Dict[str, Any]:
        result = {}
        prefix_len = len(prefix)
        for key, val in data.items():
            if key.startswith(prefix):
                result[key[prefix_len:]] = val
        return result
