from unittest.mock import Mock

from dacite.cache import cache


def test_cache_from_function():
    function = Mock()

    cache(function)()
    cache(function)()

    function.assert_called_once()
