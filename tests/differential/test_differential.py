"""Differential tests: candidate (the `dacite` package under development) vs the frozen v1.9.2 oracle.

For random dataclass schemas, random valid and corrupted inputs and random `Config`s both implementations must return
deeply equal results or raise the same exception (type, message, field_path, field_type, value).
"""

import os

import pytest
from hypothesis import HealthCheck, event, find, given, settings
from hypothesis import strategies as st
from hypothesis.errors import NoSuchExample

from tests.differential import oracle
from tests.differential.strategies import (
    Materializer,
    config_kwargs,
    config_params,
    gen_value,
    mutate,
    schemas,
)

EXAMPLES = int(os.environ.get("DACITE_DIFF_EXAMPLES", "300"))
PROFILE = settings(
    max_examples=EXAMPLES,
    deadline=None,
    suppress_health_check=list(HealthCheck),
    database=None,
)

ORACLE = oracle.oracle_impl()
CANDIDATE = oracle.candidate_impl()
CANDIDATES = [oracle.candidate_impl("interpreter"), oracle.candidate_impl("codegen")]
# v2 adds indices / mapping keys to field paths (MIGRATION.md B3); everything else is compared strictly.
NORMALIZE = oracle.strip_indices


@pytest.fixture(autouse=True)
def _restore_compile_threshold():
    """The candidates set the global compile threshold; do not leak it into other tests."""
    import dacite

    threshold = dacite.get_compile_threshold()
    yield
    dacite.set_compile_threshold(threshold)
    dacite.clear_cache()


@st.composite
def cases(draw, corrupt: bool):
    """(materializer, schema spec, data, config params)."""
    spec = draw(schemas())
    params = draw(config_params())
    mat = Materializer()
    mat.__enter__()
    try:
        mat.type_of(spec)
    except Exception:
        mat.__exit__(None, None, None)
        raise
    data = draw(gen_value(mat, spec, params))
    if corrupt:
        data = draw(mutate(data))
    return mat, spec, data, params


def check(case, candidates=None, normalize=NORMALIZE):
    mat, spec, data, params = case
    try:
        cls = mat.infos[id(spec)].cls
        if oracle.has_none_first_optional(cls):
            event("skipped: Union[None, X] (intentional divergence)")
            return
        kwargs = config_kwargs(params)
        ORACLE.clear_cache()
        expected = ORACLE.convert(cls, data, kwargs)
        event(f"oracle={'ok' if expected.ok else type(expected.exc).__name__}")
        for candidate in candidates or CANDIDATES:
            candidate.clear_cache()
            # twice: the first conversion of a type may be interpreted, the second one runs the compiled plan
            for _ in range(2):
                actual = candidate.convert(cls, data, kwargs)
                difference = oracle.diff(expected, actual, normalize)
                schema = {name: f.type for name, f in cls.__dataclass_fields__.items()}
                detail = f"oracle: {expected.exc or expected.value!r}\n{candidate.name}: {actual.exc or actual.value!r}"
                assert (
                    difference is None
                ), f"[{candidate.name}] {difference}\n{detail}\nschema={schema}\ndata={data!r}\nconfig={params}"
    finally:
        mat.__exit__(None, None, None)


@PROFILE
@given(cases(corrupt=False))
def test_valid_data_is_equivalent(case):
    check(case)


@PROFILE
@given(cases(corrupt=True))
def test_corrupted_data_is_equivalent(case):
    check(case)


# --- the harness itself must be able to see differences ---------------------------------------------------------------
class _NoTypeChecking(oracle.Impl):
    """A deliberately wrong candidate: silently disables check_types."""

    def convert(self, data_class, data, config_kwargs):
        return super().convert(data_class, data, {**config_kwargs, "check_types": False})


FAULTY = _NoTypeChecking("faulty", CANDIDATE.from_dict, CANDIDATE.config_cls, CANDIDATE.clear_cache)


def _differs(case):
    mat, spec, data, params = case
    try:
        cls = mat.infos[id(spec)].cls
        kwargs = config_kwargs(params)
        return oracle.diff(ORACLE.convert(cls, data, kwargs), FAULTY.convert(cls, data, kwargs)) is not None
    finally:
        mat.__exit__(None, None, None)


def test_harness_detects_a_candidate_that_skips_type_checking():
    try:
        find(
            cases(corrupt=True),
            _differs,
            settings=settings(max_examples=3000, deadline=None, database=None, suppress_health_check=list(HealthCheck)),
        )
    except NoSuchExample:  # pragma: no cover
        pytest.fail("strategies never produced a case where disabling check_types changes the outcome")


# --- the strategies must actually reach the interesting behaviours -------------------------------------------------------
def _oracle_outcome(case):
    mat, spec, data, params = case
    try:
        ORACLE.clear_cache()
        return ORACLE.convert(mat.infos[id(spec)].cls, data, config_kwargs(params))
    finally:
        mat.__exit__(None, None, None)


REQUIRED_EXCEPTIONS = {
    "WrongTypeError",
    "MissingValueError",
    "UnionMatchError",
    "StrictUnionMatchError",
    "UnexpectedDataError",
    "ForwardReferenceError",
    "ValueError",  # raised by __post_init__
    "TypeError",  # e.g. defaultdict reconstruction (known v1 quirk Q3), failing casts
}


def test_strategies_reach_every_exception_kind():
    reached = set()

    @settings(
        max_examples=3000, deadline=None, database=None, derandomize=True, suppress_health_check=list(HealthCheck)
    )
    @given(cases(corrupt=True))
    def run(case):
        outcome = _oracle_outcome(case)
        if outcome.exc is not None:
            reached.add(type(outcome.exc).__name__)

    run()
    assert REQUIRED_EXCEPTIONS <= reached, f"never produced: {sorted(REQUIRED_EXCEPTIONS - reached)}"


def test_valid_cases_mostly_succeed():
    stats = {"ok": 0, "total": 0}

    @settings(max_examples=200, deadline=None, database=None, suppress_health_check=list(HealthCheck))
    @given(cases(corrupt=False))
    def run(case):
        outcome = _oracle_outcome(case)
        stats["total"] += 1
        stats["ok"] += outcome.ok

    run()
    assert stats["ok"] / stats["total"] >= 0.5, stats


def test_normalize_strips_indices():
    assert oracle.strip_indices('field "orders[3].customer[0].email"') == 'field "orders.customer.email"'
    assert oracle.strip_indices("""field "a['k'].b["x"]" """) == """field "a.b" """
