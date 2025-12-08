import nox
import pip

# Python version, pip version, typing_extensions version for each test session.
_TEST_SESSION_PARAMS = [
    ("3.7", "24.0", "4.7.1"),
    ("3.8", "25.0.1", "4.13.2"),
    ("3.9", "25.3", "4.15"),
    ("3.10", None, None),
    ("3.11", None, None),
    ("3.12", None, None),
    ("3.13", None, None),
]


def _test_factory(python_version, pip_version, typing_extensions_version):
    session_kwargs = {"python": python_version, "name": f"test-{python_version}"}
    if pip_version:
        session_kwargs["venv_params"] = ["--pip", pip_version]
    tx = "typing_extensions"
    if typing_extensions_version:
        tx += f"=={typing_extensions_version}"

    @nox.session(**session_kwargs)
    def _test(session):
        session.install("pytest", "pytest-cov", "pytest-benchmark", tx)
        session.run("pytest", *session.posargs)

    return _test


_TEST_SESSIONS = [_test_factory(*args) for args in _TEST_SESSION_PARAMS]


@nox.session
def test(session: nox.Session):
    for test_session in _TEST_SESSIONS:
        session.notify(test_session.name)
