from typing import Generic, Iterable, List, Optional, Type, TypeVar

from dacite._plan import DataclassPlan, get_plan
from dacite.config import DEFAULT_CONFIG, Config
from dacite.data import Data

T = TypeVar("T")


def from_dict(data_class: Type[T], data: Data, config: Optional[Config] = None) -> T:
    """Create a data class instance from a dictionary.

    :param data_class: a data class type
    :param data: a dictionary of a input data
    :param config: a configuration of the creation process
    :return: an instance of a data class
    """
    return get_plan(data_class, config or DEFAULT_CONFIG).run(data)  # type: ignore[no-any-return]


class Converter(Generic[T]):
    """Converter for a fixed `(data_class, config)` pair: the conversion plan is built once and held by the object.

    converter = Converter(Person, Config(strict=True)).compile()   # compile() is optional, it fails early
    person = converter.convert(data)
    people = converter.convert_many(list_of_dicts)
    """

    def __init__(self, data_class: Type[T], config: Optional[Config] = None) -> None:
        self._data_class = data_class
        self._config = config or DEFAULT_CONFIG
        self._plan: Optional[DataclassPlan] = None

    def compile(self) -> "Converter[T]":
        """Build the plan now. Raises e.g. `ForwardReferenceError` immediately instead of at the first conversion."""
        self._plan = get_plan(self._data_class, self._config)
        return self

    def convert(self, data: Data) -> T:
        plan = self._plan
        if plan is None:
            plan = self.compile()._plan
        return plan.run(data)  # type: ignore[union-attr,no-any-return]

    __call__ = convert

    def convert_many(self, items: Iterable[Data]) -> List[T]:
        plan = self._plan
        if plan is None:
            plan = self.compile()._plan
        run = plan.run  # type: ignore[union-attr]
        return [run(item) for item in items]
