window.BENCHMARK_DATA = {
  "lastUpdate": 1738747186998,
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
        "date": 1738051828315,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15198.48339746067,
            "unit": "iter/sec",
            "range": "stddev: 0.0000041469884905732565",
            "extra": "mean: 65.7960385815257 usec\nrounds: 3525"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 409.18406690683355,
            "unit": "iter/sec",
            "range": "stddev: 0.000020587682237137424",
            "extra": "mean: 2.443887924472114 msec\nrounds: 331"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 397.52361042938895,
            "unit": "iter/sec",
            "range": "stddev: 0.000393314040025986",
            "extra": "mean: 2.5155738521287843 msec\nrounds: 399"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5253.781516662881,
            "unit": "iter/sec",
            "range": "stddev: 0.000006051223549324354",
            "extra": "mean: 190.33909134371166 usec\nrounds: 3142"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 400.3401150183623,
            "unit": "iter/sec",
            "range": "stddev: 0.000028314721088764668",
            "extra": "mean: 2.4978760870719467 msec\nrounds: 379"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 138754.60179840375,
            "unit": "iter/sec",
            "range": "stddev: 6.831483299228941e-7",
            "extra": "mean: 7.2069681800744725 usec\nrounds: 14205"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 363.56613721756213,
            "unit": "iter/sec",
            "range": "stddev: 0.0000344936671327115",
            "extra": "mean: 2.750531189876984 msec\nrounds: 316"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.91929527006897,
            "unit": "iter/sec",
            "range": "stddev: 0.0035759222855849438",
            "extra": "mean: 62.81685106250734 msec\nrounds: 16"
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
        "date": 1738052950313,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15526.193622629831,
            "unit": "iter/sec",
            "range": "stddev: 0.000002670335934184441",
            "extra": "mean: 64.40728644157019 usec\nrounds: 4123"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 417.5084512956487,
            "unit": "iter/sec",
            "range": "stddev: 0.0000231000580502526",
            "extra": "mean: 2.3951610964920893 msec\nrounds: 342"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 404.3420080760029,
            "unit": "iter/sec",
            "range": "stddev: 0.00039798179933670885",
            "extra": "mean: 2.473153864863908 msec\nrounds: 407"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5332.360707207229,
            "unit": "iter/sec",
            "range": "stddev: 0.000010677461016169795",
            "extra": "mean: 187.53420012423354 usec\nrounds: 3218"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 392.19780995431836,
            "unit": "iter/sec",
            "range": "stddev: 0.00046309035195896456",
            "extra": "mean: 2.5497337685707016 msec\nrounds: 350"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 142282.96038356857,
            "unit": "iter/sec",
            "range": "stddev: 5.461130005364666e-7",
            "extra": "mean: 7.028248479678696 usec\nrounds: 14963"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 371.21188131811357,
            "unit": "iter/sec",
            "range": "stddev: 0.00002836817187323919",
            "extra": "mean: 2.693879291926651 msec\nrounds: 322"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.266377151177664,
            "unit": "iter/sec",
            "range": "stddev: 0.0019240969049152436",
            "extra": "mean: 61.47650400000724 msec\nrounds: 17"
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
        "date": 1738053314166,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15056.660565757533,
            "unit": "iter/sec",
            "range": "stddev: 0.0000036906025091182263",
            "extra": "mean: 66.41578958578907 usec\nrounds: 3303"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 413.6336609897787,
            "unit": "iter/sec",
            "range": "stddev: 0.000046837294117628085",
            "extra": "mean: 2.4175982138569494 msec\nrounds: 332"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 400.251948854497,
            "unit": "iter/sec",
            "range": "stddev: 0.0003020133936147816",
            "extra": "mean: 2.49842631088232 msec\nrounds: 386"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5264.645779910614,
            "unit": "iter/sec",
            "range": "stddev: 0.0000061136033929782975",
            "extra": "mean: 189.94630252540534 usec\nrounds: 3127"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 398.20307342108026,
            "unit": "iter/sec",
            "range": "stddev: 0.0001645942059777524",
            "extra": "mean: 2.511281471056224 msec\nrounds: 380"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 138601.166450628,
            "unit": "iter/sec",
            "range": "stddev: 7.0988444788891e-7",
            "extra": "mean: 7.214946494380452 usec\nrounds: 12952"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 365.79375115846074,
            "unit": "iter/sec",
            "range": "stddev: 0.00008954916211924582",
            "extra": "mean: 2.733780981312617 msec\nrounds: 321"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.06068042498789,
            "unit": "iter/sec",
            "range": "stddev: 0.0025437895124852308",
            "extra": "mean: 62.26386264707424 msec\nrounds: 17"
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
        "date": 1738150760088,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15408.397098255591,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028833582266135357",
            "extra": "mean: 64.89967733978064 usec\nrounds: 3248"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 412.39756597820934,
            "unit": "iter/sec",
            "range": "stddev: 0.00003875948023477589",
            "extra": "mean: 2.4248445735318405 msec\nrounds: 340"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 410.14655678219077,
            "unit": "iter/sec",
            "range": "stddev: 0.000040583153800758846",
            "extra": "mean: 2.438152858932941 msec\nrounds: 397"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5312.562869427759,
            "unit": "iter/sec",
            "range": "stddev: 0.00000540517309839368",
            "extra": "mean: 188.23306652137833 usec\nrounds: 3157"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 405.0792896940684,
            "unit": "iter/sec",
            "range": "stddev: 0.0000493738716770454",
            "extra": "mean: 2.4686524970339483 msec\nrounds: 336"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 137709.85009650883,
            "unit": "iter/sec",
            "range": "stddev: 7.808963986281019e-7",
            "extra": "mean: 7.261644677553473 usec\nrounds: 14311"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 366.9743815570851,
            "unit": "iter/sec",
            "range": "stddev: 0.000027430500718314288",
            "extra": "mean: 2.7249858580235635 msec\nrounds: 324"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.957250096148492,
            "unit": "iter/sec",
            "range": "stddev: 0.0023845169689252475",
            "extra": "mean: 62.667439187492846 msec\nrounds: 16"
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
        "date": 1738150798622,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15269.596465632663,
            "unit": "iter/sec",
            "range": "stddev: 0.000002677738978361489",
            "extra": "mean: 65.48961540998832 usec\nrounds: 3440"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 404.6675555212038,
            "unit": "iter/sec",
            "range": "stddev: 0.00016238968672246576",
            "extra": "mean: 2.471164259047207 msec\nrounds: 332"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 395.12473381421086,
            "unit": "iter/sec",
            "range": "stddev: 0.0003813453567283394",
            "extra": "mean: 2.5308463743760568 msec\nrounds: 398"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5292.100792370013,
            "unit": "iter/sec",
            "range": "stddev: 0.00000903786900876477",
            "extra": "mean: 188.96087569642836 usec\nrounds: 3049"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 383.0260307142149,
            "unit": "iter/sec",
            "range": "stddev: 0.0004057230011351194",
            "extra": "mean: 2.610788614380427 msec\nrounds: 306"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 138383.4338043411,
            "unit": "iter/sec",
            "range": "stddev: 7.554052769158035e-7",
            "extra": "mean: 7.226298499095561 usec\nrounds: 12784"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 366.3834081733911,
            "unit": "iter/sec",
            "range": "stddev: 0.00009927407825279976",
            "extra": "mean: 2.729381237500661 msec\nrounds: 320"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.15813138168001,
            "unit": "iter/sec",
            "range": "stddev: 0.0022929222537235263",
            "extra": "mean: 61.88834441176743 msec\nrounds: 17"
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
        "date": 1738179400430,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14900.00096436428,
            "unit": "iter/sec",
            "range": "stddev: 0.0000037410353315057064",
            "extra": "mean: 67.11408961594424 usec\nrounds: 3593"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 375.653994687475,
            "unit": "iter/sec",
            "range": "stddev: 0.0005688469081456455",
            "extra": "mean: 2.6620241342886533 msec\nrounds: 350"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 404.8055340644368,
            "unit": "iter/sec",
            "range": "stddev: 0.00006315486189110764",
            "extra": "mean: 2.4703219591874954 msec\nrounds: 392"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5224.770781538991,
            "unit": "iter/sec",
            "range": "stddev: 0.000004868948349701742",
            "extra": "mean: 191.39595626536624 usec\nrounds: 3224"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 401.1460816940117,
            "unit": "iter/sec",
            "range": "stddev: 0.0000469437132575433",
            "extra": "mean: 2.492857454264717 msec\nrounds: 328"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 138646.4719365419,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013280922769256924",
            "extra": "mean: 7.212588867444801 usec\nrounds: 15557"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 364.28596298251284,
            "unit": "iter/sec",
            "range": "stddev: 0.00005569125303966062",
            "extra": "mean: 2.7450961651465113 msec\nrounds: 327"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.953394821255426,
            "unit": "iter/sec",
            "range": "stddev: 0.002234585970872084",
            "extra": "mean: 62.68258331246557 msec\nrounds: 16"
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
        "date": 1738179509174,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15409.966746794069,
            "unit": "iter/sec",
            "range": "stddev: 0.000003263598605134181",
            "extra": "mean: 64.89306670360224 usec\nrounds: 3598"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 401.7843337201504,
            "unit": "iter/sec",
            "range": "stddev: 0.00010233884748269938",
            "extra": "mean: 2.4888974409254017 msec\nrounds: 347"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 389.577254348934,
            "unit": "iter/sec",
            "range": "stddev: 0.00041222132309347347",
            "extra": "mean: 2.5668849729720784 msec\nrounds: 370"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5039.746972586272,
            "unit": "iter/sec",
            "range": "stddev: 0.000007059650329614693",
            "extra": "mean: 198.42265999454037 usec\nrounds: 3047"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 388.07748107405547,
            "unit": "iter/sec",
            "range": "stddev: 0.00006564695822514043",
            "extra": "mean: 2.5768050164425116 msec\nrounds: 365"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 140243.3736662179,
            "unit": "iter/sec",
            "range": "stddev: 0.000001787968877602867",
            "extra": "mean: 7.130461667158838 usec\nrounds: 13709"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 357.2216810838181,
            "unit": "iter/sec",
            "range": "stddev: 0.000042358735009521423",
            "extra": "mean: 2.7993821566652364 msec\nrounds: 300"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.529212918158626,
            "unit": "iter/sec",
            "range": "stddev: 0.002942393100971188",
            "extra": "mean: 64.39476393749999 msec\nrounds: 16"
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
        "date": 1738746163960,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15128.84832478464,
            "unit": "iter/sec",
            "range": "stddev: 0.0000030943569569169772",
            "extra": "mean: 66.09888462968875 usec\nrounds: 5426"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 410.53105754408574,
            "unit": "iter/sec",
            "range": "stddev: 0.00003702334686943099",
            "extra": "mean: 2.435869300564703 msec\nrounds: 356"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 412.9339055176429,
            "unit": "iter/sec",
            "range": "stddev: 0.000023355594676873207",
            "extra": "mean: 2.4216950621829576 msec\nrounds: 402"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5269.793726905301,
            "unit": "iter/sec",
            "range": "stddev: 0.000011152343207551496",
            "extra": "mean: 189.76074810944309 usec\nrounds: 3307"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 399.07634197043507,
            "unit": "iter/sec",
            "range": "stddev: 0.00029074787472223095",
            "extra": "mean: 2.5057862239152313 msec\nrounds: 393"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 138697.43211076845,
            "unit": "iter/sec",
            "range": "stddev: 6.404104704921709e-7",
            "extra": "mean: 7.2099388199297465 usec\nrounds: 14956"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 365.50874172067347,
            "unit": "iter/sec",
            "range": "stddev: 0.000058555932141041666",
            "extra": "mean: 2.735912676923643 msec\nrounds: 325"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.242247193245333,
            "unit": "iter/sec",
            "range": "stddev: 0.00251210031624265",
            "extra": "mean: 61.56783529411314 msec\nrounds: 17"
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
        "date": 1738746292152,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14896.992385613004,
            "unit": "iter/sec",
            "range": "stddev: 0.000004264620837081026",
            "extra": "mean: 67.12764389715102 usec\nrounds: 3704"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 406.5056369976651,
            "unit": "iter/sec",
            "range": "stddev: 0.00009704133281381017",
            "extra": "mean: 2.459990487181716 msec\nrounds: 351"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 412.91463078106574,
            "unit": "iter/sec",
            "range": "stddev: 0.00008865329716648905",
            "extra": "mean: 2.4218081062141312 msec\nrounds: 386"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5309.007807774437,
            "unit": "iter/sec",
            "range": "stddev: 0.0000070295785849717524",
            "extra": "mean: 188.3591127019278 usec\nrounds: 3141"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 399.62657954927516,
            "unit": "iter/sec",
            "range": "stddev: 0.000311697649710278",
            "extra": "mean: 2.502336058647213 msec\nrounds: 341"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 142247.83259354986,
            "unit": "iter/sec",
            "range": "stddev: 0.000001260309522884371",
            "extra": "mean: 7.029984090213437 usec\nrounds: 13891"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 366.9074698188546,
            "unit": "iter/sec",
            "range": "stddev: 0.000027256905620667885",
            "extra": "mean: 2.7254828049527267 msec\nrounds: 323"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.03179168418839,
            "unit": "iter/sec",
            "range": "stddev: 0.002633245742901714",
            "extra": "mean: 62.376059999972796 msec\nrounds: 17"
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
          "id": "c789de1d53afcb5fb8a2b095a86a455516c633b1",
          "message": "Update CHANGELOG.md",
          "timestamp": "2025-02-05T10:10:43+01:00",
          "tree_id": "cb3c961d1b2085301924414a9aeeadc74ee55b9e",
          "url": "https://github.com/konradhalas/dacite/commit/c789de1d53afcb5fb8a2b095a86a455516c633b1"
        },
        "date": 1738746691726,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15254.968896917027,
            "unit": "iter/sec",
            "range": "stddev: 0.000012431654017791406",
            "extra": "mean: 65.55241159502438 usec\nrounds: 3829"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 419.4340948941691,
            "unit": "iter/sec",
            "range": "stddev: 0.00006458868057326517",
            "extra": "mean: 2.3841647881589556 msec\nrounds: 321"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 414.18657588736204,
            "unit": "iter/sec",
            "range": "stddev: 0.00016598372861755046",
            "extra": "mean: 2.414370861386753 msec\nrounds: 404"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5304.137796979376,
            "unit": "iter/sec",
            "range": "stddev: 0.000009949038821720296",
            "extra": "mean: 188.5320552134759 usec\nrounds: 2916"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 406.40690349956776,
            "unit": "iter/sec",
            "range": "stddev: 0.00011673106199844986",
            "extra": "mean: 2.4605881233537255 msec\nrounds: 381"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 140474.71568499762,
            "unit": "iter/sec",
            "range": "stddev: 8.8189845221127e-7",
            "extra": "mean: 7.118718803762617 usec\nrounds: 14481"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 365.5854612184235,
            "unit": "iter/sec",
            "range": "stddev: 0.00007374034577169514",
            "extra": "mean: 2.735338535255749 msec\nrounds: 312"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.1424480481153,
            "unit": "iter/sec",
            "range": "stddev: 0.0034739212018935314",
            "extra": "mean: 61.94847256248437 msec\nrounds: 16"
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
          "id": "daad7e4a15569321d3cf118f8083a71a65d7e044",
          "message": "Fix version in setup.py",
          "timestamp": "2025-02-05T10:19:01+01:00",
          "tree_id": "bdf27ae2fa2050bd89cd9f77e6e7240adde48bbc",
          "url": "https://github.com/konradhalas/dacite/commit/daad7e4a15569321d3cf118f8083a71a65d7e044"
        },
        "date": 1738747186667,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15447.278079182364,
            "unit": "iter/sec",
            "range": "stddev: 0.000003605987033262802",
            "extra": "mean: 64.73632408726151 usec\nrounds: 3749"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 402.6536463414221,
            "unit": "iter/sec",
            "range": "stddev: 0.0003084036546456009",
            "extra": "mean: 2.4835240139662615 msec\nrounds: 358"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 416.7225782609678,
            "unit": "iter/sec",
            "range": "stddev: 0.00003609991443459936",
            "extra": "mean: 2.399677992426322 msec\nrounds: 396"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5257.822567817955,
            "unit": "iter/sec",
            "range": "stddev: 0.000019592379626898474",
            "extra": "mean: 190.19280074622398 usec\nrounds: 3212"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 404.7030746665663,
            "unit": "iter/sec",
            "range": "stddev: 0.00009096607342182936",
            "extra": "mean: 2.4709473749955992 msec\nrounds: 224"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 140505.6073825235,
            "unit": "iter/sec",
            "range": "stddev: 7.081023995354148e-7",
            "extra": "mean: 7.1171536754225135 usec\nrounds: 14869"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 358.64445132560917,
            "unit": "iter/sec",
            "range": "stddev: 0.00045455400200006057",
            "extra": "mean: 2.7882767914123154 msec\nrounds: 326"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.29513818698464,
            "unit": "iter/sec",
            "range": "stddev: 0.002214810536035284",
            "extra": "mean: 61.367997529393556 msec\nrounds: 17"
          }
        ]
      }
    ]
  }
}