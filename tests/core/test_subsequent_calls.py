from dataclasses import dataclass
from typing import Optional

from dacite import from_dict, Config


def test_from_dict_subsequent_calls_on_optional_type_and_union_none_does_not_raise():
    @dataclass
    class OptionalDataclass:
        text: Optional[str]

    @dataclass
    class UnionDataclass:
        text: str | None

    d1 = {"text": None}
    from_dict(OptionalDataclass, d1)

    d2 = {"text": "abc"}
    c = Config(cast=[int])
    from_dict(UnionDataclass, d2, config=c)
