from dataclasses import dataclass, fields, field
from typing import Optional

import pytest

from dacite.dataclasses import get_default_value_for_field, create_instance, DefaultValueNotFoundError, is_frozen


def test_get_default_value_for_field_with_default_value():
    @dataclass
    class X:
        i: int = 1

    dataclass_field = fields(X)[0]

    value = get_default_value_for_field(field=dataclass_field, type_=dataclass_field.type)

    assert value == 1


def test_get_default_value_for_field_with_default_factory():
    @dataclass
    class X:
        i: int = field(default_factory=lambda: 1)

    dataclass_field = fields(X)[0]

    value = get_default_value_for_field(field=dataclass_field, type_=dataclass_field.type)

    assert value == 1


def test_get_default_value_for_optional_field():
    @dataclass
    class X:
        i: Optional[int]

    dataclass_field = fields(X)[0]

    value = get_default_value_for_field(field=dataclass_field, type_=dataclass_field.type)

    assert value is None


def test_get_default_value_for_field_without_default_value():
    @dataclass
    class X:
        i: int

    dataclass_field = fields(X)[0]

    with pytest.raises(DefaultValueNotFoundError):
        get_default_value_for_field(field=dataclass_field, type_=dataclass_field.type)


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


def test_is_frozen_with_frozen_dataclass():
    @dataclass(frozen=True)
    class X:
        pass

    assert is_frozen(X)


def test_is_frozen_with_non_frozen_dataclass():
    @dataclass(frozen=False)
    class X:
        pass

    assert not is_frozen(X)
