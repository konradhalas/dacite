from dataclasses import dataclass, fields, field
from typing import Optional

import pytest

from dacite.dataclasses import get_default_value_for_field, create_instance, DefaultValueNotFoundError


def test_get_default_value_for_field_with_default_value():
    @dataclass
    class X:
        i: int = 1

    value = get_default_value_for_field(field=fields(X)[0])

    assert value == 1


def test_get_default_value_for_field_with_default_factory():
    @dataclass
    class X:
        i: int = field(default_factory=lambda: 1)

    value = get_default_value_for_field(field=fields(X)[0])

    assert value == 1


def test_get_default_value_for_optional_field():
    @dataclass
    class X:
        i: Optional[int]

    value = get_default_value_for_field(field=fields(X)[0])

    assert value is None


def test_get_default_value_for_field_without_default_value():
    @dataclass
    class X:
        i: int

    with pytest.raises(DefaultValueNotFoundError):
        get_default_value_for_field(field=fields(X)[0])


def test_create_instance_with_simple_data_class():
    @dataclass
    class X:
        i: int

    instance = create_instance(data_class=X, init_values={"i": 1}, post_init_values={})

    assert instance == X(i=1)


def test_create_instance_with_post_init_values():
    @dataclass
    class X:
        i: int
        j: int = field(init=False)

    instance = create_instance(data_class=X, init_values={"i": 1}, post_init_values={"j": 2})

    assert instance.i == 1
    assert instance.j == 2
