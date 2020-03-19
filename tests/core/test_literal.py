from dataclasses import dataclass
import sys
from typing import Optional

if sys.version_info >= (3, 8):
    from typing import Literal
elif sys.version_info < (3, 8) and sys.version_info > (3, 6):
    from typing_extensions import Literal


import pytest

from dacite import from_dict
from dacite.exceptions import WrongTypeError
from tests.common import literal_support


@literal_support
def test_from_dict_with_literal():
    @dataclass
    class X:
        l: Literal["A", "B"]

    result = from_dict(X, {"l": "A"})

    assert result == X(l="A")


@literal_support
def test_from_dict_with_literal_and_wrong_value():
    @dataclass
    class X:
        l: Literal["A", "B"]

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {"l": "C"})


@literal_support
def test_from_dict_with_optional_literal_and_none():
    @dataclass
    class X:
        l: Optional[Literal["A", "B"]]

    result = from_dict(X, {"l": None})

    assert result == X(l=None)


@literal_support
def test_from_dict_with_optional_literal_and_not_none():
    @dataclass
    class X:
        l: Optional[Literal["A", "B"]]

    result = from_dict(X, {"l": "A"})

    assert result == X(l="A")
