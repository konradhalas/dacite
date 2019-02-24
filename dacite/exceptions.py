from typing import Any, Set, Type, Optional


def _name(t: type) -> str:
    return t.__name__ if hasattr(t, '__name__') else str(t)


class DaciteError(Exception):

    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.message = message


class DaciteFieldError(DaciteError):

    def __init__(self, message: str, field_path: Optional[str] = None):
        super().__init__(message)
        self.field_path = field_path

    def update_path(self, parent_field_path: str) -> None:
        if self.field_path:
            self.field_path = f'{parent_field_path}.{self.field_path}'
        else:
            self.field_path = parent_field_path


class WrongTypeError(DaciteFieldError):
    def __init__(self, field_type: Type, value: Any, field_path: Optional[str] = None) -> None:
        if field_path:
            message = f'wrong type for field "{field_path}" - should be ' \
                f'"{_name(field_type)}" instead of "{_name(type(value))}"'
        else:
            message = None
        super().__init__(
            message=message,
            field_path=field_path,
        )
        self.field_type = field_type
        self.value = value


class MissingValueError(DaciteFieldError):
    def __init__(self, field_path: Optional[str] = None):
        super().__init__(
            message=f'missing value for field {field_path}' if field_path else None,
            field_path=field_path,
        )


class UnionMatchError(DaciteFieldError):
    def __init__(self, field_type: Type, field_path: Optional[str] = None):
        if field_path:
            message = f'can not match the data to any type of "{field_path}" union: {_name(field_type)}'
        else:
            message = None
        super().__init__(
            message=message,
            field_path=field_path,
        )
        self.field_type = field_type


class InvalidConfigurationError(DaciteError):
    def __init__(self, parameter: str, available_choices: Set[str], value: str) -> None:
        super().__init__(f'invalid value in "{parameter}" configuration: "{value}". '
                         f'Choices are: {", ".join(available_choices)}.')
        self.parameter = parameter
        self.available_choices = available_choices
        self.value = value


class ForwardReferenceError(DaciteError):
    def __init__(self, message: str) -> None:
        super().__init__(f'can not resolve forward reference: {message}')
