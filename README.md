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

## Usage

This library is based on a single function - `dacite.make`. Following
examples show various ways to call it and use of all its parameters.

### Nested structures

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

```python
@dataclass
class A:
    x: str


data = {
    'y': 'test',
}

result = make(data_class=A, data=data, rename={'x': 'y'})

assert result.x == 'test'

```

### Prefixes

```python
@dataclass
class A:
    x: str
    y: int


@dataclass
class B:
    a: A


data = {
    'a_x': 'test',
    'a_y': 1,
}

result = make(data_class=B, data=data, prefixes={'a': 'a_'})

assert result == B(a=A(x='test', y=1))

```

### Casting

```python
@dataclass
class A:
    x: str


data = {
    'x': 1,
}

result = make(data_class=A, data=data, cast=['x'])

assert result == A(x='1')
```

### Transformation

```python
@dataclass
class A:
    x: str


data = {
    'x': 'TEST',
}

result = make(data_class=A, data=data, transform={'x': str.lower})

assert result == A(x='test')
```

### Optional fields

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

[pep-557]: https://www.python.org/dev/peps/pep-0557/