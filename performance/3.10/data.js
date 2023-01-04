window.BENCHMARK_DATA = {
  "lastUpdate": 1672821241663,
  "repoUrl": "https://github.com/konradhalas/dacite",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "email": "contact@mciszczon.pl",
            "name": "Mateusz Ciszczoń",
            "username": "mciszczon"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "a86ef2036b60e9a008714ac9d0919f18529203fc",
          "message": "Add performance testing (#202)\n\n* Add pytest-benchmark to setup.py\r\n\r\n* Add pre-commit with black\r\n\r\n* Add pytest benchmark config to pyproject.toml\r\n\r\n* Update gitignore\r\n\r\n* Add performance tests\r\n\r\n* Add performance check to CI action\r\n\r\n* Rename publish to Publish\r\n\r\n* Remove performance Github Pages push\r\n\r\n* Set auto-push explicitly to false\r\n\r\n* Change gh-pages branch to master\r\n\r\n* Configure performance CI step further\r\n\r\n* Fix gh-pages for benchmark\r\n\r\n* Split gh-pages by Python version\r\n\r\n* Remove docs/benchmark dir\r\n\r\n* Add performance test for multiple items parsing\r\n\r\n* Update README.md with performance testing\r\n\r\n* Change GITHUB_TOKEN to BENCHMARK_TOKEN\r\n\r\n* Setup Github Actions not to publish performance on PR tests\r\n\r\n* Do not publish performance for PR runs, only compare performance to the master branch",
          "timestamp": "2022-12-22T17:04:25+01:00",
          "tree_id": "f5d80531a2bf409b0362d7802461fed1c2f9df81",
          "url": "https://github.com/konradhalas/dacite/commit/a86ef2036b60e9a008714ac9d0919f18529203fc"
        },
        "date": 1671725126884,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2788.0856778819325,
            "unit": "iter/sec",
            "range": "stddev: 0.00010097620705123894",
            "extra": "mean: 358.66903514948126 usec\nrounds: 1707"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 2092.73367715835,
            "unit": "iter/sec",
            "range": "stddev: 0.00014058335506003528",
            "extra": "mean: 477.84388950908703 usec\nrounds: 1792"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 182.33652044345723,
            "unit": "iter/sec",
            "range": "stddev: 0.0008861981070070033",
            "extra": "mean: 5.484364830303434 msec\nrounds: 165"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1452.4153658164475,
            "unit": "iter/sec",
            "range": "stddev: 0.00048546415397584305",
            "extra": "mean: 688.5082763069428 usec\nrounds: 1473"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 2403.530541666502,
            "unit": "iter/sec",
            "range": "stddev: 0.00008675206953266443",
            "extra": "mean: 416.0546257534319 usec\nrounds: 1825"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 19227.870642596015,
            "unit": "iter/sec",
            "range": "stddev: 0.00002627318389841662",
            "extra": "mean: 52.00783896396064 usec\nrounds: 10153"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 1685.599319807805,
            "unit": "iter/sec",
            "range": "stddev: 0.00024278830929571328",
            "extra": "mean: 593.2607994372124 usec\nrounds: 1421"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 84.52554078055277,
            "unit": "iter/sec",
            "range": "stddev: 0.0013077314081634522",
            "extra": "mean: 11.8307435925932 msec\nrounds: 81"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "contact@mciszczon.pl",
            "name": "Mateusz Ciszczoń",
            "username": "mciszczon"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "e9e99e831b7f71fcbae21b7dca9856684a7093f7",
          "message": "Fix tests (#203)\n\n* Fix performance tests to properly create dataclass instances\r\n\r\n* Add missing tests to have 100% coverage\r\n\r\n* Disable commenting on alerts",
          "timestamp": "2022-12-23T14:16:17+01:00",
          "tree_id": "8ca9f932da5b1e2e3634a8c70240a6b17f079c3b",
          "url": "https://github.com/konradhalas/dacite/commit/e9e99e831b7f71fcbae21b7dca9856684a7093f7"
        },
        "date": 1671801429544,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3266.098900342353,
            "unit": "iter/sec",
            "range": "stddev: 0.0002486780626573428",
            "extra": "mean: 306.17566415247865 usec\nrounds: 2254"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 78.75666545300871,
            "unit": "iter/sec",
            "range": "stddev: 0.00015951603769233976",
            "extra": "mean: 12.69733798717855 msec\nrounds: 78"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 78.73820444637435,
            "unit": "iter/sec",
            "range": "stddev: 0.0000797538707733119",
            "extra": "mean: 12.700315012657708 msec\nrounds: 79"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1909.867738827753,
            "unit": "iter/sec",
            "range": "stddev: 0.000004746602264526158",
            "extra": "mean: 523.5964667447519 usec\nrounds: 1714"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 78.59406245336474,
            "unit": "iter/sec",
            "range": "stddev: 0.00004008872320554982",
            "extra": "mean: 12.723607468355114 msec\nrounds: 79"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 23393.696955572337,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012031406627198388",
            "extra": "mean: 42.74655698494896 usec\nrounds: 11038"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 78.92553648330995,
            "unit": "iter/sec",
            "range": "stddev: 0.000045712465355140075",
            "extra": "mean: 12.67017044871739 msec\nrounds: 78"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.148040236943249,
            "unit": "iter/sec",
            "range": "stddev: 0.002605894860578615",
            "extra": "mean: 317.65794739999933 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "halas.konrad@gmail.com",
            "name": "Konrad Hałas",
            "username": "konradhalas"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "6eecf2984378523c1830fdb84ab3b4c280f71ab6",
          "message": "Fix set's casting (#206)\n\n* Fix problem with casting sets. Fix #94.\r\n\r\n* Update changelog\r\n\r\n* Check if value is None",
          "timestamp": "2023-01-04T09:33:06+01:00",
          "tree_id": "72d8b8052d0e8d0f592bb81d9becb7f57a5a9b32",
          "url": "https://github.com/konradhalas/dacite/commit/6eecf2984378523c1830fdb84ab3b4c280f71ab6"
        },
        "date": 1672821240177,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2953.626540807768,
            "unit": "iter/sec",
            "range": "stddev: 0.00009003375426276028",
            "extra": "mean: 338.5668384895121 usec\nrounds: 1907"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 68.21444342652438,
            "unit": "iter/sec",
            "range": "stddev: 0.0009862732104279513",
            "extra": "mean: 14.659651970584896 msec\nrounds: 68"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 68.6953291085596,
            "unit": "iter/sec",
            "range": "stddev: 0.0015905451412462914",
            "extra": "mean: 14.557030484848463 msec\nrounds: 66"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1652.8542685828306,
            "unit": "iter/sec",
            "range": "stddev: 0.0001744601417863118",
            "extra": "mean: 605.0140166667006 usec\nrounds: 600"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 68.31992125636596,
            "unit": "iter/sec",
            "range": "stddev: 0.0010131017643336055",
            "extra": "mean: 14.637019212120673 msec\nrounds: 33"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 20100.65987507403,
            "unit": "iter/sec",
            "range": "stddev: 0.000004464756200635411",
            "extra": "mean: 49.749610520998736 usec\nrounds: 9980"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 72.67179045787957,
            "unit": "iter/sec",
            "range": "stddev: 0.00012457063170209906",
            "extra": "mean: 13.760497624997944 msec\nrounds: 72"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.931353367507706,
            "unit": "iter/sec",
            "range": "stddev: 0.0013887399593770875",
            "extra": "mean: 341.1393559999965 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}