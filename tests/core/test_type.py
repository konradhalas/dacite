from dataclasses import dataclass
from typing import Type

from dacite import from_dict


def test_from_dict_with_type_field():
    @dataclass
    class X:
        t: Type[int]

    result = from_dict(X, {"t": int})

    assert result == X(t=int)
