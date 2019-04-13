from dataclasses import dataclass
from typing import Optional, Union, List, NewType

import pytest

from dacite import from_dict, MissingValueError, WrongTypeError


def test_from_dict_with_missing_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = from_dict(X, {"i": 1})

    assert result == X(s=None, i=1)


def test_from_dict_with_existing_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = from_dict(X, {"s": "test", "i": 1})

    assert result == X(s="test", i=1)


def test_from_dict_with_missing_optional_value_for_union():
    @dataclass
    class X:
        i: Optional[Union[int, str]]

    result = from_dict(X, {})

    assert result == X(i=None)


def test_from_dict_with_none_optional_value_for_union():
    @dataclass
    class X:
        i: Optional[Union[int, str]]

    result = from_dict(X, {"i": None})

    assert result == X(i=None)


def test_from_dict_with_none_as_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = from_dict(X, {"s": None, "i": 1})

    assert result == X(s=None, i=1)


def test_from_dict_with_wrong_type_of_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {"s": 1, "i": 1})

    assert exception_info.value.field_path == "s"
    assert exception_info.value.field_type == Optional[str]


def test_from_dict_with_missing_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = from_dict(Y, {})

    assert result == Y(x=None)


def test_from_dict_with_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = from_dict(Y, {"x": {"i": 1}})

    assert result == Y(x=X(i=1))


def test_from_dict_with_optional_nested_data_class_and_missing_value():
    @dataclass
    class X:
        i: int
        j: int

    @dataclass
    class Y:
        x: Optional[X]

    with pytest.raises(MissingValueError) as exception_info:
        from_dict(Y, {"x": {"i": 1}})

    assert exception_info.value.field_path == "x.j"


def test_from_dict_with_null_as_optional_value_for_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = from_dict(Y, {"x": None})

    assert result == Y(x=None)


def test_from_dict_with_none_for_non_optional_field():
    @dataclass
    class X:
        s: str

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {"s": None})

    assert exception_info.value.field_path == "s"
    assert exception_info.value.field_type == str
    assert exception_info.value.value is None


def test_from_dict_with_optional_generic_collection_of_data_classes():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x_list: Optional[List[X]]

    result = from_dict(Y, {"x_list": [{"i": 1}, {"i": 2}]})

    assert result == Y(x_list=[X(i=1), X(i=2)])


def test_from_dict_with_optional_field_and_default_value():
    @dataclass
    class X:
        i: Optional[int] = 1

    result = from_dict(X, {})

    assert result == X(i=1)


def test_from_dict_with_optional_new_type():
    MyStr = NewType("MyStr", str)

    @dataclass
    class X:
        s: Optional[MyStr]

    result = from_dict(X, {"s": MyStr("test")})

    assert result == X(s=MyStr("test"))
