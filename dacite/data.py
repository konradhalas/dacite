from typing import Protocol, Iterable, Any


class Data(Protocol):
    def keys(self) -> Iterable[str]:
        ...

    def __getitem__(self, item: str) -> Any:
        ...
