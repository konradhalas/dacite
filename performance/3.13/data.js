window.BENCHMARK_DATA = {
  "lastUpdate": 1738179403596,
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
          "id": "4a7c5174658a1cceae2c9dab77d7967e3f108033",
          "message": "Merge pull request #233 from kkg4theweb/nounionmatchfix",
          "timestamp": "2025-01-28T09:28:27+01:00",
          "tree_id": "ecadba47246cabdceb3f234973f25ae7363297e1",
          "url": "https://github.com/konradhalas/dacite/commit/4a7c5174658a1cceae2c9dab77d7967e3f108033"
        },
        "date": 1738052956193,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16351.925216463744,
            "unit": "iter/sec",
            "range": "stddev: 0.000003774233257752282",
            "extra": "mean: 61.15487850893311 usec\nrounds: 2848"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 494.54950617911607,
            "unit": "iter/sec",
            "range": "stddev: 0.000074033404801145",
            "extra": "mean: 2.0220422576619046 msec\nrounds: 392"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 495.89004949334156,
            "unit": "iter/sec",
            "range": "stddev: 0.00007285863480619966",
            "extra": "mean: 2.016576055562549 msec\nrounds: 468"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7465.1760774461145,
            "unit": "iter/sec",
            "range": "stddev: 0.000003993634706247656",
            "extra": "mean: 133.95531326062257 usec\nrounds: 3122"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 490.53719565526205,
            "unit": "iter/sec",
            "range": "stddev: 0.00014278143569489366",
            "extra": "mean: 2.038581393739561 msec\nrounds: 447"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 151901.45854044575,
            "unit": "iter/sec",
            "range": "stddev: 6.608751663799549e-7",
            "extra": "mean: 6.583215260791831 usec\nrounds: 9068"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 492.44330208757975,
            "unit": "iter/sec",
            "range": "stddev: 0.000023171589221150257",
            "extra": "mean: 2.0306906313087643 msec\nrounds: 396"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.969092477662223,
            "unit": "iter/sec",
            "range": "stddev: 0.000835997185181683",
            "extra": "mean: 50.07738840002958 msec\nrounds: 20"
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
            "email": "contact@mciszczon.pl",
            "name": "Mateusz Ciszczoń",
            "username": "mciszczon"
          },
          "distinct": true,
          "id": "cedd98e5e2b034257365d483d7c84a253f60122f",
          "message": "Add 1.9.0 release changelog",
          "timestamp": "2025-01-28T09:34:25+01:00",
          "tree_id": "39039feb7b184e91c241ab04495c346a9523be9b",
          "url": "https://github.com/konradhalas/dacite/commit/cedd98e5e2b034257365d483d7c84a253f60122f"
        },
        "date": 1738053318583,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16181.515354083287,
            "unit": "iter/sec",
            "range": "stddev: 0.000006013058281745775",
            "extra": "mean: 61.79890931832026 usec\nrounds: 2404"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 490.4105085359596,
            "unit": "iter/sec",
            "range": "stddev: 0.00005576343779330162",
            "extra": "mean: 2.0391080178631094 msec\nrounds: 392"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 498.03840153483884,
            "unit": "iter/sec",
            "range": "stddev: 0.000058662002843035955",
            "extra": "mean: 2.007877298052182 msec\nrounds: 463"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7442.420326125579,
            "unit": "iter/sec",
            "range": "stddev: 0.000006214461808668121",
            "extra": "mean: 134.36489155142706 usec\nrounds: 3052"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 489.98162896912334,
            "unit": "iter/sec",
            "range": "stddev: 0.00005393128707979368",
            "extra": "mean: 2.040892843480497 msec\nrounds: 460"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 150975.05803183973,
            "unit": "iter/sec",
            "range": "stddev: 6.935261952174476e-7",
            "extra": "mean: 6.623610635003737 usec\nrounds: 9328"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 491.20811887161847,
            "unit": "iter/sec",
            "range": "stddev: 0.00005853804395028623",
            "extra": "mean: 2.0357969699221496 msec\nrounds: 399"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.94674898205834,
            "unit": "iter/sec",
            "range": "stddev: 0.0005379178388249621",
            "extra": "mean: 50.13348295000242 msec\nrounds: 20"
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
            "email": "contact@mciszczon.pl",
            "name": "Mateusz Ciszczoń",
            "username": "mciszczon"
          },
          "distinct": true,
          "id": "1bbfe9b00c1dab1bed65df7c8cf52ef6e4fdedb8",
          "message": "Fix publish workflow",
          "timestamp": "2025-01-29T12:38:21+01:00",
          "tree_id": "3ca8b4719b380631e2e5bd94a6b9d099b36c7ab4",
          "url": "https://github.com/konradhalas/dacite/commit/1bbfe9b00c1dab1bed65df7c8cf52ef6e4fdedb8"
        },
        "date": 1738150787531,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16129.299321970013,
            "unit": "iter/sec",
            "range": "stddev: 0.000003312416363127359",
            "extra": "mean: 61.99897342334529 usec\nrounds: 3537"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 490.4386724531502,
            "unit": "iter/sec",
            "range": "stddev: 0.00002595048217495695",
            "extra": "mean: 2.0389909201043404 msec\nrounds: 388"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 489.9886837855195,
            "unit": "iter/sec",
            "range": "stddev: 0.00003115997253689947",
            "extra": "mean: 2.0408634588747474 msec\nrounds: 462"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7421.245412930077,
            "unit": "iter/sec",
            "range": "stddev: 0.0000049847206492328635",
            "extra": "mean: 134.74827260902794 usec\nrounds: 3052"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 487.24265739595944,
            "unit": "iter/sec",
            "range": "stddev: 0.00002802737724086044",
            "extra": "mean: 2.0523654586083304 msec\nrounds: 447"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 149043.07118869387,
            "unit": "iter/sec",
            "range": "stddev: 6.594769290055956e-7",
            "extra": "mean: 6.709469900375068 usec\nrounds: 10415"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 490.3623875994068,
            "unit": "iter/sec",
            "range": "stddev: 0.00002052412432630842",
            "extra": "mean: 2.039308122500074 msec\nrounds: 400"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.641864714853444,
            "unit": "iter/sec",
            "range": "stddev: 0.0006197519499008003",
            "extra": "mean: 50.911663149975084 msec\nrounds: 20"
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
            "email": "contact@mciszczon.pl",
            "name": "Mateusz Ciszczoń",
            "username": "mciszczon"
          },
          "distinct": true,
          "id": "75583d806d2d9b12e44fe98e46591bc3e8dc65e0",
          "message": "Fix setup.py versions",
          "timestamp": "2025-01-29T12:39:11+01:00",
          "tree_id": "2644e4c69f7761b13be6851dcbfb8e82bae66a41",
          "url": "https://github.com/konradhalas/dacite/commit/75583d806d2d9b12e44fe98e46591bc3e8dc65e0"
        },
        "date": 1738150802282,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16339.415765743188,
            "unit": "iter/sec",
            "range": "stddev: 0.0000037777506264242126",
            "extra": "mean: 61.20169866150141 usec\nrounds: 2917"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 491.8772053715919,
            "unit": "iter/sec",
            "range": "stddev: 0.00009700895216441997",
            "extra": "mean: 2.0330277335062585 msec\nrounds: 394"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 499.88925599505586,
            "unit": "iter/sec",
            "range": "stddev: 0.00005844347782937558",
            "extra": "mean: 2.0004430741553896 msec\nrounds: 472"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7370.123720586676,
            "unit": "iter/sec",
            "range": "stddev: 0.0000053128099476496946",
            "extra": "mean: 135.68293259538362 usec\nrounds: 3071"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 497.0632885047927,
            "unit": "iter/sec",
            "range": "stddev: 0.00003037553733300988",
            "extra": "mean: 2.011816247802332 msec\nrounds: 456"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 146904.1354663676,
            "unit": "iter/sec",
            "range": "stddev: 9.493384813535717e-7",
            "extra": "mean: 6.8071603078113565 usec\nrounds: 10299"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 500.9685734904259,
            "unit": "iter/sec",
            "range": "stddev: 0.00002030468330746324",
            "extra": "mean: 1.996133196604819 msec\nrounds: 412"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 18.6677284621644,
            "unit": "iter/sec",
            "range": "stddev: 0.004491388742941908",
            "extra": "mean: 53.56838150001977 msec\nrounds: 20"
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
          "id": "71c365ad38f3f2ac92fabd23bbe7bcb872aec5e9",
          "message": "Merge pull request #274 from konradhalas/bug/273-readonly-attribute\n\nA hotfix and not a definitive solution for sure",
          "timestamp": "2025-01-29T20:35:53+01:00",
          "tree_id": "11be2ef5195b7c75f05bf55c406c6083f7a8b7d0",
          "url": "https://github.com/konradhalas/dacite/commit/71c365ad38f3f2ac92fabd23bbe7bcb872aec5e9"
        },
        "date": 1738179403071,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16371.046658337269,
            "unit": "iter/sec",
            "range": "stddev: 0.000010455660841919612",
            "extra": "mean: 61.083449389030406 usec\nrounds: 3013"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 493.32889220601976,
            "unit": "iter/sec",
            "range": "stddev: 0.00012385019438916465",
            "extra": "mean: 2.027045275066494 msec\nrounds: 389"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 498.2558403144111,
            "unit": "iter/sec",
            "range": "stddev: 0.000025112929043372187",
            "extra": "mean: 2.007001060677937 msec\nrounds: 445"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7502.024807477081,
            "unit": "iter/sec",
            "range": "stddev: 0.00000605082521450339",
            "extra": "mean: 133.29734647149192 usec\nrounds: 3146"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 496.3968321410695,
            "unit": "iter/sec",
            "range": "stddev: 0.000023711527668817214",
            "extra": "mean: 2.0145172878859405 msec\nrounds: 462"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 152938.19266592056,
            "unit": "iter/sec",
            "range": "stddev: 7.088798287734494e-7",
            "extra": "mean: 6.538589103013713 usec\nrounds: 10443"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 495.651795003965,
            "unit": "iter/sec",
            "range": "stddev: 0.00002340107770615329",
            "extra": "mean: 2.01754540199335 msec\nrounds: 403"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.5814542480224,
            "unit": "iter/sec",
            "range": "stddev: 0.0004290294827588344",
            "extra": "mean: 51.06873000001997 msec\nrounds: 20"
          }
        ]
      }
    ]
  }
}