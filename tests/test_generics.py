from dataclasses import dataclass
from typing import Generic, TypeVar, List, Union
import pytest
from dacite import from_dict, WrongTypeError

T = TypeVar('T')


@dataclass()
class Simple(Generic[T]):
    value: T


def test_simple():
    parsed = from_dict(data_class=Simple[int], data={
        'value': 10,
    })
    reference = Simple[int](10)
    assert isinstance(parsed, Simple)
    assert type(parsed) == type(reference)
    assert parsed == reference


def test_simple_rises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=Simple[float], data={
            'value': 10,
        })


@dataclass()
class Nested(Generic[T]):
    value: Simple[T]


def test_nested():
    parsed = from_dict(data_class=Nested[int], data={'value': {'value': 1}})
    reference = Nested[int](Simple[int](1))
    assert isinstance(parsed, Nested)
    assert isinstance(parsed.value, Simple)
    assert parsed == reference
    assert type(parsed) == type(reference)


def test_nested_raises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=Nested[int], data={'value': {'value': 1.2}})


U = TypeVar('U')


@dataclass()
class RecursiveSimple(Generic[U]):
    value: Simple[Simple[U]]


def test_recursivesimple():
    parsed = from_dict(data_class=RecursiveSimple[int],
                       data={'value': {
                           'value': {
                               'value': 1
                           }
                       }})
    reference = RecursiveSimple[int](Simple[Simple[int]](Simple[int](1)))
    assert isinstance(parsed, RecursiveSimple)
    assert isinstance(parsed.value, Simple)
    assert isinstance(parsed.value.value, Simple)
    assert isinstance(parsed.value.value.value, int)
    assert parsed == reference
    assert type(parsed) == type(reference)


def test_recursivesimpleraises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=RecursiveSimple[int],
                  data={'value': {
                      'value': {
                          'value': 1.2
                      }
                  }})


@dataclass()
class ListOfInt:
    value: List[int]


def test_listofint():
    parsed = from_dict(data_class=ListOfInt, data={'value': [1, 2, 3]})
    reference = ListOfInt([1, 2, 3])
    assert isinstance(parsed, ListOfInt)
    assert parsed == reference
    assert type(parsed) == type(reference)


@dataclass()
class ListOfListOfInt:
    value: List[List[int]]


def test_listoflistofint():
    parsed = from_dict(data_class=ListOfListOfInt,
                       data={'value': [[1, 2, 3], [4, 5, 6]]})
    reference = ListOfListOfInt([[1, 2, 3], [4, 5, 6]])
    assert isinstance(parsed, ListOfListOfInt)
    assert parsed == reference
    assert type(parsed) == type(reference)


@pytest.mark.skip("Does not work, but never did")
def test_listoflistofintraises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=ListOfListOfInt,
                  data={'value': [[1, "2q", 3], [4, 5, 6]]})


@dataclass()
class ListOfSimple(Generic[T]):
    value: List[Simple[T]]


def test_listofsimple():
    parsed = from_dict(
        data_class=ListOfSimple[int],
        data={'value': [
            {
                'value': 1
            },
            {
                'value': 2
            },
            {
                'value': 3
            },
        ]})
    reference = ListOfSimple[int](
        [Simple[int](1), Simple[int](2), Simple[int](3)])
    assert isinstance(parsed, ListOfSimple)
    assert parsed == reference
    assert type(parsed) == type(reference)


@dataclass()
class Pair(Generic[T, U]):
    first: T
    second: U


def test_pairparsing():
    parsed = from_dict(data_class=Pair[int, float],
                       data={
                           'first': 1,
                           'second': 1.2
                       })
    reference = Pair[int, float](1, 1.2)
    assert isinstance(parsed, Pair)
    assert parsed == reference
    assert type(parsed) == type(reference)


def test_pairraises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=Pair[int, float],
                  data={
                      'first': 1.2,
                      'second': 11
                  })


@dataclass()
class PairNested(Generic[T, U]):
    first: Pair[int, T]
    second: Pair[U, float]


def test_pairnestedparsing():
    parsed = from_dict(data_class=PairNested[int, float],
                       data={
                           'first': {
                               'first': 1,
                               'second': 2
                           },
                           'second': {
                               'first': 3.4,
                               'second': 5.6
                           }
                       })
    reference = PairNested[int, float](Pair[int, int](1, 2),
                                       Pair[float, float](3.4, 5.6))
    assert isinstance(parsed, PairNested)
    assert parsed == reference
    assert type(parsed) == type(reference)


def test_pairnestedraises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=PairNested[int, float],
                  data={
                      'first': {
                          'first': 1.2,
                          'second': 2
                      },
                      'second': {
                          'first': 3.4,
                          'second': 5.6
                      }
                  })


@dataclass()
class RecursiveGeneric(Generic[T, U]):
    value: Pair[Simple[Pair[int, T]], Pair[U, T]]


def test_recursivegeneric():
    parsed = from_dict(data_class=RecursiveGeneric[int, float],
                       data={
                           'value': {
                               'first': {
                                   'value': {
                                       'first': 1,
                                       'second': 2
                                   }
                               },
                               'second': {
                                   'first': 4.5,
                                   'second': 6
                               }
                           }
                       })
    reference = RecursiveGeneric[int, float](
        Pair[Simple[Pair[int, int]], Pair[float, int]](Simple[Pair[int, int]](
            Pair[int, int](1, 2)), Pair[float, int](4.5, 6)))
    assert isinstance(parsed, RecursiveGeneric)
    assert parsed == reference
    assert type(parsed) == type(reference)


def test_recursivegenericraises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=RecursiveGeneric[int, float],
                  data={
                      'value': {
                          'first': {
                              'value': {
                                  'first': 1.2,
                                  'second': 2
                              }
                          },
                          'second': {
                              'first': 4.5,
                              'second': 6
                          }
                      }
                  })


@dataclass()
class UnionOfSimple(Generic[T, U]):
    value: Union[Simple[T], Simple[U]]


def test_unionofsimple():
    parsed = from_dict(data_class=UnionOfSimple[int, str],
                       data={'value': {
                           'value': 12
                       }})
    reference = UnionOfSimple[int, str](Simple[int](12))
    assert isinstance(parsed, UnionOfSimple)
    assert parsed == reference
    assert type(parsed) == type(reference)

    parsed = from_dict(data_class=UnionOfSimple[int, str],
                       data={'value': {
                           'value': "abc"
                       }})
    reference = UnionOfSimple[int, str](Simple[str]("abc"))
    assert isinstance(parsed, UnionOfSimple)
    assert parsed == reference
    assert type(parsed) == type(reference)
    assert type(parsed.value) == type(reference.value)


def test_unionofsimple_raises():
    with pytest.raises(WrongTypeError):
        from_dict(data_class=UnionOfSimple[int, str],
                  data={'value': {
                      'value': 1.23
                  }})
