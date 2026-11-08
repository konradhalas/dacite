from dataclasses import dataclass
from typing import Any, Dict, Generic, List, Optional, TypeVar, Union

import pytest

from dacite import Config, StrictUnionMatchError, UnionMatchError, from_dict


@pytest.mark.parametrize("strict", [False, True])
@pytest.mark.parametrize("check_types", [False, True])
@pytest.mark.parametrize("raw", ["#123", "hello"])
def test_union_type_hook_preserves_constructed_member(raw, strict, check_types):
    @dataclass
    class Foo:
        id: int

    @dataclass
    class Bar:
        name: str

    @dataclass
    class Data:
        value: Union[Foo, Bar]

    expected = Foo(123) if raw.startswith("#") else Bar(raw)
    calls = []

    def union_hook(value):
        calls.append(value)
        return expected

    def member_hook(value):
        calls.append(value)
        return Bar(value)

    result = from_dict(
        Data,
        {"value": raw},
        Config(
            type_hooks={Union[Foo, Bar]: union_hook, Foo: member_hook, Bar: member_hook},
            strict_unions_match=strict,
            check_types=check_types,
        ),
    )

    assert result.value is expected
    assert calls == [raw]


@pytest.mark.parametrize("strict", [False, True])
@pytest.mark.parametrize("optional", [False, True])
def test_union_type_hook_preserves_completed_collection(strict, optional):
    annotation = Optional[List[str]] if optional else Union[List[str], int]

    @dataclass
    class Data:
        value: annotation

    expected = ["MiXeD"]
    result = from_dict(
        Data,
        {"value": "raw"},
        Config(type_hooks={annotation: lambda _: expected, str: str.lower}, strict_unions_match=strict),
    )

    assert result.value is expected
    assert expected == ["MiXeD"]


@pytest.mark.parametrize("annotation", [Union[int, float], Union[int, Any], Union[List[int], List[str]]])
def test_union_type_hook_still_rejects_ambiguous_matches(annotation):
    @dataclass
    class Data:
        value: annotation

    value = [] if annotation == Union[List[int], List[str]] else 1
    with pytest.raises(StrictUnionMatchError) as error:
        from_dict(Data, {"value": "raw"}, Config(type_hooks={annotation: lambda _: value}, strict_unions_match=True))

    assert error.value.field_path == "value"
    assert len(error.value.union_matches) == 2
    assert all(match is value for match in error.value.union_matches.values())


@pytest.mark.parametrize("strict", [False, True])
def test_union_type_hook_still_builds_unfinished_dataclass(strict):
    @dataclass
    class Foo:
        id: int

    @dataclass
    class Data:
        value: Union[Foo, int]

    result = from_dict(
        Data,
        {"value": "123"},
        Config(type_hooks={Union[Foo, int]: lambda value: {"id": value}, int: int}, strict_unions_match=strict),
    )

    assert result == Data(Foo(123))


@pytest.mark.parametrize("annotation", [Union[List[int], int], Union[Dict[str, int], int]])
def test_union_type_hook_still_builds_unfinished_collection(annotation):
    @dataclass
    class Data:
        value: annotation

    mapping = annotation == Union[Dict[str, int], int]
    value = {"id": "123"} if mapping else ["123"]
    expected = {"id": 123} if mapping else [123]
    result = from_dict(Data, {"value": "raw"}, Config(type_hooks={annotation: lambda _: value, int: int}))

    assert result.value == expected


@pytest.mark.parametrize("strict", [False, True])
@pytest.mark.parametrize("value", [None, "MiXeD"])
def test_optional_type_hook_preserves_completed_value(strict, value):
    @dataclass
    class Data:
        value: Optional[str]

    result = from_dict(
        Data,
        {"value": "raw"},
        Config(type_hooks={Optional[str]: lambda _: value, str: str.lower}, strict_unions_match=strict),
    )

    assert result.value is value


def test_union_without_whole_type_hook_still_converts_members_in_order():
    @dataclass
    class First:
        value: str

    @dataclass
    class Second:
        value: str

    @dataclass
    class Data:
        value: Union[First, Second]

    result = from_dict(Data, {"value": Second("raw")}, Config(type_hooks={First: lambda value: First(value.value)}))

    assert result.value == First("raw")


def test_union_type_hook_can_select_a_later_member():
    @dataclass
    class Data:
        value: Union[int, str]

    result = from_dict(Data, {"value": "123"}, Config(type_hooks={Union[int, str]: str, int: int}))

    assert result.value == "123"


def test_union_type_hook_preserves_generic_dataclass():
    type_var = TypeVar("type_var")

    @dataclass
    class Foo(Generic[type_var]):
        value: type_var

    @dataclass
    class Data:
        value: Union[Foo[int], str]

    expected = Foo(123)
    result = from_dict(
        Data,
        {"value": 123},
        Config(type_hooks={Union[Foo[int], str]: lambda _: expected, Foo[int]: lambda _: Foo(456)}),
    )

    assert result.value is expected


@pytest.mark.parametrize("check_types", [False, True])
def test_union_type_hook_still_checks_invalid_results(check_types):
    @dataclass
    class Data:
        value: Union[int, str]

    config = Config(type_hooks={Union[int, str]: lambda _: []}, check_types=check_types)
    if check_types:
        with pytest.raises(UnionMatchError):
            from_dict(Data, {"value": "raw"}, config)
    else:
        assert from_dict(Data, {"value": "raw"}, config).value == []


def test_union_type_hook_exception_is_not_swallowed():
    @dataclass
    class Data:
        value: Union[int, str]

    def fail(_):
        raise ValueError("invalid input")

    with pytest.raises(ValueError, match="invalid input"):
        from_dict(Data, {"value": "raw"}, Config(type_hooks={Union[int, str]: fail}))
