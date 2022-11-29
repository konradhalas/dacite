from collections.abc import MutableMapping
from dataclasses import dataclass, InitVar
from datetime import date
from enum import Enum
from datetime import date
from dataclasses import dataclass, InitVar
from typing import Any, Dict, Optional, List, Union

import pytest

from dacite import (
    from_dict,
    Config,
    ForwardReferenceError,
    UnexpectedDataError,
    StrictUnionMatchError,
)
from tests.common import init_var_type_support


class TypeHooksMapping(MutableMapping):
    """
    Simple mapping implementation which lets us test that Config.type_hooks may
    be a Mapping, which is more general than the typical use case of being a
    Dict.
    """

    def __init__(self, *args, **kwargs):
        self.__dict__.update(*args, **kwargs)

    def __getitem__(self, key):
        return self.__dict__[key]

    def __setitem__(self, key, value):
        self.__dict__[key] = value

    def __delitem__(self, key):
        if key in self.__dict__:
            del self.__dict__[key]
        else:
            raise IndexError

    def __len__(self):
        return len(self.__dict__)

    def __iter__(self):
        return iter(self.__dict__)


class TypeHooksMappingWithDefault(TypeHooksMapping):
    def __getitem__(self, key):
        if key in self.__dict__:
            # If a type hook has been specified, use it.
            return self.__dict__[key]
        else:
            # Otherwise, use a dummy type hook which always constructs a 1.
            return lambda _: 1


def test_from_dict_with_type_hooks():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks={str: str.lower}))

    assert result == X(s="test")


def test_from_dict_with_type_hooks_and_optional():
    @dataclass
    class X:
        s: Optional[str]

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks={str: str.lower}))

    assert result == X(s="test")


def test_from_dict_with_type_hooks_and_union():
    @dataclass
    class X:
        s: Union[str, int]

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks={str: str.lower}))

    assert result == X(s="test")


def test_type_hook_mapping():
    @dataclass
    class X:
        s: str
        i: int

    result = from_dict(X, {"s": "TEST", "i": 0}, Config(type_hooks=TypeHooksMapping({str: str.lower})))

    assert result == X(s="test", i=1)


def test_from_dict_with_generic_type_hooks():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks={Any: str.lower}))

    assert result == X(s="test")


def test_from_dict_with_generic_list_type_hooks():
    @dataclass
    class X:
        l: List[int]

    result = from_dict(X, {"l": [3, 1, 2]}, Config(type_hooks={List: sorted}))

    assert result == X(l=[1, 2, 3])


def test_from_dict_with_generic_dict_type_hooks():
    @dataclass
    class X:
        d: Dict[str, int]

    def add_b(value):
        value["b"] = 2
        return value

    result = from_dict(X, {"d": {"a": 1}}, Config(type_hooks={Dict: add_b}))

    assert result == X(d={"a": 1, "b": 2})


def test_type_hook_mapping():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {"s": "TEST"}, Config(type_hooks=TypeHooksMapping({str: str.lower})))

    assert result == X(s="test")


@pytest.mark.skip(
    reason="not working because it runs on all of the fields, " "not just as default. see 'if Any in type_hooks:'"
)
def test_type_hook_mapping_with_default():
    @dataclass
    class X:
        s: str
        i: int

    result = from_dict(X, {"s": "TEST", "i": 0}, Config(type_hooks=TypeHooksMappingWithDefault({str: str.lower})))

    assert result == X(s="test", i=1)


def test_from_dict_with_cast():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {"s": 1}, Config(cast=[str]))

    assert result == X(s="1")


def test_from_dict_with_base_class_cast():
    class E(Enum):
        A = "a"

    @dataclass
    class X:
        e: E

    result = from_dict(X, {"e": "a"}, Config(cast=[Enum]))

    assert result == X(e=E.A)


def test_from_dict_with_base_class_cast_and_optional():
    class E(Enum):
        A = "a"

    @dataclass
    class X:
        e: Optional[E]

    result = from_dict(X, {"e": "a"}, Config(cast=[Enum]))

    assert result == X(e=E.A)


def test_from_dict_with_cast_and_generic_collection():
    @dataclass
    class X:
        s: List[int]

    result = from_dict(X, {"s": (1,)}, Config(cast=[List]))

    assert result == X(s=[1])


def test_from_dict_with_type_hooks_and_generic_sequence():
    @dataclass
    class X:
        c: List[str]

    result = from_dict(X, {"c": ["TEST"]}, config=Config(type_hooks={str: str.lower}))

    assert result == X(c=["test"])


@init_var_type_support
def test_from_dict_with_type_hooks_and_init_vars():
    @dataclass
    class X:
        name: str
        value: int

    def x_factory(tuple):
        class_map = {"X": X}
        return from_dict(data_class=class_map[tuple[0]], data=tuple[1])

    @dataclass
    class MyDictContainer:
        name: str
        var: InitVar[X]

        def __post_init__(self, var: X):
            self.name += var.name

    data = {
        "name": "test",
        "var": ("X", {"name": "_VARS_NAME", "value": 1}),
    }

    d = from_dict(data_class=MyDictContainer, data=data, config=Config(type_hooks={X: x_factory}))
    assert d.name == "test_VARS_NAME"


def test_from_dict_with_type_hook_exception():
    @dataclass
    class X:
        i: int

    def raise_error(_):
        raise KeyError()

    with pytest.raises(KeyError):
        from_dict(X, {"i": 1}, config=Config(type_hooks={int: raise_error}))


def test_from_dict_with_forward_reference():
    @dataclass
    class X:
        y: "Y"

    @dataclass
    class Y:
        s: str

    data = from_dict(X, {"y": {"s": "text"}}, Config(forward_references={"Y": Y}))
    assert data == X(Y("text"))


def test_from_dict_with_missing_forward_reference():
    @dataclass
    class X:
        y: "Y"

    @dataclass
    class Y:
        s: str

    with pytest.raises(ForwardReferenceError) as exception_info:
        from_dict(X, {"y": {"s": "text"}})

    assert str(exception_info.value) == "can not resolve forward reference: name 'Y' is not defined"


def test_form_dict_with_disabled_type_checking():
    @dataclass
    class X:
        i: int

    result = from_dict(X, {"i": "test"}, config=Config(check_types=False))

    # noinspection PyTypeChecker
    assert result == X(i="test")


def test_form_dict_with_disabled_type_checking_and_union():
    @dataclass
    class X:
        i: Union[int, float]

    result = from_dict(X, {"i": "test"}, config=Config(check_types=False))

    # noinspection PyTypeChecker
    assert result == X(i="test")


def test_from_dict_with_strict():
    @dataclass
    class X:
        s: str

    with pytest.raises(UnexpectedDataError) as exception_info:
        from_dict(X, {"s": "test", "i": 1}, Config(strict=True))

    assert str(exception_info.value) == 'can not match "i" to any data class field'


def test_from_dict_with_strict_unions_match_and_ambiguous_match():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        i: int

    @dataclass
    class Z:
        u: Union[X, Y]

    data = {
        "u": {"i": 1},
    }

    with pytest.raises(StrictUnionMatchError) as exception_info:
        from_dict(Z, data, Config(strict_unions_match=True))

    assert str(exception_info.value) == 'can not choose between possible Union matches for field "u": X, Y'


def test_from_dict_with_strict_unions_match_and_single_match():
    @dataclass
    class X:
        f: str

    @dataclass
    class Y:
        f: int

    @dataclass
    class Z:
        u: Union[X, Y]

    data = {
        "u": {"f": 1},
    }

    result = from_dict(Z, data, Config(strict_unions_match=True))

    assert result == Z(u=Y(f=1))


def test_from_dict_with_allow_missing_fields_with_none():
    @dataclass
    class X:
        a: int
        b: str

    assert X(a=1, b=None) == from_dict(X, {"a": 1}, Config(allow_missing_fields_as_none=True))


def test_custom_from_dict_in_nested_data_class():
    @dataclass
    class X:
        d: date
        t: str

        @classmethod
        def from_dict(data_class, data, config):
            data["t"] = f"prefix {data['t']}"
            config = Config(type_hooks={date: date.fromtimestamp})
            return from_dict(
                data_class=data_class,
                data=data,
                config=config,
            )

    @dataclass
    class Y:
        d: date
        x: X

    config = Config(type_hooks={date: date.fromordinal})
    data = {"d": 737790, "x": {"d": 1607511900.985121, "t": "abc"}}
    result = from_dict(Y, data, config=config)

    assert result == Y(
        d=date(2020, 12, 31),
        x=X(
            d=date(2020, 12, 9),
            t="prefix abc",
        ),
    )
