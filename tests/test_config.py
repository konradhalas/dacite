from dataclasses import dataclass, fields

import pytest

from dacite import Config
from dacite.config import ValueNotFoundError


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

    config = Config(transform={int: int})

    value = config.get_value(field=fields(X)[0], data={"i": "1"})

    assert value == 1


def test_get_value_for_missing_value():
    @dataclass
    class X:
        i: int

    config = Config()

    with pytest.raises(ValueNotFoundError):
        config.get_value(field=fields(X)[0], data={})
