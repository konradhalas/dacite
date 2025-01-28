from dataclasses import dataclass
from dacite import Config, from_dict


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
