from dataclasses import dataclass, field as dc_field
from typing import Dict, Any, Callable, Optional, Type


@dataclass
class Config:
    type_hooks: Dict[Type, Callable[[Any], Any]] = dc_field(default_factory=dict)
    forward_references: Optional[Dict[str, Any]] = None
    check_types: bool = True
    strict: bool = False
