from typing import Optional, List

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
    t: str
    a: A


@dataclass
class C:
    b: B


@dataclass
class D:
    s: Optional[str]
    i: int


@dataclass
class E:
    l: List[int]


@dataclass
class F:
    a: Optional[A]


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
    result = make(B, {'t': 'test', 'a': {'s': 'test', 'i': 1}})

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_with_additional_values():
    result = make(A, {'s': 'test', 'i': 1, 'x': 'extra'})

    assert result == A(s='test', i=1)


def test_make_with_rename():
    result = make(A, {'s': 'test', 'j': 1}, rename={'i': 'j'})

    assert result == A(s='test', i=1)


def test_make_with_nested_rename():
    result = make(B, {'t': 'test', 'a': {'s': 'test', 'j': 1}}, rename={'a.i': 'j'})

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_with_prefix():
    result = make(B, {'t': 'test', 'a_s': 'test', 'a_i': 1}, prefixed={'a': 'a_'})

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_with_nested_prefix():
    result = make(C, {'b': {'t': 'test', 'a_s': 'test', 'a_i': 1}}, prefixed={'b.a': 'a_'})

    assert result == C(b=B(t='test', a=A(s='test', i=1)))


def test_make_with_prefix_and_rename():
    result = make(B, {'t': 'test', 'a_s': 'test', 'a_j': 1}, prefixed={'a': 'a_'}, rename={'a.i': 'j'})

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_with_optional_value():
    result = make(D, {'s': 'test', 'i': 1})

    assert result == D(s='test', i=1)


def test_make_with_missing_optional_value():
    result = make(D, {'i': 1})

    assert result == D(s=None, i=1)


def test_make_with_wrong_type_of_optional_value():
    with pytest.raises(TypeError):
        make(D, {'s': 1, 'i': 1})


def test_make_with_generic():
    result = make(E, {'l': [1]})

    assert result == E(l=[1])


def test_make_with_optional_nested_data_class():
    result = make(F, {'a': {'s': 'test', 'i': 1}})

    assert result == F(a=A(s='test', i=1))


def test_make_with_cast():
    result = make(A, {'s': 'test', 'i': '1'}, cast=['i'])

    assert result == A(s='test', i=1)


def test_make_with_nested_cast():
    result = make(B, {'t': 'test', 'a': {'s': 'test', 'i': '1'}}, cast=['a.i'])

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_with_transform():
    result = make(A, {'s': 'TEST', 'i': 1}, transform={'s': str.lower})

    assert result == A(s='test', i=1)


def test_make_with_nested_transform():
    result = make(B, {'t': 'test', 'a': {'s': 'TEST', 'i': 1}}, transform={'a.s': str.lower})

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_with_flat():
    result = make(B, {'t': 'test', 's': 'test', 'i': 1}, flattened=['a'])

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_with_nested_flat():
    result = make(C, {'b': {'t': 'test', 's': 'test', 'i': 1}}, flattened=['b.a'])

    assert result == C(b=B(t='test', a=A(s='test', i=1)))


def test_make_with_flat_and_rename():
    result = make(B, {'t': 'test', 's': 'test', 'j': 1}, flattened=['a'], rename={'a.i': 'j'})

    assert result == B(t='test', a=A(s='test', i=1))


def test_make_from_multiple_dicts():
    result = make(A, [{'s': 'test'}, {'i': 1, 'f': 1.0}])

    assert isinstance(result, A)
    assert result == A(s='test', i=1, f=1.0)
