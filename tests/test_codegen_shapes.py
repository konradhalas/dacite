"""Every collection/union shape that has a fast path in generated code must behave exactly like the interpreter:
same result for valid data, same exception (type, message, path, field_type, value) for invalid data."""

from dataclasses import dataclass
from typing import Dict, FrozenSet, List, Literal, Optional, Set, Tuple, Union

import pytest

import dacite
from dacite import Config, from_dict
from tests.differential import oracle


@dataclass
class Pair:
    a: int
    b: str


@dataclass
class Dog:
    kind: Literal["dog"]
    bark: int


@dataclass
class Cat:
    kind: Literal["cat"]
    lives: int = 9


SHAPES = {
    "set": (Set[int], [{1, 2}, set()], [[1, 2], {1, "x"}, frozenset({1}), 5]),
    "frozenset": (FrozenSet[str], [frozenset({"a"}), frozenset()], [{"a"}, frozenset({1}), ["a"]]),
    "fixed_tuple": (
        Tuple[int, str, float],
        [(1, "a", 2.5), (1, "a", 2)],
        [(1, "a"), (1, "a", 2.5, 4), ("x", "a", 2.5), [1, "a", 2.5]],
    ),
    "tuple_var": (Tuple[int, ...], [(), (1, 2)], [(1, "x"), [1, 2], 3]),
    "nested_list": (List[List[int]], [[], [[1], [2, 3]]], [[[1], ["x"]], [[1], (2,)], [1, 2], "x"]),
    "nested_dict": (Dict[str, List[int]], [{}, {"a": [1]}], [{"a": ["x"]}, {1: [1]}, {"a": (1,)}, []]),
    "list_of_sets": (List[Set[str]], [[{"a"}], []], [[{1}], [["a"]]]),
    "dict_of_dict": (
        Dict[str, Dict[str, float]],
        [{"x": {"y": 1.5, "z": 2}}],
        [{"x": {"y": "s"}}, {"x": {1: 1.0}}, {"x": 5}],
    ),
    "list_of_optional_dc": (
        List[Optional[Pair]],
        [[{"a": 1, "b": "x"}, None], []],
        [[{"a": "s", "b": "x"}], [{"a": 1}], [5], [None, {"a": 1, "b": 2}]],
    ),
    "dict_of_optional_dc": (
        Dict[str, Optional[Pair]],
        [{"k": {"a": 1, "b": "x"}, "n": None}],
        [{"k": {"a": 1}}, {"k": 5}],
    ),
    "union_dc": (
        Union[Dog, Cat],
        [{"kind": "dog", "bark": 3}, {"kind": "cat"}, {"kind": "cat", "lives": 1}],
        [{"kind": "bird"}, {"kind": "dog"}, {"bark": 1}, 5, None, {"kind": "cat", "lives": "x"}],
    ),
    "optional_union_dc": (Optional[Union[Dog, Cat]], [None, {"kind": "dog", "bark": 3}], [{"kind": "x"}, 5]),
    "list_of_union_dc": (
        List[Union[Dog, Cat]],
        [[{"kind": "dog", "bark": 3}, {"kind": "cat"}], []],
        [[{"kind": "dog", "bark": 3}, {"kind": "x"}], [5], [None]],
    ),
    "dict_of_union_dc": (
        Dict[str, Union[Dog, Cat]],
        [{"a": {"kind": "cat"}, "b": {"kind": "dog", "bark": 1}}],
        [{"a": {"kind": "cat"}, "b": {"kind": "dog"}}, {"a": 1}],
    ),
    "list_of_optional_union_dc": (
        List[Optional[Union[Dog, Cat]]],
        [[None, {"kind": "cat"}]],
        [[None, {"kind": "z"}], [1]],
    ),
}

CONFIGS = [Config(), Config(check_types=False), Config(strict=True), Config(strict_unions_match=True)]


_HOLDERS = {}


def holder_for(annotation):
    key = repr(annotation)
    if key not in _HOLDERS:
        _HOLDERS[key] = dataclass(type("Holder", (), {"__annotations__": {"value": annotation}}))
    return _HOLDERS[key]


def convert(threshold, annotation, data, config):
    holder = holder_for(annotation)
    dacite.set_compile_threshold(threshold)
    dacite.clear_cache()
    try:
        return oracle.run(lambda: from_dict(holder, {"value": data}, config)), holder
    finally:
        dacite.set_compile_threshold(100)


@pytest.mark.parametrize("shape", sorted(SHAPES))
@pytest.mark.parametrize("config", CONFIGS, ids=["default", "no_check", "strict", "strict_unions"])
def test_generated_code_matches_the_interpreter(shape, config):
    annotation, valid, invalid = SHAPES[shape]
    for data in valid + invalid:
        for _ in range(2):  # the second conversion runs an already compiled plan
            interpreted, _ = convert(None, annotation, data, config)
            compiled, _ = convert(0, annotation, data, config)
            difference = oracle.diff(interpreted, compiled)
            assert difference is None, f"{shape} {data!r}: {difference}"


@pytest.mark.parametrize("shape", sorted(SHAPES))
def test_valid_data_is_accepted(shape):
    annotation, valid, _ = SHAPES[shape]
    for data in valid:
        outcome, _ = convert(0, annotation, data, Config())
        assert outcome.ok, f"{shape} {data!r}: {outcome.exc!r}"


def test_fast_paths_copy_containers_like_the_interpreter():
    annotation, (data, *_), _ = SHAPES["nested_list"]
    original = [[1], [2, 3]]
    outcome, _ = convert(0, annotation, original, Config())
    assert outcome.value.value == original
    assert outcome.value.value is not original and outcome.value.value[0] is not original[0]
