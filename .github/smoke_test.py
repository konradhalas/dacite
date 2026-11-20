"""Smoke test for the built wheel: run it with the interpreter of a venv where only the wheel is installed."""

from dataclasses import dataclass
from typing import List, Optional
import dacite
from dacite import Config, Converter, WrongTypeError, from_dict, set_compile_threshold


@dataclass
class Item:
    name: str
    qty: int = 1


@dataclass
class Order:
    items: List[Item]
    note: Optional[str] = None


data = {"items": [{"name": "a"}, {"name": "b", "qty": 3}]}
import sys

assert dacite.__file__.startswith(sys.prefix), f"dacite is not imported from the installed wheel: {dacite.__file__}"
for threshold in (None, 0, 100):
    set_compile_threshold(threshold)
    dacite.clear_cache()
    assert from_dict(Order, data) == Order([Item("a"), Item("b", 3)])
    try:
        from_dict(Order, {"items": [{"name": "a"}, {"name": 5}]})
        raise SystemExit("no error")
    except WrongTypeError as e:
        assert e.field_path == "items[1].name", e.field_path
print("clean-install smoke OK:", dacite.__file__)
conv = Converter(Order, Config(strict=True)).compile()
assert conv.convert_many([data, data])[0].items[1].qty == 3
