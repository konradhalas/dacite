from unittest.mock import Mock, call

from dacite.cache import set_cache_size, get_cache_size, cache


def test_cache_size():
    set_cache_size(4321)
    assert get_cache_size() == 4321

    function = Mock()

    cache(function)(get_cache_size())
    set_cache_size(8765)
    cache(function)(get_cache_size())

    set_cache_size(None)
    cache(function)(get_cache_size())

    assert function.call_count == 3
    assert function.mock_calls == [call(4321), call(8765), call(None)]


def test_cache_from_function():
    function = Mock()

    cache(function)()
    cache(function)()

    function.assert_called_once()
