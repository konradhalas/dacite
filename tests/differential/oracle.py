"""Outcome capture and comparison for differential testing (candidate implementation vs frozen v1 oracle).

Two outcomes are equivalent when both succeed with deeply equal results (same container types, same dataclass class)
or both raise an exception of the same type name with the same message / `field_path` / `field_type` / `value`.
`normalize` is applied to every compared string, so intentional message changes (e.g. indices in field paths,
MIGRATION.md B3) can be neutralised in exactly one place.
"""

import copy
import dataclasses
import re
from dataclasses import dataclass
from typing import Any, Callable, Optional

Normalize = Callable[[str], str]


def identity(text: str) -> str:
    return text


def strip_indices(text: str) -> str:
    """Neutralise `orders[3].by_name['a']` -> `orders.by_name` (v2 adds indices and mapping keys to field paths)."""
    return re.sub(r"\[(?:\d+|'[^']*'|\"[^\"]*\")\]", "", text)


def strip_noise(text: str) -> str:
    """`str(generator)` leaks into results when a `str` is given for a collection field (`data_type(generator)` with
    `data_type=str`): the text contains the generator's name and memory address, which is never comparable."""
    text = re.sub(r"<generator object .*? at 0x[0-9a-f]+>", "<generator>", text)
    return re.sub(r"has length \d+; 2 is required", "has length N; 2 is required", text)  # dict(<str(generator)>)


@dataclass
class Outcome:
    value: Any = None
    exc: Optional[BaseException] = None

    @property
    def ok(self) -> bool:
        return self.exc is None


def run(fn: Callable[[], Any]) -> Outcome:
    try:
        return Outcome(value=fn())
    except Exception as exc:  # pylint: disable=broad-except
        return Outcome(exc=exc)


def deep_equal(a: Any, b: Any) -> bool:
    """Equality that also demands identical types (list != tuple, True != 1, dict != OrderedDict)."""
    if type(a) is not type(b):
        return False
    if dataclasses.is_dataclass(a) and not isinstance(a, type):
        return all(
            deep_equal(getattr(a, f.name, _MISSING), getattr(b, f.name, _MISSING)) for f in dataclasses.fields(a)
        )
    if isinstance(a, dict):
        return a.keys() == b.keys() and all(deep_equal(a[k], b[k]) for k in a)
    if isinstance(a, (list, tuple)):
        return len(a) == len(b) and all(deep_equal(x, y) for x, y in zip(a, b))
    if isinstance(a, (set, frozenset)):
        return a == b
    if isinstance(a, str):
        return strip_noise(a) == strip_noise(b)
    return bool(a == b)


_MISSING = object()


def _exc_signature_diff(e1: BaseException, e2: BaseException, normalize: Normalize) -> Optional[str]:
    if type(e1).__name__ != type(e2).__name__:
        return f"exception type: {type(e1).__name__} != {type(e2).__name__}"
    if normalize(strip_noise(str(e1))) != normalize(strip_noise(str(e2))):
        return f"message: {normalize(str(e1))!r} != {normalize(str(e2))!r}"
    for attr in ("field_path", "message"):
        if hasattr(e1, attr) or hasattr(e2, attr):
            v1, v2 = getattr(e1, attr, _MISSING), getattr(e2, attr, _MISSING)
            if isinstance(v1, str) and isinstance(v2, str):
                v1, v2 = normalize(v1), normalize(v2)
            if v1 != v2:
                return f"{attr}: {v1!r} != {v2!r}"
    for attr in ("field_type", "keys"):
        if (hasattr(e1, attr) or hasattr(e2, attr)) and getattr(e1, attr, _MISSING) != getattr(e2, attr, _MISSING):
            return f"{attr}: {getattr(e1, attr, _MISSING)!r} != {getattr(e2, attr, _MISSING)!r}"
    if (hasattr(e1, "value") or hasattr(e2, "value")) and not deep_equal(
        getattr(e1, "value", _MISSING), getattr(e2, "value", _MISSING)
    ):
        return f"value: {getattr(e1, 'value', _MISSING)!r} != {getattr(e2, 'value', _MISSING)!r}"
    if hasattr(e1, "union_matches") or hasattr(e2, "union_matches"):
        m1, m2 = getattr(e1, "union_matches", {}), getattr(e2, "union_matches", {})
        if list(m1) != list(m2) or not all(deep_equal(m1[k], m2[k]) for k in m1):
            return f"union_matches: {m1!r} != {m2!r}"
    return None


def _has_generator_repr(obj: Any) -> bool:
    """True when `obj` (a result, or part of an exception) contains the text of `str(generator)`, possibly after
    `tuple(...)`/`list(...)` split it into characters (e.g. `Config(cast=[tuple])`)."""
    if isinstance(obj, str):
        return "<generator object" in obj
    if isinstance(obj, (list, tuple, set, frozenset)):
        items = list(obj)
        if items and all(isinstance(i, str) and len(i) == 1 for i in items) and "<generator object" in "".join(items):
            return True
        return any(_has_generator_repr(i) for i in items)
    if isinstance(obj, dict):
        return any(_has_generator_repr(v) for v in obj.values())
    if dataclasses.is_dataclass(obj) and not isinstance(obj, type):
        return any(_has_generator_repr(getattr(obj, f.name, None)) for f in dataclasses.fields(obj))
    return False


def _noisy(outcome: Outcome) -> bool:
    if outcome.ok:
        return _has_generator_repr(outcome.value)
    return _has_generator_repr(str(outcome.exc)) or _has_generator_repr(getattr(outcome.exc, "value", None))


def diff(expected: Outcome, actual: Outcome, normalize: Normalize = identity) -> Optional[str]:
    """Return a human readable description of the first difference, or None when equivalent.

    Outcomes that leak `str(generator)` (a `str` given for a collection field) contain a memory address and a
    function name, so they can only be compared coarsely: succeeded/failed and exception type."""
    if _noisy(expected) or _noisy(actual):
        if expected.ok != actual.ok:
            return "success/failure differs (outcomes contain a generator repr)"
        if not expected.ok and type(expected.exc).__name__ != type(actual.exc).__name__:
            return f"exception type: {type(expected.exc).__name__} != {type(actual.exc).__name__}"
        return None
    if expected.ok and actual.ok:
        return None if deep_equal(expected.value, actual.value) else f"result: {expected.value!r} != {actual.value!r}"
    if expected.ok != actual.ok:
        return f"oracle {'returned ' + repr(expected.value) if expected.ok else 'raised ' + repr(expected.exc)}, candidate {'returned ' + repr(actual.value) if actual.ok else 'raised ' + repr(actual.exc)}"
    assert expected.exc is not None and actual.exc is not None
    return _exc_signature_diff(expected.exc, actual.exc, normalize)


@dataclass
class Impl:
    """A dacite-like implementation: `from_dict`, `Config` class and `clear_cache`."""

    name: str
    from_dict: Callable[..., Any]
    config_cls: Any
    clear_cache: Callable[[], None]

    def convert(self, data_class: Any, data: Any, config_kwargs: dict) -> Outcome:
        config = self.config_cls(**config_kwargs)
        return run(lambda: self.from_dict(data_class, copy.deepcopy(data), config))


def _clear_all_v1_caches() -> None:
    """`dacite_v1.clear_cache()` only drops the wrappers created inside `from_dict`; the helpers in `types` and
    `dataclasses` are wrapped at import time and keep their entries (which are shared between *equal* types such as
    `Optional[X]` and `Union[None, X]`). Clear everything so that the oracle is a pure function of its input."""
    from tests.reference_v1 import dacite_v1
    from tests.reference_v1.dacite_v1 import dataclasses as v1_dataclasses
    from tests.reference_v1.dacite_v1 import types as v1_types

    dacite_v1.clear_cache()
    for module in (v1_types, v1_dataclasses):
        for obj in vars(module).values():
            if hasattr(obj, "cache_clear"):
                obj.cache_clear()


def oracle_impl() -> Impl:
    from tests.reference_v1 import dacite_v1

    return Impl("dacite-1.9.2", dacite_v1.from_dict, dacite_v1.Config, _clear_all_v1_caches)


def candidate_impl(mode: str = "default") -> Impl:
    """The package under development. `mode`: `interpreter` (never compile), `codegen` (compile immediately) or
    `default` (library default)."""
    import dacite

    threshold = {"interpreter": None, "codegen": 0, "default": 100}[mode]

    def clear() -> None:
        dacite.set_compile_threshold(threshold)
        dacite.clear_cache()

    return Impl(f"dacite[{mode}]", dacite.from_dict, dacite.Config, clear)


def has_none_first_optional(data_class: Any) -> bool:
    """True when some annotation (anywhere, incl. nested data classes) is a two-member union with `None` first.

    dacite 1.x converts those inconsistently (its lru_cache shares entries between the equal `Optional[X]` and
    `Union[None, X]`), v2 always converts them like `Optional[X]` (MIGRATION.md). Such schemas are excluded from the
    differential comparison and covered by `tests/core/test_optional.py`. Note `typing` itself may hand out a
    `Union[None, X]` object when `Optional[X]` is requested, so this has to look at the actual `__args__`."""
    import typing  # pylint: disable=import-outside-toplevel

    seen: set = set()

    def walk(type_: Any) -> bool:
        if id(type_) in seen:
            return False
        seen.add(id(type_))
        args = typing.get_args(type_)
        if typing.get_origin(type_) in (typing.Union, getattr(__import__("types"), "UnionType", None)):
            if len(args) == 2 and args[0] is type(None):
                return True
        if any(walk(arg) for arg in args if not isinstance(arg, (list, tuple))):
            return True
        target = typing.get_origin(type_) or type_
        if dataclasses.is_dataclass(target) and isinstance(target, type):
            try:
                hints = typing.get_type_hints(target)
            except Exception:  # pylint: disable=broad-except  # unresolvable forward reference etc.
                return False
            return any(walk(hint) for hint in hints.values())
        return False

    return walk(data_class)
