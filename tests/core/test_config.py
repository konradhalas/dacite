from dataclasses import dataclass
from typing import Optional, List, Union, Dict

import pytest

from dacite import from_dict, Config, InvalidConfigurationError, ForwardReferenceError


def test_from_dict_with_cast():
    @dataclass
    class X:
        i: int
        s: str

    result = from_dict(X, {"s": "test", "i": "1"}, Config(cast=["i"]))

    assert result == X(s="test", i=1)


def test_from_dict_with_nested_cast():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    result = from_dict(Y, {"x": {"i": "1"}}, Config(cast=["x.i"]))

    assert result == Y(x=X(i=1))


def test_from_dict_with_cast_of_existing_optional_field():
    @dataclass
    class X:
        i: Optional[int]
        s: str

    result = from_dict(X, {"s": "test", "i": "1"}, Config(cast=["i"]))

    assert result == X(s="test", i=1)


def test_from_dict_with_cast_of_missing_optional_field():
    @dataclass
    class X:
        i: Optional[int]
        s: str

    result = from_dict(X, {"s": "test"}, Config(cast=["i"]))

    assert result == X(s="test", i=None)


def test_from_dict_with_cast_of_list():
    @dataclass
    class X:
        i_list: List[int]

    result = from_dict(X, {"i_list": ["1", "2"]}, Config(cast=["i_list"]))

    assert result == X(i_list=[1, 2])


def test_from_dict_with_cast_of_optional_list():
    @dataclass
    class X:
        i_list: Optional[List[int]]

    result = from_dict(X, {"i_list": ["1", "2"]}, Config(cast=["i_list"]))

    assert result == X(i_list=[1, 2])


def test_from_dict_with_cast_of_dict():
    @dataclass
    class X:
        i_dict: Dict[int, int]

    result = from_dict(X, {"i_dict": {"1": 2}}, Config(cast=["i_dict"]))

    assert result == X(i_dict={1: 2})


def test_from_dict_with_transform():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {"s": "TEST"}, Config(transform={"s": str.lower}))

    assert result == X(s="test")


def test_from_dict_with_nested_transform():
    @dataclass
    class X:
        s: str

    @dataclass
    class Y:
        x: X

    result = from_dict(Y, {"x": {"s": "TEST"}}, Config(transform={"x.s": str.lower}))

    assert result == Y(x=X(s="test"))


def test_from_dict_with_transform_of_existing_optional_field():
    @dataclass
    class X:
        s: Optional[str]

    result = from_dict(X, {"s": "TEST"}, Config(transform={"s": str.lower}))

    assert result == X(s="test")


def test_from_dict_with_transform_of_missing_optional_field():
    @dataclass
    class X:
        s: Optional[str]

    result = from_dict(X, {}, Config(transform={"s": str.lower}))

    assert result == X(s=None)


def test_from_dict_with_wrong_filed_name_in_config_cast():
    @dataclass
    class X:
        i: int
        s: str

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(X, {"s": "test", "i": "1"}, Config(cast=["j"]))

    assert exception_info.value.parameter == "cast"
    assert exception_info.value.value == "j"


def test_from_dict_with_wrong_filed_name_in_transform():
    @dataclass
    class X:
        s: str

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(X, {"s": "TEST"}, Config(transform={"z": str.lower}))

    assert exception_info.value.parameter == "transform"
    assert exception_info.value.value == "z"


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


def test_from_dict_with_generic_collection_and_config():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        l: List[X]

    result = from_dict(Y, {"l": [{"i": "1"}]}, config=Config(transform={"l.i": int}))

    assert result == Y(l=[X(i=1)])


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
