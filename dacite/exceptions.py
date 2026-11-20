from typing import Any, Type, Optional, Set, Dict, Tuple, Union
from dacite.types import is_union


def _name(type_: Type) -> str:
    return type_.__name__ if hasattr(type_, "__name__") and not is_union(type_) else str(type_)


class DaciteError(Exception):
    pass


class MapKey:
    """Path segment addressing a value of a mapping by its key, rendered as `["key"]`."""

    __slots__ = ("key",)

    def __init__(self, key: Any) -> None:
        self.key = key

    def __eq__(self, other: object) -> bool:
        return isinstance(other, MapKey) and self.key == other.key

    def __hash__(self) -> int:
        return hash(("MapKey", self.key))

    def __repr__(self) -> str:
        return f"MapKey({self.key!r})"


PathSegment = Union[str, int, MapKey]


def _format_path(path: Tuple[PathSegment, ...]) -> str:
    result = ""
    for segment in path:
        if isinstance(segment, str):
            result = f"{result}.{segment}" if result else segment
        elif isinstance(segment, MapKey):
            result += f"[{segment.key!r}]"
        else:
            result += f"[{segment}]"
    return result


class DaciteFieldError(DaciteError):
    """Error bound to a place in the input. `path` holds the segments (field names, list/tuple indices, `MapKey`s),
    `field_path` is the same path as a string, e.g. `orders[3].customer.email`."""

    def __init__(self, field_path: Optional[str] = None):
        super().__init__()
        self.path: Tuple[PathSegment, ...] = (field_path,) if field_path else ()

    @property
    def field_path(self) -> Optional[str]:
        return _format_path(self.path) if self.path else None

    @field_path.setter
    def field_path(self, value: Optional[str]) -> None:
        self.path = (value,) if value else ()

    def update_path(self, parent_field_path: PathSegment) -> None:
        self.path = (parent_field_path,) + self.path


class WrongTypeError(DaciteFieldError):
    def __init__(self, field_type: Type, value: Any, field_path: Optional[str] = None) -> None:
        super().__init__(field_path=field_path)
        self.field_type = field_type
        self.value = value

    def __str__(self) -> str:
        return (
            f'wrong value type for field "{self.field_path}" - should be "{_name(self.field_type)}" '
            f'instead of value "{self.value}" of type "{_name(type(self.value))}"'
        )


class MissingValueError(DaciteFieldError):
    def __init__(self, field_path: Optional[str] = None):
        super().__init__(field_path=field_path)

    def __str__(self) -> str:
        return f'missing value for field "{self.field_path}"'


class UnionMatchError(WrongTypeError):
    def __str__(self) -> str:
        return (
            f'can not match type "{_name(type(self.value))}" to any type '
            f'of "{self.field_path}" union: {_name(self.field_type)}'
        )


class StrictUnionMatchError(DaciteFieldError):
    def __init__(self, union_matches: Dict[Type, Any], field_path: Optional[str] = None) -> None:
        super().__init__(field_path=field_path)
        self.union_matches = union_matches

    def __str__(self) -> str:
        conflicting_types = ", ".join(_name(type_) for type_ in self.union_matches)
        return f'can not choose between possible Union matches for field "{self.field_path}": {conflicting_types}'


class ForwardReferenceError(DaciteError):
    def __init__(self, message: str) -> None:
        super().__init__()
        self.message = message

    def __str__(self) -> str:
        return f"can not resolve forward reference: {self.message}"


class UnexpectedDataError(DaciteError):
    def __init__(self, keys: Set[str]) -> None:
        super().__init__()
        self.keys = keys

    def __str__(self) -> str:
        formatted_keys = ", ".join(f'"{key}"' for key in self.keys)
        return f"can not match {formatted_keys} to any data class field"
