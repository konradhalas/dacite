window.BENCHMARK_DATA = {
  "lastUpdate": 1672828173879,
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
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3584.575971137575,
            "unit": "iter/sec",
            "range": "stddev: 0.000006696285385901853",
            "extra": "mean: 278.97302443910746 usec\nrounds: 2496"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 2831.366139223747,
            "unit": "iter/sec",
            "range": "stddev: 0.0000031432843439089414",
            "extra": "mean: 353.18639512802895 usec\nrounds: 2422"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 242.71384852569358,
            "unit": "iter/sec",
            "range": "stddev: 0.000009027251794077782",
            "extra": "mean: 4.120078051064072 msec\nrounds: 235"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 2087.7335349365812,
            "unit": "iter/sec",
            "range": "stddev: 0.0000031160255139504485",
            "extra": "mean: 478.9883302949276 usec\nrounds: 1865"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 3095.405624628232,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027526409385778228",
            "extra": "mean: 323.0594375236697 usec\nrounds: 2633"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 23195.858198186947,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011440955030356873",
            "extra": "mean: 43.11114473350948 usec\nrounds: 11877"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 2325.564581595309,
            "unit": "iter/sec",
            "range": "stddev: 0.000005000548480684109",
            "extra": "mean: 430.00310888550433 usec\nrounds: 1947"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 114.15221558696886,
            "unit": "iter/sec",
            "range": "stddev: 0.0000181576414784388",
            "extra": "mean: 8.760232947367829 msec\nrounds: 114"
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
        "date": 1671801439695,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2714.842219821526,
            "unit": "iter/sec",
            "range": "stddev: 0.00012031160992853347",
            "extra": "mean: 368.3455313531038 usec\nrounds: 1212"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 64.11060881955825,
            "unit": "iter/sec",
            "range": "stddev: 0.0014688173203776195",
            "extra": "mean: 15.598042483335917 msec\nrounds: 60"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 65.27193235533889,
            "unit": "iter/sec",
            "range": "stddev: 0.0007728686575066078",
            "extra": "mean: 15.320520841270994 msec\nrounds: 63"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1566.7055653151258,
            "unit": "iter/sec",
            "range": "stddev: 0.00043506306787573744",
            "extra": "mean: 638.2820244841989 usec\nrounds: 1307"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 64.44202486121853,
            "unit": "iter/sec",
            "range": "stddev: 0.0014276099976825631",
            "extra": "mean: 15.517823999999791 msec\nrounds: 65"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 16962.450638291186,
            "unit": "iter/sec",
            "range": "stddev: 0.00005009293642218399",
            "extra": "mean: 58.95374561872511 usec\nrounds: 9757"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 64.69479456259327,
            "unit": "iter/sec",
            "range": "stddev: 0.0016925314551242824",
            "extra": "mean: 15.457194149252357 msec\nrounds: 67"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.471698746568637,
            "unit": "iter/sec",
            "range": "stddev: 0.020068648690281868",
            "extra": "mean: 404.580049000009 msec\nrounds: 5"
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
        "date": 1672821241348,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3786.8794330011383,
            "unit": "iter/sec",
            "range": "stddev: 0.000013720620056826743",
            "extra": "mean: 264.0696694184136 usec\nrounds: 2423"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 90.06231217087335,
            "unit": "iter/sec",
            "range": "stddev: 0.00002326636020153",
            "extra": "mean: 11.103423573033753 msec\nrounds: 89"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 90.10325848619728,
            "unit": "iter/sec",
            "range": "stddev: 0.000021978542321735292",
            "extra": "mean: 11.098377759037293 msec\nrounds: 83"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 2267.059672179144,
            "unit": "iter/sec",
            "range": "stddev: 0.0000036766044823218116",
            "extra": "mean: 441.0999905612452 usec\nrounds: 2013"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 89.77544763841243,
            "unit": "iter/sec",
            "range": "stddev: 0.000022657600342669155",
            "extra": "mean: 11.138902966295293 msec\nrounds: 89"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 25598.50315005193,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013359529258305635",
            "extra": "mean: 39.06478414531716 usec\nrounds: 11656"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 89.77490429584371,
            "unit": "iter/sec",
            "range": "stddev: 0.000031009903844523315",
            "extra": "mean: 11.138970382019075 msec\nrounds: 89"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.5807664686484615,
            "unit": "iter/sec",
            "range": "stddev: 0.0012957377585973695",
            "extra": "mean: 279.2698180000116 msec\nrounds: 5"
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
        "date": 1672828171145,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3633.5762464272743,
            "unit": "iter/sec",
            "range": "stddev: 0.0000800140395999618",
            "extra": "mean: 275.21095807009783 usec\nrounds: 1741"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 86.00589037141947,
            "unit": "iter/sec",
            "range": "stddev: 0.0003629930675515066",
            "extra": "mean: 11.627110604651202 msec\nrounds: 86"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 85.84925746503633,
            "unit": "iter/sec",
            "range": "stddev: 0.00039230644280471817",
            "extra": "mean: 11.648324394736532 msec\nrounds: 76"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 2063.7692516037077,
            "unit": "iter/sec",
            "range": "stddev: 0.00006345389901075804",
            "extra": "mean: 484.5502951567492 usec\nrounds: 1755"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 86.71748886230647,
            "unit": "iter/sec",
            "range": "stddev: 0.0006013266100137278",
            "extra": "mean: 11.53169923529313 msec\nrounds: 85"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 29245.26659878056,
            "unit": "iter/sec",
            "range": "stddev: 0.000035240986752529785",
            "extra": "mean: 34.193567585453195 usec\nrounds: 10594"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 88.22855322352795,
            "unit": "iter/sec",
            "range": "stddev: 0.0006993541572000873",
            "extra": "mean: 11.334199229885249 msec\nrounds: 87"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.4576645635807224,
            "unit": "iter/sec",
            "range": "stddev: 0.004837283638826713",
            "extra": "mean: 289.2125541999974 msec\nrounds: 5"
          }
        ]
      }
    ]
  }
}