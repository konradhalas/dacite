from typing import List

from dacite import from_dict, Config

from .fixtures import data, classes


def test_basic_scenario(benchmark):
    result = benchmark(from_dict, classes.Simple, data.simple_data)
    assert result == classes.Simple(
        attr_string=data.simple_data["attr_string"],
        attr_string_opt=data.simple_data["attr_string_opt"],
        attr_int=data.simple_data["attr_int"],
        attr_set=data.simple_data["attr_set"],
        attr_list=data.simple_data["attr_list"],
    )


def test_union_matching(benchmark):
    result = benchmark(from_dict, classes.LongUnion, data.long_union_data)
    assert isinstance(result, classes.LongUnion)
    assert result.simple_type_union
    assert isinstance(result.unrealistically_complex_union, classes.Nested)
    assert len(result.unrealistically_complex_union2) == 3
    for r in result.unrealistically_complex_union2:
        assert isinstance(r, classes.Nested)


def test_strict_unions_match(benchmark):
    result = benchmark(from_dict, classes.LongUnion, data.long_union_data, config=Config(strict_unions_match=True))
    assert isinstance(result, classes.LongUnion)
    assert result.simple_type_union
    assert isinstance(result.unrealistically_complex_union, classes.Nested)
    assert len(result.unrealistically_complex_union2) == 3
    for r in result.unrealistically_complex_union2:
        assert isinstance(r, classes.Nested)


def test_collection_of_union(benchmark):
    result = benchmark(from_dict, classes.UnionCollection, data.union_collection_data)
    assert result == classes.UnionCollection(collection=data.union_collection_data["collection"])


def test_type_hooks(benchmark):
    result = benchmark(
        from_dict,
        classes.LongUnion,
        data.long_union_data,
        config=Config(type_hooks={str: str.upper, float: lambda v: v * 123.123, list: lambda v: v * 2}),
    )
    assert isinstance(result, classes.LongUnion)
    assert result.simple_type_union
    assert isinstance(result.unrealistically_complex_union, classes.Nested)
    assert len(result.unrealistically_complex_union2) == 3
    for r in result.unrealistically_complex_union2:
        assert isinstance(r, classes.Nested)


def test_casting(benchmark):
    result = benchmark(from_dict, data_class=classes.Cast, data=data.cast_data, config=Config(cast=[classes.E]))
    assert result == classes.Cast(e=classes.E.Z)


def test_forward_references(benchmark):
    result = benchmark(
        from_dict,
        classes.ForwardRef,
        data.forward_ref_data,
        config=Config(forward_references={"LongUnion": classes.LongUnion}),
    )
    assert isinstance(result, classes.ForwardRef)
    assert isinstance(result.inner, classes.LongUnion)


def test_parsing_multiple_items(benchmark):
    def parse_iterable(data_class, elements: List[dict]):
        return [from_dict(data_class=data_class, data=item) for item in elements]

    result = benchmark(parse_iterable, classes.LongUnion, [data.long_union_data] * 25)
    assert len(result) == 25
    for r in result:
        assert isinstance(r, classes.LongUnion)
