from dataclasses import dataclass
from typing import Optional, List, Union, Dict

import pytest

from dacite import from_dict, UnionMatchError


def test_from_dict_with_union_of_builtin_types():
    @dataclass
    class X:
        i: Union[int, str]

    result = from_dict(X, {"i": "s"})

    assert result == X(i="s")


def test_from_dict_with_union_of_data_classes():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str

    @dataclass
    class Z:
        x_or_y: Union[X, Y]

    result = from_dict(Z, {"x_or_y": {"s": "test"}})

    assert result == Z(x_or_y=Y(s="test"))


def test_from_dict_with_union_and_wrong_data():
    @dataclass
    class X:
        i: Union[int, str]

    with pytest.raises(UnionMatchError) as exception_info:
        from_dict(X, {"i": 1.0})

    assert str(exception_info.value) == 'can not match type "float" to any type of "i" union: typing.Union[int, str]'
    assert exception_info.value.field_path == "i"
    assert exception_info.value.field_type == Union[int, str]
    assert exception_info.value.value == 1.0


def test_from_dict_with_union_of_data_classes_and_wrong_data():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str

    @dataclass
    class Z:
        x_or_y: Union[X, Y]

    with pytest.raises(UnionMatchError) as exception_info:
        from_dict(Z, {"x_or_y": {"f": 2.0}})

    assert exception_info.value.field_path == "x_or_y"
    assert exception_info.value.field_type == Union[X, Y]
    assert exception_info.value.value == {"f": 2.0}


def test_from_dict_with_union_of_generic_collecionts_of_data_classes():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str

    @dataclass
    class Z:
        x_or_y: Union[List[X], List[Y]]

    result = from_dict(Z, {"x_or_y": [{"s": "test"}]})

    assert result == Z(x_or_y=[Y(s="test")])


def test_from_dict_with_union_and_optional():
    @dataclass
    class X:
        i: Union[int, Optional[str]]

    result = from_dict(X, {"i": "s"})

    assert result == X(i="s")


def test_from_dict_with_union_and_optional_and_missing_value():
    @dataclass
    class X:
        i: Union[int, Optional[str]]

    result = from_dict(X, {})
    assert result == X(i=None)


def test_from_dict_with_union_and_optional_and_none_value():
    @dataclass
    class X:
        i: Union[int, Optional[str]]

    result = from_dict(X, {"i": None})
    assert result == X(i=None)


def test_from_dict_with_union_and_optional_and_wrong_value():
    @dataclass
    class X:
        i: Union[int, Optional[str]]

    with pytest.raises(UnionMatchError) as exception_info:
        from_dict(X, {"i": 1.0})

    assert exception_info.value.field_path == "i"
    assert exception_info.value.field_type == Union[int, str, None]
    assert exception_info.value.value == 1.0


def test_from_dict_with_union_of_mixed_types_and_builtin_type_as_a_result():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        u: Union[X, List[X], str]

    result = from_dict(Y, {"u": "test"})

    assert result == Y(u="test")


def test_from_dict_with_union_of_mixed_types_and_data_class_as_a_result():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        u: Union[str, List[X], X]

    result = from_dict(Y, {"u": {"i": 1}})

    assert result == Y(u=X(i=1))


def test_from_dict_with_union_of_mixed_types_and_collection_of_data_classes_as_a_result():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        u: Union[str, X, List[X]]

    result = from_dict(Y, {"u": [{"i": 1}]})

    assert result == Y(u=[X(i=1)])


def test_from_dict_with_union_of_mixed_types_and_dict_of_data_classes_as_a_result():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        d: Union[int, List[X], Dict[str, X]]

    result = from_dict(Y, {"d": {"x": {"i": 42}, "z": {"i": 37}}})

    assert result == Y(d={"x": X(i=42), "z": X(i=37)})
