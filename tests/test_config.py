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
        config.validate(
            data_class=X,
            data={'i': 1},
        )
    except InvalidConfigurationError:
        pytest.fail('empty config should be valid')


def test_validate_config_with_correct_remap():
    @dataclass
    class X:
        i: int

    config = Config(remap={'i': 'j'})

    try:
        config.validate(
            data_class=X,
            data={'j': 1},
        )
    except InvalidConfigurationError:
        pytest.fail('this config should be valid')


def test_validate_config_with_wrong_remap_field_name():
    @dataclass
    class X:
        i: int

    config = Config(remap={'x': 'y'})

    with pytest.raises(InvalidConfigurationError) as exception_info:
        config.validate(
            data_class=X,
            data={'i': 1},
        )

    assert str(exception_info.value) == 'invalid value in "remap" configuration: "x". Choices are: i'
    assert exception_info.value.parameter == 'remap'
    assert exception_info.value.available_choices == {'i'}
    assert exception_info.value.value == 'x'


def test_validate_config_with_wrong_data_key_name():
    @dataclass
    class X:
        i: int

    config = Config(remap={'i': 'y'})

    with pytest.raises(InvalidConfigurationError):
        config.validate(
            data_class=X,
            data={'i': 1},
        )


def test_make_inner():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    config = Config(remap={'x.i': 'y'}, check_types=False)

    inner_config = config.make_inner(fields(Y)[0])

    assert inner_config == Config(remap={'i': 'y'}, check_types=False)


def test_get_value_for_field_with_empty_config():
    @dataclass
    class X:
        i: int

    config = Config()

    value = config.get_value(
        field=fields(X)[0],
        data={'i': 1},
    )

    assert value == 1


def test_get_value_for_remapped_field():
    @dataclass
    class X:
        i: int

    config = Config(remap={'i': 'j'})

    value = config.get_value(
        field=fields(X)[0],
        data={'j': 1},
    )

    assert value == 1


def test_get_value_for_flattened_field():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    config = Config(flattened=['x'])

    value = config.get_value(
        field=fields(Y)[0],
        data={'i': 1},
    )

    assert value == {'i': 1}


def test_get_value_for_prefixed_field():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    config = Config(prefixed={'x': 'x_'})

    value = config.get_value(
        field=fields(Y)[0],
        data={'x_i': 1},
    )

    assert value == {'i': 1}


def test_get_value_for_field_with_transform():
    @dataclass
    class X:
        i: int

    config = Config(transform={'i': lambda v: v + 1})

    value = config.get_value(
        field=fields(X)[0],
        data={'i': 1},
    )

    assert value == 2


def test_get_value_for_field_with_cast():
    @dataclass
    class X:
        i: int

    config = Config(cast=['i'])

    value = config.get_value(
        field=fields(X)[0],
        data={'i': '1'},
    )

    assert value == 1


def test_get_value_for_missing_value():
    @dataclass
    class X:
        i: int

    config = Config()

    with pytest.raises(ValueNotFoundError):
        config.get_value(
            field=fields(X)[0],
            data={},
        )
