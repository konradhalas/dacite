from unittest.mock import Mock

from dacite.cache import Cache


def test_cache_from_function():
    function = Mock()
    cache = Cache()

    cache.cache(function)()
    cache.cache(function)()

    function.assert_called_once()


def test_cache_from_factory():
    function = Mock()

    def function_factory(c):
        return c.cache(function)

    cache = Cache()

    cache.cache_from_factory(function_factory)()
    cache.cache_from_factory(function_factory)()

    function.assert_called_once()
