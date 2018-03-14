from typing import Optional, List, Set

import pytest
from dataclasses import dataclass

from dacite import make, Config


def test_make_from_correct_data():
    @dataclass
    class X:
        s: str
        i: int
        f: float

    result = make(X, {'s': 'test', 'i': 1, 'f': 1.0})

    assert isinstance(result, X)
    assert result == X(s='test', i=1, f=1.0)


def test_make_with_default_value():
    @dataclass
    class X:
        s: str
        i: int = 0

    result = make(X, {'s': 'test'})

    assert result == X(s='test', i=0)


def test_make_from_incorrect_data():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(TypeError):
        make(X, {'s': 'test', 'i': 'wrong'})


def test_make_without_required_value():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(ValueError, message='missing value for field i'):
        make(X, {'s': 'test'})


def test_make_with_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = make(Y, {'s': 'test', 'x': {'i': 1}})

    assert result == Y(s='test', x=X(i=1))


def test_make_with_additional_values():
    @dataclass
    class X:
        i: int

    result = make(X, {'i': 1, 's': 'extra'})

    assert result == X(i=1)


def test_make_with_rename():
    @dataclass
    class X:
        s: str
        i: int

    result = make(X, {'s': 'test', 'j': 1}, Config(rename={'i': 'j'}))

    assert result == X(s='test', i=1)


def test_make_with_nested_rename():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = make(Y, {'s': 'test', 'x': {'j': 1}}, Config(rename={'x.i': 'j'}))

    assert result == Y(s='test', x=X(i=1))


def test_make_with_prefix():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = make(Y, {'s': 'test', 'x_i': 1}, Config(prefixed={'x': 'x_'}))

    assert result == Y(s='test', x=X(i=1))


def test_make_with_nested_prefix():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    @dataclass
    class Z:
        y: Y

    result = make(Z, {'y': {'x_i': 1}}, Config(prefixed={'y.x': 'x_'}))

    assert result == Z(y=Y(x=X(i=1)))


def test_make_with_prefix_and_rename():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    result = make(Y, {'x_j': 1}, Config(prefixed={'x': 'x_'}, rename={'x.i': 'j'}))

    assert result == Y(x=X(i=1))


def test_make_with_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = make(X, {'s': 'test', 'i': 1})

    assert result == X(s='test', i=1)


def test_make_with_missing_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = make(X, {'i': 1})

    assert result == X(s=None, i=1)


def test_make_with_none_for_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = make(X, {'s': None, 'i': 1})

    assert result == X(s=None, i=1)


def test_make_with_wrong_type_of_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    with pytest.raises(TypeError):
        make(X, {'s': 1, 'i': 1})


def test_make_with_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = make(Y, {'x': {'i': 1}})

    assert result == Y(x=X(i=1))


def test_make_with_null_for_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = make(Y, {'x': None})

    assert result == Y(x=None)


def test_make_with_missing_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = make(Y, {})

    assert result == Y(x=None)


def test_make_with_generic():
    @dataclass
    class X:
        l: List[int]

    result = make(X, {'l': [1]})

    assert result == X(l=[1])


def test_make_with_cast():
    @dataclass
    class X:
        i: int
        s: str

    result = make(X, {'s': 'test', 'i': '1'}, Config(cast=['i']))

    assert result == X(s='test', i=1)


def test_make_with_nested_cast():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    result = make(Y, {'x': {'i': '1'}}, Config(cast=['x.i']))

    assert result == Y(x=X(i=1))


def test_make_with_transform():
    @dataclass
    class X:
        s: str

    result = make(X, {'s': 'TEST'}, Config(transform={'s': str.lower}))

    assert result == X(s='test')


def test_make_with_nested_transform():
    @dataclass
    class X:
        s: str

    @dataclass
    class Y:
        x: X

    result = make(Y, {'x': {'s': 'TEST'}}, Config(transform={'x.s': str.lower}))

    assert result == Y(x=X(s='test'))


def test_make_with_flat():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = make(Y, {'s': 'test', 'i': 1}, Config(flattened=['x']))

    assert result == Y(s='test', x=X(i=1))


def test_make_with_nested_flat():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    @dataclass
    class Z:
        y: Y

    result = make(Z, {'y': {'i': 1}}, Config(flattened=['y.x']))

    assert result == Z(y=Y(x=X(i=1)))


def test_make_with_flat_and_rename():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = make(Y, {'s': 'test', 'j': 1}, Config(flattened=['x'], rename={'x.i': 'j'}))

    assert result == Y(s='test', x=X(i=1))


def test_make_from_multiple_dicts():
    @dataclass
    class X:
        s: str
        i: int
        f: float

    result = make(X, [{'s': 'test'}, {'i': 1, 'f': 1.0}])

    assert result == X(s='test', i=1, f=1.0)


def test_make_with_list_of_dataclasses():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x_list: List[X]

    result = make(Y, {'x_list': [{'i': 1}, {'i': 2}]})

    assert result == Y(x_list=[X(i=1), X(i=2)])


def test_make_with_set_of_dataclasses():
    @dataclass(frozen=True)
    class X:
        i: int

    @dataclass
    class Y:
        x_set: Set[X]

    result = make(Y, {'x_set': [{'i': 1}, {'i': 2}]})

    assert result == Y(x_set={X(i=1), X(i=2)})
