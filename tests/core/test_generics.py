from dataclasses import dataclass
from typing import Generic, List, TypeVar
from dacite import from_dict

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
