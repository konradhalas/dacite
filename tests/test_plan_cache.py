import gc
import threading
import weakref
from dataclasses import dataclass, field, make_dataclass
from typing import Generic, List, TypeVar

import pytest

import dacite
from dacite import Config, ForwardReferenceError, from_dict
from dacite import _plan
from dacite.cache import get_cache_size, set_cache_size

T = TypeVar("T")


@pytest.fixture(autouse=True)
def _isolated_cache():
    size = get_cache_size()
    dacite.clear_cache()
    yield
    set_cache_size(size)
    dacite.clear_cache()


def plans_of(cls):
    return cls.__dict__.get("__dacite_plans__", {})


def test_plan_is_built_once_per_class_and_config():
    @dataclass
    class A:
        x: int

    first = _plan.get_plan(A, dacite.config.DEFAULT_CONFIG)
    assert _plan.get_plan(A, dacite.config.DEFAULT_CONFIG) is first
    assert from_dict(A, {"x": 1}) == A(x=1)
    assert len(plans_of(A)) == 1


def test_equal_configs_share_a_plan_and_different_hooks_do_not():
    @dataclass
    class A:
        x: int

    hook = lambda value: value  # noqa: E731
    from_dict(A, {"x": 1}, Config(check_types=False))
    from_dict(A, {"x": 1}, Config(check_types=False))
    assert len(plans_of(A)) == 1
    from_dict(A, {"x": 1}, Config(type_hooks={int: hook}))
    from_dict(A, {"x": 1}, Config(type_hooks={int: hook}))
    assert len(plans_of(A)) == 2
    from_dict(A, {"x": 1}, Config(type_hooks={int: lambda value: value}))
    assert len(plans_of(A)) == 3


def test_subclass_does_not_inherit_the_plan_of_its_parent():
    @dataclass
    class Parent:
        x: int

    @dataclass
    class Child(Parent):
        y: int = 0

    from_dict(Parent, {"x": 1})
    assert from_dict(Child, {"x": 1, "y": 2}) == Child(x=1, y=2)
    assert "__dacite_plans__" in Parent.__dict__ and "__dacite_plans__" in Child.__dict__


def test_generic_aliases_get_their_own_plan():
    @dataclass
    class Box(Generic[T]):
        item: T

    assert from_dict(Box[int], {"item": 1}) == Box(item=1)
    with pytest.raises(dacite.WrongTypeError):
        from_dict(Box[str], {"item": 1})
    assert from_dict(Box[str], {"item": "a"}) == Box(item="a")
    assert len(plans_of(Box)) == 2


def test_cache_size_bounds_the_number_of_plans_per_class():
    @dataclass
    class A:
        x: int

    set_cache_size(3)
    for _ in range(10):
        from_dict(A, {"x": 1}, Config(type_hooks={int: lambda value: value}))
    assert len(plans_of(A)) <= 3


def test_clear_cache_drops_plans():
    @dataclass
    class A:
        x: int

    from_dict(A, {"x": 1})
    assert plans_of(A)
    dacite.clear_cache()
    assert not plans_of(A)
    assert from_dict(A, {"x": 1}) == A(x=1)


def test_compilation_errors_are_not_cached():
    @dataclass
    class NeedsLater:
        value: "_LateDefined"  # noqa: F821

    with pytest.raises(ForwardReferenceError):
        from_dict(NeedsLater, {"value": {"a": 1}})
    assert not plans_of(NeedsLater)

    @dataclass
    class _LateDefined:
        a: int

    globals()["_LateDefined"] = _LateDefined
    try:
        assert from_dict(NeedsLater, {"value": {"a": 1}}) == NeedsLater(value=_LateDefined(a=1))
    finally:
        del globals()["_LateDefined"]


def test_nested_forward_reference_error_only_for_data_that_reaches_it():
    @dataclass
    class Broken:
        value: "_NeverDefined"  # noqa: F821

    @dataclass
    class Outer:
        inner: "Broken | None" = None

    # compiling Outer must not touch Broken's annotations (dacite 1.x resolved them only when data reached it)
    assert from_dict(Outer, {}, Config(forward_references={"Broken": Broken})) == Outer(inner=None)
    with pytest.raises(ForwardReferenceError):
        from_dict(Outer, {"inner": {"value": 1}}, Config(forward_references={"Broken": Broken}))


def test_classes_created_dynamically_are_not_kept_alive_by_the_cache():
    refs = []
    for index in range(50):
        inner = make_dataclass(f"Inner{index}", [("a", int)])
        outer = make_dataclass(
            f"Outer{index}", [("name", str), ("inner", inner), ("tags", List[str], field(default_factory=list))]
        )
        hooked = Config(type_hooks={str: str.strip})
        from_dict(outer, {"name": "n", "inner": {"a": 1}, "tags": ["t"]})
        from_dict(outer, {"name": " n ", "inner": {"a": 1}}, hooked)
        refs.extend([weakref.ref(inner), weakref.ref(outer)])
        del inner, outer
    gc.collect()
    gc.collect()
    assert [ref for ref in refs if ref() is not None] == []


def test_metaclass_setattr_hooks_are_not_triggered_by_the_cache():
    class Sealing(type):
        sealed = False

        def __setattr__(cls, name, value):
            if cls.sealed:
                raise TypeError("class is sealed")
            super().__setattr__(name, value)

    @dataclass
    class Sealed(metaclass=Sealing):
        x: int

    Sealing.sealed = True
    try:
        assert from_dict(Sealed, {"x": 1}) == Sealed(x=1)
        assert "__dacite_plans__" in Sealed.__dict__
    finally:
        Sealing.sealed = False


def test_classes_that_refuse_the_attribute_use_a_bounded_global_fallback(monkeypatch):
    monkeypatch.setattr(_plan, "_attach", lambda owner, plans: False)

    @dataclass
    class Refusing:
        x: int

    set_cache_size(2)
    assert from_dict(Refusing, {"x": 1}) == Refusing(x=1)
    assert from_dict(Refusing, {"x": 2}) == Refusing(x=2)
    assert "__dacite_plans__" not in Refusing.__dict__
    assert len([key for key in _plan._FALLBACK if key[0] is Refusing]) == 1  # pylint: disable=protected-access
    for _ in range(5):
        from_dict(Refusing, {"x": 1}, Config(type_hooks={int: lambda value: value}))
    assert len(_plan._FALLBACK) <= 2  # pylint: disable=protected-access


def test_frozen_and_slots_classes_are_supported():
    @dataclass(frozen=True)
    class Frozen:
        x: int

    @dataclass(slots=True)
    class Slotted:
        x: int

    assert from_dict(Frozen, {"x": 1}) == Frozen(x=1)
    assert from_dict(Slotted, {"x": 1}) == Slotted(x=1)


def test_concurrent_first_calls_compile_the_plan_once(monkeypatch):
    @dataclass
    class Shared:
        x: int
        y: List[int]

    calls = []
    original = _plan.compile_plan

    def counting(data_class, config):
        calls.append(data_class)
        return original(data_class, config)

    monkeypatch.setattr(_plan, "compile_plan", counting)
    barrier = threading.Barrier(16)
    errors = []

    def worker():
        try:
            barrier.wait()
            for _ in range(200):
                assert from_dict(Shared, {"x": 1, "y": [1, 2]}) == Shared(x=1, y=[1, 2])
        except Exception as error:  # pylint: disable=broad-except
            errors.append(error)

    threads = [threading.Thread(target=worker) for _ in range(16)]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()

    assert errors == []
    assert len(calls) == 1


def test_concurrent_use_of_many_classes_and_configs():
    classes = [make_dataclass(f"C{i}", [("a", int), ("b", List[int], field(default_factory=list))]) for i in range(20)]
    configs = [Config(check_types=bool(i % 2)) for i in range(4)]
    barrier = threading.Barrier(8)
    errors = []

    def worker(seed):
        try:
            barrier.wait()
            for round_ in range(300):
                cls = classes[(seed + round_) % len(classes)]
                config = configs[(seed * round_) % len(configs)]
                assert from_dict(cls, {"a": round_, "b": [round_]}, config) == cls(a=round_, b=[round_])
                if round_ % 97 == 0:
                    dacite.clear_cache()
        except Exception as error:  # pylint: disable=broad-except
            errors.append(error)

    threads = [threading.Thread(target=worker, args=(n,)) for n in range(8)]
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    assert errors == []
