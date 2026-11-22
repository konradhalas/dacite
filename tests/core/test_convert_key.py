from dataclasses import dataclass
from dacite import Config, from_dict


def _to_camel_case(key: str) -> str:
    first_part, *remaining_parts = key.split("_")
    return first_part + "".join(part.title() for part in remaining_parts)


def test_convert_key():
    @dataclass
    class Person:
        first_name: str
        last_name: str

    data = {"firstName": "John", "lastName": "Doe"}

    result = from_dict(Person, data, Config(convert_key=_to_camel_case))

    assert result == Person(first_name="John", last_name="Doe")


def test_convert_key_in_strict_mode():
    @dataclass
    class Person:
        first_name: str

    result = from_dict(
        Person,
        {"firstName": "John"},
        Config(convert_key=_to_camel_case, strict=True),
    )

    assert result == Person(first_name="John")
