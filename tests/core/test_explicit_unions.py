from dataclasses import InitVar, dataclass
import sys
from typing import List, Optional, Union

import pytest

import dacite
from dacite import Config, MissingValueError, StrictUnionMatchError, WrongTypeError, from_dict


@dataclass
class Cat:
    name: str


@dataclass
class Dog:
    name: str


@dataclass
class Person:
    pet_type: str
    pet: Union[Cat, Dog]


def select_pet(data):
    return {"cat": Cat, "dog": Dog}[data["pet_type"]]


def test_parent_discriminator_selects_an_otherwise_ambiguous_member():
    data = {"pet_type": "dog", "pet": {"name": "Rex"}}
    result = from_dict(Person, data, Config(explicit_unions={"pet": select_pet}, strict_unions_match=True))
    assert result.pet == Dog("Rex")
    assert data == {"pet_type": "dog", "pet": {"name": "Rex"}}


def test_selector_receives_each_nested_parent_not_the_root():
    @dataclass
    class Household:
        people: List[Person]

    seen = []

    def selector(data):
        seen.append(data)
        return select_pet(data)

    people = [{"pet_type": "dog", "pet": {"name": "Rex"}}, {"pet_type": "cat", "pet": {"name": "Tom"}}]
    result = from_dict(Household, {"people": people}, Config(explicit_unions={"pet": selector}))
    assert [p.pet for p in result.people] == [Dog("Rex"), Cat("Tom")]
    assert seen[0] is people[0] and seen[1] is people[1]


def test_other_union_fields_keep_strict_matching():
    @dataclass
    class Pair:
        chosen: Union[Cat, Dog]
        automatic: Union[Cat, Dog]

    with pytest.raises(StrictUnionMatchError) as error:
        from_dict(
            Pair,
            {"chosen": {"name": "Rex"}, "automatic": {"name": "Tom"}},
            Config(explicit_unions={"chosen": lambda data: Dog}, strict_unions_match=True),
        )
    assert error.value.field_path == "automatic"


def test_missing_value_uses_default_without_calling_selector():
    @dataclass
    class Box:
        value: Union[int, str] = 1

    assert from_dict(Box, {}, Config(explicit_unions={"value": lambda data: pytest.fail("missing field")})) == Box(1)


@pytest.mark.parametrize("value", [None, {"name": "Rex"}])
def test_optional_selection_including_none_type(value):
    @dataclass
    class Box:
        pet: Optional[Dog]

    config = Config(explicit_unions={"pet": lambda data: type(None) if data["pet"] is None else Dog})
    assert from_dict(Box, {"pet": value}, config).pet == (None if value is None else Dog("Rex"))


def test_selected_member_can_be_a_generic_collection():
    @dataclass
    class Box:
        values: Union[List[Cat], List[Dog]]

    config = Config(explicit_unions={"values": lambda data: List[Dog]})
    assert from_dict(Box, {"values": [{"name": "Rex"}]}, config).values == [Dog("Rex")]


def test_optional_none_must_match_the_explicitly_selected_member():
    @dataclass
    class Box:
        pet: Optional[Dog]

    with pytest.raises(WrongTypeError) as error:
        from_dict(Box, {"pet": None}, Config(explicit_unions={"pet": lambda data: Dog}))
    assert error.value.field_type is Dog


def test_union_and_member_hooks_still_run_in_order():
    @dataclass
    class Box:
        value: Union[int, str]

    seen = []

    def union_hook(value):
        seen.append("union")
        return value.strip()

    def int_hook(value):
        seen.append("int")
        return int(value)

    config = Config(
        explicit_unions={"value": lambda data: int}, type_hooks={Union[int, str]: union_hook, int: int_hook}
    )
    assert from_dict(Box, {"value": " 7 "}, config).value == 7
    assert seen == ["union", "int"]


def test_only_selected_member_is_constructed():
    seen = []
    config = Config(
        explicit_unions={"pet": select_pet},
        type_hooks={Cat: lambda data: seen.append("cat") or data, Dog: lambda data: seen.append("dog") or data},
    )
    assert from_dict(Person, {"pet_type": "dog", "pet": {"name": "Rex"}}, config).pet == Dog("Rex")
    assert seen == ["dog"]


def test_selected_member_error_is_not_swallowed_or_replaced_by_another_match():
    @dataclass
    class Named:
        name: str
        tag: int

    @dataclass
    class Box:
        value: Union[Cat, Named]

    with pytest.raises(MissingValueError) as error:
        from_dict(Box, {"value": {"name": "Rex"}}, Config(explicit_unions={"value": lambda data: Named}))
    assert error.value.field_path == "value.tag"


def test_selector_exception_identity_is_preserved():
    failure = KeyError("unknown discriminator")

    def selector(data):
        raise failure

    with pytest.raises(KeyError) as error:
        from_dict(Person, {"pet_type": "dog", "pet": {}}, Config(explicit_unions={"pet": selector}))
    assert error.value is failure


@pytest.mark.parametrize("selected", [float, None, "Dog", Dog("Rex")])
def test_invalid_selected_type_reports_full_path(selected):
    @dataclass
    class Household:
        person: Person

    config = Config(explicit_unions={"pet": lambda data: selected}, check_types=False)
    with pytest.raises(dacite.UnionSelectionError) as error:
        from_dict(Household, {"person": {"pet_type": "dog", "pet": {"name": "Rex"}}}, config)
    assert error.value.field_path == "person.pet"
    assert error.value.selected_type is selected
    assert "person.pet" in str(error.value)


def test_non_union_field_cannot_have_a_selector():
    @dataclass
    class Box:
        value: int

    with pytest.raises(dacite.UnionSelectionError):
        from_dict(Box, {"value": 1}, Config(explicit_unions={"value": lambda data: int}))


def test_selected_type_is_checked_even_if_value_matches_another_member():
    @dataclass
    class Box:
        value: Union[int, str]

    config = Config(explicit_unions={"value": lambda data: int})
    with pytest.raises(WrongTypeError) as error:
        from_dict(Box, {"value": "7"}, config)
    assert error.value.field_type is int
    config.cast = [int]
    assert from_dict(Box, {"value": "7"}, config).value == 7
    config.cast = []
    config.check_types = False
    assert from_dict(Box, {"value": "7"}, config).value == "7"


def test_convert_key_uses_python_field_name_and_raw_parent_input():
    config = Config(
        convert_key=str.upper, explicit_unions={"pet": lambda data: Dog if data["PET_TYPE"] == "dog" else Cat}
    )
    assert from_dict(Person, {"PET_TYPE": "dog", "PET": {"NAME": "Rex"}}, config).pet == Dog("Rex")


def test_init_var_selection():
    @dataclass
    class Box:
        pet: InitVar[Union[Cat, Dog]]

        def __post_init__(self, pet):
            self.selected = pet

    assert from_dict(Box, {"pet": {"name": "Rex"}}, Config(explicit_unions={"pet": lambda data: Dog})).selected == Dog(
        "Rex"
    )


@pytest.mark.skipif(sys.version_info < (3, 10), reason="PEP 604 requires Python 3.10")
def test_pep604_and_forward_references():
    @dataclass
    class Box:
        pet: "Cat | Dog"

    assert from_dict(Box, {"pet": {"name": "Rex"}}, Config(explicit_unions={"pet": lambda data: Dog})).pet == Dog("Rex")
