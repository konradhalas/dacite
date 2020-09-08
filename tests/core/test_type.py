from dataclasses import dataclass
from typing import List, Type

import pytest

from dacite import from_dict, Config, WrongTypeError


def test_from_dict_with_type_parameter():
    @dataclass
    class X:
        l: Type[int]

    result = from_dict(X, {"l": bool})  # bool is a subclass of int in Python

    assert result == X(l=bool)


def test_from_dict_with_list_of_type_parameters():
    class A:
        pass

    class B(A):
        pass

    @dataclass
    class Y:
        class_list: List[Type[A]]

    result = from_dict(Y, {"class_list": [A, B]})

    assert result == Y(class_list=[A, B])


def test_from_dict_with_type_parameter_and_type_hooks():
    class A:
        pass

    class B(A):
        pass

    @dataclass
    class Z:
        class_: Type[A]

    def from_string(s: str) -> Type[A]:
        assert s in ("A", "B")
        return A if s == "A" else B

    result = from_dict(Z, {"class_": "B"}, config=Config(type_hooks={Type[A]: from_string}))

    assert result == Z(class_=B)


def test_from_dict_with_value_instead_of_type():
    @dataclass
    class X:
        l: Type[int]

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {"l": 1})

    assert exception_info.value.field_path == "l"
    assert exception_info.value.field_type == Type[int]


def test_from_dict_with_wrong_type_for_type_parameter():
    @dataclass
    class X:
        l: Type[int]

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {"l": float})

    assert exception_info.value.field_path == "l"
    assert exception_info.value.field_type == Type[int]
