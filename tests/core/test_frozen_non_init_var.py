from dataclasses import dataclass, field

from dacite import from_dict


def test_from_dict_with_frozen_non_init_var_with_default():
    @dataclass(frozen=True)
    class X:
        a: int = field(init=False, default=5)

    result = from_dict(X, {})

    assert result.a == 5
