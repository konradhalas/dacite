from dataclasses import dataclass, field
from types import MappingProxyType
from typing import Any, Callable, Dict, Mapping, Optional, Sequence, Tuple, Type


@dataclass(frozen=True, eq=False)
class Config:  # pylint: disable=too-many-instance-attributes
    """Conversion options. Immutable and hashable: conversion plans are cached per `(data class, Config)`.

    Mutable arguments (`type_hooks`, `cast`, `forward_references`) are copied into read-only containers when the
    `Config` is created. Two `Config`s are equal when all options are equal and the callables/types they refer to are
    the same objects.
    """

    type_hooks: Mapping[Type, Callable[[Any], Any]] = field(default_factory=dict)
    cast: Sequence[Type] = field(default_factory=tuple)
    forward_references: Optional[Mapping[str, Any]] = None
    check_types: bool = True
    strict: bool = False
    strict_unions_match: bool = False
    convert_key: Optional[Callable[[str], str]] = None
    _key: Tuple = field(init=False, repr=False, compare=False, default=())

    def __post_init__(self) -> None:
        # frozen dataclass: assign through object.__setattr__
        set_attribute = object.__setattr__
        hooks: Dict[Type, Callable[[Any], Any]] = dict(self.type_hooks)
        set_attribute(self, "type_hooks", MappingProxyType(hooks))
        set_attribute(self, "cast", tuple(self.cast))
        references = None
        if self.forward_references is not None:
            references = dict(self.forward_references)
            set_attribute(self, "forward_references", MappingProxyType(references))
        key = (
            self.check_types,
            self.strict,
            self.strict_unions_match,
            frozenset((type_, id(hook)) for type_, hook in hooks.items()),
            self.cast,
            frozenset((name, id(value)) for name, value in references.items()) if references else None,
            id(self.convert_key) if self.convert_key is not None else None,
        )
        set_attribute(self, "_key", key)

    def __eq__(self, other: object) -> bool:
        return isinstance(other, Config) and self._key == other._key

    def __hash__(self) -> int:
        return hash(self._key)


DEFAULT_CONFIG = Config()
