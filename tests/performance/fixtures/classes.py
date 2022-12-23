from dataclasses import dataclass
from enum import Enum
from typing import Optional, List, Set, Union, Dict


@dataclass
class ForwardRef:
    inner: "LongUnion"


@dataclass
class Simple:
    attr_string: str
    attr_int: int
    attr_list: List[str]
    attr_set: Set[float]
    attr_string_opt: Optional[str] = None


@dataclass
class Nested:
    nested1: Simple
    nested2: Simple
    nested_list: List[Simple]
    nested_dict: Dict[str, Simple]


@dataclass
class LongUnion:
    simple_type_union: Union[set, dict, tuple, str, bool]
    unrealistically_complex_union: Union[int, str, bool, set, list, Simple, Nested]
    unrealistically_complex_union2: Union[int, str, bool, set, Simple, Nested, List[Nested]]


@dataclass
class UnionCollection:
    collection: List[Union[int, str, bool, set, list, dict, Simple, Nested, List[Nested]]]


class E(Enum):
    X = "x"
    Y = "y"
    Z = "z"


@dataclass
class Cast:
    e: E
