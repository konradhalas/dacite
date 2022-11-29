from dataclasses import dataclass
from typing import Sequence, TypeVar
import pytest

try:
    import numpy
    import numpy.typing
    import numpy.testing
except ImportError:
    pytest.skip("numpy not available", allow_module_level=True)

from dacite import from_dict, Config
from tests.common import ndarray_support


@ndarray_support
def test_from_dict_with_ndarray():
    @dataclass
    class X:
        a: numpy.ndarray

    result = from_dict(X, {"a": numpy.array([1, 2, 3])})

    numpy.testing.assert_allclose(result.a, numpy.array([1, 2, 3]))


@ndarray_support
def test_from_dict_with_nptndarray():
    @dataclass
    class X:
        a: numpy.typing.NDArray[numpy.float64]

    result = from_dict(X, {"a": numpy.array([1, 2, 3])})

    numpy.testing.assert_allclose(result.a, numpy.array([1, 2, 3]))


@ndarray_support
def test_from_dict_with_nptndarray_and_converter():
    @dataclass
    class X:
        a: numpy.typing.NDArray[numpy.float64]

    D = TypeVar("D", bound=numpy.generic)

    def coerce_to_array(s: Sequence[D]) -> numpy.typing.NDArray[D]:
        return numpy.array(s)

    result = from_dict(X, {"a": [1, 2, 3]}, Config(type_hooks={numpy.typing.NDArray[numpy.float64]: coerce_to_array}))

    numpy.testing.assert_allclose(result.a, numpy.array([1, 2, 3]))
