from dataclasses import dataclass
from enum import IntEnum
from typing import Optional

import pytest

from dacite import from_dict
from dacite.exceptions import WrongTypeError
from tests.common import literal_support


@literal_support
def test_from_dict_with_literal():
    from typing import Literal

    @dataclass
    class X:
        l: Literal["A", "B"]

    result = from_dict(X, {"l": "A"})

    assert result == X(l="A")


@literal_support
def test_from_dict_with_literal_and_wrong_value():
    from typing import Literal

    @dataclass
    class X:
        l: Literal["A", "B"]

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {"l": "C"})


@literal_support
def test_from_dict_with_optional_literal_and_none():
    from typing import Literal

    @dataclass
    class X:
        l: Optional[Literal["A", "B"]]

    result = from_dict(X, {"l": None})

    assert result == X(l=None)


@literal_support
def test_from_dict_with_optional_literal_and_not_none():
    from typing import Literal

    @dataclass
    class X:
        l: Optional[Literal["A", "B"]]

    result = from_dict(X, {"l": "A"})

    assert result == X(l="A")


class Number(IntEnum):
    ONE = 1


@literal_support
@pytest.mark.parametrize(
    "literal, value", [(1, True), (True, 1), (0, False), (False, 0), (1, 1.0), (Number.ONE, 1), (1, Number.ONE)]
)
def test_from_dict_with_equal_literal_of_wrong_type(literal, value):
    from typing import Literal

    @dataclass
    class X:
        l: Literal[literal]

    with pytest.raises(WrongTypeError):
        from_dict(X, {"l": value})

    result = from_dict(X, {"l": literal})
    assert result.l == literal
    assert type(result.l) is type(literal)
