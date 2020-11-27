from dataclasses import dataclass, InitVar, field

from dacite import from_dict
from tests.common import init_var_type_support


def test_from_dict_with_init_var():
    @dataclass
    class X:
        a: InitVar[int]
        b: int = field(init=False)

        def __post_init__(self, a: int) -> None:
            self.b = 2 * a

    result = from_dict(X, {"a": 2})

    assert result.b == 4


@init_var_type_support
def test_from_dict_with_init_var_and_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        a: InitVar[X]
        b: X = field(init=False)

        def __post_init__(self, a: X) -> None:
            self.b = X(i=2 * a.i)

    result = from_dict(Y, {"a": {"i": 2}})

    assert result.b == X(i=4)
