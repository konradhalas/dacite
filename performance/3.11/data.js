window.BENCHMARK_DATA = {
  "lastUpdate": 1671725118912,
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
        "date": 1671725118470,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_performance.py::test_basic_scenario",
            "value": 3584.575971137575,
            "unit": "iter/sec",
            "range": "stddev: 0.000006696285385901853",
            "extra": "mean: 278.97302443910746 usec\nrounds: 2496"
          },
          {
            "name": "tests/performance/test_performance.py::test_union_matching",
            "value": 2831.366139223747,
            "unit": "iter/sec",
            "range": "stddev: 0.0000031432843439089414",
            "extra": "mean: 353.18639512802895 usec\nrounds: 2422"
          },
          {
            "name": "tests/performance/test_performance.py::test_strict_unions_match",
            "value": 242.71384852569358,
            "unit": "iter/sec",
            "range": "stddev: 0.000009027251794077782",
            "extra": "mean: 4.120078051064072 msec\nrounds: 235"
          },
          {
            "name": "tests/performance/test_performance.py::test_collection_of_union",
            "value": 2087.7335349365812,
            "unit": "iter/sec",
            "range": "stddev: 0.0000031160255139504485",
            "extra": "mean: 478.9883302949276 usec\nrounds: 1865"
          },
          {
            "name": "tests/performance/test_performance.py::test_type_hooks",
            "value": 3095.405624628232,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027526409385778228",
            "extra": "mean: 323.0594375236697 usec\nrounds: 2633"
          },
          {
            "name": "tests/performance/test_performance.py::test_casting",
            "value": 23195.858198186947,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011440955030356873",
            "extra": "mean: 43.11114473350948 usec\nrounds: 11877"
          },
          {
            "name": "tests/performance/test_performance.py::test_forward_references",
            "value": 2325.564581595309,
            "unit": "iter/sec",
            "range": "stddev: 0.000005000548480684109",
            "extra": "mean: 430.00310888550433 usec\nrounds: 1947"
          },
          {
            "name": "tests/performance/test_performance.py::test_parsing_multiple_items",
            "value": 114.15221558696886,
            "unit": "iter/sec",
            "range": "stddev: 0.0000181576414784388",
            "extra": "mean: 8.760232947367829 msec\nrounds: 114"
          }
        ]
      }
    ]
  }
}