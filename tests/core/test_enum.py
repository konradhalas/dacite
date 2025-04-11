from dataclasses import dataclass
from enum import Enum
from typing import Optional

import pytest

from dacite import Config, from_dict
from dacite.exceptions import WrongTypeError


class FooBar(str, Enum):
    FOO = "foo"
    BAR = "bar"


def test_from_dict_with_enum():
    @dataclass
    class X:
        foo_bar: FooBar

    result = from_dict(X, {"foo_bar": "bar"}, config=Config(cast=[Enum]))

    assert result == X(foo_bar=FooBar("bar"))


def test_from_dict_with_enum_and_wrong_value():
    @dataclass
    class X:
        foo_bar: FooBar

    with pytest.raises(WrongTypeError):
        from_dict(X, {"foo_bar": "foobar"}, config=Config(cast=[Enum]))


def test_from_dict_with_optional_enum_and_none():
    @dataclass
    class X:
        foo_bar: Optional[FooBar]

    result = from_dict(X, {"foo_bar": None}, config=Config(cast=[Enum]))

    assert result == X(foo_bar=None)


def test_from_dict_with_optional_enum_and_not_none():
    @dataclass
    class X:
        foo_bar: Optional[FooBar]

    result = from_dict(X, {"foo_bar": "foo"}, config=Config(cast=[Enum]))

    assert result == X(foo_bar=FooBar("foo"))
