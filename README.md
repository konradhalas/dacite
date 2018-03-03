# dacite

This module simplify creation of data classes from dictionaries.

## Usage

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



