# dacite

[![Build Status](https://travis-ci.org/konradhalas/dacite.svg?branch=master)](https://travis-ci.org/konradhalas/dacite)
[![Coverage Status](https://coveralls.io/repos/github/konradhalas/dacite/badge.svg?branch=master)](https://coveralls.io/github/konradhalas/dacite?branch=master)
[![License](https://img.shields.io/pypi/l/dacite.svg)](https://pypi.python.org/pypi/dacite/)
[![Version](https://img.shields.io/pypi/v/dacite.svg)](https://pypi.python.org/pypi/dacite/)
[![Python versions](https://img.shields.io/pypi/pyversions/dacite.svg)](https://pypi.python.org/pypi/dacite/)

This module simplifies creation of data classes ([PEP 557][pep-557])
from dictionaries.

## Installation

To install dacite, simply use `pip` (or `pipenv`):

```
$ pip install dacite
```

## Requirements

Minimum Python version supported by `dacite` is 3.6.

## Quick start

```python
from dataclasses import dataclass
from dacite import from_dict


@dataclass
class User:
    name: str
    age: int
    is_active: bool


data = {
    'name': 'john',
    'age': 30,
    'is_active': True,
}

user = from_dict(data_class=User, data=data)

assert user == User(name='john', age=30, is_active=True)
```

## Features

Dacite supports following features:

- nested structures
- (basic) types checking
- optional fields (i.e. `typing.Optional`)
- unions
- forward references
- collections
- values casting and transformation
- remapping of fields names

## Motivation

Passing plain dictionaries as a data container between your functions or
methods isn't a good practice. Of course you can always create your
custom class instead, but this solution is an overkill if you only want
to merge a few fields within a single object.

Fortunately Python has a good solution to this problem - data classes.
Thanks to `@dataclass` decorator you can easily create a new custom
type with a list of given fields in a declarative manner. Data classes
support type hints by design.

However, even if you are using data classes, you have to create their
instances somehow. In many such cases, your input is a dictionary - it
can be a payload from a HTTP request or a raw data from a database. If
you want to convert those dictionaries into data classes, `dacite` is
your best friend.

This library was originally created to simplify creation of type hinted
data transfer objects (DTO) which can cross the boundaries in the
application architecture.

## Usage

Dacite is based on a single function - `dacite.from_dict`. This function
takes 3 parameters:

- `data_class` - data class type
- `data` - dictionary of input data
- `config` (optional) - configuration of the creation process, instance
of `dacite.Config` class

Configuration is a (data) class with following fields:

- `remap`
- `flattened`
- `prefixed`
- `cast`
- `transform`
- `forward references`

The examples below show all features of `from_dict` function and usage
of all `Config` parameters.

Use a dot-notation path if you want to point a nested data class field in
a configuration, e.g. `"a.b"`. It works for all options.

### Nested structures

You can pass a data with nested dictionaries and it will create a proper
result.

```python
@dataclass
class A:
    x: str
    y: int


@dataclass
class B:
    a: A


data = {
    'a': {
        'x': 'test',
        'y': 1,
    }
}

result = from_dict(data_class=B, data=data)

assert result == B(a=A(x='test', y=1))
```

### Optional fields

Whenever your data class has a `Optional` field and you will not provide
input data for this field, it will take the `None` value.

```python
from typing import Optional

@dataclass
class A:
    x: str
    y: Optional[int]


data = {
    'x': 'test',
}

result = from_dict(data_class=A, data=data)

assert result == A(x='test', y=None)
```

### Unions

If your field can accept multiple types, you should use `Union`. Dacite
will try to match data with provided types one by one. If none will
match, it will raise `UnionMatchError` exception.

```python
from typing import Union

@dataclass
class A:
    x: str

@dataclass
class B:
    y: int

@dataclass
class C:
    u: Union[A, B]


data = {
    'u': {
        'y': 1,
    },
}

result = from_dict(data_class=C, data=data)

assert result == C(u=B(y=1))
```

### Collections

Dacite supports fields defined as collections. It works for both - basic
types and data classes.

```python
@dataclass
class A:
    x: str
    y: int


@dataclass
class B:
    a_list: List[A]


data = {
    'a_list': [
        {
            'x': 'test1',
            'y': 1,
        },
        {
            'x': 'test2',
            'y': 2,
        }
    ],
}

result = from_dict(data_class=B, data=data)

assert result == B(a_list=[A(x='test1', y=1), A(x='test2', y=2)])
```

### Forward References

Definition of forward references can be passed as a `{'name': Type}` mapping to 
`Config.forward_references`. This dict is passed to `typing.get_type_hints()` as the 
`globalns` param when evaluating each field's type.

```python
@dataclass
class X:
    y: "Y"

@dataclass
class Y:
    s: str

data = from_dict(X, {"y": {"s": "text"}}, Config(forward_references={"Y": Y}))
assert data == X(Y("text"))
```

### Remapping

If your input data key does not match with a data class field name, you
can use `Config.remap` argument to handle this case. You have to pass
dictionary with a following mapping:
`{'data_class_field': 'input_field'}`

```python
@dataclass
class A:
    x: str


data = {
    'y': 'test',
}

result = from_dict(data_class=A, data=data, config=Config(remap={'x': 'y'}))

assert result == A(x='test')

```
### Flattened

You often receive a flat structure which you want to convert to
something more sophisticated. In this case you can use
`Config.flattened` argument. You have to pass list of flattened fields.

```python
@dataclass
class A:
    x: str
    y: int


@dataclass
class B:
    a: A
    z: float


data = {
    'x': 'test',
    'y': 1,
    'z': 2.0,
}

result = from_dict(data_class=B, data=data, config=Config(flattened=['a']))

assert result == B(a=A(x='test', y=1), z=2.0)
```

### Prefixed

Sometimes your data is prefixed rather than nested. To handle this case,
you have to use `Config.prefixed` argument, just pass a following
mapping: `{'data_class_field': 'prefix'}`

```python
@dataclass
class A:
    x: str
    y: int


@dataclass
class B:
    a: A
    z: float


data = {
    'a_x': 'test',
    'a_y': 1,
    'z': 2.0,
}

result = from_dict(data_class=B, data=data, config=Config(prefixed={'a': 'a_'}))

assert result == B(a=A(x='test', y=1), z=2.0)
```

### Casting

Input values are not casted by default. If you want to use field type
information to transform input value from one type to another, you have
to pass given field name as an element of the `Config.cast` argument
list.

```python
@dataclass
class A:
    x: str


data = {
    'x': 1,
}

result = from_dict(data_class=A, data=data, config=Config(cast=['x']))

assert result == A(x='1')
```

### Transformation

You can use `Config.transform` argument if you want to transform the
input data into the new value. You have to pass a following mapping:
`{'data_class_field': callable}`, where `callable` is a
`Callable[[Any], Any]`.

```python
@dataclass
class A:
    x: str


data = {
    'x': 'TEST',
}

result = from_dict(data_class=A, data=data, config=Config(transform={'x': str.lower}))

assert result == A(x='test')
```

## Exceptions

Whenever something goes wrong, `from_dict` will raise adequate
exception. There are a few of them:

- `WrongTypeError` - raised when a type of a input value does not match
with a type of a data class field
- `MissingValueError` - raised when you don't provide a value for a
required field
- `InvalidConfigurationError` - raised when you provide a invalid value
(a field name or a input data key) for a configuration
- `UnionMatchError` - raised when provided data does not match any type
of `Union`
- `ForwardReferenceError` - raised when undefined forward reference encountered in
dataclass

## Authors

Created by [Konrad Hałas][halas-homepage].

[pep-557]: https://www.python.org/dev/peps/pep-0557/
[halas-homepage]: https://konradhalas.pl
