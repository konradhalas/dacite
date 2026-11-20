"""Run the behavioural tests (tests/core) against every execution backend.

* `interpreter`: `set_compile_threshold(None)` - plans are only interpreted
* `codegen`:     `set_compile_threshold(0)`    - plans are compiled to generated code as soon as they are built

Other tests (cache, converter, config, benchmarks, differential) run with the default threshold.
"""

import os

import pytest

import dacite

MODES = {"interpreter": None, "codegen": 0}


def pytest_generate_tests(metafunc):
    path = str(metafunc.module.__file__).replace(os.sep, "/")
    if "dacite_mode" in metafunc.fixturenames and "/tests/core/" in path:
        metafunc.parametrize("dacite_mode", list(MODES), indirect=True)


@pytest.fixture(autouse=True)
def dacite_mode(request):
    mode = getattr(request, "param", None)
    if mode is None:
        yield None
        return
    default = dacite.get_compile_threshold()
    dacite.set_compile_threshold(MODES[mode])
    dacite.clear_cache()
    yield mode
    dacite.set_compile_threshold(default)
    dacite.clear_cache()
