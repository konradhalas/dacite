# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

Nothing yet.

## [1.8.1] - 2023-05-12

### Fixed

- Fix value creation for a field with a default factory

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

[Unreleased]: https://github.com/konradhalas/dacite/compare/v1.8.1...HEAD
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
