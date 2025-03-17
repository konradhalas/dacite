from dataclasses import dataclass
from typing import Generic, List, Optional, TypeVar
from dacite import from_dict

T = TypeVar("T")


@dataclass
class Person:
    name: str
    children: Optional[List["Person"]] = None


@dataclass
class Club:
    name: str
    members: List["Person"]


@dataclass
class Employee:
    name: str


@dataclass
class Team(Generic[T]):
    name: str
    members: Optional[List[T]] = None
    subteams: Optional[List["Team[T]"]] = None


def test_self_reference():
    data = {"name": "John Doe", "children": [{"name": "Jane Doe"}]}

    result = from_dict(Person, data)

    assert result == Person(name="John Doe", children=[Person(name="Jane Doe")])


def test_other_reference():
    data = {"name": "FooBar", "members": [{"name": "John Doe", "children": [{"name": "Jane Doe"}]}]}

    result = from_dict(Club, data)

    assert result == Club(name="FooBar", members=[Person(name="John Doe", children=[Person(name="Jane Doe")])])


def test_generic_self_reference():
    data = {"name": "foo", "members": [{"name": "John"}], "subteams": [{"name": "bar", "members": [{"name": "Jane"}]}]}

    result = from_dict(Team[Employee], data)

    assert result == Team(
        name="foo", members=[Employee(name="John")], subteams=[Team(name="bar", members=[Employee(name="Jane")])]
    )
