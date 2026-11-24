from dataclasses import dataclass
from typing import Dict, List, Optional, Tuple, Union

import pytest

from dacite import DaciteFieldError, MissingValueError, UnionMatchError, WrongTypeError, from_dict
from dacite.exceptions import MapKey


@dataclass
class Customer:
    email: str


@dataclass
class Order:
    customer: Customer
    tags: Tuple[int, ...] = ()


@dataclass
class Root:
    orders: List[Order]
    by_name: Optional[Dict[str, Customer]] = None


def error_of(data) -> DaciteFieldError:
    with pytest.raises(DaciteFieldError) as info:
        from_dict(Root, data)
    return info.value


def test_list_index_is_part_of_the_path():
    data = {"orders": [{"customer": {"email": "a"}}] * 3 + [{"customer": {"email": 5}}]}
    error = error_of(data)
    assert isinstance(error, WrongTypeError)
    assert error.field_path == "orders[3].customer.email"
    assert error.path == ("orders", 3, "customer", "email")
    assert 'field "orders[3].customer.email"' in str(error)
    assert error.field_type is str and error.value == 5


def test_missing_value_inside_collection_has_index():
    error = error_of({"orders": [{"customer": {"email": "a"}}, {"customer": {}}]})
    assert isinstance(error, MissingValueError)
    assert error.field_path == "orders[1].customer.email"


def test_mapping_key_is_part_of_the_path():
    error = error_of({"orders": [], "by_name": {"x": {"email": "a"}, "y": {"email": 1}}})
    assert error.field_path == "by_name['y'].email"
    assert error.path == ("by_name", MapKey("y"), "email")


def test_tuple_index_is_part_of_the_path():
    @dataclass
    class Holder:
        pairs: Tuple[Customer, Customer]

    with pytest.raises(WrongTypeError) as info:
        from_dict(Holder, {"pairs": ({"email": "a"}, {"email": 2})})
    assert info.value.field_path == "pairs[1].email"


def test_union_errors_are_reported_on_the_field():
    @dataclass
    class Holder:
        value: Union[int, Customer]

    with pytest.raises(UnionMatchError) as info:
        from_dict(Holder, {"value": "x"})
    assert info.value.field_path == "value"


def test_field_level_type_check_reports_the_field():
    @dataclass
    class Holder:
        numbers: List[int]

    with pytest.raises(WrongTypeError) as info:
        from_dict(Holder, {"numbers": [1, "2"]})
    assert info.value.field_path == "numbers"


def test_field_path_can_still_be_assigned_and_updated():
    error = WrongTypeError(field_type=int, value="x", field_path="a")
    error.update_path("b")
    assert error.field_path == "b.a"
    error.field_path = "z"
    assert error.path == ("z",)
    assert WrongTypeError(field_type=int, value="x").field_path is None
