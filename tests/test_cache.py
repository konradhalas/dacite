from unittest.mock import Mock

from dacite.cache import Cache


def test_cache_from_function():
    function = Mock()
    cache = Cache()

    cache.cache(function)()
    cache.cache(function)()

    function.assert_called_once()
