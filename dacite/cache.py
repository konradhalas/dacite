from functools import lru_cache, wraps
from typing import TypeVar, Callable, Optional
from weakref import WeakSet

T = TypeVar("T", bound=Callable)

__MAX_SIZE: Optional[int] = 2048
__CACHED_FUNCTIONS: WeakSet = WeakSet()


def cache(function: T) -> T:
    def make_cached_function():
        return lru_cache(maxsize=get_cache_size(), typed=True)(function)

    state = {"cached": make_cached_function()}

    @wraps(function)
    def wrapper(*args, **kwargs):
        return state["cached"](*args, **kwargs)

    def cache_clear() -> None:
        state["cached"].cache_clear()

    def cache_info():
        return state["cached"].cache_info()

    def reset_cache() -> None:
        state["cached"] = make_cached_function()

    wrapper.cache_clear = cache_clear  # type: ignore
    wrapper.cache_info = cache_info  # type: ignore
    wrapper._reset_cache = reset_cache  # type: ignore
    __CACHED_FUNCTIONS.add(wrapper)
    return wrapper  # type: ignore


def set_cache_size(size: Optional[int]) -> None:
    global __MAX_SIZE  # pylint: disable=global-statement
    if size == __MAX_SIZE:
        return
    __MAX_SIZE = size
    for function in list(__CACHED_FUNCTIONS):
        function._reset_cache()


def get_cache_size() -> Optional[int]:
    global __MAX_SIZE  # pylint: disable=global-variable-not-assigned
    return __MAX_SIZE


def clear_cache() -> None:
    for function in list(__CACHED_FUNCTIONS):
        function.cache_clear()
