import typing
from dataclasses import dataclass
from typing import Tuple, Union
from uuid import UUID

from dacite import Config, WrongTypeError, from_dict


def test_tuple_with_union_type_alias():
    @dataclass(frozen=True)
    class Gift:
        owned_gift_id: str
        item_id: UUID

    @dataclass(frozen=True)
    class Nft:
        token_id: int
        item_id: UUID

    item_type = Union[Gift, Nft]
    if hasattr(typing, "TypeAliasType"):
        item_type = typing.TypeAliasType("Item", item_type)

    @dataclass(frozen=True)
    class Event:
        items: Tuple[item_type, ...]

    item_id = UUID("019e1cbf-4e81-77dc-a9c8-259252aba406")
    payload = {
        "items": [
            {"owned_gift_id": "gift", "item_id": str(item_id)},
            {"token_id": 42, "item_id": str(item_id)},
        ]
    }

    try:
        result = from_dict(Event, payload, Config(strict=True, cast=[UUID, tuple]))
    except WrongTypeError as error:
        assert False, f"Tuple items using a union type alias must be deserialized: {error}"

    assert result == Event(items=(Gift(owned_gift_id="gift", item_id=item_id), Nft(token_id=42, item_id=item_id)))
