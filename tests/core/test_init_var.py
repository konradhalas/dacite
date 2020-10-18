from dataclasses import dataclass, InitVar
from typing import Optional, List

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


def test_from_dict_with_init_var_of_data_class():
    @dataclass
    class A:
        a: int

    @dataclass
    class B:
        a: InitVar[A]
        b: Optional[A] = None

        def __post_init__(self, a: A) -> None:
            self.b = A(2 * a.a)

    result = from_dict(B, {"a": {"a": 2}})

    assert result.b == A(a=4)


def test_from_dict_with_init_var_of_list_of_data_classes():
    @dataclass
    class A:
        a: int

    @dataclass
    class B:
        aa: InitVar[List[A]]
        bb: Optional[List[A]] = None

        def __post_init__(self, aa: List[A]) -> None:
            self.bb = [A(2 * a.a) for a in aa]

    result = from_dict(B, {"aa": [{"a": 2}]})

    assert result.bb == [A(a=4)]
