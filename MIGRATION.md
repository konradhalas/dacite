# Migrating from dacite 1.x to 2.0

> **Work in progress before the 2.0 release** (`2.0.0.dev0`). This list reflects the accepted changes from
> `docs/ARCHITECTURE_V2.md`, section 9 (decisions D1-D5 are settled) and is implemented on the `v2` branch. Every
> difference found by the differential tests (v1 vs v2) is either listed here or fixed as a bug.

## What does not change

`from_dict(data_class, data, config)` works as before: same arguments, same semantics (order of hooks, conversion,
type checking, unions, default values, `InitVar`, `__post_init__`, frozen/slots). The existing exceptions, their
classes and their `field_type`/`value`/`field_path` attributes stay.

## Breaking changes

### B1. Minimum Python version
Python 3.7-3.10 are dropped (end of life). The minimum is 3.11; free-threaded CPython is supported as well. The
`typing_extensions` dependency, the `dataclasses` backport and the workaround for assigning `__args__` (Python 3.8) are
gone. *What to do:* upgrade Python or pin `dacite<2`.

### B2. `Config` is immutable and hashable
The constructor is unchanged: `Config(check_types=False, type_hooks={...}, ...)`. What changes is what you can do
*after* creating it:

```python
cfg = Config()
cfg.check_types = False          # 1.x: works; 2.0: FrozenInstanceError
cfg.type_hooks[str] = str.upper  # 1.x: works; 2.0: TypeError (read-only mapping)
```
*Why:* conversion plans are cached per configuration; a mutation after creation would be silently ignored (the old
plan would be used). *What to do:* build a new `Config` (e.g. `dataclasses.replace(cfg, check_types=False)`).
`Config().convert_key` is `None` by default (identity) instead of a function.

### B3. Indices in error paths
1.x: `wrong value type for field "orders.customer.email"`. 2.0: `... "orders[3].customer.email"`. This affects
`field_path` and the messages. Items of lists and tuples are indexed (`[3]`) and values of mappings are addressed by key
(`by_name['x'].email`); items of sets have no index (their order is undefined). Code that matches messages or paths as
text has to be updated. The new `.path` attribute holds the segments (`("orders", 3, "customer", "email")`, a mapping
key as `dacite.exceptions.MapKey`).
Note: an error about the *type of a simple element* detected by the final type check of the field (e.g. `"2"` in
`List[int]`) still points at the field (`numbers`) and carries the whole collection as `value`, as in 1.x (see below).

## Non-breaking changes worth knowing

- **New API:** `Converter(data_class, config)` (precompiled), `.compile()`, `.convert(data)`, `.convert_many(items)`.
- **Settings:** `dacite.set_compile_threshold(n)` / `get_compile_threshold()` (see below). The package is pure Python
  (a single `py3-none-any` wheel, no native extensions), so there is no backend switch.
- **Cache:** `set_cache_size`/`get_cache_size`/`clear_cache` work as before; the limit now applies to plans (not to
  helper functions), and dynamically created classes are released together with the class. Forward reference errors are
  not cached.
- **Internal modules** (`dacite.types`, `dacite.generics`, `dacite.dataclasses`, `dacite.cache`) are private. The old
  names keep working as thin shims with a `DeprecationWarning` and will be removed in 3.0.
- **Hooks on the error path:** when the conversion of a field fails, `type_hooks` and `__post_init__` of a nested object
  in that field may be called a second time (the error path reproduces the exact 1.x exception). This only concerns
  input that ends with an exception anyway.
- **`convert_key`** is called once per field when the plan is built, not on every `from_dict`. A function with side
  effects or one that depends on state will behave differently (pure functions: no difference).
- **Performance:** a `Config` created inside a loop (`from_dict(A, d, Config(type_hooks={str: lambda s: s}))`) does not
  benefit from the plan cache (every lambda is a new key). Move the `Config` out of the loop or use a `Converter`.

## Deliberate deviations from the 1.x behavior (non-breaking in practice)

- **`Union[None, X]` behaves like `Optional[X]`** (2 members, `None` first or second). In 1.x a two-member Optional
  converted `types[0]`, i.e. `NoneType` for `Union[None, X]`, so the value was not converted (and no hook for `X` was
  applied). At the same time the 1.x `lru_cache` shared its entry between the equal types `Optional[X]` and
  `Union[None, X]`, so the outcome depended on which form appeared first in the process (`Optional[X]` could even stop
  working after `Union[None, X]` had been used). There is no single "1.x behavior" to preserve; 2.0 is deterministic and
  correct. This deviates from decision D4 and is easy to revert in `_union_body` (`single_index`). Schemas with such a
  union are skipped in the differential test and covered by a unit test.
- **`strict` with `convert_key`:** data keys are compared with the *converted* field names (the 1.9.3 fix; 1.9.2
  rejected every key). The combination is not covered by the differential test and has unit tests instead.
- **`init=False` fields with a default:** when the key is missing, the field is left to `__init__`/`__post_init__`
  (the 1.9.3 fix); 1.9.2 overwrote the value set in `__post_init__` with the default.
- **A generic data class (`Box[int]`) with an `init=False` field:** 1.x raised `AttributeError`
  (`__dataclass_params__` is not forwarded through a generic alias); 2.0 works.
- **Field defaults and `convert_key`** are evaluated once when the plan is built (not on every `from_dict`): the
  `field.default != MISSING` comparison runs once. This only matters for pathological `__ne__` or functions with
  side effects.
- **`Config` field types:** `cast` is a tuple (not a list), `type_hooks` and `forward_references` are read-only views,
  and `hashable_forward_references` is gone (it was an implementation detail).
- **Union prefilters:** for `Union[A, B]` with data classes 2.0 skips a member that is certain to be rejected (a required
  key is missing, or a field with a `Literal` discriminator holds another value with `check_types=True`). In 1.x such an
  attempt built (and discarded) an object: `type_hooks`, `default_factory` and `__post_init__` of that member could run.
  In 2.0 they do not run for members that cannot match anyway. The result of the union is identical. When no member
  matches, the error is reproduced by the interpreter (so attempts on members may be repeated, as with "Hooks on the
  error path").
- **Compilation to code:** a type is interpreted for its first 99 conversions and compiled to generated code on the
  100th (`set_compile_threshold`: `0` = immediately, `None` = never; `Converter.compile()` always compiles). The result
  is the same; only the timing changes, and the plan code is `exec`-ed (environments without `exec` stay with the
  interpreter automatically). Compilation costs about 0.2 ms for a small type.
- **The error path of a simple element type** (`"2"` in `List[int]`) still points at the field, not at the element, to
  keep the `field_type` and `value` of 1.x (the whole collection). The element index appears for errors in nested data
  classes and for missing values.

## 1.x quirks that are kept

Kept bug-for-bug in 2.0 (decision D4: maximum compatibility with 1.x): the `field.default != MISSING` comparison (Q2),
a `defaultdict` as input for a `Dict` field (Q3), a `str` given for a collection field yields `str(generator)` (a value
with a memory address, rejected by the type check), for tuples `zip_longest` pads with `None`, and there is no
`Collection` check for tuples. Q1 (`Union[None, X]`) is fixed, see above.

## Differences found by the differential tests

The differential tests (`tests/differential`; thousands of examples per test, 1.x compared with the interpreter and with
the generated code, each converting twice) found no differences other than those described above.
Neutralized in the comparison: indices/keys in paths (B3) and the text of `str(generator)` (a memory address).
