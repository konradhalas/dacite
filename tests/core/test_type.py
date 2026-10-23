from dataclasses import dataclass
from typing import Any, Type

import pytest

from dacite import Config, WrongTypeError, from_dict
from tests.common import type_hints_with_generic_collections_support


def test_from_dict_with_type_field():
    @dataclass
    class X:
        t: Type[int]

    result = from_dict(X, {"t": int})

    assert result == X(t=int)


@pytest.mark.parametrize(
    "type_constructor", [Type, pytest.param(type, marks=type_hints_with_generic_collections_support)]
)
def test_from_dict_with_type_any_field(type_constructor):
    @dataclass
    class X:
        t: type_constructor[Any]

    assert from_dict(X, {"t": int}) == X(t=int)


@pytest.mark.parametrize(
    "type_constructor", [Type, pytest.param(type, marks=type_hints_with_generic_collections_support)]
)
def test_from_dict_with_type_any_field_and_type_hook(type_constructor):
    @dataclass
    class X:
        t: type_constructor[Any]

    config = Config(type_hooks={type_constructor[Any]: lambda value: {"int": int}[value]})

    assert from_dict(X, {"t": "int"}, config=config) == X(t=int)


@pytest.mark.parametrize(
    "type_constructor", [Type, pytest.param(type, marks=type_hints_with_generic_collections_support)]
)
def test_from_dict_with_type_any_field_rejects_instances(type_constructor):
    @dataclass
    class X:
        t: type_constructor[Any]

    with pytest.raises(WrongTypeError) as exc:
        from_dict(X, {"t": "int"})

    assert exc.value.field_path == "t"
