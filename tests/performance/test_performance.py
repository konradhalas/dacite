from typing import List

from dacite import from_dict, Config

from .fixtures import data, classes


def test_basic_scenario(benchmark):
    benchmark(from_dict, classes.Simple, data.simple_data)


def test_union_matching(benchmark):
    benchmark(from_dict, classes.LongUnion, data.long_union_data)


def test_strict_unions_match(benchmark):
    benchmark(from_dict, classes.LongUnion, data.long_union_data, config=Config(strict_unions_match=True))


def test_collection_of_union(benchmark):
    benchmark(from_dict, classes.UnionCollection, data.union_collection_data)


def test_type_hooks(benchmark):
    benchmark(
        from_dict,
        classes.LongUnion,
        data.long_union_data,
        config=Config(type_hooks={str: str.upper, float: lambda v: v * 123.123, list: lambda v: v * 2}),
    )


def test_casting(benchmark):
    benchmark(from_dict, data_class=classes.Cast, data=data.cast_data, config=Config(cast=[classes.E]))


def test_forward_references(benchmark):
    benchmark(
        from_dict,
        classes.ForwardRef,
        data.forward_ref_data,
        config=Config(forward_references={"LongUnion": classes.LongUnion}),
    )


def test_parsing_multiple_items(benchmark):
    def parse_iterable(data_class, elements: List[dict]):
        for item in elements:
            from_dict(data_class=data_class, data=item)

    benchmark(parse_iterable, classes.LongUnion, [data.long_union_data] * 25)
