window.BENCHMARK_DATA = {
  "lastUpdate": 1738051137945,
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
          "id": "9fa6a843cbd6cdd5859d00ddea5d56c7e0098e13",
          "message": "Merge pull request #272 from konradhalas/feature/generics",
          "timestamp": "2025-01-28T08:58:12+01:00",
          "tree_id": "f53b32f7d816d3b72927fb594b8dd5f4c1cd88ed",
          "url": "https://github.com/konradhalas/dacite/commit/9fa6a843cbd6cdd5859d00ddea5d56c7e0098e13"
        },
        "date": 1738051136875,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 13705.933654246604,
            "unit": "iter/sec",
            "range": "stddev: 0.000004132754188847253",
            "extra": "mean: 72.96110029615991 usec\nrounds: 2702"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 448.07360234155084,
            "unit": "iter/sec",
            "range": "stddev: 0.00002284896718041609",
            "extra": "mean: 2.231776196531513 msec\nrounds: 346"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 450.14613496458225,
            "unit": "iter/sec",
            "range": "stddev: 0.00003915627773046018",
            "extra": "mean: 2.221500802353175 msec\nrounds: 425"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6487.908280287027,
            "unit": "iter/sec",
            "range": "stddev: 0.000006136053243750712",
            "extra": "mean: 154.1328817854003 usec\nrounds: 2487"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 442.14888776589555,
            "unit": "iter/sec",
            "range": "stddev: 0.000023320537653542927",
            "extra": "mean: 2.261681591132871 msec\nrounds: 406"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 96304.1099623298,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027855656661509805",
            "extra": "mean: 10.383772825387812 usec\nrounds: 10186"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 444.8415869311608,
            "unit": "iter/sec",
            "range": "stddev: 0.00006650434194066277",
            "extra": "mean: 2.247991261111003 msec\nrounds: 360"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.559138889567024,
            "unit": "iter/sec",
            "range": "stddev: 0.003121606097569854",
            "extra": "mean: 56.950400944442784 msec\nrounds: 18"
          }
        ]
      }
    ]
  }
}