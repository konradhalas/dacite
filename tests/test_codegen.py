from collections import OrderedDict
from dataclasses import dataclass, field
from types import MappingProxyType
from typing import Dict, List, Literal, Optional, Tuple, Union

import pytest

import dacite
from dacite import Config, Converter, MissingValueError, WrongTypeError, from_dict
from dacite._plan import get_plan
from dacite.config import DEFAULT_CONFIG


@pytest.fixture(autouse=True)
def _reset():
    default = dacite.get_compile_threshold()
    dacite.clear_cache()
    yield
    dacite.set_compile_threshold(default)
    dacite.clear_cache()


@dataclass
class Point:
    x: int
    y: int = 0


def test_plan_is_interpreted_until_the_threshold_and_compiled_afterwards():
    assert dacite.get_compile_threshold() == 100
    dacite.set_compile_threshold(3)
    from_dict(Point, {"x": 1})
    from_dict(Point, {"x": 1})
    plan = get_plan(Point, DEFAULT_CONFIG)
    assert plan.compiled is None
    from_dict(Point, {"x": 1})
    assert plan.compiled is not None
    assert plan.run is plan.compiled
    assert from_dict(Point, {"x": 5, "y": 6}) == Point(5, 6)


def test_threshold_none_never_compiles_and_zero_compiles_at_once():
    dacite.set_compile_threshold(None)
    for _ in range(5):
        from_dict(Point, {"x": 1})
    assert get_plan(Point, DEFAULT_CONFIG).compiled is None
    dacite.clear_cache()
    dacite.set_compile_threshold(0)
    from_dict(Point, {"x": 1})
    assert get_plan(Point, DEFAULT_CONFIG).compiled is not None


def test_failing_code_generation_falls_back_to_the_interpreter(monkeypatch):
    def broken(plan):
        raise RuntimeError("exec is not available")

    monkeypatch.setattr("dacite._codegen.compile_function", broken)
    dacite.set_compile_threshold(0)
    assert from_dict(Point, {"x": 1}) == Point(1, 0)
    plan = get_plan(Point, DEFAULT_CONFIG)
    assert plan.compiled is None and plan.run == plan.interpret


def test_converter_compile_and_convert_many_use_generated_code():
    dacite.set_compile_threshold(100)
    converter = Converter(Point).compile()
    assert get_plan(Point, DEFAULT_CONFIG).compiled is not None
    assert converter.convert_many([{"x": 1}, {"x": 2, "y": 3}]) == [Point(1, 0), Point(2, 3)]
    dacite.set_compile_threshold(None)
    dacite.clear_cache()
    Converter(Point).compile()
    assert get_plan(Point, DEFAULT_CONFIG).compiled is None


@pytest.mark.parametrize("threshold", [None, 0])
def test_exotic_mappings_are_converted_like_dicts(threshold):
    dacite.set_compile_threshold(threshold)
    for data in (OrderedDict(x=1, y=2), MappingProxyType({"x": 1, "y": 2})):
        assert from_dict(Point, data) == Point(1, 2)


@pytest.mark.parametrize("threshold", [None, 0])
def test_earlier_wrong_type_wins_over_later_missing_key(threshold):
    dacite.set_compile_threshold(threshold)

    @dataclass
    class Two:
        a: int
        b: str

    with pytest.raises(WrongTypeError):
        from_dict(Two, {"a": "not an int"})
    with pytest.raises(MissingValueError) as info:
        from_dict(Two, {"a": 1})
    assert info.value.field_path == "b"


@pytest.mark.parametrize("threshold", [None, 0])
def test_keyword_only_and_custom_init_are_constructed_by_keyword(threshold):
    dacite.set_compile_threshold(threshold)

    @dataclass(kw_only=True)
    class KeywordOnly:
        a: int
        b: int

    @dataclass(init=False)
    class Custom:
        a: int
        b: int

        def __init__(self, b, a):  # different parameter order than the fields
            self.a, self.b = a, b

    assert from_dict(KeywordOnly, {"b": 2, "a": 1}) == KeywordOnly(a=1, b=2)
    result = from_dict(Custom, {"a": 1, "b": 2})
    assert (result.a, result.b) == (1, 2)


@pytest.mark.parametrize("threshold", [None, 0])
def test_collections_of_primitives_and_data_classes(threshold):
    dacite.set_compile_threshold(threshold)

    @dataclass
    class Holder:
        numbers: List[int]
        names: Tuple[str, ...]
        scores: Dict[str, float]
        points: List[Point]
        by_name: Dict[str, Point]
        maybe: Optional[List[int]] = None

    data = {
        "numbers": [1, 2],
        "names": ("a", "b"),
        "scores": {"x": 1, "y": 2.5},
        "points": [{"x": 1}, {"x": 2, "y": 3}],
        "by_name": {"p": {"x": 4}},
        "maybe": [7],
    }
    result = from_dict(Holder, data)
    assert result == Holder([1, 2], ("a", "b"), {"x": 1, "y": 2.5}, [Point(1), Point(2, 3)], {"p": Point(4)}, [7])
    assert result.numbers is not data["numbers"] and result.points is not data["points"]

    for bad in (
        {**data, "numbers": [1, "2"]},
        {**data, "names": ("a", 1)},
        {**data, "scores": {"x": "s"}},
        {**data, "scores": {1: 1.0}},
        {**data, "points": [{"x": 1}, {"x": "s"}]},
        {**data, "points": [{"x": 1}, 5]},
        {**data, "by_name": {"p": {"x": 4}, "q": None}},
    ):
        with pytest.raises(dacite.DaciteFieldError):
            from_dict(Holder, bad)


@pytest.mark.parametrize("threshold", [None, 0])
def test_error_paths_through_generated_code(threshold):
    dacite.set_compile_threshold(threshold)

    @dataclass
    class Holder:
        points: List[Point]
        by_name: Dict[str, Point]

    with pytest.raises(WrongTypeError) as info:
        from_dict(Holder, {"points": [{"x": 1}, {"x": 2}, {"x": "s"}], "by_name": {}})
    assert info.value.field_path == "points[2].x"
    with pytest.raises(MissingValueError) as info:
        from_dict(Holder, {"points": [], "by_name": {"a": {"x": 1}, "b": {}}})
    assert info.value.field_path == "by_name['b'].x"


@dataclass
class Dog:
    kind: Literal["dog"]
    name: str
    bark: int


@dataclass
class Cat:
    kind: Literal["cat"]
    name: str
    lives: int = 9

    created = 0

    def __post_init__(self):
        Cat.created += 1


@pytest.mark.parametrize("threshold", [None, 0])
def test_union_prefilters_choose_the_same_member_as_trying_in_order(threshold):
    dacite.set_compile_threshold(threshold)

    @dataclass
    class Holder:
        pet: Union[Dog, Cat]

    assert from_dict(Holder, {"pet": {"kind": "cat", "name": "tom"}}).pet == Cat("cat", "tom")
    assert from_dict(Holder, {"pet": {"kind": "dog", "name": "rex", "bark": 3}}).pet == Dog("dog", "rex", 3)
    for bad in ({"kind": "bird", "name": "x"}, {"name": "x"}, {"kind": "dog", "name": "x"}, 5, None):
        with pytest.raises(dacite.UnionMatchError):
            from_dict(Holder, {"pet": bad})
    # no check_types: the old rule applies - failing members are not rejected by their discriminator
    assert from_dict(Holder, {"pet": 5}, Config(check_types=False)).pet == 5


def test_union_prefilter_does_not_run_post_init_of_members_that_cannot_match():
    @dataclass
    class Holder:
        pet: Union[Cat, Dog]

    Cat.created = 0
    from_dict(Holder, {"pet": {"kind": "dog", "name": "rex", "bark": 1}})
    assert Cat.created == 0  # documented: 1.x built (and discarded) a Cat first


@pytest.mark.parametrize("threshold", [None, 0])
def test_field_defaults_and_non_init_fields(threshold):
    dacite.set_compile_threshold(threshold)

    @dataclass
    class Mixed:
        a: int
        tags: List[str] = field(default_factory=list)
        derived: int = field(init=False, default=5)
        maybe: Optional[int] = None

    result = from_dict(Mixed, {"a": 1, "derived": 7})
    assert (result.a, result.tags, result.derived, result.maybe) == (1, [], 7, None)
    assert from_dict(Mixed, {"a": 1}).derived == 5
