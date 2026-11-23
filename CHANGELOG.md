# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed (2.0, work in progress)

- **Breaking:** minimum Python is 3.11
- **Breaking:** `Config` is immutable and hashable; `cast` is a tuple, `type_hooks`/`forward_references` are read-only copies
- **Breaking:** error paths contain list/tuple indices and mapping keys (`orders[3].customer.email`); new `.path` attribute
- Type annotations are introspected once per `(data class, Config)` into a cached conversion plan (stored in the
  data class itself, no global strong references), and the plan is compiled to generated Python code after
  `set_compile_threshold(n)` conversions (default 100): `from_dict` is about 9-30x faster than 1.9.2 (typically
  15-20x) with the same results and errors, and allocates 70-85% less per call for small types
- Union members that can not match (missing required key, other `Literal` discriminator) are skipped without being built
- `strict=True` compares keys with the converted field names when `convert_key` is set, and a missing `init=False` field
  with a default is no longer overwritten after `__post_init__` (both are 1.9.3 fixes)
- `Union[None, X]` is converted like `Optional[X]` (1.x result depended on `lru_cache` history)

### Added

- `Converter(data_class, config)` with `compile()`, `convert()` and `convert_many()`
- `set_compile_threshold()` / `get_compile_threshold()`
- Benchmark harness and baseline results (`benchmarks/`)
- Differential test suite (Hypothesis) comparing the implementation against a frozen copy of 1.9.2 (`tests/differential/`)
- v2 architecture proposal (`docs/ARCHITECTURE_V2.md`) and draft migration guide (`MIGRATION.md`)

## [1.9.2] - 2025-02-05

- Clean up the fix for readonly attribute `__args__` (introduced in v1.9.1)
- Improve class `Data(Protocol)` typing to avoid pyright errors

## [1.9.1] - 2025-01-29

### Fixed

- Fix `AttributeError` when trying to concretize `list` or `tuple`. Introduced in 1.9.0.

## [1.9.0] - 2025-01-29

### Added

- [Support generics](https://github.com/konradhalas/dacite/pull/272)
- Change type definition for `Data` in order to be more permissive

### Fixed

- [Fix union matches using .popitem() when no matches are found](https://github.com/konradhalas/dacite/pull/233)
- [Supress unnecessary context in some stack trackes](https://github.com/konradhalas/dacite/pull/265)
- Fix issues with caching internal function calls

## [1.8.1] - 2023-05-12

### Fixed

- Fix value creation for a field with a default factory
- Suppress context in dacite ForwardReferenceError and MissingValueError

## [1.8.0] - 2023-01-26

### Added

- Performance improvements (multiple small changes) 
- Introduce cache functionality

### Fixed

- Fix set's casting
- Use `localns` for `get_type_hints` instead of `globalns`

## [1.7.0] - 2022-12-22

### Added

- Add explicit `__all__` configuration
- Add Python 3.10 and 3.11 support
- Support [PEP 604] unions through `types.UnionType`

[PEP 604]: https://peps.python.org/pep-0604/

### Fixed

- Do not suppress `KeyError` in a type hook
- Handle tuple as a `Sequence`
- Handle a default value for a non-init field within a frozen dataclass
- Run type hooks / cast for `InitVar` fields
- Fix optional unions

## [1.6.0] - 2020-11-30

### Added

- Support `Type` fields

### Fixed

- Handle generic collections with implicit `Any` inner types in Python 3.9
- Fix `InitVar` with inner data classes
- Improve support for fixed length and undefined length tuples

## [1.5.1] - 2020-07-03

### Added

- Python 3.9 support

## [1.5.0] - 2020-05-02

### Added

- Add `strict_unions_match` config parameter
- Support `Tuple`

### Fixed

- The order of run type hooks in `Union`  

## [1.4.0] - 2020-04-10

### Added

- Support `InitVar`

### Fixed 

- Fix `Union` type hooks

## [1.3.0] - 2020-03-14

### Added

- Support `Literal`
- Support [PEP 561](https://www.python.org/dev/peps/pep-0561/)

## [1.2.1] - 2020-03-02

### Fixed

- Fix problem with a "numeric tower" and optional/new type

## [1.2.0] - 2020-01-05

### Added

- Support base classes in `cast`
- Support collections in `cast`

### Changed

- Handle "numeric tower" as described in [PEP 484](https://www.python.org/dev/peps/pep-0484/#the-numeric-tower)

## [1.1.0] - 2019-11-27

### Added

- Python 3.8 support
- `cast` config parameter

### Changed

- Validate type for generic collection fields

[Unreleased]: https://github.com/konradhalas/dacite/compare/v1.9.2...HEAD
[1.9.2]: https://github.com/konradhalas/dacite/compare/v1.9.1...v1.9.2
[1.9.1]: https://github.com/konradhalas/dacite/compare/v1.9.0...v1.9.1
[1.9.0]: https://github.com/konradhalas/dacite/compare/v1.8.1...v1.9.0
[1.8.1]: https://github.com/konradhalas/dacite/compare/v1.8.0...v1.8.1
[1.8.0]: https://github.com/konradhalas/dacite/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/konradhalas/dacite/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/konradhalas/dacite/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/konradhalas/dacite/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/konradhalas/dacite/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/konradhalas/dacite/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/konradhalas/dacite/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/konradhalas/dacite/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/konradhalas/dacite/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/konradhalas/dacite/compare/v1.0.2...v1.1.0
