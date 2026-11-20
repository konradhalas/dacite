"""Adapters giving every library the same interface: `build(scenario) -> convert(data) -> instance`.

`build` is where per-type compilation (pydantic TypeAdapter, cattrs Converter) happens, so cold timing can include it.
msgspec.convert and dacite v1 compile lazily on first call; their cold cost is therefore paid inside the first
`convert` call.
"""

from typing import Any, Callable

from .scenarios import Scenario


def _dacite(sc: Scenario) -> Callable[[Any], Any]:
    from dacite import from_dict

    cls, config = sc.cls, sc.dacite_config()
    if config is None:
        return lambda data: from_dict(cls, data)
    return lambda data: from_dict(cls, data, config)


def _msgspec(sc: Scenario) -> Callable[[Any], Any]:
    import msgspec

    cls = sc.cls
    return lambda data: msgspec.convert(data, cls)  # strict=True (default)


def _pydantic(sc: Scenario) -> Callable[[Any], Any]:
    from pydantic import TypeAdapter

    adapter = TypeAdapter(sc.cls)
    return adapter.validate_python


def _cattrs(sc: Scenario) -> Callable[[Any], Any]:
    import cattrs

    conv = cattrs.Converter()
    cls = sc.cls
    return lambda data: conv.structure(data, cls)


BUILDERS = {"dacite": _dacite, "msgspec": _msgspec, "pydantic": _pydantic, "cattrs": _cattrs}


def versions() -> dict:
    from importlib.metadata import version

    out = {}
    for lib in BUILDERS:
        try:
            out[lib] = version(lib)
        except Exception:  # pylint: disable=broad-except
            out[lib] = "?"
    return out
