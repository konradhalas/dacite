from abc import ABC
from collections.abc import Collection
from dataclasses import dataclass
from enum import Enum
from typing import List, Optional, Union

import pytest

from dacite import Config, WrongTypeError, from_dict


class Color(Enum):
    RED = "red"


class Size(Enum):
    SMALL = "s"


def by_name(target, value):
    return target[value]


def test_one_enum_hook_handles_distinct_enum_classes():
    @dataclass
    class Product:
        color: Color
        size: Size

    config = Config(subclass_type_hooks={Enum: by_name})
    assert from_dict(Product, {"color": "RED", "size": "SMALL"}, config) == Product(Color.RED, Size.SMALL)


def test_existing_exact_hook_takes_priority():
    @dataclass
    class Product:
        color: Color

    config = Config(
        type_hooks={Color: lambda value: Color.RED},
        subclass_type_hooks={Enum: lambda target, value: pytest.fail("lower priority")},
    )
    assert from_dict(Product, {"color": "custom"}, config).color is Color.RED


def test_subclass_hook_uses_python_mro_not_dictionary_order():
    class Root:
        pass

    class Left(Root):
        pass

    class Right(Root):
        pass

    class Child(Left, Right):
        pass

    @dataclass
    class Box:
        value: Child

    seen = []
    config = Config(
        subclass_type_hooks={
            Right: lambda target, value: pytest.fail("Right"),
            Root: lambda target, value: pytest.fail("Root"),
            Left: lambda target, value: seen.append((target, value)) or target(),
        }
    )
    assert isinstance(from_dict(Box, {"value": "raw"}, config).value, Child)
    assert seen == [(Child, "raw")]


def test_exact_subclass_registration_runs_once():
    @dataclass
    class Product:
        color: Color

    calls = []
    config = Config(
        subclass_type_hooks={
            Enum: lambda target, value: pytest.fail("base"),
            Color: lambda target, value: calls.append(target) or Color.RED,
        }
    )
    assert from_dict(Product, {"color": "raw"}, config).color is Color.RED
    assert calls == [Color]


def test_virtual_abc_matches_in_registration_order():
    class First(ABC):
        pass

    class Second(ABC):
        pass

    class Value:
        pass

    First.register(Value)
    Second.register(Value)

    @dataclass
    class Box:
        value: Value

    config = Config(
        subclass_type_hooks={
            Second: lambda target, value: target(),
            First: lambda target, value: pytest.fail("second registration"),
        }
    )
    assert isinstance(from_dict(Box, {"value": None}, config).value, Value)


def test_list_optional_and_union_members_are_converted():
    @dataclass
    class Product:
        colors: List[Color]
        size: Optional[Size]
        either: Union[Color, Size]

    config = Config(subclass_type_hooks={Enum: by_name})
    assert from_dict(Product, {"colors": ["RED"], "size": None, "either": "SMALL"}, config) == Product(
        [Color.RED], None, Size.SMALL
    )


def test_generic_collection_hook_receives_annotation_and_recurses_into_values():
    @dataclass
    class Product:
        colors: List[Color]

    seen = []

    def collection_hook(target, value):
        seen.append(target)
        return value.split(",")

    config = Config(subclass_type_hooks={Collection: collection_hook, Enum: by_name})
    assert from_dict(Product, {"colors": "RED,RED"}, config).colors == [Color.RED, Color.RED]
    assert seen == [List[Color]]


def test_hook_can_produce_dataclass_input():
    class Base:
        pass

    @dataclass
    class Value(Base):
        number: int

    @dataclass
    class Box:
        value: Value

    config = Config(subclass_type_hooks={Base: lambda target, raw: {"number": raw}}, cast=[int])
    assert from_dict(Box, {"value": "7"}, config).value == Value(7)


def test_unmatched_annotations_use_normal_construction():
    @dataclass
    class Box:
        number: int
        text: str

    config = Config(subclass_type_hooks={Enum: lambda target, value: pytest.fail("unmatched")})
    assert from_dict(Box, {"number": 7, "text": "name"}, config) == Box(7, "name")


def test_hook_result_is_type_checked():
    @dataclass
    class Product:
        color: Color

    config = Config(subclass_type_hooks={Enum: lambda target, value: "wrong"})
    with pytest.raises(WrongTypeError) as error:
        from_dict(Product, {"color": "RED"}, config)
    assert error.value.field_path == "color"
    config.check_types = False
    assert from_dict(Product, {"color": "RED"}, config).color == "wrong"


def test_hook_failure_propagates_for_non_union_fields():
    @dataclass
    class Product:
        color: Color

    failure = ValueError("not a member")

    def failing_hook(target, value):
        raise failure

    with pytest.raises(ValueError) as error:
        from_dict(Product, {"color": "raw"}, Config(subclass_type_hooks={Enum: failing_hook}))
    assert error.value is failure


def test_mutated_config_and_separate_instances_do_not_share_cached_hooks():
    @dataclass
    class Product:
        color: Color

    config = Config(subclass_type_hooks={Enum: by_name})
    assert from_dict(Product, {"color": "RED"}, config).color is Color.RED
    config.subclass_type_hooks[Enum] = lambda target, value: Color.RED
    assert from_dict(Product, {"color": "arbitrary"}, config).color is Color.RED
    assert Config().subclass_type_hooks == {}


def test_exact_generic_registration_wins_over_origin_hook():
    @dataclass
    class Box:
        values: List[int]

    config = Config(
        subclass_type_hooks={
            list: lambda target, value: pytest.fail("origin"),
            List[int]: lambda target, value: [int(value)],
        }
    )
    assert from_dict(Box, {"values": "7"}, config).values == [7]
