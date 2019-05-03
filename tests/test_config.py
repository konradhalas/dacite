from dataclasses import dataclass, fields

import pytest

from dacite import Config, InvalidConfigurationError
from dacite.config import ValueNotFoundError


def test_validate_empty_config():
    @dataclass
    class X:
        i: int

    config = Config()

    try:
        config.validate(data_class=X, data={"i": 1})
    except InvalidConfigurationError:
        pytest.fail("empty config should be valid")


def test_make_inner():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    config = Config(transform={"x.i": int}, check_types=False)

    inner_config = config.make_inner(fields(Y)[0])

    assert inner_config == Config(transform={"i": int}, check_types=False)


def test_get_value_for_field_with_empty_config():
    @dataclass
    class X:
        i: int

    config = Config()

    value = config.get_value(field=fields(X)[0], data={"i": 1})

    assert value == 1


def test_get_value_for_field_with_transform():
    @dataclass
    class X:
        i: int

    config = Config(transform={"i": lambda v: v + 1})

    value = config.get_value(field=fields(X)[0], data={"i": 1})

    assert value == 2


def test_get_value_for_field_with_cast():
    @dataclass
    class X:
        i: int

    config = Config(cast=["i"])

    value = config.get_value(field=fields(X)[0], data={"i": "1"})

    assert value == 1


def test_get_value_for_missing_value():
    @dataclass
    class X:
        i: int

    config = Config()

    with pytest.raises(ValueNotFoundError):
        config.get_value(field=fields(X)[0], data={})
