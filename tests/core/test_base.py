from dataclasses import dataclass, field
from typing import Any, NewType, Optional, List

import pytest

from dacite import from_dict, MissingValueError, WrongTypeError


def test_from_dict_with_correct_data():
    @dataclass
    class X:
        s: str
        i: int
        f: float

    result = from_dict(X, {"s": "test", "i": 1, "f": 1.0})

    assert result == X(s="test", i=1, f=1.0)


def test_from_dict_with_default_value():
    @dataclass
    class X:
        s: str
        i: int = 0

    result = from_dict(X, {"s": "test"})

    assert result == X(s="test", i=0)


def test_from_dict_with_default_factory():
    @dataclass
    class X:
        s: str
        i: int = field(default_factory=lambda: 42)

    result = from_dict(X, {"s": "test"})

    assert result == X(s="test", i=42)


def test_from_dict_with_wrong_type():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {"s": "test", "i": "wrong"})

    assert (
        str(exception_info.value)
        == 'wrong value type for field "i" - should be "int" instead of value "wrong" of type "str"'
    )
    assert exception_info.value.field_path == "i"
    assert exception_info.value.field_type == int
    assert exception_info.value.value == "wrong"


def test_from_dict_with_missing_value():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(MissingValueError) as exception_info:
        from_dict(X, {"s": "test"})

    assert str(exception_info.value) == 'missing value for field "i"'
    assert exception_info.value.field_path == "i"


def test_from_dict_with_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = from_dict(Y, {"s": "test", "x": {"i": 1}})

    assert result == Y(s="test", x=X(i=1))


def test_from_dict_with_missing_value_of_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    with pytest.raises(MissingValueError) as exception_info:
        from_dict(Y, {"x": {}})

    assert exception_info.value.field_path == "x.i"


def test_from_dict_with_additional_values():
    @dataclass
    class X:
        i: int

    result = from_dict(X, {"i": 1, "s": "extra"})

    assert result == X(i=1)


def test_from_dict_with_any():
    @dataclass
    class X:
        i: Any

    result = from_dict(X, {"i": 1})

    assert result == X(i=1)


def test_from_dict_with_nested_data_classes_and_default_factory():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X = field(default_factory=lambda: X(i=42))

    result = from_dict(Y, {})

    assert result == Y(x=X(i=42))


def test_from_dict_with_post_init():
    @dataclass
    class X:
        s: str = field(init=False)

    x = X()
    x.s = "test"

    result = from_dict(X, {"s": "test"})

    assert result == x


def test_from_dict_with_post_init_missing_value():
    @dataclass
    class X:
        s: str = field(init=False)

    result = from_dict(X, {})

    assert not hasattr(result, "s")


def test_from_dict_with_optional_non_init_field():
    @dataclass
    class X:
        s: Optional[str] = field(init=False)

    x = X()
    x.s = None

    result = from_dict(X, {})

    assert result == x


def test_from_dict_with_non_init_field_with_default_value_and_frozen_dataclass():
    @dataclass(frozen=True)
    class X:
        s: str = field(init=False, default="test")

    result = from_dict(X, {})

    assert result == X()


def test_from_dict_with_new_type():
    MyStr = NewType("MyStr", str)

    @dataclass
    class X:
        s: MyStr

    result = from_dict(X, {"s": "test"})

    assert result == X(s=MyStr("test"))


def test_dataclass_default_factory_identity():
    # https://github.com/konradhalas/dacite/issues/215
    @dataclass
    class A:
        name: str
        items: List[str] = field(default_factory=list)

    a1 = from_dict(A, {"name": "a1"})
    a2 = from_dict(A, {"name": "a2"})

    assert a1.items is not a2.items
