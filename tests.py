import pytest
from dataclasses import dataclass

from dacite import make


@dataclass
class A:
    s: str
    i: int
    f: float = 0.0


@dataclass
class B:
    s: str
    a: A


def test_make_from_correct_data():
    result = make(A, {'s': 'test', 'i': 1, 'f': 1.0})

    assert isinstance(result, A)
    assert result == A(s='test', i=1, f=1.0)


def test_make_with_default_value():
    result = make(A, {'s': 'test', 'i': 1})

    assert isinstance(result, A)
    assert result == A(s='test', i=1, f=0.0)


def test_make_from_incorrect_data():
    with pytest.raises(TypeError):
        make(A, {'s': 'test', 'i': 'wrong'})


def test_make_without_required_value():
    with pytest.raises(ValueError):
        make(A, {'s': 'test'})


def test_make_with_a_inner_data_class():
    result = make(B, {'s': 'test', 'a': {'s': 'test', 'i': 1}})

    assert isinstance(result, B)
    assert result.s == 'test'
    assert result.a == A(s='test', i=1)
