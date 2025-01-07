window.BENCHMARK_DATA = {
  "lastUpdate": 1736290849622,
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
          "id": "1cdc3ef42fa361a368a532c02f659077c52dd41a",
          "message": "Merge pull request #268 from konradhalas/chore/fix_ci",
          "timestamp": "2025-01-08T00:00:11+01:00",
          "tree_id": "10ab4d7d17f22ec217d3f1c5fd3e77335dc38451",
          "url": "https://github.com/konradhalas/dacite/commit/1cdc3ef42fa361a368a532c02f659077c52dd41a"
        },
        "date": 1736290849244,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15896.102651555253,
            "unit": "iter/sec",
            "range": "stddev: 0.00000904185402028375",
            "extra": "mean: 62.9085016573016 usec\nrounds: 3319"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 490.21796181485206,
            "unit": "iter/sec",
            "range": "stddev: 0.00020222764479021417",
            "extra": "mean: 2.0399089341766814 msec\nrounds: 395"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 502.34443124153165,
            "unit": "iter/sec",
            "range": "stddev: 0.0000216403901974587",
            "extra": "mean: 1.9906660406855217 msec\nrounds: 467"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7367.09318539494,
            "unit": "iter/sec",
            "range": "stddev: 0.00000770173558353987",
            "extra": "mean: 135.73874726906843 usec\nrounds: 3387"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 486.1714362642916,
            "unit": "iter/sec",
            "range": "stddev: 0.00002562352407351536",
            "extra": "mean: 2.05688760262004 msec\nrounds: 458"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 132656.11656197387,
            "unit": "iter/sec",
            "range": "stddev: 7.960329813810836e-7",
            "extra": "mean: 7.538287912512673 usec\nrounds: 12087"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 497.93964122886,
            "unit": "iter/sec",
            "range": "stddev: 0.000032891356130789064",
            "extra": "mean: 2.0082755362318823 msec\nrounds: 414"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.63924145154306,
            "unit": "iter/sec",
            "range": "stddev: 0.0022841444187926287",
            "extra": "mean: 50.91846354999774 msec\nrounds: 20"
          }
        ]
      }
    ]
  }
}