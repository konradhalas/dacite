# Benchmark results

## Phase 0 baseline: dacite 1.9.2 vs reference libraries

Reproduce:

```bash
uv venv --python 3.13 venv-bench
uv pip install -p venv-bench/bin/python -e . pytest pytest-benchmark msgspec pydantic cattrs hypothesis
venv-bench/bin/python -m benchmarks.run all --label dacite-1.9.2 --out benchmarks/results/baseline.json
venv-bench/bin/python -m benchmarks.report benchmarks/results/baseline.json   # tables below
venv-bench/bin/python -m benchmarks.profile_run                               # cProfile appendix
```

### Methodology (read before trusting any number)

- One laptop (arm64 macOS, not isolated, GC enabled), CPython 3.13.2. Absolute numbers are noisy by a few %; ratios
  are what matter. Other CPython versions are **not yet measured** (planned for the Phase 2 comparison).
- **warm**: one conversion after warm-up; min over 7 repeats (median is also stored in the JSON).
- **cold**: *fresh interpreter per sample* (median of 9); the library is pre-imported on an unrelated dataclass, then
  `build + first conversion` of the scenario type is timed. It includes everything: `typing` introspection (typing's own
  caches are cold too), dacite's `lru_cache` misses, pydantic `TypeAdapter` construction, cattrs plan generation.
- **memory**: `tracemalloc` peak of one warm conversion (includes the result objects), plus peak-RSS growth
  (`ru_maxrss` delta, fresh process) for the 10k list.
- **Correctness guard**: a library's result must `==` the result of dacite on the same input, otherwise it is reported as
  `MISMATCH` and not timed. No library was disqualified.
- **Reference libraries are ceilings, not equivalents.** They do not implement dacite's semantics (`type_hooks`, `cast`,
  `forward_references`, `strict`, `check_types`, dacite-style union matching, Optional-without-default). Only scenarios
  every library can express natively are cross-compared; the rest are dacite-only (`–`). `N/A` = library can not
  express it: msgspec has no untagged union of >1 dataclass; cattrs has no native `Union[int, str]`.
  pydantic runs in default (lax) mode, msgspec with `strict=True`, cattrs with a default `Converter`.
- Harness is a custom runner (`benchmarks/run.py`), not pyperf/pytest-benchmark: cold-in-fresh-process, memory probes and
  four libraries behind one interface did not fit either tool. The existing `tests/performance` (pytest-benchmark) is left
  untouched as the regression suite used by CI.

_Python 3.13.2, arm64 Darwin_

#### Warm call (min of 7 repeats, per conversion)

| scenario | dacite-1.9.2 | cattrs 26.2.1 | msgspec 0.22.0 | pydantic 2.14.4 | dacite ÷ best other |
|---|---:|---:|---:|---:|---:|
| `flat10` | 11.90 µs | 0.95 µs | 0.58 µs | 0.81 µs | 20.4× |
| `nested5` | 17.88 µs | 1.80 µs | 0.99 µs | 1.50 µs | 18.1× |
| `big_list_10k` | 115.03 ms | 7.84 ms | 3.15 ms | 5.62 ms | 36.6× |
| `opt_literal` | 24.86 µs | N/A | 0.58 µs | 0.97 µs | 43.0× |
| `union_dataclasses` | 122 µs | 5.90 µs | – | 6.46 µs | 20.6× |
| `collections` | 358 µs | 24.96 µs | 7.99 µs | 15.19 µs | 44.8× |
| `type_hooks_cast` | 12.70 µs | – | – | – | – |
| `forward_refs` | 31.32 µs | – | – | – | – |
| `flat10_nocheck` | 9.84 µs | – | – | – | – |
| `nested5_nocheck` | 15.55 µs | – | – | – | – |
| `big_list_10k_nocheck` | 84.81 ms | – | – | – | – |

#### Cold call: build + first conversion in a fresh interpreter (median of 9)

| scenario | dacite-1.9.2 | cattrs 26.2.1 | msgspec 0.22.0 | pydantic 2.14.4 | dacite ÷ best other |
|---|---:|---:|---:|---:|---:|
| `flat10` | 68.79 µs | 767 µs | 30.58 µs | 388 µs | 2.2× |
| `nested5` | 109 µs | 1.26 ms | 48.88 µs | 610 µs | 2.2× |
| `big_list_10k` | 116.57 ms | 8.59 ms | 3.50 ms | 6.47 ms | 33.3× |
| `opt_literal` | 159 µs | N/A | 64.04 µs | 494 µs | 2.5× |
| `union_dataclasses` | 313 µs | 1.85 ms | – | 616 µs | 0.5× |
| `collections` | 559 µs | 1.61 ms | 57.63 µs | 549 µs | 9.7× |
| `type_hooks_cast` | 111 µs | – | – | – | – |
| `forward_refs` | 197 µs | – | – | – | – |
| `flat10_nocheck` | 74.13 µs | – | – | – | – |
| `nested5_nocheck` | 140 µs | – | – | – | – |
| `big_list_10k_nocheck` | 83.13 ms | – | – | – | – |

#### tracemalloc peak during one warm conversion (KiB, includes result objects)

| scenario | dacite-1.9.2 | cattrs 26.2.1 | msgspec 0.22.0 | pydantic 2.14.4 | dacite ÷ best other |
|---|---:|---:|---:|---:|---:|
| `flat10` | 1.9 | 1.2 | 0.2 | 0.6 | 8.2× |
| `nested5` | 2.8 | 2.0 | 0.5 | 1.4 | 5.1× |
| `big_list_10k` | 2,361.1 | 2,046.5 | 1,875.2 | 3,672.3 | 1.3× |
| `opt_literal` | 2.6 | N/A | 0.3 | 0.8 | 9.1× |
| `union_dataclasses` | 5.2 | 2.8 | – | 3.0 | 1.9× |
| `collections` | 18.5 | 16.5 | 9.3 | 18.4 | 2.0× |
| `type_hooks_cast` | 2.1 | – | – | – | – |
| `forward_refs` | 3.2 | – | – | – | – |
| `flat10_nocheck` | 1.3 | – | – | – | – |
| `nested5_nocheck` | 2.3 | – | – | – | – |
| `big_list_10k_nocheck` | 2,360.1 | – | – | – | – |

#### Peak RSS growth for one conversion of the 10k list (MiB)

| scenario | dacite-1.9.2 | cattrs 26.2.1 | msgspec 0.22.0 | pydantic 2.14.4 | dacite ÷ best other |
|---|---:|---:|---:|---:|---:|
| `flat10` | – | – | – | – | – |
| `nested5` | – | – | – | – | – |
| `big_list_10k` | 2.4 | 2.3 | 1.8 | 3.5 | – |
| `opt_literal` | – | N/A | – | – | – |
| `union_dataclasses` | – | – | – | – | – |
| `collections` | – | – | – | – | – |
| `type_hooks_cast` | – | – | – | – | – |
| `forward_refs` | – | – | – | – | – |
| `flat10_nocheck` | – | – | – | – | – |
| `nested5_nocheck` | – | – | – | – | – |
| `big_list_10k_nocheck` | 2.3 | – | – | – | – |

`dacite ÷ best other` = dacite time ÷ fastest other library (higher = dacite slower). RSS table is only meaningful for
`big_list_10k`.

### Where the time goes (cProfile, warm, aggregated into buckets)

cProfile exposes Python frames and C functions only; `functools.lru_cache` hits are not separate entries, so their cost
(including hashing `typing` objects as keys) shows up inside the *caller's* own time. `py-spy` needs root on macOS (not
used). `scalene` 2.4 was tried twice (`--profile-all`: 75% attributed to its own sampler thread; `--profile-only dacite`:
100% attributed to the caller line in the script, nothing inside dacite) and is unusable here on 3.13, so it is not used.
cProfile (deterministic) is cross-checked with `pyinstrument` (sampling, no root, `benchmarks/profile_pyinstrument.py`). Share = own time, profiler overhead inflates every Python call roughly uniformly.

| bucket (own-time share) | flat10 | nested5 | opt_literal | union_dataclasses | collections | big_list_10k |
|---|---:|---:|---:|---:|---:|---:|
| dispatch (`_build_value*`) | 25% | 23% | 18% | 17% | 23% | 22% |
| `from_dict` body (field loop, config, defaults) | 20% | 27% | 10% | 9% | 13% | 12% |
| `typing` module internals (`get_origin`, `__hash__` of generic aliases, `__instancecheck__`) | 16% | 12% | 43% | 42% | 17% | 20% |
| builtins (`isinstance`, `hasattr`, …) | 18% | 19% | 14% | 16% | 27% | 26% |
| type introspection (cached `is_*`/`extract_*`/`orig`) | 8% | 7% | 3% | 3% | 6% | 5% |
| `is_instance` result check (`check_types`) | 6% | 5% | 9% | 10% | 8% | 9% |
| object creation (`__init__`, `setattr`) | 7% | 7% | 3% | 4% | 5% | 5% |

Extra measurements (same machine):

| experiment | result |
|---|---|
| `check_types=False` vs `True` | −17% (flat10), −13% (nested5), −26% (10k list) |
| cost of one failed union branch (raise+catch of `WrongTypeError`) | ≈ 6 µs; `Union[Dog, Cat]` item matching 2nd member costs 16.9 µs vs 10.7 µs when 1st matches |
| exceptions raised for `union_dataclasses` data | 4 per call (≈ 20% of its 122 µs) |
| `_build_value` calls per flat10 conversion | 11 (1 per field + 1 for the `Optional`/union unwrap) |

### Second opinion: pyinstrument (sampling, inclusive time, same warm calls)

cProfile's own-time view hides cost that lives inside `lru_cache` lookups and callees. Inclusive share of total time:

| function (inclusive) | flat10 | opt_literal | union_dataclasses | big_list_10k |
|---|---:|---:|---:|---:|
| `orig()` (called for **every value**, only to ask "is this a dataclass?") | 35% | 12% | 9% | 22% |
| `is_instance` (result check) | 10% | 33% | 35% | 27% |
| `typing.__hash__` (hashing `Literal`/`Union` aliases as cache keys) | 5% | 37% | 34% | 8% |
| `typing.get_origin` | 17% | 4% | 2% | 9% |

New facts versus the cProfile view: (a) `orig()` + `is_dataclass` + `get_origin` per value is 22–35% of flat/bulk
conversions although the answer is constant per type, (b) on `Literal`/`Union` fields **a third of the time is
`typing.__hash__`**: `_LiteralGenericAlias.__hash__` rebuilds a tuple of `(value, type)` pairs on every `lru_cache` lookup,
and dacite does several lookups per value, (c) `is_instance` is the biggest single block on union scenarios (33–35%).
All three disappear when decisions are taken once, at plan-build time.

### Findings

1. **dacite 1.9.2 is ≈10–45× slower warm than every reference library**, in every comparable scenario. Against
   *cattrs* (pure Python, code-generation, no native code) it is 9.9× (nested5) – 20.6× (union_dataclasses) slower; against
   pydantic-core (Rust) 12–26×; against msgspec (C) 18–45×. So **a pure-Python compile-once design alone has roughly 10×
   headroom**; native code buys a further 1.5–3× over cattrs-style code (msgspec vs cattrs: 1.6–3.1×).
2. **There is no single hotspot.** ~11 µs per 10-field object ≈ 1.1 µs/field is made of a re-dispatch on a *static*
   type for every value: `_build_value` (~23%), the `from_dict` per-field loop (~20–27%), `isinstance`/`get_origin`/`orig`/
   `is_dataclass`/`hasattr` calls (~25–35% in total) and `lru_cache` lookups. Type *introspection* itself is already cached
   and is only 3–8% by its own time; the real cost of the cache is hashing `typing` generic aliases on every lookup
   (`typing._GenericAlias.__hash__`, `_UnionGenericAlias.__hash__` = 16% on the union scenarios). Micro-optimising
   individual functions would give tens of percent at best; the 10× comes from removing per-value decisions.
3. **Unions are the worst case** (122 µs for 4 union fields; typing internals are 42% of the time): each member is tried by
   running the full builder, failures are exceptions (≈ 6 µs each), and the winner is then validated again with
   `is_instance`. A plan can pick a branch up-front (`Literal` discriminator, distinct required keys, primitive type of the
   input) and fall back to try/except only when ambiguous.
4. **`check_types` is a double pass**: `is_instance` re-walks an already converted value (13–26% of the time). With a
   compiled plan the check is fused with the conversion (a primitive field is one `type(x) is int` test), so the
   default-on check should become close to free. It must stay on by default (no benchmark gaming).
5. **Memory is not a lever.** Peak is dominated by the result objects: 10k list = 2.36 MiB (tracemalloc) / 2.4 MiB RSS
   growth for dacite vs 1.88 / 1.8 (msgspec), 2.05 / 2.3 (cattrs), 3.67 / 3.5 (pydantic). dacite is already within 1.3× of
   the floor; the achievable gain is ≲ 25% and is mostly the same for slots=True dataclasses regardless of library.
   Transient per-call allocation (1.9 KiB for flat10 vs 0.2 KiB msgspec) is real but irrelevant in absolute terms.
6. **Cold cost is a real constraint on the design.** dacite's first call is cheap (flat10 69 µs, collections 559 µs).
   Code generation with `exec` costs cattrs 0.8–1.9 ms and pydantic 0.4–0.6 ms per type. A naive v2 codegen would make
   one-shot `from_dict` calls slower than 1.9.2 (break-even for flat10 against a cattrs-like 0.8 ms compile ≈ 70 calls per
   type). Plans therefore should be built from closures (no `exec`, cheap), or tiered (interpret first, `exec`-compile hot
   plans), and cold must be tracked in every later benchmark run.
7. Big payloads are amortised: for the 10k list cold ≈ warm (116 vs 115 ms), so the bulk-API-payload scenario is
   purely a warm-path problem (≈ 11.5 µs per item with 5 fields + `List[str]`; msgspec 0.3 µs).

### Not done / limits

- Only CPython 3.13.2 on arm64 macOS; no Linux/x86_64, no 3.8–3.12/3.14, no PyPy.
- No multi-threaded or dynamic-class (cache leak) benchmarks yet; those belong to the Phase 2 cache work.
- `strict`, `strict_unions_match` (covered only by the old `tests/performance`), `convert_key`, `InitVar`, `NewType`,
  `__post_init__`, `frozen`/`slots` objects are not separate benchmark scenarios; they are covered functionally by the
  test suite and will be added when the plan compiler handles them.

<details><summary>Appendix: raw cProfile output (top functions per scenario)</summary>


### flat10  (200 calls, profiler overhead inflates absolute numbers)

| bucket | share | calls/from_dict |
|---|---:|---:|
| dispatch (_build_*) | 25.4% | 12.0 |
| from_dict body (per-field loop, config, defaults) | 20.3% | 2.0 |
| builtins / other | 17.5% | 74.0 |
| typing module internals | 16.0% | 19.0 |
| type introspection | 8.0% | 10.0 |
| object creation (dataclass __init__/setattr) | 6.9% | 11.0 |
| type checking (is_instance) | 5.9% | 10.0 |

top 12 functions by own time:

| function | calls/from_dict | own time share |
|---|---:|---:|
| `core.py:95(_build_value)` | 11.0 | 23.4% |
| `core.py:40(from_dict)` | 1.0 | 20.1% |
| `~:0(<built-in method builtins.isinstance>)` | 53.0 | 11.6% |
| `typing.py:2528(get_origin)` | 10.0 | 10.2% |
| `generics.py:78(orig)` | 10.0 | 8.0% |
| `dataclasses.py:1331(is_dataclass)` | 10.0 | 6.5% |
| `types.py:138(is_instance)` | 10.0 | 5.9% |
| `typing.py:1773(__hash__)` | 6.0 | 4.1% |
| `~:0(<built-in method builtins.hasattr>)` | 10.0 | 2.1% |
| `core.py:118(_build_value_for_union)` | 1.0 | 2.0% |
| `functools.py:1026(__get__)` | 1.0 | 1.3% |
| `~:0(<built-in method builtins.hash>)` | 6.0 | 1.2% |

### nested5  (200 calls, profiler overhead inflates absolute numbers)

| bucket | share | calls/from_dict |
|---|---:|---:|
| from_dict body (per-field loop, config, defaults) | 26.5% | 6.0 |
| dispatch (_build_*) | 23.4% | 15.0 |
| builtins / other | 19.1% | 110.0 |
| typing module internals | 11.7% | 19.0 |
| type introspection | 7.4% | 15.0 |
| object creation (dataclass __init__/setattr) | 6.9% | 16.0 |
| type checking (is_instance) | 5.0% | 15.0 |

top 12 functions by own time:

| function | calls/from_dict | own time share |
|---|---:|---:|
| `core.py:40(from_dict)` | 5.0 | 26.3% |
| `core.py:95(_build_value)` | 15.0 | 23.4% |
| `~:0(<built-in method builtins.isinstance>)` | 75.0 | 11.2% |
| `typing.py:2528(get_origin)` | 11.0 | 7.4% |
| `generics.py:78(orig)` | 15.0 | 7.4% |
| `dataclasses.py:1331(is_dataclass)` | 15.0 | 6.7% |
| `types.py:138(is_instance)` | 15.0 | 5.0% |
| `typing.py:1665(__subclasscheck__)` | 4.0 | 2.5% |
| `~:0(<built-in method builtins.hasattr>)` | 15.0 | 2.1% |
| `typing.py:1374(__instancecheck__)` | 4.0 | 1.8% |
| `~:0(<built-in method builtins.issubclass>)` | 4.0 | 1.5% |
| `<frozen abc>:121(__subclasscheck__)` | 4.0 | 1.2% |

### opt_literal  (200 calls, profiler overhead inflates absolute numbers)

| bucket | share | calls/from_dict |
|---|---:|---:|
| typing module internals | 42.5% | 152.0 |
| dispatch (_build_*) | 18.4% | 15.0 |
| builtins / other | 13.7% | 119.0 |
| from_dict body (per-field loop, config, defaults) | 10.3% | 4.0 |
| type checking (is_instance) | 9.2% | 10.0 |
| type introspection | 3.0% | 8.0 |
| object creation (dataclass __init__/setattr) | 2.9% | 9.0 |

top 12 functions by own time:

| function | calls/from_dict | own time share |
|---|---:|---:|
| `typing.py:1813(__hash__)` | 20.0 | 16.0% |
| `core.py:95(_build_value)` | 12.0 | 14.9% |
| `core.py:40(from_dict)` | 2.0 | 10.0% |
| `types.py:138(is_instance)` | 10.0 | 9.2% |
| `~:0(<built-in method builtins.isinstance>)` | 60.0 | 7.3% |
| `typing.py:1803(<genexpr>)` | 60.0 | 6.7% |
| `typing.py:1773(__hash__)` | 21.0 | 6.3% |
| `typing.py:1802(_value_and_type_iter)` | 20.0 | 4.0% |
| `core.py:118(_build_value_for_union)` | 3.0 | 3.5% |
| `~:0(<built-in method builtins.hash>)` | 41.0 | 3.5% |
| `typing.py:2528(get_origin)` | 7.0 | 3.1% |
| `generics.py:78(orig)` | 8.0 | 3.0% |

### union_dataclasses  (200 calls, profiler overhead inflates absolute numbers)

| bucket | share | calls/from_dict |
|---|---:|---:|
| typing module internals | 41.8% | 740.0 |
| dispatch (_build_*) | 16.8% | 60.0 |
| builtins / other | 16.1% | 621.0 |
| type checking (is_instance) | 9.7% | 48.0 |
| from_dict body (per-field loop, config, defaults) | 9.0% | 22.0 |
| object creation (dataclass __init__/setattr) | 3.7% | 52.0 |
| type introspection | 2.9% | 40.0 |

top 12 functions by own time:

| function | calls/from_dict | own time share |
|---|---:|---:|
| `typing.py:1813(__hash__)` | 120.0 | 16.2% |
| `core.py:95(_build_value)` | 50.0 | 13.6% |
| `types.py:138(is_instance)` | 48.0 | 9.7% |
| `core.py:40(from_dict)` | 13.0 | 8.6% |
| `~:0(<built-in method builtins.isinstance>)` | 285.0 | 7.2% |
| `typing.py:1803(<genexpr>)` | 240.0 | 5.3% |
| `~:0(<built-in method builtins.hash>)` | 224.0 | 4.7% |
| `typing.py:1802(_value_and_type_iter)` | 120.0 | 4.6% |
| `typing.py:1773(__hash__)` | 76.0 | 4.6% |
| `generics.py:78(orig)` | 40.0 | 2.9% |
| `dataclasses.py:1331(is_dataclass)` | 40.0 | 2.8% |
| `typing.py:2528(get_origin)` | 28.0 | 2.5% |

### collections  (200 calls, profiler overhead inflates absolute numbers)

| bucket | share | calls/from_dict |
|---|---:|---:|
| builtins / other | 27.2% | 2785.0 |
| dispatch (_build_*) | 23.3% | 305.0 |
| typing module internals | 16.9% | 855.0 |
| from_dict body (per-field loop, config, defaults) | 12.7% | 251.0 |
| type checking (is_instance) | 8.2% | 309.0 |
| type introspection | 6.2% | 273.0 |
| object creation (dataclass __init__/setattr) | 5.4% | 274.0 |

top 12 functions by own time:

| function | calls/from_dict | own time share |
|---|---:|---:|
| `core.py:95(_build_value)` | 289.0 | 19.7% |
| `~:0(<built-in method builtins.isinstance>)` | 1610.0 | 11.1% |
| `core.py:40(from_dict)` | 51.0 | 9.5% |
| `types.py:138(is_instance)` | 309.0 | 8.2% |
| `typing.py:2528(get_origin)` | 223.0 | 6.7% |
| `generics.py:78(orig)` | 273.0 | 6.2% |
| `types.py:170(<genexpr>)` | 163.0 | 5.9% |
| `dataclasses.py:1331(is_dataclass)` | 273.0 | 5.4% |
| `typing.py:1443(__hash__)` | 366.0 | 4.5% |
| `core.py:146(_build_value_for_collection)` | 16.0 | 3.6% |
| `typing.py:1665(__subclasscheck__)` | 93.0 | 2.6% |
| `core.py:162(<genexpr>)` | 163.0 | 2.5% |

### big_list_10k  (3 calls, profiler overhead inflates absolute numbers)

| bucket | share | calls/from_dict |
|---|---:|---:|
| builtins / other | 26.4% | 900042.3 |
| dispatch (_build_*) | 22.4% | 90002.0 |
| typing module internals | 19.9% | 340023.0 |
| from_dict body (per-field loop, config, defaults) | 12.2% | 50003.0 |
| type checking (is_instance) | 9.2% | 80001.0 |
| type introspection | 5.2% | 70000.0 |
| object creation (dataclass __init__/setattr) | 4.7% | 80000.0 |

top 12 functions by own time:

| function | calls/from_dict | own time share |
|---|---:|---:|
| `core.py:95(_build_value)` | 80001.0 | 17.8% |
| `~:0(<built-in method builtins.isinstance>)` | 500015.0 | 11.5% |
| `core.py:40(from_dict)` | 10001.0 | 10.3% |
| `types.py:138(is_instance)` | 80001.0 | 9.2% |
| `typing.py:1443(__hash__)` | 150012.0 | 6.0% |
| `typing.py:2528(get_origin)` | 60000.0 | 5.7% |
| `generics.py:78(orig)` | 70000.0 | 5.2% |
| `core.py:146(_build_value_for_collection)` | 10001.0 | 4.6% |
| `dataclasses.py:1331(is_dataclass)` | 70000.0 | 4.5% |
| `types.py:170(<genexpr>)` | 40001.0 | 4.1% |
| `typing.py:1665(__subclasscheck__)` | 40003.0 | 3.3% |
| `typing.py:1374(__instancecheck__)` | 50004.0 | 3.2% |

</details>

## Phase 2b: plans + interpreter (no code generation yet)

Same harness, same machine (arm64 macOS, CPython 3.13.2), `benchmarks/results/phase2b.json` vs `baseline.json`.
Implementation: type annotations are introspected once per `(data class, Config)` into a tree of nodes in which every
type/config dependent decision is already taken; value checking (`check_types`) is a pre-built checker per field instead
of `is_instance` re-deriving the type every time. Plans run in a plain Python interpreter; `exec` code generation (Phase 2c)
is **not** in these numbers.

| scenario | warm 1.9.2 | warm 2b | speedup | cold 1.9.2 | cold 2b | cold ratio | tracemalloc KiB 1.9.2 → 2b |
|---|---:|---:|---:|---:|---:|---:|---:|
| `flat10` | 11.90 µs | 2.51 µs | 4.7× | 68.79 µs | 81.29 µs | 1.18× | 1.9 → 1.1 |
| `nested5` | 17.88 µs | 4.56 µs | 3.9× | 108.50 µs | 143.96 µs | 1.33× | 2.8 → 1.7 |
| `big_list_10k` | 115.03 ms | 23.28 ms | 4.9× | 116.57 ms | 23.38 ms | 0.20× | 2361.1 → 2359.3 |
| `opt_literal` | 24.86 µs | 3.39 µs | 7.3× | 158.63 µs | 190.17 µs | 1.20× | 2.6 → 1.5 |
| `union_dataclasses` | 121.71 µs | 18.24 µs | 6.7× | 313.38 µs | 269.25 µs | 0.86× | 5.2 → 4.2 |
| `collections` | 358.44 µs | 66.54 µs | 5.4× | 558.88 µs | 339.17 µs | 0.61× | 18.5 → 16.6 |
| `type_hooks_cast` | 12.70 µs | 2.55 µs | 5.0× | 111.00 µs | 126.92 µs | 1.14× | 2.1 → 1.0 |
| `forward_refs` | 31.32 µs | 7.06 µs | 4.4× | 196.62 µs | 187.42 µs | 0.95× | 3.2 → 2.3 |
| `flat10_nocheck` | 9.84 µs | 1.92 µs | 5.1× | 74.13 µs | 82.50 µs | 1.11× | 1.3 → 1.1 |
| `nested5_nocheck` | 15.55 µs | 3.83 µs | 4.1× | 139.71 µs | 135.54 µs | 0.97× | 2.3 → 1.7 |
| `big_list_10k_nocheck` | 84.81 ms | 17.95 ms | 4.7× | 83.13 ms | 18.50 ms | 0.22× | 2360.1 → 2359.3 |

Peak RSS growth for the 10k list: 2.44 → 2.34 MiB (floor is the result objects, as predicted).

Reading:

- **Warm: 3.9–7.3× faster** without any code generation; the largest gains are where v1 re-derived the most (unions,
  `Literal`, collections). Already in the range of cattrs-minus-2×; Phase 2c (fused checks + generated code) targets the
  remaining 4–5×.
- **Cold: bar partially met.** The gate from `ARCHITECTURE_V2.md` was "cold ≈ v1". Small types are 11–33% slower
  (+8…+35 µs per type, one-off): the plan builds a node *and* a checker for each distinct type, and nested data classes
  compile their plans one by one. Bigger types and anything repeated are faster (collections 0.61×, unions 0.86×). The
  extra cost is repaid after 1–4 calls (warm saving is 5–35 µs per call for these types). Cheap shortcut applied:
  plain builtin leaf types use shared pre-built nodes/checkers (66 → 58 µs of compile time for `flat10`; type hints
  alone are 30 µs and are paid by v1 as well).
- **Memory:** transient per-call allocations drop 30–40% for small types (no `init_values`/config copies); big payloads
  are dominated by the result objects, as expected.
- **Leak safety:** the plan cache lives in the data class (`__dacite_plans__`), checkers and nodes use no `lru_cache`;
  `tests/test_plan_cache.py` verifies that 50 dynamically created class pairs are garbage collected.

## Phase 2c: generated code (`benchmarks/results/phase2c.json`)

Default configuration: a type is interpreted for 99 conversions and compiled on the 100th (`set_compile_threshold`).
Warm numbers are therefore compiled; cold numbers are the first call (interpreter), except that a 10k-item list
compiles its item type after 100 items inside the very first conversion. Same machine, CPython 3.13.2.

| scenario | warm 1.9.2 | warm 2b | **warm 2c** | speedup vs 1.9.2 | cold 1.9.2 → 2c | tracemalloc KiB 1.9.2 → 2c | best other library (warm) |
|---|---:|---:|---:|---:|---:|---:|---|
| `flat10` | 11.90 µs | 2.51 µs | **0.65 µs** | 18.2× | 68.79 → 76.21 µs | 1.9 → 0.3 | 0.58 µs (msgspec) |
| `nested5` | 17.88 µs | 4.56 µs | **1.12 µs** | 15.9× | 108.50 → 131.17 µs | 2.8 → 0.5 | 0.99 µs (msgspec) |
| `big_list_10k` | 115.03 ms | 23.28 ms | **5.64 ms** | 20.4× | 116.57 → 7.76 ms | 2361 → 1880 | 3.15 ms (msgspec) |
| `opt_literal` | 24.86 µs | 3.39 µs | **0.83 µs** | 30.1× | 158.63 → 197.04 µs | 2.6 → 0.3 | 0.58 µs (msgspec) |
| `union_dataclasses` | 121.71 µs | 18.24 µs | **10.91 µs** | 11.2× | 313.38 → 287.08 µs | 5.2 → 2.3 | 5.90 µs (cattrs) |
| `collections` | 358.44 µs | 66.54 µs | **33.70 µs** | 10.6× | 558.88 → 341.04 µs | 18.5 → 10.6 | 7.99 µs (msgspec) |
| `type_hooks_cast` | 12.70 µs | 2.55 µs | **1.46 µs** | 8.7× | 111.00 → 138.58 µs | 2.1 → 0.6 | n/a |
| `forward_refs` | 31.32 µs | 7.06 µs | **1.83 µs** | 17.1× | 196.62 → 182.33 µs | 3.2 → 0.9 | n/a |
| `flat10_nocheck` | 9.84 µs | 1.92 µs | **0.53 µs** | 18.5× | 74.13 → 78.37 µs | 1.3 → 0.3 | n/a |
| `nested5_nocheck` | 15.55 µs | 3.83 µs | **1.00 µs** | 15.5× | 139.71 → 130.75 µs | 2.3 → 0.5 | n/a |
| `big_list_10k_nocheck` | 84.81 ms | 17.95 ms | **3.64 ms** | 23.3× | 83.13 → 5.25 ms | 2360 → 1880 | n/a |

Peak RSS growth for the 10k list: 2.44 MiB (1.9.2) → 2.00 MiB (msgspec 1.8, cattrs 2.3, pydantic 3.5).

Targets from `docs/ARCHITECTURE_V2.md` (≥10× `flat10`, ≥15× 10k list): **met** (18.2× and 20.4×); the "realistic"
range estimated there (11–13× and 16–21×) was beaten for `flat10`, the 10k list is at the top of it.

### Where it stands against the reference libraries (warm)

| scenario | dacite 2c | cattrs | pydantic | msgspec |
|---|---:|---:|---:|---:|
| `flat10` | **0.65 µs** | 0.95 | 0.81 | 0.58 |
| `nested5` | **1.12 µs** | 1.80 | 1.50 | 0.99 |
| `big_list_10k` | **5.64 ms** | 7.84 | 5.62 | 3.15 |
| `opt_literal` | **0.83 µs** | n/a | 0.97 | 0.58 |
| `union_dataclasses` | 10.91 µs | 5.90 | 6.46 | n/a |
| `collections` | 33.70 µs | 24.96 | 15.19 | 7.99 |

Pure-Python generated code is ahead of cattrs and pydantic on flat/nested/optional data and within 1.1–1.8× of msgspec
(a C library that does not call `__init__`). Two shapes are **still behind**: unions of data classes (1.7× slower than
cattrs: the union loop is interpreted; failed members are skipped by prefilters but still go through `Node.build`) and
`collections` (1.4–4× slower: sets, fixed tuples and nested collections are not in the fast path yet).

### Costs and decisions measured along the way

- **Compiling a plan costs about 0.22 ms** for `flat10` (80% is `builtins.compile()` of the generated source; it was
  0.29 ms before slow paths were collapsed into one call each). The interpreter of Phase 2b is already 2.5 µs, so the
  saving per call is only about 1.9 µs: break-even ≈ 120 calls. The threshold design from `ARCHITECTURE_V2.md` assumed
  10–25 calls and a threshold of 2; measured numbers changed the default to **100** (documented in §5.3).
- Positional construction (`Cls(v0, v1, …)` instead of keywords) saves 0.29 µs per 10-field object, reading required
  keys in one `try` saves another 0.15 µs; together they moved `flat10` from 1.11 µs to 0.65 µs.
- Skipping a redundant deep type check for list/dict items that were just produced by a nested plan took the 10k list
  from 9.9 ms to 8.6 ms (before inline lists and positional construction brought it to 5.5 ms).
- Peak `tracemalloc` for the 10k list is now equal to msgspec's (1.88 MiB): the temporary checks and builders are gone;
  what remains is the result objects.
