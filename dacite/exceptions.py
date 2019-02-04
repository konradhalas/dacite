from dataclasses import Field
from typing import Any, Set


def _get_type_name(t: type) -> str:
    return t.__name__ if hasattr(t, '__name__') else str(t)


class DaciteError(Exception):
    pass


class WrongTypeError(DaciteError):
    def __init__(self, field: Field, value: Any) -> None:
        super().__init__(f'wrong type for field "{field.name}" - should be "{_get_type_name(field.type)}" '
                         f'instead of "{_get_type_name(type(value))}"')
        self.field = field
        self.value = value


class MissingValueError(DaciteError):
    def __init__(self, field: Field) -> None:
        super().__init__(f'missing value for field {field.name}')
        self.field = field


class UnionMatchError(DaciteError):
    def __init__(self, field: Field) -> None:
        super().__init__(f'can not match the data to any type of "{field.name}" union: {_get_type_name(field.type)}')
        self.field = field


class InvalidConfigurationError(DaciteError):
    def __init__(self, parameter: str, available_choices: Set[str], value: str) -> None:
        super().__init__(f'invalid value in "{parameter}" configuration: "{value}". '
                         f'Choices are: {", ".join(available_choices)}.')
        self.parameter = parameter
        self.available_choices = available_choices
        self.value = value


class ForwardReferenceError(DaciteError):
    pass
