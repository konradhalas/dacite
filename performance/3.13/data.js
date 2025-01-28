window.BENCHMARK_DATA = {
  "lastUpdate": 1738051832880,
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
        "date": 1738051141603,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15898.190694177138,
            "unit": "iter/sec",
            "range": "stddev: 0.0000030853756367945002",
            "extra": "mean: 62.900239356561464 usec\nrounds: 2795"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 478.8673314750863,
            "unit": "iter/sec",
            "range": "stddev: 0.00004690231766527714",
            "extra": "mean: 2.088261057440763 msec\nrounds: 383"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 478.3135331874444,
            "unit": "iter/sec",
            "range": "stddev: 0.00006152557426439139",
            "extra": "mean: 2.0906788761256188 msec\nrounds: 444"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7272.995459085036,
            "unit": "iter/sec",
            "range": "stddev: 0.00000525292111893661",
            "extra": "mean: 137.49492978864077 usec\nrounds: 2991"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 472.5323014083343,
            "unit": "iter/sec",
            "range": "stddev: 0.000051146216510714665",
            "extra": "mean: 2.116257443183465 msec\nrounds: 440"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 142488.4690489403,
            "unit": "iter/sec",
            "range": "stddev: 6.66813912013954e-7",
            "extra": "mean: 7.0181117579172785 usec\nrounds: 10138"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 481.5689457879647,
            "unit": "iter/sec",
            "range": "stddev: 0.000023179083683910316",
            "extra": "mean: 2.0765458585867806 msec\nrounds: 396"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.22817403058587,
            "unit": "iter/sec",
            "range": "stddev: 0.0005104939173921038",
            "extra": "mean: 52.0070183684275 msec\nrounds: 19"
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
          "id": "414d0abc81d97212f4fc064adc15cfc0eedc54b0",
          "message": "Merge pull request #265 from m-aciek/shorten-tracebacks",
          "timestamp": "2025-01-28T09:09:42+01:00",
          "tree_id": "b2aaf84f81fed0eb3786cfd322810211fabb3a01",
          "url": "https://github.com/konradhalas/dacite/commit/414d0abc81d97212f4fc064adc15cfc0eedc54b0"
        },
        "date": 1738051832519,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15974.418211698632,
            "unit": "iter/sec",
            "range": "stddev: 0.000012642147350584276",
            "extra": "mean: 62.60008888885009 usec\nrounds: 2700"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 489.9264880886329,
            "unit": "iter/sec",
            "range": "stddev: 0.00011852581935749992",
            "extra": "mean: 2.041122544529761 msec\nrounds: 393"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 438.115186656954,
            "unit": "iter/sec",
            "range": "stddev: 0.0005305431955405944",
            "extra": "mean: 2.282504762344621 msec\nrounds: 324"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7081.425006359014,
            "unit": "iter/sec",
            "range": "stddev: 0.000024857434415706725",
            "extra": "mean: 141.21451531323356 usec\nrounds: 2971"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 487.9195610679308,
            "unit": "iter/sec",
            "range": "stddev: 0.00012882221932508916",
            "extra": "mean: 2.0495181578931914 msec\nrounds: 456"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 150400.11489548266,
            "unit": "iter/sec",
            "range": "stddev: 6.13871936951426e-7",
            "extra": "mean: 6.648931090876683 usec\nrounds: 10463"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 487.3574660214184,
            "unit": "iter/sec",
            "range": "stddev: 0.000021497222197234724",
            "extra": "mean: 2.0518819751825697 msec\nrounds: 403"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.61758513386753,
            "unit": "iter/sec",
            "range": "stddev: 0.0006448836269986393",
            "extra": "mean: 50.97467365000057 msec\nrounds: 20"
          }
        ]
      }
    ]
  }
}