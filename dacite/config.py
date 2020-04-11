from dataclasses import dataclass, field
from typing import Dict, Any, Callable, Optional, Type, List, Union


@dataclass
class Config:
    type_hooks: Dict[Union[Type, object], Callable[[Any], Any]] = field(default_factory=dict)
    cast: List[Type] = field(default_factory=list)
    forward_references: Optional[Dict[str, Any]] = None
    check_types: bool = True
    strict: bool = False
