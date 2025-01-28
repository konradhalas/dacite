window.BENCHMARK_DATA = {
  "lastUpdate": 1738051139039,
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
        "date": 1671725118290,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2450.3486246691355,
            "unit": "iter/sec",
            "range": "stddev: 0.000005920670758460935",
            "extra": "mean: 408.1051936579137 usec\nrounds: 1766"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 1699.3332773590041,
            "unit": "iter/sec",
            "range": "stddev: 0.000008037347925314465",
            "extra": "mean: 588.4660845070582 usec\nrounds: 1491"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 155.8077157330346,
            "unit": "iter/sec",
            "range": "stddev: 0.0016081969887768186",
            "extra": "mean: 6.418167388535679 msec\nrounds: 157"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1276.921708514178,
            "unit": "iter/sec",
            "range": "stddev: 0.0000051957093378825486",
            "extra": "mean: 783.1333693618515 usec\nrounds: 1175"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 1946.9181755540192,
            "unit": "iter/sec",
            "range": "stddev: 0.000003919298165478933",
            "extra": "mean: 513.6322689655091 usec\nrounds: 1740"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 20191.526025063155,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010655241142321868",
            "extra": "mean: 49.525726721136834 usec\nrounds: 10385"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 1459.7089479496692,
            "unit": "iter/sec",
            "range": "stddev: 0.00000593790277988325",
            "extra": "mean: 685.0680756630397 usec\nrounds: 1282"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 67.5332797323662,
            "unit": "iter/sec",
            "range": "stddev: 0.00016392054621030012",
            "extra": "mean: 14.807514220588596 msec\nrounds: 68"
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
          "id": "a86ef2036b60e9a008714ac9d0919f18529203fc",
          "message": "Add performance testing (#202)\n\n* Add pytest-benchmark to setup.py\r\n\r\n* Add pre-commit with black\r\n\r\n* Add pytest benchmark config to pyproject.toml\r\n\r\n* Update gitignore\r\n\r\n* Add performance tests\r\n\r\n* Add performance check to CI action\r\n\r\n* Rename publish to Publish\r\n\r\n* Remove performance Github Pages push\r\n\r\n* Set auto-push explicitly to false\r\n\r\n* Change gh-pages branch to master\r\n\r\n* Configure performance CI step further\r\n\r\n* Fix gh-pages for benchmark\r\n\r\n* Split gh-pages by Python version\r\n\r\n* Remove docs/benchmark dir\r\n\r\n* Add performance test for multiple items parsing\r\n\r\n* Update README.md with performance testing\r\n\r\n* Change GITHUB_TOKEN to BENCHMARK_TOKEN\r\n\r\n* Setup Github Actions not to publish performance on PR tests\r\n\r\n* Do not publish performance for PR runs, only compare performance to the master branch",
          "timestamp": "2022-12-22T17:04:25+01:00",
          "tree_id": "f5d80531a2bf409b0362d7802461fed1c2f9df81",
          "url": "https://github.com/konradhalas/dacite/commit/a86ef2036b60e9a008714ac9d0919f18529203fc"
        },
        "date": 1671725118290,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2450.3486246691355,
            "unit": "iter/sec",
            "range": "stddev: 0.000005920670758460935",
            "extra": "mean: 408.1051936579137 usec\nrounds: 1766"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 1699.3332773590041,
            "unit": "iter/sec",
            "range": "stddev: 0.000008037347925314465",
            "extra": "mean: 588.4660845070582 usec\nrounds: 1491"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 155.8077157330346,
            "unit": "iter/sec",
            "range": "stddev: 0.0016081969887768186",
            "extra": "mean: 6.418167388535679 msec\nrounds: 157"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1276.921708514178,
            "unit": "iter/sec",
            "range": "stddev: 0.0000051957093378825486",
            "extra": "mean: 783.1333693618515 usec\nrounds: 1175"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 1946.9181755540192,
            "unit": "iter/sec",
            "range": "stddev: 0.000003919298165478933",
            "extra": "mean: 513.6322689655091 usec\nrounds: 1740"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 20191.526025063155,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010655241142321868",
            "extra": "mean: 49.525726721136834 usec\nrounds: 10385"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 1459.7089479496692,
            "unit": "iter/sec",
            "range": "stddev: 0.00000593790277988325",
            "extra": "mean: 685.0680756630397 usec\nrounds: 1282"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 67.5332797323662,
            "unit": "iter/sec",
            "range": "stddev: 0.00016392054621030012",
            "extra": "mean: 14.807514220588596 msec\nrounds: 68"
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
        "date": 1671801430266,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2433.972473325346,
            "unit": "iter/sec",
            "range": "stddev: 0.000005621356643325001",
            "extra": "mean: 410.85098987737456 usec\nrounds: 1877"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 56.10852302922706,
            "unit": "iter/sec",
            "range": "stddev: 0.00006115793502544606",
            "extra": "mean: 17.822604232143085 msec\nrounds: 56"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 56.15710838353357,
            "unit": "iter/sec",
            "range": "stddev: 0.00003100060286973255",
            "extra": "mean: 17.80718467856904 msec\nrounds: 56"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1266.2612740663067,
            "unit": "iter/sec",
            "range": "stddev: 0.000005988802995779093",
            "extra": "mean: 789.7264336203934 usec\nrounds: 1160"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 56.02762565343845,
            "unit": "iter/sec",
            "range": "stddev: 0.000051499135762578604",
            "extra": "mean: 17.84833799999928 msec\nrounds: 56"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 19045.793679765848,
            "unit": "iter/sec",
            "range": "stddev: 0.000022974893754168097",
            "extra": "mean: 52.50503165233775 usec\nrounds: 10331"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 38.3215973406615,
            "unit": "iter/sec",
            "range": "stddev: 0.012901918803121073",
            "extra": "mean: 26.094945654547143 msec\nrounds: 55"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.2239576485304626,
            "unit": "iter/sec",
            "range": "stddev: 0.0040098740233559405",
            "extra": "mean: 449.6488503999956 msec\nrounds: 5"
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
        "date": 1672821247893,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2297.06227492709,
            "unit": "iter/sec",
            "range": "stddev: 0.00040148249135850465",
            "extra": "mean: 435.33865446975767 usec\nrounds: 1913"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 61.89700527260796,
            "unit": "iter/sec",
            "range": "stddev: 0.0018385194954823444",
            "extra": "mean: 16.15587047540961 msec\nrounds: 61"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 66.5072282549712,
            "unit": "iter/sec",
            "range": "stddev: 0.0011418737836170587",
            "extra": "mean: 15.035959642856612 msec\nrounds: 70"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1466.8534927865958,
            "unit": "iter/sec",
            "range": "stddev: 0.0005467428465812503",
            "extra": "mean: 681.7313418944726 usec\nrounds: 1246"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 69.61329736737707,
            "unit": "iter/sec",
            "range": "stddev: 0.00023810052904120826",
            "extra": "mean: 14.365071585714466 msec\nrounds: 70"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 22567.868692954817,
            "unit": "iter/sec",
            "range": "stddev: 0.000020910428125304842",
            "extra": "mean: 44.310785994256406 usec\nrounds: 11738"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 40.07503782503894,
            "unit": "iter/sec",
            "range": "stddev: 0.021084363594114353",
            "extra": "mean: 24.953189173915106 msec\nrounds: 69"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.7822467817650773,
            "unit": "iter/sec",
            "range": "stddev: 0.006109442045006435",
            "extra": "mean: 359.42174739998904 msec\nrounds: 5"
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
          "id": "3c0e180a1e5295ca4b2eb023b492796939f18bf5",
          "message": "Introduce basic cache (#208)",
          "timestamp": "2023-01-04T11:28:30+01:00",
          "tree_id": "279f65374ab9c4c077c290a81fdef4feeeab3528",
          "url": "https://github.com/konradhalas/dacite/commit/3c0e180a1e5295ca4b2eb023b492796939f18bf5"
        },
        "date": 1672828171239,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2873.461771885414,
            "unit": "iter/sec",
            "range": "stddev: 0.0000035289792049190705",
            "extra": "mean: 348.01228601132664 usec\nrounds: 1923"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 63.505548277825476,
            "unit": "iter/sec",
            "range": "stddev: 0.000789437920193581",
            "extra": "mean: 15.74665564062494 msec\nrounds: 64"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 64.15018416871338,
            "unit": "iter/sec",
            "range": "stddev: 0.000319679621591889",
            "extra": "mean: 15.58841978333258 msec\nrounds: 60"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1460.3729256769375,
            "unit": "iter/sec",
            "range": "stddev: 0.000004853049277742102",
            "extra": "mean: 684.7566004665983 usec\nrounds: 1284"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 64.42744874072301,
            "unit": "iter/sec",
            "range": "stddev: 0.0000370756452319093",
            "extra": "mean: 15.521334765626449 msec\nrounds: 64"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 23500.78437446385,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010887465438104233",
            "extra": "mean: 42.55177121179872 usec\nrounds: 9747"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 61.82662569514335,
            "unit": "iter/sec",
            "range": "stddev: 0.00004708967209611343",
            "extra": "mean: 16.17426131147495 msec\nrounds: 61"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.503247726116108,
            "unit": "iter/sec",
            "range": "stddev: 0.01909366009591459",
            "extra": "mean: 399.481037999999 msec\nrounds: 5"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "committer": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "distinct": true,
          "id": "cb0d943c8fa452aef02987d19bb0cd6672ab6eb4",
          "message": "Performance improvement - do not call custom is_instance if it's not necessary",
          "timestamp": "2023-01-05T15:21:23+01:00",
          "tree_id": "3b6041ad4ce165a5b256cfa6a5550c27d6d1fa3d",
          "url": "https://github.com/konradhalas/dacite/commit/cb0d943c8fa452aef02987d19bb0cd6672ab6eb4"
        },
        "date": 1672928548558,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3045.2806444664743,
            "unit": "iter/sec",
            "range": "stddev: 0.000011276147330447069",
            "extra": "mean: 328.3769598762867 usec\nrounds: 1944"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 79.66664029565477,
            "unit": "iter/sec",
            "range": "stddev: 0.00016475619787069935",
            "extra": "mean: 12.552305410255169 msec\nrounds: 78"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 79.66796208620552,
            "unit": "iter/sec",
            "range": "stddev: 0.00018758738455567527",
            "extra": "mean: 12.552097151900783 msec\nrounds: 79"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1350.569193188231,
            "unit": "iter/sec",
            "range": "stddev: 0.000016600759775328955",
            "extra": "mean: 740.4285578581448 usec\nrounds: 1158"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 79.58142512933561,
            "unit": "iter/sec",
            "range": "stddev: 0.00033656502218006804",
            "extra": "mean: 12.565746320511368 msec\nrounds: 78"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 20933.58710108496,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022598832511411835",
            "extra": "mean: 47.77012153584378 usec\nrounds: 8985"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 76.12895903079992,
            "unit": "iter/sec",
            "range": "stddev: 0.00022490038210144344",
            "extra": "mean: 13.135605855262313 msec\nrounds: 76"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.1828810722554195,
            "unit": "iter/sec",
            "range": "stddev: 0.008884054629097273",
            "extra": "mean: 314.1807617999973 msec\nrounds: 5"
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
          "id": "9bf8feae363d3708da45e69831eb9897369dc0d8",
          "message": "Improve caching (#210)\n\n* Rework cache interface\r\n\r\n* Silence pylint warnings for global\r\n\r\n* Allow providing None to set_cache_size(size: int)",
          "timestamp": "2023-01-10T11:44:52+01:00",
          "tree_id": "5acc4f964ccc3cffc988a0b91e9e72ae4d3b12ee",
          "url": "https://github.com/konradhalas/dacite/commit/9bf8feae363d3708da45e69831eb9897369dc0d8"
        },
        "date": 1673347535898,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 9371.905613990726,
            "unit": "iter/sec",
            "range": "stddev: 0.000002866841854976349",
            "extra": "mean: 106.70188552765227 usec\nrounds: 3372"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 256.5846662242864,
            "unit": "iter/sec",
            "range": "stddev: 0.000011594686416671925",
            "extra": "mean: 3.897349029913882 msec\nrounds: 234"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 257.1645321768337,
            "unit": "iter/sec",
            "range": "stddev: 0.000009455393846658406",
            "extra": "mean: 3.8885611150777644 msec\nrounds: 252"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4611.230835758459,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026042631508632178",
            "extra": "mean: 216.8618391960244 usec\nrounds: 2985"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 252.68447664382794,
            "unit": "iter/sec",
            "range": "stddev: 0.000011844076266915279",
            "extra": "mean: 3.957504684427261 msec\nrounds: 244"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 72921.86771876705,
            "unit": "iter/sec",
            "range": "stddev: 5.116875187680116e-7",
            "extra": "mean: 13.713307561685527 usec\nrounds: 10593"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 230.94219386514655,
            "unit": "iter/sec",
            "range": "stddev: 0.000010717675958543894",
            "extra": "mean: 4.330087903226239 msec\nrounds: 186"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 10.134906514553819,
            "unit": "iter/sec",
            "range": "stddev: 0.003464369780881749",
            "extra": "mean: 98.66889236363363 msec\nrounds: 11"
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
          "id": "21c17b4d5dbfbbd3dfb683b61ea0b7bdc71a3932",
          "message": "Performance improvement - get rid of copy call (#211)",
          "timestamp": "2023-01-10T12:39:50+01:00",
          "tree_id": "5b4d722699a077ccb536ff03cee474a2fe6dab2f",
          "url": "https://github.com/konradhalas/dacite/commit/21c17b4d5dbfbbd3dfb683b61ea0b7bdc71a3932"
        },
        "date": 1673350840686,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 13107.860434326085,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020027589850130887",
            "extra": "mean: 76.29010127245935 usec\nrounds: 3930"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 349.05597498308464,
            "unit": "iter/sec",
            "range": "stddev: 0.00005230782259786392",
            "extra": "mean: 2.8648700256411894 msec\nrounds: 312"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 349.67024910980666,
            "unit": "iter/sec",
            "range": "stddev: 0.000010149562996511235",
            "extra": "mean: 2.859837239644517 msec\nrounds: 338"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4711.983544843933,
            "unit": "iter/sec",
            "range": "stddev: 0.000004613330760458056",
            "extra": "mean: 212.22484978629555 usec\nrounds: 3049"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 341.37761745316374,
            "unit": "iter/sec",
            "range": "stddev: 0.000009486130785104543",
            "extra": "mean: 2.929307455657071 msec\nrounds: 327"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 120139.81213662008,
            "unit": "iter/sec",
            "range": "stddev: 4.4417481504869903e-7",
            "extra": "mean: 8.323635456186866 usec\nrounds: 12122"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 306.5777975547295,
            "unit": "iter/sec",
            "range": "stddev: 0.000012525495648759338",
            "extra": "mean: 3.2618148084304197 msec\nrounds: 261"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 13.773472464005687,
            "unit": "iter/sec",
            "range": "stddev: 0.0028877091711722275",
            "extra": "mean: 72.6033324285729 msec\nrounds: 14"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "committer": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "distinct": true,
          "id": "e4fa1a739841c5f558f56d3fc591a36f1799fd59",
          "message": "Cache is_dataclass call",
          "timestamp": "2023-01-10T12:50:04+01:00",
          "tree_id": "bfa7fa843355ca17e393bd27b63e36f7642414c3",
          "url": "https://github.com/konradhalas/dacite/commit/e4fa1a739841c5f558f56d3fc591a36f1799fd59"
        },
        "date": 1673351463798,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 11125.891814741737,
            "unit": "iter/sec",
            "range": "stddev: 0.000027186656083393987",
            "extra": "mean: 89.88043535305694 usec\nrounds: 3581"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 292.47981323692125,
            "unit": "iter/sec",
            "range": "stddev: 0.0007213426065707838",
            "extra": "mean: 3.4190393823520284 msec\nrounds: 272"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 299.05456298467294,
            "unit": "iter/sec",
            "range": "stddev: 0.0005731299931544153",
            "extra": "mean: 3.3438713993180293 msec\nrounds: 293"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4070.480459287332,
            "unit": "iter/sec",
            "range": "stddev: 0.0000740079188908125",
            "extra": "mean: 245.6712444641196 usec\nrounds: 1129"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 287.0156236945068,
            "unit": "iter/sec",
            "range": "stddev: 0.0005550579275934075",
            "extra": "mean: 3.4841308885135054 msec\nrounds: 296"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 118502.41101187961,
            "unit": "iter/sec",
            "range": "stddev: 0.000007843128956542465",
            "extra": "mean: 8.438646871916827 usec\nrounds: 8504"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 243.8325022510615,
            "unit": "iter/sec",
            "range": "stddev: 0.0008539777962971318",
            "extra": "mean: 4.1011759743594505 msec\nrounds: 195"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 10.927960596163302,
            "unit": "iter/sec",
            "range": "stddev: 0.0072444640596184785",
            "extra": "mean: 91.50838266666976 msec\nrounds: 12"
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
          "id": "929101360aded8666b3c49f0050ab66a63848682",
          "message": "Run the most frequent path at the beginning of the is_instance function (#212)",
          "timestamp": "2023-01-10T14:06:49+01:00",
          "tree_id": "f6bb8a5d9e7f8c64ce3d2243b87a2397610916bd",
          "url": "https://github.com/konradhalas/dacite/commit/929101360aded8666b3c49f0050ab66a63848682"
        },
        "date": 1673356059152,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15063.964469067976,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019414057207276087",
            "extra": "mean: 66.38358727235308 usec\nrounds: 4337"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 396.7858903807584,
            "unit": "iter/sec",
            "range": "stddev: 0.00005566730090218159",
            "extra": "mean: 2.52025090670536 msec\nrounds: 343"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 397.6241316138943,
            "unit": "iter/sec",
            "range": "stddev: 0.000031684822871462853",
            "extra": "mean: 2.5149379036457273 msec\nrounds: 384"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5060.431925055913,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019082071363476023",
            "extra": "mean: 197.61159023771492 usec\nrounds: 3114"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 388.61699263452164,
            "unit": "iter/sec",
            "range": "stddev: 0.000011347119133581328",
            "extra": "mean: 2.5732276739130118 msec\nrounds: 368"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 194392.10053532748,
            "unit": "iter/sec",
            "range": "stddev: 3.573473907140429e-7",
            "extra": "mean: 5.144241958629728 usec\nrounds: 13928"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 344.97536368691453,
            "unit": "iter/sec",
            "range": "stddev: 0.000010344378412377139",
            "extra": "mean: 2.8987577237763533 msec\nrounds: 286"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.795825918447848,
            "unit": "iter/sec",
            "range": "stddev: 0.002778086540871419",
            "extra": "mean: 63.307864062499334 msec\nrounds: 16"
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
          "id": "732546f257b1e09fce428055710600d1841f45c1",
          "message": "Create issue templates",
          "timestamp": "2023-01-10T15:27:55+01:00",
          "tree_id": "76dcc52d002dcdd5f0dbcf35439e9d882dda7299",
          "url": "https://github.com/konradhalas/dacite/commit/732546f257b1e09fce428055710600d1841f45c1"
        },
        "date": 1673360919892,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14889.448371996,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021000799339824963",
            "extra": "mean: 67.16165535593615 usec\nrounds: 4509"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 393.20869156005875,
            "unit": "iter/sec",
            "range": "stddev: 0.00001127951437368197",
            "extra": "mean: 2.543178778761201 msec\nrounds: 339"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 392.3152742946378,
            "unit": "iter/sec",
            "range": "stddev: 0.000011592614300805496",
            "extra": "mean: 2.5489703448277594 msec\nrounds: 377"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5006.478296152592,
            "unit": "iter/sec",
            "range": "stddev: 0.000002164135463279942",
            "extra": "mean: 199.74120346601444 usec\nrounds: 3116"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 381.7118892368012,
            "unit": "iter/sec",
            "range": "stddev: 0.000014115862811912884",
            "extra": "mean: 2.6197769265175643 msec\nrounds: 313"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 197327.51711895916,
            "unit": "iter/sec",
            "range": "stddev: 3.6689388135123605e-7",
            "extra": "mean: 5.067716933757133 usec\nrounds: 14728"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 340.9631239725733,
            "unit": "iter/sec",
            "range": "stddev: 0.000010917524442984471",
            "extra": "mean: 2.9328684825178892 msec\nrounds: 286"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.355839751670086,
            "unit": "iter/sec",
            "range": "stddev: 0.0029708317179140318",
            "extra": "mean: 65.12180487499819 msec\nrounds: 16"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "committer": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "distinct": true,
          "id": "c831d5774901414543a92b8ef9312aee834d006d",
          "message": "Inline create_instance function",
          "timestamp": "2023-01-10T15:47:00+01:00",
          "tree_id": "f67226b0b4b3334491361a3b3f752fa2c5697ad8",
          "url": "https://github.com/konradhalas/dacite/commit/c831d5774901414543a92b8ef9312aee834d006d"
        },
        "date": 1673362080953,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 11324.285840938779,
            "unit": "iter/sec",
            "range": "stddev: 0.00005592207585180941",
            "extra": "mean: 88.30578934919399 usec\nrounds: 3380"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 313.04786788660533,
            "unit": "iter/sec",
            "range": "stddev: 0.0004557966362396431",
            "extra": "mean: 3.1943996512451185 msec\nrounds: 281"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 309.8839986730578,
            "unit": "iter/sec",
            "range": "stddev: 0.00048601665418614826",
            "extra": "mean: 3.2270139932428297 msec\nrounds: 296"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 3766.860527760977,
            "unit": "iter/sec",
            "range": "stddev: 0.0001861236561405981",
            "extra": "mean: 265.47306241635664 usec\nrounds: 2243"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 281.95474780367726,
            "unit": "iter/sec",
            "range": "stddev: 0.0006430408741495648",
            "extra": "mean: 3.54666842033918 msec\nrounds: 295"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 153544.12297318614,
            "unit": "iter/sec",
            "range": "stddev: 0.000013336407753634545",
            "extra": "mean: 6.512785905681541 usec\nrounds: 11948"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 263.23371763166153,
            "unit": "iter/sec",
            "range": "stddev: 0.0006464518188578718",
            "extra": "mean: 3.798905432773179 msec\nrounds: 238"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 12.197416580072028,
            "unit": "iter/sec",
            "range": "stddev: 0.005758038756935511",
            "extra": "mean: 81.98457381817934 msec\nrounds: 11"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "committer": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "distinct": true,
          "id": "c831d5774901414543a92b8ef9312aee834d006d",
          "message": "Inline create_instance function",
          "timestamp": "2023-01-10T15:47:00+01:00",
          "tree_id": "f67226b0b4b3334491361a3b3f752fa2c5697ad8",
          "url": "https://github.com/konradhalas/dacite/commit/c831d5774901414543a92b8ef9312aee834d006d"
        },
        "date": 1673362190833,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14811.240746741321,
            "unit": "iter/sec",
            "range": "stddev: 0.000006534127539898436",
            "extra": "mean: 67.51628827720013 usec\nrounds: 4069"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 397.94918875324515,
            "unit": "iter/sec",
            "range": "stddev: 0.00001240561600438075",
            "extra": "mean: 2.5128836249998394 msec\nrounds: 344"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 397.0395698615448,
            "unit": "iter/sec",
            "range": "stddev: 0.000012676931133440046",
            "extra": "mean: 2.518640649214684 msec\nrounds: 382"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4993.205109749774,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028843932246130353",
            "extra": "mean: 200.27216547691816 usec\nrounds: 3082"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 387.01026662963545,
            "unit": "iter/sec",
            "range": "stddev: 0.000016627350799590052",
            "extra": "mean: 2.58391078021966 msec\nrounds: 364"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 201542.531231107,
            "unit": "iter/sec",
            "range": "stddev: 3.665519194250701e-7",
            "extra": "mean: 4.961731868164883 usec\nrounds: 15015"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 345.6407823857153,
            "unit": "iter/sec",
            "range": "stddev: 0.000010184231456656443",
            "extra": "mean: 2.8931771103447432 msec\nrounds: 290"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.486430385113774,
            "unit": "iter/sec",
            "range": "stddev: 0.003902070094366491",
            "extra": "mean: 64.57265974999915 msec\nrounds: 16"
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
          "id": "2fc75e61d4dfb2db706038d51a8c102638441eb6",
          "message": "Add logo to README.md",
          "timestamp": "2023-01-17T08:56:53+01:00",
          "tree_id": "26e5a534056062aaae8f3d4f7f45a85e6c6d7822",
          "url": "https://github.com/konradhalas/dacite/commit/2fc75e61d4dfb2db706038d51a8c102638441eb6"
        },
        "date": 1673942256580,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14794.181466767952,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013492082985097624",
            "extra": "mean: 67.59414180813529 usec\nrounds: 4358"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 391.4216432223355,
            "unit": "iter/sec",
            "range": "stddev: 0.000012410660010586604",
            "extra": "mean: 2.554789744807186 msec\nrounds: 337"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 391.0125522175028,
            "unit": "iter/sec",
            "range": "stddev: 0.000046738323907189047",
            "extra": "mean: 2.5574626551726265 msec\nrounds: 377"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4972.948495789047,
            "unit": "iter/sec",
            "range": "stddev: 0.000005488728730345654",
            "extra": "mean: 201.08794628514084 usec\nrounds: 3109"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 383.1154088510989,
            "unit": "iter/sec",
            "range": "stddev: 0.000008541629997930854",
            "extra": "mean: 2.6101795357144164 msec\nrounds: 364"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 203718.88720896337,
            "unit": "iter/sec",
            "range": "stddev: 3.508143103747913e-7",
            "extra": "mean: 4.908725026434373 usec\nrounds: 14245"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 341.7295313157881,
            "unit": "iter/sec",
            "range": "stddev: 0.000008941300071028504",
            "extra": "mean: 2.9262908480564187 msec\nrounds: 283"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.303282031006287,
            "unit": "iter/sec",
            "range": "stddev: 0.004266858936755468",
            "extra": "mean: 65.34545974999872 msec\nrounds: 16"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "committer": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "distinct": true,
          "id": "c076b8c3b3de3631f28db01f3ae41e4d69aa6c50",
          "message": "Bump version",
          "timestamp": "2023-01-26T12:57:40+01:00",
          "tree_id": "b7c0de3f74b562890646db7a94de27334ed6129c",
          "url": "https://github.com/konradhalas/dacite/commit/c076b8c3b3de3631f28db01f3ae41e4d69aa6c50"
        },
        "date": 1674735607052,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14789.634400918085,
            "unit": "iter/sec",
            "range": "stddev: 0.000001401447508081781",
            "extra": "mean: 67.61492359391411 usec\nrounds: 4463"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 390.51872949317504,
            "unit": "iter/sec",
            "range": "stddev: 0.000009820098024160606",
            "extra": "mean: 2.560696643917246 msec\nrounds: 337"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 391.08965299281925,
            "unit": "iter/sec",
            "range": "stddev: 0.000009848865309417916",
            "extra": "mean: 2.5569584680839434 msec\nrounds: 376"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5041.837537476695,
            "unit": "iter/sec",
            "range": "stddev: 0.000002373540827894234",
            "extra": "mean: 198.34038533904712 usec\nrounds: 3083"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 383.8185952184488,
            "unit": "iter/sec",
            "range": "stddev: 0.000010001135222596629",
            "extra": "mean: 2.6053974780217564 msec\nrounds: 364"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 203093.3018516213,
            "unit": "iter/sec",
            "range": "stddev: 3.0084490126308894e-7",
            "extra": "mean: 4.923845301065585 usec\nrounds: 14706"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 341.9048908997698,
            "unit": "iter/sec",
            "range": "stddev: 0.000011342990539609445",
            "extra": "mean: 2.9247899828761224 msec\nrounds: 292"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.487489139967973,
            "unit": "iter/sec",
            "range": "stddev: 0.002692170294290881",
            "extra": "mean: 64.56824543749562 msec\nrounds: 16"
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
          "id": "02ee99348d4c8354fa309b8d1f3525dafda592e6",
          "message": "Remove @cache decorator from get_default_value_for_field (#216)\n\n* Remove @cache decorator from get_default_value_for_field\r\n\r\n* Fix default factory identity test for older Python versions",
          "timestamp": "2023-02-08T10:06:26+01:00",
          "tree_id": "888cd9340bdb63115949a52742a7410c5a983639",
          "url": "https://github.com/konradhalas/dacite/commit/02ee99348d4c8354fa309b8d1f3525dafda592e6"
        },
        "date": 1675847237123,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14254.985924273416,
            "unit": "iter/sec",
            "range": "stddev: 0.000007215053019302982",
            "extra": "mean: 70.15089354084863 usec\nrounds: 3917"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 391.8990385471987,
            "unit": "iter/sec",
            "range": "stddev: 0.000009188365956141407",
            "extra": "mean: 2.55167760479097 msec\nrounds: 334"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 391.0644961862141,
            "unit": "iter/sec",
            "range": "stddev: 0.000012888076710283476",
            "extra": "mean: 2.5571229547870478 msec\nrounds: 376"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4981.5349952052475,
            "unit": "iter/sec",
            "range": "stddev: 0.000001883237779794796",
            "extra": "mean: 200.74133795356352 usec\nrounds: 3030"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 383.04714718776495,
            "unit": "iter/sec",
            "range": "stddev: 0.000007781277863922293",
            "extra": "mean: 2.6106446878452076 msec\nrounds: 362"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 201989.07539942831,
            "unit": "iter/sec",
            "range": "stddev: 2.81948299651461e-7",
            "extra": "mean: 4.950762797554893 usec\nrounds: 12854"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 339.9957539696109,
            "unit": "iter/sec",
            "range": "stddev: 0.00001352290759590022",
            "extra": "mean: 2.941213201413629 msec\nrounds: 283"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.312836390415779,
            "unit": "iter/sec",
            "range": "stddev: 0.004183905888827408",
            "extra": "mean: 65.30468781250053 msec\nrounds: 16"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "committer": {
            "email": "halas.konrad@gmail.com",
            "name": "konradhalas",
            "username": "konradhalas"
          },
          "distinct": true,
          "id": "10a9ec40fc5874ae434aa68b975d1b1bf667a42f",
          "message": "Bump version",
          "timestamp": "2023-05-12T13:21:32+02:00",
          "tree_id": "c35e80778094d57f8f418f55487b0feccdc2696c",
          "url": "https://github.com/konradhalas/dacite/commit/10a9ec40fc5874ae434aa68b975d1b1bf667a42f"
        },
        "date": 1683890644247,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14929.025575078693,
            "unit": "iter/sec",
            "range": "stddev: 0.000001126144241188062",
            "extra": "mean: 66.98360820476583 usec\nrounds: 4607"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 397.2057808243269,
            "unit": "iter/sec",
            "range": "stddev: 0.000011331468215108681",
            "extra": "mean: 2.5175867227427697 msec\nrounds: 321"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 397.191310782912,
            "unit": "iter/sec",
            "range": "stddev: 0.000011005386661649758",
            "extra": "mean: 2.517678440721373 msec\nrounds: 388"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5112.1385921134615,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019891004488082465",
            "extra": "mean: 195.61285007857734 usec\nrounds: 3175"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 388.00721960621706,
            "unit": "iter/sec",
            "range": "stddev: 0.00002532722631759526",
            "extra": "mean: 2.5772716317363513 msec\nrounds: 334"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 198310.53261766868,
            "unit": "iter/sec",
            "range": "stddev: 2.010375670578053e-7",
            "extra": "mean: 5.042596511643397 usec\nrounds: 14620"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 342.0295734990933,
            "unit": "iter/sec",
            "range": "stddev: 0.000017532137331541637",
            "extra": "mean: 2.9237237873018334 msec\nrounds: 315"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.599689518988589,
            "unit": "iter/sec",
            "range": "stddev: 0.0022539600759753256",
            "extra": "mean: 64.10383993750379 msec\nrounds: 16"
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
          "id": "1cdc3ef42fa361a368a532c02f659077c52dd41a",
          "message": "Merge pull request #268 from konradhalas/chore/fix_ci",
          "timestamp": "2025-01-08T00:00:11+01:00",
          "tree_id": "10ab4d7d17f22ec217d3f1c5fd3e77335dc38451",
          "url": "https://github.com/konradhalas/dacite/commit/1cdc3ef42fa361a368a532c02f659077c52dd41a"
        },
        "date": 1736290852371,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18566.06878420256,
            "unit": "iter/sec",
            "range": "stddev: 0.000002840259595696872",
            "extra": "mean: 53.86169854389836 usec\nrounds: 4601"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 493.61815755924937,
            "unit": "iter/sec",
            "range": "stddev: 0.00003569198382733266",
            "extra": "mean: 2.0258574055391576 msec\nrounds: 397"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 495.717824717586,
            "unit": "iter/sec",
            "range": "stddev: 0.00002031539885962032",
            "extra": "mean: 2.0172766645413795 msec\nrounds: 471"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6181.16934318067,
            "unit": "iter/sec",
            "range": "stddev: 0.000008134596774541632",
            "extra": "mean: 161.78168635733024 usec\nrounds: 3335"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 484.09218145147685,
            "unit": "iter/sec",
            "range": "stddev: 0.00004730053109902018",
            "extra": "mean: 2.0657222700884197 msec\nrounds: 448"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 234930.7628294888,
            "unit": "iter/sec",
            "range": "stddev: 6.208249764816979e-7",
            "extra": "mean: 4.256573247181738 usec\nrounds: 17284"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 430.6706278598002,
            "unit": "iter/sec",
            "range": "stddev: 0.000038723811939827657",
            "extra": "mean: 2.321960067185121 msec\nrounds: 387"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.38651743115849,
            "unit": "iter/sec",
            "range": "stddev: 0.0026600727521103504",
            "extra": "mean: 51.582240263162234 msec\nrounds: 19"
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
        "date": 1738051137668,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15499.926406177838,
            "unit": "iter/sec",
            "range": "stddev: 0.000002930514975304597",
            "extra": "mean: 64.51643535555291 usec\nrounds: 3728"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 406.55901710122697,
            "unit": "iter/sec",
            "range": "stddev: 0.0002752774761188038",
            "extra": "mean: 2.4596674970586503 msec\nrounds: 340"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 402.8695941065014,
            "unit": "iter/sec",
            "range": "stddev: 0.00030908891603794386",
            "extra": "mean: 2.482192785528617 msec\nrounds: 387"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5295.381538274191,
            "unit": "iter/sec",
            "range": "stddev: 0.000008505471019565207",
            "extra": "mean: 188.84380526165228 usec\nrounds: 3230"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 409.8656751129835,
            "unit": "iter/sec",
            "range": "stddev: 0.000052853692290797",
            "extra": "mean: 2.439823729382413 msec\nrounds: 388"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 142518.71084448852,
            "unit": "iter/sec",
            "range": "stddev: 6.358520880294039e-7",
            "extra": "mean: 7.0166225478363 usec\nrounds: 14786"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 370.36982918156866,
            "unit": "iter/sec",
            "range": "stddev: 0.00006904202854240178",
            "extra": "mean: 2.7000039452721296 msec\nrounds: 329"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.09237436363642,
            "unit": "iter/sec",
            "range": "stddev: 0.0023583705482107076",
            "extra": "mean: 62.14123394119377 msec\nrounds: 17"
          }
        ]
      }
    ]
  }
}