from typing import Optional

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


@dataclass
class C:
    b: B


@dataclass
class D:
    s: Optional[str]
    i: int


def test_make_from_correct_data():
    result = make(A, {'s': 'test', 'i': 1, 'f': 1.0})

    assert isinstance(result, A)
    assert result == A(s='test', i=1, f=1.0)


def test_make_with_default_value():
    result = make(A, {'s': 'test', 'i': 1})

    assert result == A(s='test', i=1, f=0.0)


def test_make_from_incorrect_data():
    with pytest.raises(TypeError):
        make(A, {'s': 'test', 'i': 'wrong'})


def test_make_without_required_value():
    with pytest.raises(ValueError, message='missing value for field i'):
        make(A, {'s': 'test'})


def test_make_with_nested_data_class():
    result = make(B, {'s': 'test', 'a': {'s': 'test', 'i': 1}})

    assert result == B(s='test', a=A(s='test', i=1))


def test_make_with_additional_values():
    result = make(A, {'s': 'test', 'i': 1, 'x': 'extra'})

    assert result == A(s='test', i=1)


def test_make_with_rename():
    result = make(A, {'s': 'test', 'j': 1}, rename={'i': 'j'})

    assert result == A(s='test', i=1)


def test_make_with_nested_rename():
    result = make(B, {'s': 'test', 'a': {'s': 'test', 'j': 1}}, rename={'a.i': 'j'})

    assert result == B(s='test', a=A(s='test', i=1))


def test_make_with_prefix():
    result = make(B, {'s': 'test', 'a_s': 'test', 'a_i': 1}, prefixed={'a': 'a_'})

    assert result == B(s='test', a=A(s='test', i=1))


def test_make_with_nested_prefix():
    result = make(C, {'b': {'s': 'test', 'a_s': 'test', 'a_i': 1}}, prefixed={'b.a': 'a_'})

    assert result == C(b=B(s='test', a=A(s='test', i=1)))


def test_make_with_prefix_and_rename():
    result = make(B, {'s': 'test', 'a_s': 'test', 'a_j': 1}, prefixed={'a': 'a_'}, rename={'a.i': 'j'})

    assert result == B(s='test', a=A(s='test', i=1))


def test_make_with_optional_value():
    result = make(D, {'i': 1})

    assert result == D(s=None, i=1)


def test_make_with_cast():
    result = make(A, {'s': 'test', 'i': '1'}, cast=['i'])

    assert result == A(s='test', i=1)


def test_make_with_nested_cast():
    result = make(B, {'s': 'test', 'a': {'s': 'test', 'i': '1'}}, cast=['a.i'])

    assert result == B(s='test', a=A(s='test', i=1))


def test_make_with_transform():
    result = make(A, {'s': 'TEST', 'i': 1}, transform={'s': str.lower})

    assert result == A(s='test', i=1)


def test_make_with_nested_transform():
    result = make(B, {'s': 'test', 'a': {'s': 'TEST', 'i': 1}}, transform={'a.s': str.lower})

    assert result == B(s='test', a=A(s='test', i=1))
