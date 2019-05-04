from dataclasses import dataclass, field as dc_field, Field
from typing import Dict, Any, Callable, Optional, Type

from dacite.data import Data
from dacite.types import transform_value


class ValueNotFoundError(Exception):
    pass


@dataclass
class Config:
    transform: Dict[Type, Callable[[Any], Any]] = dc_field(default_factory=dict)
    forward_references: Optional[Dict[str, Any]] = None
    check_types: bool = True

    def get_value(self, field: Field, data: Data) -> Any:
        try:
            value = data[field.name]
            return transform_value(self.transform, field.type, value)
        except KeyError:
            raise ValueNotFoundError()
