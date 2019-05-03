from dataclasses import dataclass, field as dc_field, fields, Field
from typing import Dict, Any, Callable, List, Optional, Type

from dacite.data import Data
from dacite.exceptions import InvalidConfigurationError
from dacite.types import cast_value


class ValueNotFoundError(Exception):
    pass


@dataclass
class Config:
    cast: List[str] = dc_field(default_factory=list)
    transform: Dict[str, Callable[[Any], Any]] = dc_field(default_factory=dict)
    forward_references: Optional[Dict[str, Any]] = None
    check_types: bool = True

    def validate(self, data_class: Type, data: Data) -> None:
        self._validate_field_name(data_class, "cast")
        self._validate_field_name(data_class, "transform")

    def make_inner(self, field: Field) -> "Config":
        return Config(
            cast=self._extract_nested_list(field, self.cast),
            transform=self._extract_nested_dict(field, self.transform),
            check_types=self.check_types,
        )

    # pylint: disable=unsupported-membership-test,unsubscriptable-object,no-member
    def get_value(self, field: Field, data: Data) -> Any:
        try:
            value = data[field.name]
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
            if "." not in data_class_field:
                if data_class_field not in data_class_fields:
                    raise InvalidConfigurationError(
                        parameter=parameter, available_choices=data_class_fields, value=data_class_field
                    )

    def _extract_nested_dict(self, field: Field, params: Dict[str, Any]) -> Dict[str, Any]:
        prefix = field.name + "."
        return self._extract_nested_dict_for_prefix(prefix=prefix, data=params)

    def _extract_nested_list(self, field: Field, params: List[str]) -> List[str]:
        result = []
        prefix = field.name + "."
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
