from dataclasses import dataclass

from dacite import from_dict
from dacite.types import is_type_alias, extract_type_alias


def test_is_type_alias():
    type MyStr = str
    assert is_type_alias(MyStr)


def test_extract_type_alias():
    type MyStr = str
    assert extract_type_alias(MyStr) == str


def test_from_dict_with_type_alias():
    type MyStr = str

    @dataclass
    class X:
        s: MyStr

    result = from_dict(X, {"s": "foo"})

    assert result == X(s="foo")
