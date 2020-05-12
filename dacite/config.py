from dataclasses import dataclass, field
from typing import Any, Callable, Optional, Type, Mapping, AbstractSet

from dacite.cache import Cache
from dacite.frozen_dict import FrozenDict


@dataclass
class Config:
    type_hooks: Mapping[Type, Callable[[Any], Any]] = field(default_factory=dict)
    cast: AbstractSet[Type] = field(default_factory=frozenset)
    forward_references: Optional[Mapping[str, Any]] = None
    check_types: bool = True
    strict: bool = False
    strict_unions_match: bool = False
    cache: Cache = Cache()

    def __post_init__(self):
        self.type_hooks = FrozenDict(self.type_hooks)
        self.cast = frozenset(self.cast)
        self.forward_references = FrozenDict(self.forward_references) if self.forward_references else None
