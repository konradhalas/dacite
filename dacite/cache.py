from functools import lru_cache
from typing import TypeVar, Callable

T = TypeVar("T", bound=Callable)


class Cache:
    @lru_cache(maxsize=None)
    def cache(self, function: T) -> T:
        return lru_cache(maxsize=None)(function)  # type: ignore

    @lru_cache(maxsize=None)
    def cache_from_factory(self, function: Callable[["Cache"], T]) -> T:
        return function(self)  # type: ignore
