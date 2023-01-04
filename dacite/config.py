from dataclasses import dataclass, field, asdict
from functools import cached_property
from typing import Dict, Any, Callable, Optional, Type, List

from dacite.cache import Cache
from dacite.frozen_dict import FrozenDict


@dataclass
class Config:
    type_hooks: Dict[Type, Callable[[Any], Any]] = field(default_factory=dict)
    cast: List[Type] = field(default_factory=list)
    forward_references: Optional[Dict[str, Any]] = None
    check_types: bool = True
    strict: bool = False
    strict_unions_match: bool = False
    cache: Cache = Cache()

    @cached_property
    def hashable_forward_references(self) -> Optional[FrozenDict]:
        return FrozenDict(self.forward_references) if self.forward_references else None
