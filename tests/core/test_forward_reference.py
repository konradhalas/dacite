from dataclasses import dataclass
from typing import List, Optional
from dacite import from_dict


@dataclass
class Person:
    name: str
    children: Optional[List["Person"]] = None


@dataclass
class Club:
    name: str
    members: list["Person"]


def test_self_reference():
    data = {"name": "John Doe", "children": [{"name": "Jane Doe"}]}

    result = from_dict(Person, data)

    assert result == Person(name="John Doe", children=[Person(name="Jane Doe")])


def test_other_reference():
    data = {"name": "FooBar", "members": [{"name": "John Doe", "children": [{"name": "Jane Doe"}]}]}

    result = from_dict(Club, data)

    assert result == Club(name="FooBar", members=[Person(name="John Doe", children=[Person(name="Jane Doe")])])
