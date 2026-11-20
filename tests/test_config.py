import dataclasses

import pytest

from dacite import Config


def test_config_is_immutable():
    config = Config()
    with pytest.raises(dataclasses.FrozenInstanceError):
        config.check_types = False  # type: ignore[misc]


def test_config_containers_are_read_only_snapshots():
    hooks = {str: str.upper}
    cast = [int]
    config = Config(type_hooks=hooks, cast=cast)
    hooks[int] = float
    cast.append(str)
    assert dict(config.type_hooks) == {str: str.upper}
    assert tuple(config.cast) == (int,)
    with pytest.raises(TypeError):
        config.type_hooks[int] = float  # type: ignore[index]


def test_equal_configs_are_equal_and_hashable():
    hook = str.upper
    assert Config(type_hooks={str: hook}) == Config(type_hooks={str: hook})
    assert hash(Config(type_hooks={str: hook})) == hash(Config(type_hooks={str: hook}))
    assert Config(check_types=False) != Config()
    assert Config(type_hooks={str: str.upper}) != Config(type_hooks={str: str.lower})
    assert len({Config(), Config(), Config(strict=True)}) == 2


def test_replace_creates_a_modified_copy():
    config = Config(strict=True, type_hooks={str: str.upper})
    changed = dataclasses.replace(config, check_types=False)
    assert changed.check_types is False and changed.strict is True
    assert dict(changed.type_hooks) == {str: str.upper}
    assert config.check_types is True


def test_default_convert_key_is_none():
    assert Config().convert_key is None
