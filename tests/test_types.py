import sys
from dataclasses import InitVar
from typing import Optional, Union, List, Any, Dict, NewType, TypeVar, Generic, Collection, Tuple

if sys.version_info >= (3, 8):
    from typing import Literal
elif sys.version_info < (3, 8) and sys.version_info > (3, 6):
    from typing_extensions import Literal

import pytest

from dacite.types import (
    is_optional,
    extract_optional,
    is_generic,
    is_union,
    is_generic_collection,
    extract_origin_collection,
    is_instance,
    extract_generic,
    is_new_type,
    extract_new_type,
    transform_value,
    is_literal,
    is_init_var,
)
from tests.common import literal_support, init_var_type_support


def test_is_union_with_union():
    assert is_union(Union[int, float])


def test_is_union_with_non_union():
    assert not is_union(int)


@literal_support
def test_is_literal_with_literal():
    assert is_literal(Literal["A", "B"])


def test_is_literal_with_non_literal():
    assert not is_literal(int)


def test_is_init_var_with_init_var():
    assert is_init_var(InitVar[int])


def test_is_init_var_with_non_init_var():
    assert not is_init_var(int)


def test_is_optional_with_optional():
    assert is_optional(Optional[int])


def test_is_optional_with_non_optional():
    assert not is_optional(int)


def test_is_optional_with_optional_of_union():
    assert is_optional(Optional[Union[int, float]])


def test_extract_optional():
    assert extract_optional(Optional[int]) == int


def test_extract_optional_with_wrong_type():
    with pytest.raises(ValueError):
        extract_optional(List[None])


def test_is_generic_with_generic():
    assert is_generic(Optional[int])


def test_is_generic_with_non_generic():
    assert not is_generic(int)


def test_is_generic_collection_with_generic_collection():
    assert is_generic_collection(List[int])


def test_is_generic_collection_with_non_generic_collection():
    assert not is_generic_collection(list)


def test_is_generic_collection_with_union():
    assert not is_generic_collection(Union[int, str])


def test_extract_generic_collection():
    assert extract_origin_collection(List[int]) == list


def test_is_new_type_with_new_type():
    assert is_new_type(NewType("NewType", int))


def test_is_new_type_with_non_new_type():
    assert not is_new_type(int)


def test_extract_new_type():
    assert extract_new_type(NewType("NewType", int)) == int


def test_is_instance_with_built_in_type_and_matching_value_type():
    assert is_instance(1, int)


def test_is_instance_with_built_in_type_and_not_matching_value_type():
    assert not is_instance("test", int)


def test_is_instance_with_union_and_matching_value_type():
    assert is_instance(1, Union[int, float])


def test_is_instance_with_union_and_not_matching_value_type():
    assert not is_instance("test", Union[int, float])


def test_is_instance_with_optional_and_matching_value_type():
    assert is_instance(1, Optional[int])


def test_is_instance_with_optional_and_not_matching_value_type():
    assert not is_instance(1, Optional[str])


def test_is_instance_with_generic_collection_and_matching_value_type():
    assert is_instance([1], List[int])


def test_is_instance_with_generic_collection_and_not_matching_item_type():
    assert not is_instance(["test"], List[int])


def test_is_instance_with_nested_generic_collection_and_matching_value_type():
    assert is_instance([[1]], List[List[int]])


def test_is_instance_with_nested_generic_collection_and_not_matching_item_type():
    assert not is_instance([["test"]], List[List[int]])


def test_is_instance_with_generic_collection_without_specified_inner_types_and_matching_value_type():
    assert is_instance([1], List)


def test_is_instance_with_generic_collection_without_specified_inner_types_and_not_matching_value_type():
    assert not is_instance([1], Dict)


def test_is_instance_with_generic_abstract_collection_and_matching_value_type():
    assert is_instance([1], Collection[int])


def test_is_instance_with_generic_collection_and_not_matching_value_type():
    assert not is_instance({1}, List[int])


def test_is_instance_with_any_type():
    assert is_instance(1, Any)


def test_is_instance_with_new_type_and_matching_value_type():
    assert is_instance("test", NewType("MyStr", str))


def test_is_instance_with_new_type_and_not_matching_value_type():
    assert not is_instance(1, NewType("MyStr", str))


@init_var_type_support
def test_is_instance_with_init_var_and_matching_value_type():
    assert is_instance(1, InitVar[int])


@init_var_type_support
def test_is_instance_with_init_var_and_not_matching_value_type():
    assert not is_instance(1, InitVar[str])


def test_is_instance_with_not_supported_generic_types():
    T = TypeVar("T")

    class X(Generic[T]):
        pass

    assert not is_instance(X[str](), X[str])


def test_is_instance_with_generic_mapping_and_matching_value_type():
    assert is_instance({"test": 1}, Dict[str, int])


def test_is_instance_with_generic_mapping_and_not_matching_mapping_key_type():
    assert not is_instance({1: 1}, Dict[str, int])


def test_is_instance_with_generic_mapping_and_not_matching_mapping_value_type():
    assert not is_instance({"test": "test"}, Dict[str, int])


def test_is_instance_with_numeric_tower():
    assert is_instance(1, float)


def test_is_instance_with_numeric_tower_and_optional():
    assert is_instance(1, Optional[float])


def test_is_instance_with_numeric_tower_and_new_type():
    assert is_instance(1, NewType("NewType", float))


@literal_support
def test_is_instance_with_literal_and_matching_type():
    assert is_instance("A", Literal["A", "B"])


@literal_support
def test_is_instance_with_literal_and_not_matching_type():
    assert not is_instance("C", Literal["A", "B"])


@literal_support
def test_is_instance_with_optional_literal_and_matching_type():
    assert is_instance("A", Optional[Literal["A", "B"]])


@literal_support
def test_is_instance_with_optional_literal_and_not_matching_type():
    assert not is_instance("C", Optional[Literal["A", "B"]])


@literal_support
def test_is_instance_with_optional_literal_and_none():
    assert is_instance(None, Optional[Literal["A", "B"]])


def test_is_instance_with_tuple_and_matching_type():
    assert is_instance((1, "test"), Tuple[int, str])


def test_is_instance_with_tuple_and_not_matching_type():
    assert not is_instance((1, 2), Tuple[int, str])


def test_is_instance_with_variable_length_tuple_and_matching_type():
    assert is_instance((1, 2, 3), Tuple[int, ...])


def test_is_instance_with_variable_length_tuple_and_not_matching_type():
    assert not is_instance((1, 2, "test"), Tuple[int, ...])


def test_is_instance_with_empty_tuple_and_matching_type():
    assert is_instance((), Tuple[()])


def test_is_instance_with_empty_tuple_and_not_matching_type():
    assert not is_instance((1, 2), Tuple[()])


def test_extract_generic():
    assert extract_generic(List[int]) == (int,)


def test_transform_value_without_matching_type():
    assert transform_value({}, [], str, 1) == 1


def test_transform_value_with_matching_type():
    assert transform_value({int: lambda x: x + 1}, [], int, 1) == 2


def test_transform_value_with_optional_and_not_none_value():
    assert transform_value({str: str}, [], Optional[str], 1) == "1"


def test_transform_value_with_optional_and_none_value():
    assert transform_value({str: str}, [], Optional[str], None) is None


def test_transform_value_with_optional_and_exact_matching_type():
    assert transform_value({Optional[str]: str}, [], Optional[str], None) == "None"


def test_transform_value_with_generic_sequence_and_matching_item():
    assert transform_value({str: str}, [], List[str], [1]) == ["1"]


def test_transform_value_with_generic_sequence_and_matching_sequence():
    assert transform_value({List[int]: lambda x: list(reversed(x))}, [], List[int], [1, 2]) == [2, 1]


def test_transform_value_with_generic_sequence_and_matching_both_item_and_sequence():
    assert transform_value({List[int]: lambda x: list(reversed(x)), int: int}, [], List[int], ["1", "2"]) == [2, 1]


def test_transform_value_without_matching_generic_sequence():
    assert transform_value({}, [], List[int], {1}) == {1}


def test_transform_value_with_nested_generic_sequence():
    assert transform_value({str: str}, [], List[List[str]], [[1]]) == [["1"]]


def test_transform_value_with_generic_abstract_collection():
    assert transform_value({str: str}, [], Collection[str], [1]) == ["1"]


def test_transform_value_with_generic_mapping():
    assert transform_value({str: str, int: int}, [], Dict[str, int], {1: "2"}) == {"1": 2}


def test_transform_value_with_nested_generic_mapping():
    assert transform_value({str: str, int: int}, [], Dict[str, Dict[str, int]], {1: {2: "3"}}) == {"1": {"2": 3}}


def test_transform_value_with_new_type():
    MyStr = NewType("MyStr", str)

    assert transform_value({MyStr: str.upper, str: str.lower}, [], MyStr, "Test") == "TEST"


def test_transform_value_with_cast_matching_type():
    assert transform_value({}, [int], int, "1") == 1


def test_transform_value_with_cast_matching_base_class():
    class MyInt(int):
        pass

    assert transform_value({}, [int], MyInt, "1") == 1
