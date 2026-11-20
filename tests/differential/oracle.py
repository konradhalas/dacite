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
    """Neutralise `orders[3].customer` -> `orders.customer` (v2 adds indices to field paths)."""
    return re.sub(r"\[\d+\]", "", text)


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
    return bool(a == b)


_MISSING = object()


def _exc_signature_diff(e1: BaseException, e2: BaseException, normalize: Normalize) -> Optional[str]:
    if type(e1).__name__ != type(e2).__name__:
        return f"exception type: {type(e1).__name__} != {type(e2).__name__}"
    if normalize(str(e1)) != normalize(str(e2)):
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


def diff(expected: Outcome, actual: Outcome, normalize: Normalize = identity) -> Optional[str]:
    """Return a human readable description of the first difference, or None when equivalent."""
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


def oracle_impl() -> Impl:
    from tests.reference_v1 import dacite_v1

    return Impl("dacite-1.9.2", dacite_v1.from_dict, dacite_v1.Config, dacite_v1.clear_cache)


def candidate_impl() -> Impl:
    import dacite

    return Impl("dacite", dacite.from_dict, dacite.Config, dacite.clear_cache)
