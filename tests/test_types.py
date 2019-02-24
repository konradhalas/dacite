from typing import Optional, Union, List, Any, Dict

from dacite.types import is_optional, extract_optional, is_generic, is_union, is_generic_collection, \
    extract_origin_collection, is_instance, cast_value, extract_generic


def test_is_union_with_union():
    assert is_union(Union[int, float])


def test_is_union_with_non_union():
    assert not is_union(int)


def test_is_optional_with_optional():
    assert is_optional(Optional[int])


def test_is_optional_with_non_optional():
    assert not is_optional(int)


def test_is_optional_with_optional_of_union():
    assert is_optional(Optional[Union[int, float]])


def test_extract_optional():
    assert extract_optional(Optional[int]) == int


def test_is_generic_with_generic():
    assert is_generic(Optional[int])


def test_is_generic_with_non_generic():
    assert not is_generic(int)


def test_is_generic_collection_with_generic_collection():
    assert is_generic_collection(List[int])


def test_is_generic_collection_with_non_generic_collection():
    assert not is_generic_collection(list)


def test_extract_generic_collection():
    assert extract_origin_collection(List[int]) == list


def test_is_instance_with_built_in_type_and_matching_value_type():
    assert is_instance(1, int)


def test_is_instance_with_built_in_type_and_not_matching_value_type():
    assert not is_instance('test', int)


def test_is_instance_with_union_and_matching_value_type():
    assert is_instance(1, Union[int, float])


def test_is_instance_with_union_and_not_matching_value_type():
    assert not is_instance('test', Union[int, float])


def test_is_instance_with_generic_collection_and_matching_value_type():
    assert is_instance([1], List[int])


def test_is_instance_with_generic_collection_and_not_matching_value_type():
    assert not is_instance({1}, List[int])


def test_is_instance_with_any_type():
    assert is_instance(1, Any)


def test_cast_value_with_built_in_type():
    assert cast_value(int, '1') == 1


def test_cast_value_with_optional():
    assert cast_value(Optional[int], '1') == 1


def test_cast_value_with_generic_sequence():
    assert cast_value(List[int], ['1']) == [1]


def test_cast_value_with_generic_mapping():
    assert cast_value(Dict[str, int], {1: '1'}) == {'1': 1}


def test_extract_generic():
    assert extract_generic(List[int]) == (int,)
