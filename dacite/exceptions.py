from typing import Any, Set, Type


def _get_type_name(t: type) -> str:
    return t.__name__ if hasattr(t, '__name__') else str(t)


class DaciteError(Exception):
    pass


class WrongTypeError(DaciteError):
    def __init__(self, field: str, t: Type, value: Any) -> None:
        super().__init__(f'wrong type for field "{field}" - should be "{_get_type_name(t)}" '
                         f'instead of "{_get_type_name(type(value))}"')
        self.field = field
        self.value = value


class MissingValueError(DaciteError):
    def __init__(self, field: str) -> None:
        super().__init__(f'missing value for field {field}')
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
