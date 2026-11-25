from unittest.mock import Mock, call

from dacite.cache import set_cache_size, get_cache_size, cache, clear_cache


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
    cached_function = cache(function)

    cached_function()
    cached_function()

    function.assert_called_once()


def test_set_cache_size_updates_existing_decorated_function():
    function = Mock(side_effect=lambda value: value)
    cached_function = cache(function)

    set_cache_size(1)
    try:
        assert cached_function.cache_info().maxsize == 1
        cached_function(1)
        cached_function(1)
        cached_function(2)
        cached_function(1)
    finally:
        set_cache_size(2048)

    assert function.call_count == 3


def test_clear_cache_clears_existing_decorated_function():
    function = Mock(side_effect=lambda value: value)
    cached_function = cache(function)

    cached_function(1)
    cached_function(1)
    clear_cache()
    cached_function(1)

    assert function.call_count == 2
