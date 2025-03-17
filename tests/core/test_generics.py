from dataclasses import dataclass
from typing import Generic, List, TypeVar, get_type_hints
from dacite import from_dict

from tests.common import pep_604_support

T = TypeVar("T")
U = TypeVar("U")


@dataclass
class X:
    a: str


@dataclass
class A(Generic[T, U]):
    x: T
    y: List[U]


def test_multi_generic():
    data = {
        "x": {
            "a": "foo",
        },
        "y": [1, 2, 3],
    }

    result = from_dict(data_class=A[X, int], data=data)

    assert result == A(x=X(a="foo"), y=[1, 2, 3])

    # assert that the typing object hasn't been modified in-place
    hints = get_type_hints(A)
    assert hints["x"].__class__ is TypeVar


def test_generic_parent():
    @dataclass
    class B(A[X, int]):
        z: str

    data = {
        "x": {
            "a": "foo",
        },
        "y": [1, 2, 3],
        "z": "bar",
    }

    result = from_dict(data_class=B, data=data)

    assert result == B(x=X(a="foo"), y=[1, 2, 3], z="bar")


def test_generic_field():
    @dataclass
    class C:
        z: A[X, int]

    data = {
        "z": {
            "x": {
                "a": "foo",
            },
            "y": [1, 2, 3],
        }
    }

    result = from_dict(data_class=C, data=data)

    assert result == C(z=A(x=X(a="foo"), y=[1, 2, 3]))


@pep_604_support
def test_pep604():
    @dataclass
    class D(Generic[T]):
        x: list[T] | int | None  # pylint: disable=unsupported-binary-operation

    data = {"x": [{"a": "foo"}, {"a": "bar"}]}

    result = from_dict(data_class=D[X], data=data)

    assert result == D[X](x=[X(a="foo"), X(a="bar")])
