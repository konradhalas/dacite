# dacite

This module simplify creation of data classes from dictionaries.

## Usage

### Basic usage

The following example shows the basic usage.

```python
from dataclasses import dataclass
from dacite import make


@dataclass
class Address:
    street: str
    town: str


@dataclass
class Person:
    name: str
    age: int
    address: Address


data = {
    'name': 'John Lennon',
    'age': 30,
    'address': {
        'street': 'Abbey Road',
        'town': 'London',
    }
}

john = make(data_class=Person, data=data)

assert john.name == 'John Lennon'
assert john.address.street == 'Abbey Road'
```


### Rename

```
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

```
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

### Cast

```
@dataclass
class A:
    x: str


data = {
    'x': 1,
}

result = make(data_class=A, data=data, cast=['x'])

assert result == A(x='1')
```

### Transform

```
@dataclass
class A:
    x: str


data = {
    'x': 'TEST',
}

result = make(data_class=A, data=data, transform={'x': str.lower})

assert result == A(x='test')
```


### Optionals

```
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