import pytest
from dataclasses import dataclass, field
from typing import Optional, List, Set, Union, Any, Dict

from dacite import from_dict, Config, WrongTypeError, MissingValueError, InvalidConfigurationError, UnionMatchError


def test_from_dict_from_correct_data():
    @dataclass
    class X:
        s: str
        i: int
        f: float

    result = from_dict(X, {'s': 'test', 'i': 1, 'f': 1.0})

    assert isinstance(result, X)
    assert result == X(s='test', i=1, f=1.0)


def test_from_dict_with_default_value():
    @dataclass
    class X:
        s: str
        i: int = 0

    result = from_dict(X, {'s': 'test'})

    assert result == X(s='test', i=0)


def test_from_dict_with_default_factory():
    @dataclass
    class X:
        s: str
        i: List[int] = field(default_factory=lambda: [42])

    result = from_dict(X, {'s': 'test'})

    assert result == X(s='test', i=[42])


def test_from_dict_from_incorrect_data():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {'s': 'test', 'i': 'wrong'})

    assert exception_info.value.field.name == 'i'
    assert exception_info.value.value == 'wrong'


def test_from_dict_without_required_value():
    @dataclass
    class X:
        s: str
        i: int

    with pytest.raises(MissingValueError) as exception_info:
        from_dict(X, {'s': 'test'})

    assert exception_info.value.field.name == 'i'


def test_from_dict_with_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = from_dict(Y, {'s': 'test', 'x': {'i': 1}})

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_additional_values():
    @dataclass
    class X:
        i: int

    result = from_dict(X, {'i': 1, 's': 'extra'})

    assert result == X(i=1)


def test_from_dict_with_remap():
    @dataclass
    class X:
        s: str
        i: int

    result = from_dict(X, {'s': 'test', 'j': 1}, Config(remap={'i': 'j'}))

    assert result == X(s='test', i=1)


def test_from_dict_with_nested_remap():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = from_dict(Y, {'s': 'test', 'x': {'j': 1}}, Config(remap={'x.i': 'j'}))

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_remap_and_existing_optional_field():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: Optional[X]

    result = from_dict(Y, {'s': 'test', 'x': {'j': 1}}, Config(remap={'x.i': 'j'}))

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_remap_and_missing_optional_field():
    @dataclass
    class X:
        s: str
        i: Optional[int]

    result = from_dict(X, {'s': 'test'}, Config(remap={'i': 'j'}))

    assert result == X(s='test', i=None)


def test_from_dict_with_missing_optional_union():
    @dataclass
    class X:
        i: Optional[Union[int, str]]

    result = from_dict(X, {})

    assert result == X(i=None)


def test_from_dict_with_prefix():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = from_dict(Y, {'s': 'test', 'x_i': 1}, Config(prefixed={'x': 'x_'}))

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_prefix_and_existing_optional_field():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: Optional[X]

    result = from_dict(Y, {'s': 'test', 'x_i': 1}, Config(prefixed={'x': 'x_'}))

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_prefix_and_missing_optional_field():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: Optional[X]

    result = from_dict(Y, {'s': 'test'}, Config(prefixed={'x': 'x_'}))

    assert result == Y(s='test', x=None)


def test_from_dict_with_nested_prefix():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    @dataclass
    class Z:
        y: Y

    result = from_dict(Z, {'y': {'x_i': 1}}, Config(prefixed={'y.x': 'x_'}))

    assert result == Z(y=Y(x=X(i=1)))


def test_from_dict_with_prefix_and_remap():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    result = from_dict(Y, {'x_j': 1}, Config(prefixed={'x': 'x_'}, remap={'x.i': 'j'}))

    assert result == Y(x=X(i=1))


def test_from_dict_with_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = from_dict(X, {'s': 'test', 'i': 1})

    assert result == X(s='test', i=1)


def test_from_dict_with_missing_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = from_dict(X, {'i': 1})

    assert result == X(s=None, i=1)


def test_from_dict_with_none_for_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    result = from_dict(X, {'s': None, 'i': 1})

    assert result == X(s=None, i=1)


def test_from_dict_with_wrong_type_of_optional_value():
    @dataclass
    class X:
        s: Optional[str]
        i: int

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {'s': 1, 'i': 1})

    assert exception_info.value.field.name == 's'
    assert exception_info.value.value == 1


def test_from_dict_with_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = from_dict(Y, {'x': {'i': 1}})

    assert result == Y(x=X(i=1))


def test_from_dict_with_null_for_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = from_dict(Y, {'x': None})

    assert result == Y(x=None)


def test_from_dict_with_missing_optional_nested_data_class():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: Optional[X]

    result = from_dict(Y, {})

    assert result == Y(x=None)


def test_from_dict_with_none_for_non_optional_field():
    @dataclass
    class X:
        s: str

    with pytest.raises(WrongTypeError) as exception_info:
        from_dict(X, {'s': None})

    assert exception_info.value.field.name == 's'
    assert exception_info.value.value is None


def test_from_dict_with_generic():
    @dataclass
    class X:
        l: List[int]

    result = from_dict(X, {'l': [1]})

    assert result == X(l=[1])


def test_from_dict_with_cast():
    @dataclass
    class X:
        i: int
        s: str

    result = from_dict(X, {'s': 'test', 'i': '1'}, Config(cast=['i']))

    assert result == X(s='test', i=1)


def test_from_dict_with_nested_cast():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    result = from_dict(Y, {'x': {'i': '1'}}, Config(cast=['x.i']))

    assert result == Y(x=X(i=1))


def test_from_dict_with_cast_of_existing_optional_field():
    @dataclass
    class X:
        i: Optional[int]
        s: str

    result = from_dict(X, {'s': 'test', 'i': '1'}, Config(cast=['i']))

    assert result == X(s='test', i=1)


def test_from_dict_with_cast_of_missing_optional_field():
    @dataclass
    class X:
        i: Optional[int]
        s: str

    result = from_dict(X, {'s': 'test'}, Config(cast=['i']))

    assert result == X(s='test', i=None)


def test_from_dict_with_cast_of_none_optional_field():
    @dataclass
    class X:
        i: Optional[int]
        s: str

    result = from_dict(X, {'s': 'test', 'i': None}, Config(cast=['i']))

    assert result == X(s='test', i=None)


def test_from_dict_with_cast_of_list():
    @dataclass
    class X:
        i_list: List[int]

    result = from_dict(X, {'i_list': ['1', '2']}, Config(cast=['i_list']))

    assert result == X(i_list=[1, 2])


def test_from_dict_with_cast_of_optional_list():
    @dataclass
    class X:
        i_list: Optional[List[int]]

    result = from_dict(X, {'i_list': ['1', '2']}, Config(cast=['i_list']))

    assert result == X(i_list=[1, 2])


def test_from_dict_with_cast_of_dict():
    @dataclass
    class X:
        i_dict: Dict[int, int]

    result = from_dict(X, {'i_dict': {'1': 2}}, Config(cast=['i_dict']))

    assert result == X(i_dict={1: 2})


def test_from_dict_with_transform():
    @dataclass
    class X:
        s: str

    result = from_dict(X, {'s': 'TEST'}, Config(transform={'s': str.lower}))

    assert result == X(s='test')


def test_from_dict_with_nested_transform():
    @dataclass
    class X:
        s: str

    @dataclass
    class Y:
        x: X

    result = from_dict(Y, {'x': {'s': 'TEST'}}, Config(transform={'x.s': str.lower}))

    assert result == Y(x=X(s='test'))


def test_from_dict_with_transform_of_existing_optional_field():
    @dataclass
    class X:
        s: Optional[str]

    result = from_dict(X, {'s': 'TEST'}, Config(transform={'s': str.lower}))

    assert result == X(s='test')


def test_from_dict_with_transform_of_missing_optional_field():
    @dataclass
    class X:
        s: Optional[str]

    result = from_dict(X, {}, Config(transform={'s': str.lower}))

    assert result == X(s=None)


def test_from_dict_with_transform_of_none_optional_field():
    @dataclass
    class X:
        s: Optional[str]

    result = from_dict(X, {'s': None}, Config(transform={'s': str.lower}))

    assert result == X(s=None)


def test_from_dict_with_flat():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = from_dict(Y, {'s': 'test', 'i': 1}, Config(flattened=['x']))

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_flat_of_existing_optional_field():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: Optional[X]

    result = from_dict(Y, {'s': 'test', 'i': 1}, Config(flattened=['x']))

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_flat_of_missing_optional_field():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: Optional[X]

    result = from_dict(Y, {'s': 'test'}, Config(flattened=['x']))

    assert result == Y(s='test', x=None)


def test_from_dict_with_nested_flat():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X

    @dataclass
    class Z:
        y: Y

    result = from_dict(Z, {'y': {'i': 1}}, Config(flattened=['y.x']))

    assert result == Z(y=Y(x=X(i=1)))


def test_from_dict_with_flat_and_remap():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    result = from_dict(Y, {'s': 'test', 'j': 1}, Config(flattened=['x'], remap={'x.i': 'j'}))

    assert result == Y(s='test', x=X(i=1))


def test_from_dict_with_list_of_dataclasses():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x_list: List[X]

    result = from_dict(Y, {'x_list': [{'i': 1}, {'i': 2}]})

    assert result == Y(x_list=[X(i=1), X(i=2)])


def test_from_dict_with_set_of_dataclasses():
    @dataclass(frozen=True)
    class X:
        i: int

    @dataclass
    class Y:
        x_set: Set[X]

    result = from_dict(Y, {'x_set': [{'i': 1}, {'i': 2}]})

    assert result == Y(x_set={X(i=1), X(i=2)})


def test_from_dict_with_optional_list_of_dataclasses():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x_list: Optional[List[X]]

    result = from_dict(Y, {'x_list': [{'i': 1}, {'i': 2}]})

    assert result == Y(x_list=[X(i=1), X(i=2)])


def test_from_dict_with_wrong_filed_name_in_config_remap():
    @dataclass
    class X:
        i: int

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(X, {'i': 1}, Config(remap={'s': 'z'}))

    assert exception_info.value.parameter == 'remap'
    assert exception_info.value.value == 's'


def test_from_dict_with_wrong_data_key_name_in_config_remap():
    @dataclass
    class X:
        i: int

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(X, {'j': 1}, Config(remap={'i': 'k'}))

    assert exception_info.value.parameter == 'remap'
    assert exception_info.value.value == 'k'


def test_from_dict_with_wrong_filed_name_in_config_prefixed():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(Y, {'s': 'test', 'x_i': 1}, Config(prefixed={'z': 'x_'}))

    assert exception_info.value.parameter == 'prefixed'
    assert exception_info.value.value == 'z'


def test_from_dict_with_wrong_prefix_in_config_prefixed():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(Y, {'s': 'test', 'x_i': 1}, Config(prefixed={'x': 'z_'}))

    assert exception_info.value.parameter == 'prefixed'
    assert exception_info.value.value == 'z_'


def test_from_dict_with_wrong_filed_name_in_config_cast():
    @dataclass
    class X:
        i: int
        s: str

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(X, {'s': 'test', 'i': '1'}, Config(cast=['j']))

    assert exception_info.value.parameter == 'cast'
    assert exception_info.value.value == 'j'


def test_from_dict_with_wrong_filed_name_in_transform():
    @dataclass
    class X:
        s: str

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(X, {'s': 'TEST'}, Config(transform={'z': str.lower}))

    assert exception_info.value.parameter == 'transform'
    assert exception_info.value.value == 'z'


def test_from_dict_with_wrong_filed_name_in_flattened():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str
        x: X

    with pytest.raises(InvalidConfigurationError) as exception_info:
        from_dict(Y, {'s': 'test', 'i': 1}, Config(flattened=['z']))

    assert exception_info.value.parameter == 'flattened'
    assert exception_info.value.value == 'z'


def test_from_dict_with_union_of_data_classes_and_correct_data():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str

    @dataclass
    class Z:
        x_or_y: Union[X, Y]

    result = from_dict(Z, {'x_or_y': {'s': 'test'}})

    assert result == Z(x_or_y=Y(s='test'))


def test_from_dict_with_union_of_data_classes_and_wrong_data():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str

    @dataclass
    class Z:
        x_or_y: Union[X, Y]

    with pytest.raises(UnionMatchError) as exception_info:
        from_dict(Z, {'x_or_y': {'f': 2.0}})

    assert exception_info.value.field.name == 'x_or_y'


def test_from_dict_with_union_of_data_classes_collections_with_correct_data():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        s: str

    @dataclass
    class Z:
        x_or_y: Union[List[X], List[Y]]

    result = from_dict(Z, {'x_or_y': [{'s': 'test'}]})

    assert result == Z(x_or_y=[Y(s='test')])


def test_from_dict_with_union_of_builtin_types():
    @dataclass
    class X:
        i: Union[int, str]

    result = from_dict(X, {'i': 's'})

    assert result == X(i='s')


def test_from_dict_with_union_of_mixed_types_and_builtin_type_as_a_result():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        u: Union[X, List[X], str]

    result = from_dict(Y, {'u': 'test'})

    assert result == Y(u='test')


def test_from_dict_with_union_of_mixed_types_and_data_class_as_a_result():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        u: Union[str, List[X], X]

    result = from_dict(Y, {'u': {'i': 1}})

    assert result == Y(u=X(i=1))


def test_from_dict_with_union_of_mixed_types_and_collection_of_data_classes_as_a_result():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        u: Union[str, X, List[X]]

    result = from_dict(Y, {'u': [{'i': 1}]})

    assert result == Y(u=[X(i=1)])


def test_from_dict_with_any():
    @dataclass
    class X:
        i: Any

    result = from_dict(X, {'i': 1})

    assert result == X(i=1)


def test_from_dict_with_optional_field_and_default_value():
    @dataclass
    class X:
        i: Optional[int] = 1

    result = from_dict(X, {})

    assert result == X()


def test_from_dict_with_nested_data_classes_and_default_factory():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X = field(default_factory=lambda: X(i=42))

    result = from_dict(Y, {})

    assert result == Y(x=X(i=42))


def test_from_dict_with_dict_of_data_classes():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        d: Dict[str, X]

    result = from_dict(Y, {'d': {'x': {'i': 42}, 'z': {'i': 37}}})

    assert result == Y(d={'x': X(i=42), 'z': X(i=37)})


def test_from_dict_with_union_and_dict_of_data_classes():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        d: Union[int, List[X], Dict[str, X]]

    result = from_dict(Y, {'d': {'x': {'i': 42}, 'z': {'i': 37}}})

    assert result == Y(d={'x': X(i=42), 'z': X(i=37)})


def test_from_dict_with_already_created_data_class_instances():
    @dataclass
    class X:
        i: int

    @dataclass
    class Y:
        x: X
        x_list: List[X]

    result = from_dict(Y, {'x': X(37), 'x_list': [X(i=42)]})

    assert result == Y(x=X(i=37), x_list=[X(i=42)])


def test_from_dict_with_post_init():
    @dataclass
    class X:
        s: str = field(init=False)

    x = X()
    x.s = 'test'

    result = from_dict(X, {'s': 'test'})

    assert result == x
