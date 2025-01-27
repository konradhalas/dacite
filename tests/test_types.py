from dataclasses import InitVar
from sys import version_info
from typing import Optional, Union, List, Any, Dict, NewType, TypeVar, Generic, Collection, Tuple, Type
from unittest.mock import patch, Mock

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
    is_literal,
    is_init_var,
    extract_init_var,
    is_type_generic,
    is_tuple,
)
from tests.common import (
    literal_support,
    init_var_type_support,
    pep_604_support,
    type_hints_with_generic_collections_support,
)


def test_is_union_with_union():
    assert is_union(Union[int, float])


def test_is_union_with_non_union():
    assert not is_union(int)


def test_is_union_with_import_error():
    with patch("builtins.__import__") as mock_import:
        mock_import.side_effect = ImportError()
        assert not is_union(str)


def test_is_tuple_with_tuple():
    assert is_tuple(Tuple[int, float, str])


def test_is_tuple_with_variable_length_tuple():
    assert is_tuple(Tuple[int, ...])


def test_is_tuple_with_not_parametrized_tuple():
    assert is_tuple(Tuple)


def test_is_tuple_with_tuple_class_object():
    assert is_tuple(tuple)


@type_hints_with_generic_collections_support
def test_is_tuple_with_tuple_generic():
    assert is_tuple(tuple[int, float, str])


@type_hints_with_generic_collections_support
def test_is_tuple_with_variable_length_tuple_generic():
    assert is_tuple(tuple[int, ...])


def test_is_tuple_with_non_tuple():
    assert not is_tuple(int)


@pep_604_support
def test_is_union_with_pep_604_union():
    assert is_union(int | float)


@literal_support
def test_is_literal_with_literal():
    from typing import Literal

    assert is_literal(Literal["A", "B"])


def test_is_literal_with_non_literal():
    assert not is_literal(int)


def test_is_literal_with_import_error():
    with patch("builtins.__import__") as mock_import:
        mock_import.side_effect = ImportError()
        assert not is_literal(str)


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


@pep_604_support
def test_is_optional_with_pep_604_union():
    assert is_optional(int | float | None)


@pep_604_support
def test_is_optional_with_non_optional_pep_604_union():
    assert not is_optional(int | float)


def test_extract_optional():
    assert extract_optional(Optional[int]) == int


def test_extract_optional_with_wrong_type():
    with pytest.raises(ValueError):
        extract_optional(List[None])


def test_extract_optional_with_optional_of_union():
    assert extract_optional(Optional[Union[int, str]]) == Union[int, str]


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


def test_is_instance_with_union_and_matching_generic_collection():
    assert is_instance(["test"], Union[int, List[str]])


def test_is_instance_with_union_and_not_matching_generic_collection():
    assert not is_instance(["test"], Union[int, List[int]])


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


def test_is_instance_with_with_type_and_matching_value_type():
    assert is_instance(str, Type[str])


def test_is_instance_with_with_type_and_not_matching_value_type():
    assert not is_instance(1, Type[str])


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
    from typing import Literal

    assert is_instance("A", Literal["A", "B"])


@literal_support
def test_is_instance_with_literal_and_not_matching_type():
    from typing import Literal

    assert not is_instance("C", Literal["A", "B"])


@literal_support
def test_is_instance_with_optional_literal_and_matching_type():
    from typing import Literal

    assert is_instance("A", Optional[Literal["A", "B"]])


@literal_support
def test_is_instance_with_optional_literal_and_not_matching_type():
    from typing import Literal

    assert not is_instance("C", Optional[Literal["A", "B"]])


@literal_support
def test_is_instance_with_optional_literal_and_none():
    from typing import Literal

    assert is_instance(None, Optional[Literal["A", "B"]])


def test_is_instance_with_tuple_and_matching_type():
    assert is_instance((1, "test"), Tuple[int, str])


def test_is_instance_with_tuple_and_not_matching_type():
    assert not is_instance((1, 2), Tuple[int, str])


def test_is_instance_with_tuple_and_wrong_length():
    assert not is_instance((1, "test", 2), Tuple[int, str])


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


def test_extract_generic_with_defaults():
    assert extract_generic(List, defaults=(Any,)) == (Any,)


@init_var_type_support
def test_extract_init_var():
    assert extract_init_var(InitVar[int]) == int


def test_extract_init_var_with_attribute_error():
    class FakeType:
        pass

    assert extract_init_var(FakeType) == Any


def test_is_type_generic_with_matching_value():
    assert is_type_generic(Type[int])


def test_is_type_generic_with_not_matching_value():
    assert not is_type_generic(int)


def test_extract_generic_special():
    defaults = 1, 2

    class FakeType:
        _special = True

    assert extract_generic(FakeType, defaults) == defaults


@pytest.mark.skipif(version_info < (3, 10), reason="writing union types as X | Y requires Python 3.10")
def test_optional_and_union_none_does_not_pollute_scope_via_caching():
    is_generic(Optional[str])


@pep_604_support
def test_optional_and_union_none_does_not_pollute_scope_via_caching_pep_604():
    is_generic_collection(str | None)
