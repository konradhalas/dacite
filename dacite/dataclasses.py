from dataclasses import Field, MISSING, fields, InitVar
from functools import partial
import inspect
from typing import Type, Any, TypeVar, NamedTuple, get_type_hints, Callable, Dict, Optional

from dacite.data import Data
from dacite.types import is_optional

T = TypeVar("T", bound=Any)


class DefaultValueNotFoundError(Exception):
    pass


def has_field_default_value(field: Field) -> bool:
    return field.default != MISSING or field.default_factory != MISSING or is_optional(field.type)  # type: ignore


def get_default_value_for_field(field: Field) -> Any:
    if field.default != MISSING:
        return field.default
    elif field.default_factory != MISSING:  # type: ignore
        return field.default_factory()  # type: ignore
    elif is_optional(field.type):
        return None
    raise DefaultValueNotFoundError()


def _get_default_value_for_init_var(data_class: Type, name: str):
    sig = inspect.signature(data_class.__init__)
    default = sig.parameters[name].default
    if default == inspect.Signature.empty:
        raise DefaultValueNotFoundError()
    return default


def create_instance(data_class: Type[T], init_values: Data, post_init_values: Data) -> T:
    instance = data_class(**init_values)
    for key, value in post_init_values.items():
        setattr(instance, key, value)
    return instance


class _PseudoField(NamedTuple):
    """
    This is duck-type replacement for dataclasses.Field, since the documentation
    discourages creating them (and that probably includes copying and mutating them).

    see https://docs.python.org/3/library/dataclasses.html#dataclasses.Field
    """

    name: str
    type: Type
    init: bool
    default: Any
    default_factory: Callable[[], Any]


def fields_and_init_vars(data_class: Type, forward_references: Optional[Dict[str, Any]]):
    field_type_hints = get_type_hints(data_class, globalns=forward_references)
    for field in fields(data_class):
        yield _PseudoField(
            name=field.name,
            type=field_type_hints[field.name],
            init=field.init,
            default=field.default,
            default_factory=field.default_factory,  # type: ignore
        )

    if not hasattr(data_class, "__post_init__"):
        return

    # we need to find type hints manually added in __post_init__ because the type info is discarded on InitVar's
    # see https://bugs.python.org/issue33569
    post_init_type_hints = get_type_hints(data_class.__post_init__, globalns=forward_references)
    for init_var_name in _init_vars_names(data_class, forward_references):
        yield _PseudoField(
            name=init_var_name,
            type=post_init_type_hints[init_var_name],
            init=True,
            default=MISSING,
            default_factory=partial(_get_default_value_for_init_var, data_class, init_var_name),
        )


def _init_vars_names(data_class: Type, forward_references):
    init_type_hints = get_type_hints(data_class.__init__, globalns=forward_references)
    for param_name, type_annotation in init_type_hints.items():
        if param_name != "return" and issubclass(type_annotation, InitVar):
            yield param_name
