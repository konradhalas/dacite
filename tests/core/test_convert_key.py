from dataclasses import dataclass
import pytest

from dacite import Config, from_dict, UnexpectedDataError


def test_convert_key():
    def to_camel_case(key: str) -> str:
        first_part, *remaining_parts = key.split("_")
        return first_part + "".join(part.title() for part in remaining_parts)

    @dataclass
    class Person:
        first_name: str
        last_name: str

    data = {"firstName": "John", "lastName": "Doe"}

    result = from_dict(Person, data, Config(convert_key=to_camel_case))

    assert result == Person(first_name="John", last_name="Doe")


def test_convert_key_with_strict():
    @dataclass
    class Person:
        first_name: str

    config = Config(convert_key=lambda key: key.replace("_", "-"), strict=True)

    assert from_dict(Person, {"first-name": "John"}, config) == Person(first_name="John")

    with pytest.raises(UnexpectedDataError) as exception_info:
        from_dict(Person, {"first-name": "John", "age": 3}, config)

    assert exception_info.value.keys == {"age"}
