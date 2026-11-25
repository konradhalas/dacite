from dataclasses import dataclass
from enum import Enum
import sys
from types import MappingProxyType
from typing import Generic, List, Optional, TypeVar, Union

import pytest

if sys.version_info >= (3, 9):
    from typing import TypedDict
else:
    from typing_extensions import TypedDict
try:
    from typing import Required, NotRequired
except ImportError:
    from typing_extensions import Required, NotRequired

from dacite import Config, ForwardReferenceError, MissingValueError, StrictUnionMatchError, UnexpectedDataError
from dacite import UnionMatchError, WrongTypeError, from_dict
from dacite.types import is_instance


class Address(TypedDict):
    street: str
    number: int


@dataclass
class Person:
    address: Address


def test_typed_dict_remains_a_dictionary_without_mutating_input():
    data = {"address": {"street": "Main", "number": "7", "extra": [1]}}
    result = from_dict(Person, data, Config(cast=[int]))
    assert result.address == {"street": "Main", "number": 7, "extra": [1]}
    assert type(result.address) is dict
    assert result.address is not data["address"]
    assert data["address"]["number"] == "7"


def test_mapping_input_is_materialized_as_a_dict():
    address = MappingProxyType({"street": "Main", "number": 7})
    assert from_dict(Person, {"address": address}).address == dict(address)


def test_missing_required_key_has_full_path():
    with pytest.raises(MissingValueError) as error:
        from_dict(Person, {"address": {"street": "Main"}})
    assert error.value.field_path == "address.number"


def test_wrong_value_type_has_full_path():
    with pytest.raises(WrongTypeError) as error:
        from_dict(Person, {"address": {"street": "Main", "number": "seven"}})
    assert error.value.field_path == "address.number"
    assert error.value.field_type is int


@pytest.mark.parametrize("value", [[], None, "address"])
def test_non_mapping_is_rejected(value):
    with pytest.raises(WrongTypeError):
        from_dict(Person, {"address": value})


def test_totality_is_inherited_and_optional_does_not_mean_missing():
    class Base(TypedDict):
        name: str

    class Partial(Base, total=False):
        nickname: str

    class Record(Partial):
        email: Optional[str]

    @dataclass
    class Account:
        record: Record

    assert from_dict(Account, {"record": {"name": "A", "email": None}}).record == {"name": "A", "email": None}
    with pytest.raises(MissingValueError) as error:
        from_dict(Account, {"record": {"name": "A"}})
    assert error.value.field_path == "record.email"


def test_required_and_not_required_qualifiers():
    class Partial(TypedDict, total=False):
        name: Required[str]
        age: int

    class Complete(TypedDict):
        partial: Partial
        comment: NotRequired[str]

    @dataclass
    class Container:
        value: Complete

    assert from_dict(Container, {"value": {"partial": {"name": "A"}}}).value == {"partial": {"name": "A"}}
    with pytest.raises(MissingValueError) as error:
        from_dict(Container, {"value": {"partial": {}}})
    assert error.value.field_path == "value.partial.name"


def test_dataclasses_collections_and_enum_casts_inside_typed_dict():
    class Color(Enum):
        RED = "red"

    @dataclass
    class Item:
        color: Color

    class Payload(TypedDict):
        items: List[Item]

    @dataclass
    class Box:
        payloads: List[Payload]

    result = from_dict(Box, {"payloads": [{"items": [{"color": "red"}]}]}, Config(cast=[Color]))
    assert result.payloads == [{"items": [Item(Color.RED)]}]


def test_union_selects_by_required_keys_and_value_types():
    class Name(TypedDict):
        name: str

    @dataclass
    class Contact:
        value: Union[Address, Name]

    assert from_dict(Contact, {"value": {"name": "A"}}).value == {"name": "A"}
    with pytest.raises(UnionMatchError):
        from_dict(Contact, {"value": {"name": 1}})


def test_strict_union_reports_ambiguous_typed_dicts():
    class Name(TypedDict):
        name: str

    class Alias(TypedDict):
        name: str

    @dataclass
    class Contact:
        value: Union[Name, Alias]

    with pytest.raises(StrictUnionMatchError) as error:
        from_dict(Contact, {"value": {"name": "A"}}, Config(strict_unions_match=True))
    assert set(error.value.union_matches) == {Name, Alias}


def test_strict_rejects_unknown_keys_in_typed_dict():
    with pytest.raises(UnexpectedDataError) as error:
        from_dict(Person, {"address": {"street": "Main", "number": 7, "other": 2}}, Config(strict=True))
    assert error.value.keys == {"other"}


def test_key_conversion_and_hooks_apply_at_each_level():
    @dataclass
    class Container:
        address: Address

    config = Config(convert_key=str.upper, type_hooks={int: int})
    result = from_dict(Container, {"ADDRESS": {"STREET": "Main", "NUMBER": "7"}}, config)
    assert result.address == {"street": "Main", "number": 7}


def test_hook_for_typed_dict_runs_before_its_members():
    config = Config(type_hooks={Address: lambda data: {"street": data, "number": "7"}, int: int})
    assert from_dict(Person, {"address": "Main"}, config).address == {"street": "Main", "number": 7}


def test_type_checking_can_be_disabled_but_required_keys_still_apply():
    config = Config(check_types=False)
    assert from_dict(Person, {"address": {"street": 1, "number": "7"}}, config).address["street"] == 1
    with pytest.raises(MissingValueError):
        from_dict(Person, {"address": {"street": "Main"}}, config)


def test_forward_references_and_recursive_typed_dict():
    class Node(TypedDict):
        value: int
        children: NotRequired[List["Node"]]

    @dataclass
    class Tree:
        root: Node

    config = Config(forward_references={"Node": Node}, type_hooks={int: int})
    result = from_dict(Tree, {"root": {"value": "1", "children": [{"value": "2"}]}}, config)
    assert result.root == {"value": 1, "children": [{"value": 2}]}


def test_unresolved_forward_reference_raises_dacite_error():
    class Payload(TypedDict):
        value: "MissingType"

    @dataclass
    class Box:
        payload: Payload

    with pytest.raises(ForwardReferenceError):
        from_dict(Box, {"payload": {"value": 1}})


def test_forward_qualifiers_override_incomplete_runtime_key_metadata():
    class Payload(TypedDict, total=False):
        name: "Required[str]"
        note: "NotRequired[str]"

    @dataclass
    class Box:
        payload: Payload

    assert from_dict(Box, {"payload": {"name": "A"}}).payload == {"name": "A"}
    with pytest.raises(MissingValueError):
        from_dict(Box, {"payload": {}})


@pytest.mark.skipif(sys.version_info < (3, 11), reason="stdlib generic TypedDict requires Python 3.11")
def test_generic_typed_dict_concretizes_members():
    item_type = TypeVar("item_type")

    class Payload(TypedDict, Generic[item_type]):
        values: List[item_type]
        extra: NotRequired[item_type]

    @dataclass
    class Box:
        payload: Payload[int]

    assert from_dict(Box, {"payload": {"values": ["1", "2"]}}, Config(cast=[int])).payload == {"values": [1, 2]}
    with pytest.raises(WrongTypeError):
        from_dict(Box, {"payload": {"values": ["wrong"]}})


def test_typing_extensions_backport():
    extensions = pytest.importorskip("typing_extensions")

    class Payload(extensions.TypedDict):
        value: int

    @dataclass
    class Box:
        payload: Payload

    assert from_dict(Box, {"payload": {"value": "3"}}, Config(cast=[int])).payload == {"value": 3}


def test_runtime_check_is_structural():
    assert is_instance({"street": "Main", "number": 7, "extra": True}, Address)
    assert not is_instance({"street": "Main"}, Address)
    assert not is_instance({"street": "Main", "number": "7"}, Address)
    assert not is_instance([], Address)
