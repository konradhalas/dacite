from dataclasses import dataclass
from enum import Enum
from typing import Optional, List, Union

import pytest

from dacite import (
    from_dict,
    Config,
    ForwardReferenceError,
    UnexpectedDataError,
    StrictUnionMatchError,
)


def test_from_dict_with_type_hooks():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks={str: str.lower}))

    assert result == X(s="test")


def test_from_dict_with_type_hooks_and_optional():
    @dataclass
    class X:
        s: Optional[str]

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks={str: str.lower}))

    assert result == X(s="test")


def test_from_dict_with_type_hooks_and_union():
    @dataclass
    class X:
        s: Union[str, int]

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks={str: str.lower}))

    assert result == X(s="test")


def test_from_dict_with_cast():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {"s": 1}, Config(cast=[str]))

    assert result == X(s="1")


def test_from_dict_with_base_class_cast():
    class E(Enum):
        A = "a"

    @dataclass
    class X:
        e: E

    result = from_dict(X, {"e": "a"}, Config(cast=[Enum]))

    assert result == X(e=E.A)


def test_from_dict_with_base_class_cast_and_optional():
    class E(Enum):
        A = "a"

    @dataclass
    class X:
        e: Optional[E]

    result = from_dict(X, {"e": "a"}, Config(cast=[Enum]))

    assert result == X(e=E.A)


def test_from_dict_with_cast_and_generic_collection():
    @dataclass
    class X:
        s: List[int]

    result = from_dict(X, {"s": (1,)}, Config(cast=[List]))

    assert result == X(s=[1])


def test_from_dict_with_type_hooks_and_generic_sequence():
    @dataclass
    class X:
        c: List[str]

    result = from_dict(X, {"c": ["TEST"]}, config=Config(type_hooks={str: str.lower}))

    assert result == X(c=["test"])


def test_from_dict_with_type_hook_exception():
    @dataclass
    class X:
        i: int

    def raise_error(_):
        raise KeyError()

    with pytest.raises(KeyError):
        from_dict(X, {"i": 1}, config=Config(type_hooks={int: raise_error}))


def test_from_dict_with_forward_reference():
    @dataclass
    class X:
        y: "Y"

    @dataclass
    class Y:
        s: str

    data = from_dict(X, {"y": {"s": "text"}}, Config(forward_references={"Y": Y}))
    assert data == X(Y("text"))


def test_from_dict_with_missing_forward_reference():
    @dataclass
    class X:
        y: "Y"

    @dataclass
    class Y:
        s: str

    with pytest.raises(ForwardReferenceError) as exception_info:
        from_dict(X, {"y": {"s": "text"}})

    assert str(exception_info.value) == "can not resolve forward reference: name 'Y' is not defined"


def test_form_dict_with_disabled_type_checking():
    @dataclass
    class X:
        i: int

    result = from_dict(X, {"i": "test"}, config=Config(check_types=False))

    # noinspection PyTypeChecker
    assert result == X(i="test")


def test_form_dict_with_disabled_type_checking_and_union():
    @dataclass
    class X:
        i: Union[int, float]

    result = from_dict(X, {"i": "test"}, config=Config(check_types=False))

    # noinspection PyTypeChecker
    assert result == X(i="test")


def test_from_dict_with_strict():
    @dataclass
    class X:
        s: str

    with pytest.raises(UnexpectedDataError) as exception_info:
        from_dict(X, {"s": "test", "i": 1}, Config(strict=True))

    assert str(exception_info.value) == 'can not match "i" to any data class field'


def test_from_dict_with_strict_unions_match_and_ambiguous_match():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        i: int

    @dataclass
    class Z:
        u: Union[X, Y]

    data = {
        "u": {"i": 1},
    }

    with pytest.raises(StrictUnionMatchError) as exception_info:
        from_dict(Z, data, Config(strict_unions_match=True))

    assert str(exception_info.value) == 'can not choose between possible Union matches for field "u": X, Y'


def test_from_dict_with_strict_unions_match_and_single_match():
    @dataclass
    class X:
        f: str

    @dataclass
    class Y:
        f: int

    @dataclass
    class Z:
        u: Union[X, Y]

    data = {
        "u": {"f": 1},
    }

    result = from_dict(Z, data, Config(strict_unions_match=True))

    assert result == Z(u=Y(f=1))
