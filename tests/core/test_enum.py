from dataclasses import dataclass
from enum import Enum

import pytest

from dacite import from_dict


def test_can_create_instance_with_enum():
    class A(Enum):
        B = "C"

    @dataclass
    class X:
        d: A

    instance = from_dict(X, {"d": "C"})
    assert instance.d is A.B


def test_invalid_enum_value_raises():
    class A(Enum):
        B = "C"

    @dataclass
    class X:
        d: A

    with pytest.raises(ValueError):
        from_dict(X, {"d": "D"})
