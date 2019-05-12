from dataclasses import dataclass
from typing import Optional, List, Union

import pytest

from dacite import from_dict, Config, ForwardReferenceError


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


def test_from_dict_with_type_hooks_and_generic_sequence():
    @dataclass
    class X:
        c: List[str]

    result = from_dict(X, {"c": ["TEST"]}, config=Config(type_hooks={str: str.lower}))

    assert result == X(c=["test"])


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
