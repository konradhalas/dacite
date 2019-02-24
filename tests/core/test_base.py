import pytest
from dataclasses import dataclass, field
from typing import Any

from dacite import from_dict, MissingValueError, WrongTypeError


def test_from_dict_with_correct_data():
    @dataclass
    class X:
        s: str
        i: int
        f: float

    result = from_dict(X, {'s': 'test', 'i': 1, 'f': 1.0})

    assert result == X(s='test', i=1, f=1.0)


def test_from_dict_with_default_value():
    @dataclass
    class X:
        s: str
        i: int = 0

    result = from_dict(X, {'s': 'test'})

    assert result == X(s='test', i=0)


def test_from_dict_with_default_factory():
    @dataclass
    class X:
        s: str
        i: int = field(default_factory=lambda: 42)

    result = from_dict(X, {'s': 'test'})

    assert result == X(s='test', i=42)


def test_from_dict_with_wrong_type():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {'s': 'test', 'i': 'wrong'})

    assert exception_info.value.field_path == 'i'
    assert exception_info.value.field_type == int
    assert exception_info.value.value == 'wrong'


def test_from_dict_with_missing_value():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(MissingValueError) as exception_info:
        from_dict(X, {'s': 'test'})

    assert exception_info.value.field_path == 'i'


def test_from_dict_with_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = from_dict(Y, {'s': 'test', 'x': {'i': 1}})

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_missing_value_of_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    with pytest.raises(MissingValueError) as exception_info:
        from_dict(Y, {'x': {}})

    assert exception_info.value.field_path == 'x.i'


def test_from_dict_with_additional_values():
    @dataclass
    class X:
        i: int

    result = from_dict(X, {'i': 1, 's': 'extra'})

    assert result == X(i=1)


def test_from_dict_with_any():
    @dataclass
    class X:
        i: Any

    result = from_dict(X, {'i': 1})

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
    x.s = 'test'

    result = from_dict(X, {'s': 'test'})

    assert result == x
