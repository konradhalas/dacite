# dacite

[![Build Status](https://travis-ci.org/konradhalas/dacite.svg?branch=master)](https://travis-ci.org/konradhalas/dacite)
[![License](https://img.shields.io/pypi/l/dacite.svg)](https://pypi.python.org/pypi/dacite/)
[![Version](https://img.shields.io/pypi/v/dacite.svg)](https://pypi.python.org/pypi/dacite/)
[![Python versions](https://img.shields.io/pypi/pyversions/dacite.svg)](https://pypi.python.org/pypi/dacite/)

This module simplify creation of data classes ([PEP 557](pep-557)) from
dictionaries.

## Installation

To install dacite, simply use `pip` (or `pipenv`):

```
$ pip install dacite
```

## Requirements

Data classes will be available in Python 3.7 as a part of the standard
library, but for now `dataclass` module is available as an external
package.

Minimum Python version supported by `dacite` is 3.6.

## Quick start

```python
from dataclasses import dataclass
from dacite import make


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

user = make(data_class=User, data=data)

assert user == User(name='john', age=30, is_active=True)
```

## Features

Dacite supports following features:

- nested structures
- types checking
- optional fields (i.e. `typing.Optional`)
- fields values casting and transformation
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
instances. In many such cases, your input is a dictionary - it can be
a payload from a HTTP request or a raw data from a database. If you want
to convert those dictionaries into data classes, `dacite` is your best
friend.

This library was originally created to simplify creation of type hinted
data transfer objects (DTO) which can cross the boundaries in the
application architecture.

## Usage

Dacite is based on a single function - `dacite.make`. This function
takes 3 parameters:

- `data_class` - data class type
- `data` - dictionary of input data
- `config` - configuration of the creation process, instance of
`dacite.Config` class

Configuration is a (data) class with following fields:

- `rename`
- `prefixed`
- `cast`
- `transform`
- `flattened`

The examples below show usage of all `Config` parameters.

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

result = make(data_class=B, data=data)

assert result == B(a=A(x='test', y=1))
```

### Rename

If you want to change the name of your input field, you can use
`Config.rename` argument. You have to pass dictionary with a following
mapping: `{'data_class_field': 'input_field'}`

```python
@dataclass
class A:
    x: str


data = {
    'y': 'test',
}

result = make(data_class=A, data=data, config=Config(rename={'x': 'y'}))

assert result.x == 'test'

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

result = make(data_class=B, data=data, config=Config(flattened=['a']))

assert result == B(a=A(x='test', y=1), z=2.0)
```

### Prefixed

Sometimes your data are prefixed instead of nested. To handle this case,
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

result = make(data_class=B, data=data, config=Config(prefixed={'a': 'a_'}))

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

result = make(data_class=A, data=data, config=Config(cast=['x']))

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

result = make(data_class=A, data=data, config=Config(transform={'x': str.lower}))

assert result == A(x='test')
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

result = make(data_class=A, data=data)

assert result == A(x='test', y=None)
```

### Multiple inputs

If you have multiple input dicts, you can pass a list of dictionaries
instead of a single one as a value of `data` argument.

```python
@dataclass
class A:
    x: str
    y: int


data_1 = {
    'x': 'test',
}

data_2 = {
    'y': 1,
}

result = make(data_class=A, data=[data_1, data_2])

assert result == A(x='test', y=1)
```


[pep-557]: https://www.python.org/dev/peps/pep-0557/