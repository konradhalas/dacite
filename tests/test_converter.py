from dataclasses import dataclass
from typing import List, Optional

import pytest

from dacite import Config, Converter, ForwardReferenceError, WrongTypeError, from_dict


@dataclass
class Item:
    name: str
    qty: int = 1


@dataclass
class Order:
    items: List[Item]
    note: Optional[str] = None


def test_converter_matches_from_dict():
    data = {"items": [{"name": "a"}, {"name": "b", "qty": 3}], "note": "n"}
    converter = Converter(Order)
    assert converter.convert(data) == from_dict(Order, data)
    assert converter(data) == converter.convert(data)


def test_converter_uses_config():
    converter = Converter(Order, Config(type_hooks={str: str.upper}))
    assert converter.convert({"items": [{"name": "a"}]}) == Order(items=[Item(name="A")])


def test_convert_many():
    converter = Converter(Item)
    assert converter.convert_many([{"name": "a"}, {"name": "b", "qty": 2}]) == [Item("a"), Item("b", 2)]
    assert converter.convert_many(iter([])) == []


def test_compile_fails_early_for_unresolvable_forward_reference():
    @dataclass
    class Broken:
        x: "Missing"  # noqa: F821

    with pytest.raises(ForwardReferenceError):
        Converter(Broken).compile()


def test_compile_returns_the_converter_and_errors_have_paths():
    converter = Converter(Order).compile()
    with pytest.raises(WrongTypeError) as error:
        converter.convert({"items": [{"name": "a"}, {"name": 5}]})
    assert error.value.field_path == "items[1].name"
