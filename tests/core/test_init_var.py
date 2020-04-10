from dataclasses import dataclass, InitVar
from typing import Optional

from dacite import from_dict


def test_from_dict_with_init_var():
    @dataclass
    class X:
        a: InitVar[int]
        b: Optional[int] = None

        def __post_init__(self, a: int) -> None:
            self.b = 2 * a

    result = from_dict(X, {"a": 2})

    assert result.b == 4
