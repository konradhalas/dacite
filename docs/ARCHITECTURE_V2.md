# dacite v2: architecture proposal (Phase 1)

Status: **implemented on the `v2` branch (pure Python, no native core)**; this document keeps the original reasoning
from Phase 1. The current state and the deviations from the plan are in sections 11a and 14.
Sources: `benchmarks/RESULTS.md` (Phase 0) and a one-off spike described in section 3 (the spike code is not in the
repository, the result table is below).

## 1. Summary

1. **The "compile once, execute many times" hypothesis is confirmed and is by far the biggest lever.**
   A hand-written equivalent of the code a plan compiler would generate (pure Python, with full type checking) gives
   **0.72 µs instead of 11.9 µs** (flat10) and **4.9 ms instead of 115 ms** (10k list) on our scenarios. That is 16-23×
   and the level of cattrs/pydantic, without any native code.
2. **The "native executor" hypothesis is only partly confirmed.** After compiling to pure Python the *mandatory* call of
   the data class `__init__` dominates (0.30 µs of 0.72 µs for flat10; 1.97 ms of 4.9 ms for the 10k list). A native core
   can not remove that cost (`__post_init__`, `InitVar`, frozen and slots have to be preserved), so it adds only
   **1.4-1.9×** over codegen, at the price of about 50 wheels, a second language and a second implementation of the
   semantics. Recommendation: **pure Python first (IR + interpreter + codegen) as the default backend on every platform,
   the native core only after a decision gate based on measurements** (section 8).
3. The pure Python backend is therefore not a "fallback" but the main product. The native one is an optional accelerator.
4. The Phase 0 requirement that one-off calls must not get slower (cold) is met by the **"interpreter first, compile
   later"** scheme (section 5.3).
5. One thing needed the maintainer's decision right away: 1.x does **not** include indices in error paths
   (`orders.customer.email`, not `orders[3].customer.email`). See D1 in section 11.

## 2. Verifying the hypotheses from the brief

| hypothesis | verdict | data |
|---|---|---|
| Introspect `(data_class, config)` once, cache the plan | **Yes, but the cost is not in the introspection itself.** | Cached introspection is 3-8% of the time (cProfile). The cost is *repeated decisions* per value: `_build_value` + `orig()`/`is_dataclass`/`get_origin` (22-35% inclusive), `is_instance` (10-35%), `typing.__hash__` as an `lru_cache` key (up to 37% on `Literal`/`Union`). |
| Python code through `exec`, cattrs style | **Yes, and cheaper than cattrs.** | Spike: 0.72 µs (flat10) and 4.9 ms (10k) vs cattrs 0.95 µs / 7.8 ms. `exec` compilation of about 25 lines = 113 µs (cattrs pays 0.8-1.9 ms per type because it generates more). |
| Optional native executor (Rust/PyO3 or C) | **Partly.** Real gain ≤ 1.4-1.9× over codegen. | Floor of `cls(**kw)`: 0.30 µs / 1.97 ms. See section 7. |
| Pure Python fallback with identical behavior | **Yes, but the roles are reversed:** it is the default backend. | as above |
| Python does the `typing` introspection, native code does not reimplement it | **Yes.** | Native code receives a ready IR (section 4). |
| Principle: memory where possible | **Little potential.** | 10k list: 2.36 MiB (dacite) vs 1.88 (msgspec floor). The gain is mostly fewer temporary allocations, ≲ 10-25%. |

## 3. Calibrating the estimates (spike, Python 3.13.2, arm64, min of 7 repeats)

| variant | flat10 | 10k `Item` list | notes |
|---|---:|---:|---|
| dacite 1.9.2 | 11.9 µs | 115 ms | starting point |
| **floor**: just `cls(**kw)` | 0.30 µs | 1.97 ms | lower bound of *any* approach that keeps `__init__` |
| codegen (hand-written, fused checks) | 0.72 µs | 4.91 ms | pure Python lower bound; no hooks, unions, recursion, error path |
| primitive "closure" tier (no `exec`) | 1.16 µs | n/a | loop over `(name, checker)` |
| cattrs 26.2 | 0.95 µs | 7.84 ms | reference |
| pydantic 2.14 | 0.81 µs | 5.62 ms | as above |
| msgspec 0.22 | 0.58 µs | 3.15 ms | as above (does not call `__init__`) |
| `exec` compilation of ~25 lines | 113 µs one-off | | cold cost |

Methodological note: the spike is a **lower bound**. A real compiler adds support for hooks, `cast`, unions, recursion,
`Config.strict` and the error path; we expect +20-50%, i.e. realistically **about 0.9-1.1 µs** (11-13×) for flat10 and
**5.5-7 ms** (16-21×) for the 10k list. The numbers are replaced with real ones in Phase 2.

## 4. Architecture

```
                     from_dict(cls, data, config)           Converter(cls, config).convert(data)
                                   │                                         │
                          ┌────────▼────────┐  (key: class + Config)          │
                          │   plan cache    │◄───────────────────────────────┘
                          └───┬─────────┬───┘
                    miss      │         │ hit
                  ┌───────────▼──┐      │
                  │ introspection│      │      Python, once per (class, Config):
                  │ typing → IR  │      │      get_type_hints, ForwardRef, TypeVar, generics,
                  └───────┬──────┘      │      InitVar, NewType, Union/Optional/PEP 604, Literal
                          ▼             ▼
                  ┌─────────────────────────────┐
                  │ Plan = IR + executors       │
                  │   interpreter (reference)   │  ◄── the only one that creates exceptions (= 1.x semantics)
                  │   codegen (exec)            │  ◄── fast path, pure Python
                  │   native (optional)         │  ◄── same IR, Rust, Phase 3 after the gate
                  └─────────────────────────────┘
```

### 4.1 IR (conversion schema)

Immutable nodes, built in Python only (the only place that touches `typing`):

| node | meaning |
|---|---|
| `Any` | value unchanged |
| `Exact(cls, accept)` | simple type; `accept` = tuple of accepted classes (e.g. `float` also accepts `int`, the numeric tower of PEP 484) |
| `NoneType`, `Literal(values)` | |
| `Dataclass(cls, fields, strict)` | `fields`: `(name, key, node, default_kind, init, is_initvar)`; `key` after `convert_key` is computed **once** |
| `List/Set/FrozenSet(node)`, `Tuple(nodes)`, `TupleVar(node)`, `Dict(key_node, value_node)` | the container constructor is `type(data)` as in 1.x (see 4.3) |
| `Union(members, strict_match)`, `Optional(inner)` | with prefilters (4.4) |
| `Hook(fn, inner)`, `Cast(fn, inner)` | from `Config.type_hooks` / `Config.cast`, bound statically when the plan is built |
| `Ref(plan_id)` | recursion and mutually recursive types (`Tree.children: List["Tree"]`) |
| `Fallback(type_)` | **everything the compiler does not understand natively** (e.g. `Type[X]`, abstract collections, exotic cases): executed by the 1.x compatible interpreter |

`Fallback` is key: it guarantees correctness from day one and allows support for more types to be added incrementally.

### 4.2 Three executors of the same IR

1. **Interpreter**: readable, slow (1.x level, about 12 µs for flat10), implements *exactly* the 1.x semantics. It is also
   the error path and the reference for the others. It is in effect the current `core.py` moved to work on the IR instead
   of on `typing`.
2. **Codegen**: for a `Plan` it emits the source of a `convert(data)` function and `exec`s it once. The default fast
   backend.
3. **Native**: see section 8.

### 4.3 1.x semantics that must be preserved (found in the code, must be in the differential tests)

- **Order in `_build_value`:** InitVar → `type_hooks` (by the *exact* type, also `Optional[T]` and `T`) → `None` for
  Optional → Union → collection → nested data class (only when `data` is a `Mapping`, otherwise the value passes
  unchanged and only `is_instance` rejects it) → `cast`.
- **The input container type leaks into the result:** collections are built with `type(data)(generator)`. A list given
  as a `tuple` for an annotation `List[int]` yields a `tuple`, and `check_types=True` rejects it in `is_instance`.
- **Type checking happens after the conversion and only at the field level**: `is_instance(value, field_type)` walks the
  whole result (hence 13-26% of the time). The error carries the `field_type` of the field and the *whole* built value.
- **Default values are neither converted nor checked**; `default_factory` is called for every missing key;
  Optional without a default → `None`; `init=False` fields are set with `setattr` after construction and skipped for
  frozen classes.
- **Unions:** members in order; success = no exception of *any* kind (`except Exception`, also from a hook) **and**
  `is_instance(value, member)`; `strict_unions_match` collects all hits. A two-member `Optional` unpacks `types[0]`
  (see Q1).
- **Exceptions:** the path is assembled with `update_path(field.name)` (the field name, not the key after
  `convert_key`); a `NameError` for a forward reference → `ForwardReferenceError` *before* any work and **without
  caching the error**.
- `Annotated[...]` is stripped by `get_type_hints` (without `include_extras`).

Known 1.x quirks **kept bug-for-bug by default**, each open to a decision in section 11:

- **Q1** `Union[None, int]` (None first): the two-member variant takes `types[0] == NoneType`, so a hook for `int` is not
  applied. `Optional[int]` works correctly.
- **Q2** `field.default != MISSING` (instead of `is not`), sensitive to exotic `__eq__` of default values.
- **Q3** `type(data)(generator)` for mappings that can not be built from a generator (e.g. `defaultdict`) raises
  `TypeError`.

### 4.4 Fast path and errors

Principle: **the fast path may only be a faster way to the same result, never a different result.**

- The generated code handles a narrow, common case: exact types (`data.__class__ is dict`, `type(v) is int`, etc.), no
  hooks that need callbacks, known shapes. Every check that "did not pass quickly" **is not an error**: the field goes to
  the interpreter (`slow_field_i(value)`), which returns the result or raises an exception identical to 1.x.
- An error from the interpreter propagates with `update_path` at every level, as today. `try/except` without an
  exception is zero-cost on CPython 3.11+.
- For a field with an error **only the subtree of that field is repeated** in the interpreter, not the whole object.
  Side effect: a `type_hooks` hook / `__post_init__` of a nested object may run a second time **on input that ends with
  an error anyway** (a change in `MIGRATION.md`, B6).
- **Union prefilters** (the source of ~20% of the cost of data class unions, about 6 µs per exception): a member may be
  skipped only when it is known that the interpreter would reject it (simple type vs `isinstance(data, cls)`, data class
  vs `Mapping`, a `Literal` discriminator with another value when `check_types=True` and no hook on that field). Every
  prefilter has a differential test "prefilter ⇒ the interpreter rejects too".
- Exceptions are **never** created on the fast path for valid data (exception: the cost of a `KeyError` for a missing key,
  where we end with a default or an error anyway).

## 5. Cache, `Config`, threads

### 5.1 Where the plan lives (no leaks for dynamic classes)

The 1.x cache (`lru_cache(typed=True)` on functions) holds **strong references to classes** and hashes `typing` objects
on every lookup. Proposal:

- The plan is stored **in a dict in an attribute of the class itself** (`cls.__dict__['__dacite_plans__']`, read through
  `cls.__dict__`, not `getattr`, so that subclasses do not inherit the plan of their parent). The cycle
  class→plan→closure→class has no external root, so the GC collects it together with the class: **no leak for classes
  created in a loop** without weakrefs on the hot path. A lookup is a single dict access, without hashing `typing`.
- The second-level key is `ConfigKey` (section 5.2); the per-class dict is **bounded** (64 configurations by default,
  LRU).
- Generic aliases (`Box[int]`): the plan is kept in the origin class under the key `(args, ConfigKey)`.
- **Fallback** for classes that do not allow setting the attribute (a metaclass blocking `__setattr__`): a global
  bounded LRU with strong references (documented), sized by `set_cache_size`.
- Compilation failures (`ForwardReferenceError`, `NameError`) are **not cached**: a forward reference may become
  resolvable later.
- Recursion: a registry of "plans being built" keyed by `(class, ConfigKey)`; a `Ref` points at a plan that is not
  finished yet.

### 5.2 `Config`

Today `Config` is a plain `@dataclass` (`eq=True` without `frozen` ⇒ `__hash__ = None`), it contains a `dict`, a `list`
and a `lambda` as the default `convert_key` (every `Config()` has a different object ⇒ it can not be used as a key by
equality). Proposal (breaking change, B2):

- `Config` becomes `frozen=True`; `type_hooks`, `cast` and `forward_references` are copied in `__post_init__` into
  immutable structures (`MappingProxyType`/tuple). A mutation after creation (`cfg.check_types = False`,
  `cfg.type_hooks[X] = f`) **raises instead of silently using the old plan**.
- `convert_key` defaults to `None` (identity), so that `from_dict(A, d)` without a config uses **one**, constant key.
- `ConfigKey` = a tuple `(check_types, strict, strict_unions_match, id/identity of hooks and cast,
  forward_references_key, convert_key)`, computed once in `__post_init__`. Hooks are compared **by identity** (the only
  correct option for a callable).
- Pitfall (to be documented): `from_dict(A, d, Config(type_hooks={str: lambda s: s}))` in a loop creates a new lambda, so
  a new key on every call ⇒ compilation on every call. Defence: a bounded cache + a cheap compiler + the "interpreter
  first" mode (5.3), i.e. the worst case costs as much as 1.x; the README recommendation: keep the `Config` outside the
  loop or use a `Converter`.

### 5.3 Interpreter first, compilation after a call threshold

A plan has a call counter. The first calls use the plan interpreter (already 4-7× faster than 1.x in Phase 2b), so one-off
scripts and the pathological case from 5.2 do not pay for compilation. After `compile_threshold` calls the plan is
compiled to generated code and `plan.run` is replaced with the compiled function (without an additional layer).

**Measured (Phase 2c), which corrects the Phase 1 estimates:** compilation costs about **0.2 ms** for a small type (it
was estimated at 0.1 ms; 80% is `builtins.compile()`, which depends on the source size), and the interpreter is fast
enough that the saving is about 1.9 µs per call of a small type. The break-even is therefore at about 120 calls, not at
10-25. Hence the default threshold is **100** (the "ski rental" rule: the worst case is about 2× the optimum), not 2.
`set_compile_threshold(n)`: `0` = compile immediately, `None` = interpreter only; the setting is global and is **not**
part of `Config` (it changes neither the semantics nor the key). `Converter.compile()` always compiles (unless `None`).

### 5.4 Threads and free-threading

- Reading a plan: no lock (reading a dict is safe, also in free-threaded builds).
- Compilation and the "plans being built" registry: one global `RLock` (re-entrant for recursion). Two threads compiling
  the same thing only waste work; the lock eliminates that.
- A plan is immutable once published; swapping the executor is a single attribute assignment.
- A native core (if it ever exists) must declare the free-threaded mode (`Py_mod_gil`) only after passing TSan tests.

## 6. New public API (non-breaking)

```python
from dacite import from_dict, Config, Converter

from_dict(A, data, config)            # unchanged

conv = Converter(A, Config(...))      # an explicitly precompiled converter
conv.compile()                         # optional: compiles now and raises ForwardReferenceError right away
conv(data) / conv.convert(data)        # skips the cache lookup and the counter
conv.convert_many(iterable_of_dicts)   # a loop without per-item from_dict overhead ("10k objects from an API")
dacite.set_compile_threshold(n)        # when a plan is compiled to code (default 100)
```

_(The Phase 1 plan also assumed `DACITE_PURE_PYTHON=1` and `dacite.backend()`. Without a native core there is nothing to
switch, so they were not implemented; see section 14.)_

## 7. Execution options: estimates

The gain is relative to 1.x on our scenarios (warm); the "realistic" column includes the overhead of a complete
implementation.

| option | flat10 gain | 10k list gain | complexity | distribution cost | risk |
|---|---|---|---|---|---|
| **A. IR + interpreter + codegen (pure Python)** | **11-13×** (0.9-1.1 µs) | **16-21×** (5.5-7 ms) | medium: ~1.5-2 kLOC (IR, compiler, generator, interpreter) | none: `py3-none-any` | low; everything is testable differentially |
| A′. closures only (no `exec`) | ~8-10× (spike 1.16 µs) | ~8-12× (not measured) | lower: no source generator | none | low; does not solve everything, useful as a bridge for platforms without `exec` |
| **B. A + native executor in Rust (PyO3/maturin)** | 20-25× (0.45-0.6 µs) | 33-41× (2.8-3.5 ms) | high: a second language, FFI, a second implementation of the semantics | about 49 wheels (see below) + sdist with Rust + a pure wheel | medium: semantic drift, free-threading, GIL, refcounts |
| C. A + native executor in C | like B (+0-10%) | like B | high; no memory safety guarantees | cibuildwheel, same matrix | higher than B (memory bugs) |
| D. mypyc/Cython on the runtime code | little | little | low | cibuildwheel | **pointless after A:** mypyc/Cython compile code *at build time*, while the hot path is code generated *at runtime* (`exec`), which they can not compile |

Why the native gain is limited to about 1.4-1.9×: every variant that preserves the semantics has to call `cls(**kw)`
(0.30 µs for flat10, 1.97 ms of 4.9 ms for the 10k list). Native code removes the interpreter overhead around it, not the
`__init__`. For scenarios with `type_hooks`/`cast`/`Fallback` the gain is smaller (callbacks into Python), for data class
unions it is larger (no exceptions and no double pass).

Memory (all options): no intermediate `init_values`/`post_init_values`/config copies on every call; the temporary peak of
flat10 goes from about 1.9 to ≲0.5 KiB. The peak for the 10k list is dominated by the result objects (2.36 MiB), expected
−5…−10%. A plan takes about 1-5 KiB per type.

## 8. Native core: decision gate and distribution

### 8.1 When at all

Phase 3 starts **only if**, after Phase 2, both conditions hold:
1. a native prototype (a 1-2 day spike, same IR) shows ≥ 1.5× over codegen on `big_list_10k` and `union_dataclasses`;
2. the maintainer accepts the cost of maintaining a second implementation and the wheel matrix.

If not, 2.0 ships as pure Python and the native core stays a 2.x release without an API change.

### 8.2 If yes: Rust/PyO3 + maturin

- **Boundary:** native code receives an *immutable IR* (tuples of primitives + Python objects: classes, hooks). It never
  touches `typing`. `Fallback`/hooks call Python. Native code **does not raise substantive exceptions**; it returns a
  "rejected" signal and the error path runs the interpreter on the field (4.4).
- **Why Rust and not C:** memory safety for code operating on user objects and hooks, a mature `maturin-action`
  (manylinux/musllinux/macOS/Windows, aarch64). C would be ~0-10% faster, but without that safety net.
- **Python versions:** the CPython versions supported today are 3.11-3.15 (3.10 reached end of life in October 2026) plus
  the free-threaded 3.13t/3.14t builds. Decision D3: `requires-python >= 3.11`, CI on 3.11-3.15 + 3.13t/3.14t.
- **Wheels:** native, per version: 7 tags (cp311…cp315 + cp313t/cp314t) × 7 platforms (manylinux x86_64,
  manylinux aarch64, musllinux x86_64, musllinux aarch64, macOS x86_64, macOS arm64, Windows x64) ≈ **49 wheels**;
  the abi3 alternative gives 7 wheels but does not cover free-threaded and may cost a few % of performance (to be
  measured in the spike). Plus an **sdist** (needs Rust) and **one `py3-none-any` wheel**.
- **Pure Python wheel:** pip always prefers a wheel to an sdist and `py3-none-any` fits everywhere, so platforms without a
  native wheel get it automatically (and the sdist only with `--no-binary`). Package: `dacite/_native*.so` optional;
  `try: from dacite import _native; except ImportError:` selects the `python` backend. The pure wheel is built by a
  separate CI job (a separate `pyproject` with setuptools, the same `dacite/` directory without `_native`). To be
  validated in a distribution spike.
- **CI:** `maturin-action`/`cibuildwheel`; a `pure` job with `DACITE_PURE_PYTHON=1`; `mypy dacite`, `black --check`,
  `pylint` as today; the benchmark as today (`github-action-benchmark`) extended with `cold`.

## 9. API and behavior changes

Details and migration: `MIGRATION.md`.

| id | change | type | rationale |
|---|---|---|---|
| N1 | `from_dict(data_class, data, config=None)` unchanged | non-breaking | the overriding goal |
| N2 | new: `Converter`, `convert_many`, `compile` | non-breaking | an explicit precompiled API |
| N3 | `set_compile_threshold` / `get_compile_threshold` | non-breaking | control of the compile-to-code threshold |
| N4 | `set_cache_size`/`get_cache_size`/`clear_cache` stay | non-breaking | semantics: a limit of plans and configurations per class (also works after first use) |
| N5 | exceptions get `.path` (a tuple of segments, including indices) | non-breaking | more precise diagnostics |
| N6 | `dacite.types/generics/dataclasses/cache` become private modules; the old names stay as thin shims with a `DeprecationWarning` | non-breaking (2.0), removal in 3.0 | many projects import `dacite.types.is_instance` |
| **B1** | drop Python 3.7-3.10, drop the `typing_extensions`/`dataclasses` backport dependencies and the `__args__` hack | **breaking** | end of life; simpler, faster code |
| **B2** | `Config` immutable and hashable; `convert_key` defaults to `None` | **breaking** | cache key correctness; a mutation after creation would be silently ignored |
| **B3** | indices in error paths (`orders[3].customer.email`) in `field_path` and messages | **breaking** (depending on D1) | requirement from the brief; 1.x has none |
| B6 | a hook/`__post_init__` in the subtree of a field with an error may run a second time | non-breaking in practice | the price of an error path with the interpreter (4.4) |
| B7 | `convert_key` is called once per field at compile time, not on every call | non-breaking for pure functions | cost and cache key correctness; a function with side effects will behave differently |
| Q1-Q3 | 1.x quirks (4.3) kept | no change | open to decision D4 |

## 10. Test strategy

1. **The existing suite is the specification.** Parametrized by backend: `interpreter` (`compile_threshold=None`),
   `codegen` (`compile_threshold=0`), `native` (after Phase 3) through an autouse `backend` fixture + `clear_cache()`;
   this matters because with a high default threshold single-call tests would only exercise the interpreter.
2. **A differential test with Hypothesis.** The `dacite_v1` reference: **the 1.9.2 sources copied into
   `tests/reference_v1/`** (one version of the `dacite` package can not coexist in a single venv). The strategies
   generate: schemas (recursively: simple types, Optional/Union/Literal, collections, nested data classes, `Any`,
   generics, forward refs, `InitVar`, defaults, `frozen`/`slots`/`kw_only`), configurations (`check_types`, `strict`,
   `strict_unions_match`, `cast`, `type_hooks`, `convert_key`), valid data (generated from the type) and invalid data
   (mutations: a wrong leaf type, a missing/extra key, a wrong container). The oracle: equal results **or** the same
   exception type, the same `field_path` (after normalizing indices, if D1 = yes) and the same `field_type`/`value`.
   Every difference = an entry in `MIGRATION.md` or a bug.
3. **The property "prefilter ⇒ the interpreter rejects too"** for every union prefilter; the property "compilation does
   not change the result": `interpreter(plan)(x) == codegen(plan)(x)` on the same data.
4. Cache tests: threads (stress), dynamic classes (a `weakref` to the class after `del` + `gc.collect()`), the size limit,
   `Config` as a key (equal configurations = one plan, different hooks = different ones), not caching forward reference
   errors.
5. Benchmarks: `cold`, `warm`, memory as in Phase 0; regression thresholds in CI.

## 11. Decisions (settled by the project owner)

- **D1: paths with indices: YES.** `field_path` and the messages get indices (`orders[3].customer.email`), `.path` is a
  tuple of segments. Breaking change B3. The differential test 1.x vs 2.0 normalizes indices (`\[\d+\]`) when comparing
  paths.
- **D2: native core:** pure Python first (IR + interpreter + codegen), native only after the gate in 8.1.
- **D3: minimum Python version: 3.11** (3.10 rejected). Free-threaded (3.13t/3.14t) is in scope for 2.0.
- **D4: 1.x quirks (Q1-Q3) kept** as far as possible, so that 2.0 is compatible. Every deliberate difference needs a new
  decision and an entry in `MIGRATION.md`.
- **D5: `Config` immutable and hashable** (B2).

## 11a. Status after Phase 2c (done vs plan)

- Implemented: IR (nodes) + interpreter + **code generator** (`dacite/_codegen.py`) with a fast path for exact types
  (`dict`, `list`, `tuple`), falling back to the same interpreter nodes for everything else, positional calls of
  `__init__` (only the `__init__` generated by `@dataclass`, with no `kw_only` fields), batched reads of required keys,
  data class union prefilters and built-in collections `List/Tuple[T, ...]/Dict[K, T]` of primitives and data classes.
- The principle "the fast path may only reach the same result faster" is enforced by tests: differential 1.x vs
  interpreter vs generated code, on the same data twice (the first call may be interpreted).
- Phase A: "pure" converters of collections of primitives (`Set`, `FrozenSet`, fixed `Tuple`, nested `List`/`Dict`) and
  a fast match of a data class union member (also as a collection element and with `None`).
- **Not** implemented (deliberately): the native core (Phase 3, gate 8.1). After phase A pure Python is ahead of cattrs
  on every comparable scenario and level with pydantic-core on most; the native gate is not met in terms of
  profitability (see `benchmarks/RESULTS.md`).

## 12. Phase plan after acceptance

| phase | scope | exit gate |
|---|---|---|
| 2a | `tests/reference_v1/`, differential Hypothesis tests, backend parametrization (still on the 1.x code: 1.x vs 1.x) | tests green, strategies generate all features |
| 2b | IR + introspection + interpreter (ported 1.x semantics), plan cache, `Config`, `Converter` | 203 tests + differential green; cold benchmark ≈ 1.x |
| 2c | codegen + compile threshold, union prefilters, `convert_many` | benchmarks: goal ≥ 10× flat10, ≥ 15× 10k list; `RESULTS.md` updated |
| 3 (optional) | native spike → gate 8.1 → Rust + wheel matrix + CI | depends on the gate |
| 4 | README, CHANGELOG, `MIGRATION.md`, rebuild the graphify graph, before/after architecture SVG | 2.0 release |

## 13. Risks

| risk | consequence | mitigation |
|---|---|---|
| Codegen vs interpreter semantic drift | wrong data in production | a shared IR, a single reference interpreter, a differential test in CI, the principle "the fast path may only reach the result faster" |
| Compilation on every call with a `Config` created in a loop | slower than 1.x | interpreter-first mode, bounded cache, a README warning, `Converter` |
| An attribute on a user class is invasive | conflicts with metaclasses/slots-without-dict | read only through `cls.__dict__`, a fallback to the global LRU, tests for slots/frozen/enum-like metaclasses |
| The native gain is smaller than its cost | needless complexity | gate 8.1 before Phase 3 |
| The spike estimates are a lower bound | disappointment | "realistic" ranges are given; measure again after 2c |
| `exec` blocked (e.g. restricted environments) | no codegen | automatic fallback to the interpreter, `DACITE_PURE_PYTHON` does not depend on `exec` |

## 14. Final state: what was built and what deliberately was not

| planned | state | notes |
|---|---|---|
| IR + interpreter (1.x semantics) | done | `dacite/_plan.py` |
| codegen (`exec`) with a fast path and a fallback to the interpreter | done | `dacite/_codegen.py`, compile threshold 100 (measured break-even about 120 calls) |
| plan cache in the class, immutable `Config`, `Converter` | done | tests: threads, leaks, limit, errors are not cached |
| error paths with indices (D1) | done | list/tuple indices and mapping keys; the error of a simple element type still points at the field (`field_type`/`value` compatibility) |
| differential tests 1.x vs 2.0, both backends | done | `tests/differential/`, `tests/conftest.py` |
| Python ≥ 3.11, free-threaded | done | tests: 3.11-3.15 and 3.14t (full suite); 3.13t is not in CI (its dev dependencies have no wheels and cannot be built from source: PyO3 needs 3.14+ for free-threaded) |
| native core (Rust/PyO3) | **not built (decision D2: gate 8.1)** | pure Python is ahead of cattrs on every comparable scenario and level with pydantic-core on most; the native gain is limited by the `__init__` floor; cost: about 49 wheels. To be reassessed if a scenario appears where the 1.1-2× gap to msgspec matters |
| `py3-none-any` wheel + sdist, CI | done | a `package` job in `code_check.yaml` (3 operating systems); **nothing is released automatically**, the version is `2.0.0.dev0` |
| `DACITE_PURE_PYTHON`, `dacite.backend()` | not built | without a native core there is nothing to switch |
| before/after architecture graph SVG | not built | the SVG export needs the `svg` extra of graphify; instead there is the diagram in section 4 and the graph report |
