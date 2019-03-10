from typing import Any, Set, Type, Optional


def _name(t: type) -> str:
    return t.__name__ if hasattr(t, '__name__') else str(t)


class DaciteError(Exception):
    pass


class DaciteFieldError(DaciteError):

    def __init__(self, field_path: Optional[str] = None):
        self.field_path = field_path

    def update_path(self, parent_field_path: str) -> None:
        if self.field_path:
            self.field_path = f'{parent_field_path}.{self.field_path}'
        else:
            self.field_path = parent_field_path


class WrongTypeError(DaciteFieldError):

    def __init__(self, field_type: Type, value: Any, field_path: Optional[str] = None) -> None:
        super().__init__(field_path=field_path)
        self.field_type = field_type
        self.value = value

    def __str__(self) -> str:
        return f'wrong type for field "{self.field_path}" - should be ' \
            f'"{_name(self.field_type)}" instead of "{_name(type(self.value))}"'


class MissingValueError(DaciteFieldError):

    def __init__(self, field_path: Optional[str] = None):
        super().__init__(field_path=field_path)

    def __str__(self) -> str:
        return f'missing value for field "{self.field_path}"'


class UnionMatchError(WrongTypeError):

    def __str__(self) -> str:
        return f'can not match type "{_name(type(self.value))}" to any type ' \
            f'of "{self.field_path}" union: {_name(self.field_type)}'


class InvalidConfigurationError(DaciteError):

    def __init__(self, parameter: str, available_choices: Set[str], value: str) -> None:
        self.parameter = parameter
        self.available_choices = available_choices
        self.value = value

    def __str__(self):
        return f'invalid value in "{self.parameter}" configuration: "{self.value}". ' \
            f'Choices are: {", ".join(self.available_choices)}'


class ForwardReferenceError(DaciteError):

    def __init__(self, message: str) -> None:
        self.message = message

    def __str__(self) -> str:
        return f'can not resolve forward reference: {self.message}'
