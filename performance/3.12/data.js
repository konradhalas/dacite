window.BENCHMARK_DATA = {
  "lastUpdate": 1738746288831,
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
        "date": 1738051824942,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14015.776830033115,
            "unit": "iter/sec",
            "range": "stddev: 0.0000032742696484179626",
            "extra": "mean: 71.34816800572854 usec\nrounds: 2738"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 446.04354879954184,
            "unit": "iter/sec",
            "range": "stddev: 0.000021875294621233758",
            "extra": "mean: 2.241933557141108 msec\nrounds: 350"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 445.54562662382506,
            "unit": "iter/sec",
            "range": "stddev: 0.00005644063015442013",
            "extra": "mean: 2.244439043376138 msec\nrounds: 415"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6454.046631577416,
            "unit": "iter/sec",
            "range": "stddev: 0.0000045529328944664654",
            "extra": "mean: 154.94155172467242 usec\nrounds: 2813"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 439.1398928564265,
            "unit": "iter/sec",
            "range": "stddev: 0.000021061094320269382",
            "extra": "mean: 2.277178676470057 msec\nrounds: 408"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 101601.65956156202,
            "unit": "iter/sec",
            "range": "stddev: 8.048324479178872e-7",
            "extra": "mean: 9.842358917317531 usec\nrounds: 10345"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 449.0162886566335,
            "unit": "iter/sec",
            "range": "stddev: 0.00004072418455298525",
            "extra": "mean: 2.2270906986287713 msec\nrounds: 365"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.679643290098554,
            "unit": "iter/sec",
            "range": "stddev: 0.0023831837353498154",
            "extra": "mean: 56.56222716665601 msec\nrounds: 18"
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
        "date": 1738052948414,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 13833.444437152819,
            "unit": "iter/sec",
            "range": "stddev: 0.0000037253919659609647",
            "extra": "mean: 72.28857603347693 usec\nrounds: 2729"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 447.4936549649831,
            "unit": "iter/sec",
            "range": "stddev: 0.00007152589307987026",
            "extra": "mean: 2.2346685565368545 msec\nrounds: 345"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 448.82819836858624,
            "unit": "iter/sec",
            "range": "stddev: 0.00008750773361660026",
            "extra": "mean: 2.22802400480814 msec\nrounds: 416"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6516.329591681976,
            "unit": "iter/sec",
            "range": "stddev: 0.0000050216715112492846",
            "extra": "mean: 153.4606231821805 usec\nrounds: 2821"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 443.52320157067044,
            "unit": "iter/sec",
            "range": "stddev: 0.000026091548046262623",
            "extra": "mean: 2.2546734792196914 msec\nrounds: 409"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 101219.49824787407,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013840684710895726",
            "extra": "mean: 9.879519433608763 usec\nrounds: 10240"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 444.9834265697004,
            "unit": "iter/sec",
            "range": "stddev: 0.00007960663725341365",
            "extra": "mean: 2.247274707979184 msec\nrounds: 363"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.533122098569592,
            "unit": "iter/sec",
            "range": "stddev: 0.0026512437897242293",
            "extra": "mean: 57.03490766664901 msec\nrounds: 18"
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
        "date": 1738053315317,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14020.170621990477,
            "unit": "iter/sec",
            "range": "stddev: 0.00000274542285271605",
            "extra": "mean: 71.32580814897584 usec\nrounds: 2601"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 443.64353256042233,
            "unit": "iter/sec",
            "range": "stddev: 0.000023223560264707804",
            "extra": "mean: 2.254061936232113 msec\nrounds: 345"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 435.17581226637355,
            "unit": "iter/sec",
            "range": "stddev: 0.00035436930476048887",
            "extra": "mean: 2.2979218325394757 msec\nrounds: 418"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6411.159726660941,
            "unit": "iter/sec",
            "range": "stddev: 0.000008285008737226521",
            "extra": "mean: 155.9780199893444 usec\nrounds: 2751"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 438.3068873356811,
            "unit": "iter/sec",
            "range": "stddev: 0.00006990979452377643",
            "extra": "mean: 2.28150647159268 msec\nrounds: 405"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 102386.12906407774,
            "unit": "iter/sec",
            "range": "stddev: 9.42149284352505e-7",
            "extra": "mean: 9.766948014746763 usec\nrounds: 10022"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 442.8903929012352,
            "unit": "iter/sec",
            "range": "stddev: 0.00013104682244525557",
            "extra": "mean: 2.257894991691546 msec\nrounds: 361"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.69974781458201,
            "unit": "iter/sec",
            "range": "stddev: 0.0030890732649773416",
            "extra": "mean: 56.497980111114686 msec\nrounds: 18"
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
        "date": 1738150747568,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14164.350956948161,
            "unit": "iter/sec",
            "range": "stddev: 0.00000343647945385886",
            "extra": "mean: 70.5997756649387 usec\nrounds: 2630"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 447.81656530636525,
            "unit": "iter/sec",
            "range": "stddev: 0.000028899094682739614",
            "extra": "mean: 2.2330571878596515 msec\nrounds: 346"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 449.84844088795705,
            "unit": "iter/sec",
            "range": "stddev: 0.00003207470855678108",
            "extra": "mean: 2.222970914439755 msec\nrounds: 374"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6460.797317763534,
            "unit": "iter/sec",
            "range": "stddev: 0.000004776443892673746",
            "extra": "mean: 154.77965811596755 usec\nrounds: 2729"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 431.002654361364,
            "unit": "iter/sec",
            "range": "stddev: 0.0002462532540688524",
            "extra": "mean: 2.320171325816415 msec\nrounds: 399"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 99328.20636439617,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017009125136169359",
            "extra": "mean: 10.067633722604361 usec\nrounds: 10017"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 447.457735134773,
            "unit": "iter/sec",
            "range": "stddev: 0.00007714228722252159",
            "extra": "mean: 2.2348479453569015 msec\nrounds: 366"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.657855217062583,
            "unit": "iter/sec",
            "range": "stddev: 0.003463332841825099",
            "extra": "mean: 56.63201944445165 msec\nrounds: 18"
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
        "date": 1738150803344,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14035.842385696398,
            "unit": "iter/sec",
            "range": "stddev: 0.00000458364933797627",
            "extra": "mean: 71.24616909485083 usec\nrounds: 2673"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 449.98004273774785,
            "unit": "iter/sec",
            "range": "stddev: 0.00007197901287237375",
            "extra": "mean: 2.222320780974743 msec\nrounds: 347"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 449.4962014013778,
            "unit": "iter/sec",
            "range": "stddev: 0.000024218971640535863",
            "extra": "mean: 2.2247129049863754 msec\nrounds: 421"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6485.762048131603,
            "unit": "iter/sec",
            "range": "stddev: 0.000004949395546074899",
            "extra": "mean: 154.1838865778427 usec\nrounds: 2645"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 443.2326913996261,
            "unit": "iter/sec",
            "range": "stddev: 0.000035032906524544835",
            "extra": "mean: 2.2561512708871536 msec\nrounds: 395"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 101363.16902878543,
            "unit": "iter/sec",
            "range": "stddev: 6.719340097129522e-7",
            "extra": "mean: 9.865516336767419 usec\nrounds: 10253"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 445.17026038730836,
            "unit": "iter/sec",
            "range": "stddev: 0.000030179972130338807",
            "extra": "mean: 2.246331547686894 msec\nrounds: 367"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.810495402755016,
            "unit": "iter/sec",
            "range": "stddev: 0.002371832439565249",
            "extra": "mean: 56.14666955559895 msec\nrounds: 18"
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
        "date": 1738179404008,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14039.687440982036,
            "unit": "iter/sec",
            "range": "stddev: 0.000005295033075388025",
            "extra": "mean: 71.22665687563575 usec\nrounds: 2655"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 447.84619593617475,
            "unit": "iter/sec",
            "range": "stddev: 0.00005201021788289545",
            "extra": "mean: 2.2329094431841865 msec\nrounds: 352"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 450.21075501307627,
            "unit": "iter/sec",
            "range": "stddev: 0.000028886625534643436",
            "extra": "mean: 2.2211819439341363 msec\nrounds: 428"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6494.975358943847,
            "unit": "iter/sec",
            "range": "stddev: 0.000005168563779842361",
            "extra": "mean: 153.9651722655051 usec\nrounds: 2827"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 441.8573098103944,
            "unit": "iter/sec",
            "range": "stddev: 0.00002976684563182864",
            "extra": "mean: 2.2631740559618905 msec\nrounds: 411"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 87194.98993675811,
            "unit": "iter/sec",
            "range": "stddev: 0.000008061287098634638",
            "extra": "mean: 11.46854883205208 usec\nrounds: 10116"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 448.73909403930986,
            "unit": "iter/sec",
            "range": "stddev: 0.000020209630746007828",
            "extra": "mean: 2.2284664146342448 msec\nrounds: 369"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.79773300031042,
            "unit": "iter/sec",
            "range": "stddev: 0.0029797344941008912",
            "extra": "mean: 56.186931222226924 msec\nrounds: 18"
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
          "id": "6e7f6768b7618f742f6129acc7b28da043bc4ef0",
          "message": "Update versions and changelog",
          "timestamp": "2025-01-29T20:37:40+01:00",
          "tree_id": "c29043d025620934a165e62f0251afbbfd0c729b",
          "url": "https://github.com/konradhalas/dacite/commit/6e7f6768b7618f742f6129acc7b28da043bc4ef0"
        },
        "date": 1738179509383,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14177.566495307137,
            "unit": "iter/sec",
            "range": "stddev: 0.000004449509917296961",
            "extra": "mean: 70.53396648367024 usec\nrounds: 2745"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 449.9213987965988,
            "unit": "iter/sec",
            "range": "stddev: 0.000029718824874227573",
            "extra": "mean: 2.222610444123556 msec\nrounds: 349"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 450.6120810944738,
            "unit": "iter/sec",
            "range": "stddev: 0.0000414416663278594",
            "extra": "mean: 2.2192037052604974 msec\nrounds: 380"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6468.659005387661,
            "unit": "iter/sec",
            "range": "stddev: 0.00001848049737693355",
            "extra": "mean: 154.59154658904004 usec\nrounds: 2887"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 441.7437894329541,
            "unit": "iter/sec",
            "range": "stddev: 0.00010219065334968357",
            "extra": "mean: 2.263755651853427 msec\nrounds: 405"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 102309.37730270691,
            "unit": "iter/sec",
            "range": "stddev: 8.142461932743073e-7",
            "extra": "mean: 9.77427510912572 usec\nrounds: 10305"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 450.6448462015458,
            "unit": "iter/sec",
            "range": "stddev: 0.00003196539547784221",
            "extra": "mean: 2.219042353260956 msec\nrounds: 368"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.961483215772677,
            "unit": "iter/sec",
            "range": "stddev: 0.0022844728372977516",
            "extra": "mean: 55.674689444458636 msec\nrounds: 18"
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
          "id": "ae4fd06d16bf5030f11b326939adbe309c515b75",
          "message": "Merge pull request #278 from konradhalas/bug/data-type-definition\n\nFix class Data(Protocol) types declaration",
          "timestamp": "2025-02-05T10:01:58+01:00",
          "tree_id": "56b94a0ce08f690214827f42f54ac8f71f112db2",
          "url": "https://github.com/konradhalas/dacite/commit/ae4fd06d16bf5030f11b326939adbe309c515b75"
        },
        "date": 1738746164983,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14178.340374597949,
            "unit": "iter/sec",
            "range": "stddev: 0.0000034601869239697837",
            "extra": "mean: 70.53011661305646 usec\nrounds: 2787"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 442.787307769702,
            "unit": "iter/sec",
            "range": "stddev: 0.00003563954076007438",
            "extra": "mean: 2.258420651298591 msec\nrounds: 347"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 450.23672886323226,
            "unit": "iter/sec",
            "range": "stddev: 0.00010832282691824029",
            "extra": "mean: 2.2210538054610125 msec\nrounds: 329"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6215.503125325673,
            "unit": "iter/sec",
            "range": "stddev: 0.000032369836890680204",
            "extra": "mean: 160.88802142587662 usec\nrounds: 2847"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 435.8028988845206,
            "unit": "iter/sec",
            "range": "stddev: 0.0003313301927313085",
            "extra": "mean: 2.294615300998677 msec\nrounds: 402"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 102217.57637963547,
            "unit": "iter/sec",
            "range": "stddev: 8.597662624171524e-7",
            "extra": "mean: 9.783053320360542 usec\nrounds: 10146"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 450.69300355553924,
            "unit": "iter/sec",
            "range": "stddev: 0.00006437759394076077",
            "extra": "mean: 2.2188052446142956 msec\nrounds: 372"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.839187078248617,
            "unit": "iter/sec",
            "range": "stddev: 0.002975638985678816",
            "extra": "mean: 56.05636599995655 msec\nrounds: 18"
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
          "id": "b9c1b90ae162cd0dbf63270ba7530d0679265533",
          "message": "Merge pull request #275 from avlonder/master\n\nfix readonly __args__",
          "timestamp": "2025-02-05T10:04:07+01:00",
          "tree_id": "654dd9c93262751fa57c9d2f9fba5e8de9ae14f4",
          "url": "https://github.com/konradhalas/dacite/commit/b9c1b90ae162cd0dbf63270ba7530d0679265533"
        },
        "date": 1738746288396,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14004.451437225202,
            "unit": "iter/sec",
            "range": "stddev: 0.000005847913215903881",
            "extra": "mean: 71.40586723317861 usec\nrounds: 2591"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 448.6943134454271,
            "unit": "iter/sec",
            "range": "stddev: 0.00010186398937734607",
            "extra": "mean: 2.2286888200592854 msec\nrounds: 339"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 453.1544468772273,
            "unit": "iter/sec",
            "range": "stddev: 0.00003033537924349553",
            "extra": "mean: 2.2067531431969574 msec\nrounds: 426"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6497.5286552093985,
            "unit": "iter/sec",
            "range": "stddev: 0.000004970114464013774",
            "extra": "mean: 153.9046694620191 usec\nrounds: 2741"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 446.66084080521233,
            "unit": "iter/sec",
            "range": "stddev: 0.000023823173786747493",
            "extra": "mean: 2.2388351712168504 msec\nrounds: 403"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 101161.76949060173,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010105206712469343",
            "extra": "mean: 9.885157258868464 usec\nrounds: 9106"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 450.2422242277015,
            "unit": "iter/sec",
            "range": "stddev: 0.000027331596319392977",
            "extra": "mean: 2.221026696719295 msec\nrounds: 366"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.805053642794565,
            "unit": "iter/sec",
            "range": "stddev: 0.002755890481187922",
            "extra": "mean: 56.1638296666792 msec\nrounds: 18"
          }
        ]
      }
    ]
  }
}