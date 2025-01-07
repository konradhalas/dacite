window.BENCHMARK_DATA = {
  "lastUpdate": 1736290864270,
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
        "date": 1736290862958,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18392.829903560123,
            "unit": "iter/sec",
            "range": "stddev: 0.000006077533626723976",
            "extra": "mean: 54.3690125577924 usec\nrounds: 3424"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 555.766034128211,
            "unit": "iter/sec",
            "range": "stddev: 0.00001925341409638295",
            "extra": "mean: 1.7993183076915196 msec\nrounds: 455"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 558.155008666744,
            "unit": "iter/sec",
            "range": "stddev: 0.00005182823877576723",
            "extra": "mean: 1.7916169961256534 msec\nrounds: 516"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8551.177139225476,
            "unit": "iter/sec",
            "range": "stddev: 0.000004909980011173639",
            "extra": "mean: 116.94296395906203 usec\nrounds: 3718"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 552.6834994630317,
            "unit": "iter/sec",
            "range": "stddev: 0.000021523701479476208",
            "extra": "mean: 1.8093538181826774 msec\nrounds: 517"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 184957.82267943013,
            "unit": "iter/sec",
            "range": "stddev: 5.927125345458689e-7",
            "extra": "mean: 5.406638040572122 usec\nrounds: 12145"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 557.1928165479253,
            "unit": "iter/sec",
            "range": "stddev: 0.000017785743092998528",
            "extra": "mean: 1.7947108618439767 msec\nrounds: 456"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 22.431412980098045,
            "unit": "iter/sec",
            "range": "stddev: 0.0010932132873760958",
            "extra": "mean: 44.580339227280774 msec\nrounds: 22"
          }
        ]
      }
    ]
  }
}