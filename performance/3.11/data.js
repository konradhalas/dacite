window.BENCHMARK_DATA = {
  "lastUpdate": 1738746283723,
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
        "date": 1672928547353,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 5473.139805772973,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023528385014347875",
            "extra": "mean: 182.71047981365604 usec\nrounds: 2576"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 146.5743656507027,
            "unit": "iter/sec",
            "range": "stddev: 0.00004198671314021703",
            "extra": "mean: 6.822475373238675 msec\nrounds: 142"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 147.02293115649644,
            "unit": "iter/sec",
            "range": "stddev: 0.0000631794159738173",
            "extra": "mean: 6.801660068493427 msec\nrounds: 146"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 2720.538009095352,
            "unit": "iter/sec",
            "range": "stddev: 0.000003613177709590877",
            "extra": "mean: 367.574353549475 usec\nrounds: 2127"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 144.60164202758256,
            "unit": "iter/sec",
            "range": "stddev: 0.00080446825057464",
            "extra": "mean: 6.9155507916656385 msec\nrounds: 144"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 36032.920841465624,
            "unit": "iter/sec",
            "range": "stddev: 9.178289860511081e-7",
            "extra": "mean: 27.752399101913202 usec\nrounds: 10020"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 146.5758641593289,
            "unit": "iter/sec",
            "range": "stddev: 0.000042624782372576396",
            "extra": "mean: 6.822405624114169 msec\nrounds: 141"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 5.7515787647546395,
            "unit": "iter/sec",
            "range": "stddev: 0.005967741512816729",
            "extra": "mean: 173.8653056666711 msec\nrounds: 6"
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
        "date": 1673347536405,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 12849.500035667477,
            "unit": "iter/sec",
            "range": "stddev: 0.000001547081508975748",
            "extra": "mean: 77.82403962988543 usec\nrounds: 3457"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 364.2635126692478,
            "unit": "iter/sec",
            "range": "stddev: 0.000011338956841568052",
            "extra": "mean: 2.7452653510976344 msec\nrounds: 319"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 364.51410607243423,
            "unit": "iter/sec",
            "range": "stddev: 0.00003900082850668384",
            "extra": "mean: 2.7433780568187 msec\nrounds: 352"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6187.858527481406,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018576417594716546",
            "extra": "mean: 161.60679749849126 usec\nrounds: 3358"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 359.01462722727854,
            "unit": "iter/sec",
            "range": "stddev: 0.000014706624057748013",
            "extra": "mean: 2.7854018309035027 msec\nrounds: 343"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 90256.22092595497,
            "unit": "iter/sec",
            "range": "stddev: 5.438269145468818e-7",
            "extra": "mean: 11.079568696105579 usec\nrounds: 11136"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 365.1114724999903,
            "unit": "iter/sec",
            "range": "stddev: 0.00006943940538377825",
            "extra": "mean: 2.738889559270221 msec\nrounds: 329"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 14.349570338372363,
            "unit": "iter/sec",
            "range": "stddev: 0.0029955686857179547",
            "extra": "mean: 69.68849773333545 msec\nrounds: 15"
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
        "date": 1673350839128,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 19194.207168709036,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014057163600085627",
            "extra": "mean: 52.09905213642946 usec\nrounds: 4143"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 529.5736572818074,
            "unit": "iter/sec",
            "range": "stddev: 0.00000948393604547606",
            "extra": "mean: 1.8883114487468922 msec\nrounds: 439"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 530.6447599573901,
            "unit": "iter/sec",
            "range": "stddev: 0.000009122846607658483",
            "extra": "mean: 1.884499905511737 msec\nrounds: 508"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7115.416850182214,
            "unit": "iter/sec",
            "range": "stddev: 0.000003150683528625205",
            "extra": "mean: 140.53990385319332 usec\nrounds: 2621"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 519.3157174807461,
            "unit": "iter/sec",
            "range": "stddev: 0.00001275824374848568",
            "extra": "mean: 1.925610888210938 msec\nrounds: 492"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 154263.80641508987,
            "unit": "iter/sec",
            "range": "stddev: 6.019666058876574e-7",
            "extra": "mean: 6.482401953114139 usec\nrounds: 13004"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 527.0593768590147,
            "unit": "iter/sec",
            "range": "stddev: 0.000008939926810215344",
            "extra": "mean: 1.8973194366817878 msec\nrounds: 458"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.673630501657353,
            "unit": "iter/sec",
            "range": "stddev: 0.0028465593852139886",
            "extra": "mean: 48.3707977619041 msec\nrounds: 21"
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
        "date": 1673351448554,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 19637.77248509997,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011995716203414143",
            "extra": "mean: 50.922272409395894 usec\nrounds: 4005"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 544.9160712952648,
            "unit": "iter/sec",
            "range": "stddev: 0.000008345131375473778",
            "extra": "mean: 1.8351449932886017 msec\nrounds: 447"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 544.8379609666263,
            "unit": "iter/sec",
            "range": "stddev: 0.000007525348805771276",
            "extra": "mean: 1.8354080876190166 msec\nrounds: 525"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6661.307980547007,
            "unit": "iter/sec",
            "range": "stddev: 0.000004423425273080739",
            "extra": "mean: 150.12066743052512 usec\nrounds: 3491"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 530.8526975856215,
            "unit": "iter/sec",
            "range": "stddev: 0.000012207494044496043",
            "extra": "mean: 1.8837617375744984 msec\nrounds: 503"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 198960.1033405722,
            "unit": "iter/sec",
            "range": "stddev: 3.859615793840752e-7",
            "extra": "mean: 5.026133296122382 usec\nrounds: 12611"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 541.1724882637906,
            "unit": "iter/sec",
            "range": "stddev: 0.000008121437624489314",
            "extra": "mean: 1.8478396845490734 msec\nrounds: 466"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 21.25457111675213,
            "unit": "iter/sec",
            "range": "stddev: 0.003023339646403054",
            "extra": "mean: 47.048702818182676 msec\nrounds: 22"
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
        "date": 1673356060101,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22723.788521889066,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012000212419142954",
            "extra": "mean: 44.00674645588844 usec\nrounds: 4303"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 618.1723833755955,
            "unit": "iter/sec",
            "range": "stddev: 0.000007591555202026592",
            "extra": "mean: 1.6176717480315033 msec\nrounds: 508"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 618.4703091610501,
            "unit": "iter/sec",
            "range": "stddev: 0.000021310981792729226",
            "extra": "mean: 1.6168924929581372 msec\nrounds: 497"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9528.802038750246,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016906933453933338",
            "extra": "mean: 104.94498636170171 usec\nrounds: 4326"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 608.7249103461933,
            "unit": "iter/sec",
            "range": "stddev: 0.000008389377321398063",
            "extra": "mean: 1.6427781794427985 msec\nrounds: 574"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 231001.12986727466,
            "unit": "iter/sec",
            "range": "stddev: 3.3537122540409693e-7",
            "extra": "mean: 4.328983155080521 usec\nrounds: 14307"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 622.8685426760453,
            "unit": "iter/sec",
            "range": "stddev: 0.000007576322228408236",
            "extra": "mean: 1.6054752030078059 msec\nrounds: 532"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 24.515870085198017,
            "unit": "iter/sec",
            "range": "stddev: 0.0024601033116258995",
            "extra": "mean: 40.78990452000198 msec\nrounds: 25"
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
        "date": 1673360920845,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22513.170401078034,
            "unit": "iter/sec",
            "range": "stddev: 0.000001452446647632586",
            "extra": "mean: 44.418444056733804 usec\nrounds: 4013"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 633.585151439366,
            "unit": "iter/sec",
            "range": "stddev: 0.00000795166779901301",
            "extra": "mean: 1.578319816568018 msec\nrounds: 507"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 628.0925509713943,
            "unit": "iter/sec",
            "range": "stddev: 0.000018536537713526947",
            "extra": "mean: 1.5921220502510685 msec\nrounds: 597"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9314.484537120414,
            "unit": "iter/sec",
            "range": "stddev: 0.000049626735027969976",
            "extra": "mean: 107.35967148957783 usec\nrounds: 4216"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 612.0014765176337,
            "unit": "iter/sec",
            "range": "stddev: 0.000014227154586802856",
            "extra": "mean: 1.6339829859400459 msec\nrounds: 569"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 229273.0027086334,
            "unit": "iter/sec",
            "range": "stddev: 3.906953366427e-7",
            "extra": "mean: 4.361612523873246 usec\nrounds: 13606"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 630.4147164085649,
            "unit": "iter/sec",
            "range": "stddev: 0.000011607527418222603",
            "extra": "mean: 1.5862573857681186 msec\nrounds: 534"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 24.647651956223385,
            "unit": "iter/sec",
            "range": "stddev: 0.003518269229302545",
            "extra": "mean: 40.57181600000263 msec\nrounds: 25"
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
        "date": 1673362069729,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22561.991286640718,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010744155855411422",
            "extra": "mean: 44.322328968902426 usec\nrounds: 4277"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 626.0210383183615,
            "unit": "iter/sec",
            "range": "stddev: 0.00000729982612465499",
            "extra": "mean: 1.5973904050992171 msec\nrounds: 353"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 624.9635973244945,
            "unit": "iter/sec",
            "range": "stddev: 0.000008777473829110484",
            "extra": "mean: 1.6000931962774443 msec\nrounds: 591"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8830.068587625628,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015197831378307233",
            "extra": "mean: 113.24940345326311 usec\nrounds: 4112"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 608.3316438304419,
            "unit": "iter/sec",
            "range": "stddev: 0.000022418552918149384",
            "extra": "mean: 1.643840181818203 msec\nrounds: 473"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 236692.73014668154,
            "unit": "iter/sec",
            "range": "stddev: 2.960502302117405e-7",
            "extra": "mean: 4.2248868369564505 usec\nrounds: 14837"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 610.1903043533428,
            "unit": "iter/sec",
            "range": "stddev: 0.00006127227044981622",
            "extra": "mean: 1.6388329884391775 msec\nrounds: 519"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 24.428191393753686,
            "unit": "iter/sec",
            "range": "stddev: 0.002264374620912098",
            "extra": "mean: 40.936309360000394 msec\nrounds: 25"
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
        "date": 1673942264753,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 20380.38115801499,
            "unit": "iter/sec",
            "range": "stddev: 0.000004565159885137766",
            "extra": "mean: 49.066795770241534 usec\nrounds: 3452"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 562.535561126813,
            "unit": "iter/sec",
            "range": "stddev: 0.00008199153590305019",
            "extra": "mean: 1.777665394160866 msec\nrounds: 411"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 561.7625275594289,
            "unit": "iter/sec",
            "range": "stddev: 0.00009371677454073657",
            "extra": "mean: 1.780111614679051 msec\nrounds: 545"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8355.301775236387,
            "unit": "iter/sec",
            "range": "stddev: 0.000007551071076476378",
            "extra": "mean: 119.684486198191 usec\nrounds: 3659"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 540.1465664653249,
            "unit": "iter/sec",
            "range": "stddev: 0.00007529459491674563",
            "extra": "mean: 1.851349359756035 msec\nrounds: 492"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 216329.6905344619,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010159221109082085",
            "extra": "mean: 4.622573986628513 usec\nrounds: 12063"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 562.2356189461694,
            "unit": "iter/sec",
            "range": "stddev: 0.00008254912444243722",
            "extra": "mean: 1.7786137453801976 msec\nrounds: 487"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 21.873593159437014,
            "unit": "iter/sec",
            "range": "stddev: 0.0037314331162619212",
            "extra": "mean: 45.71722591304419 msec\nrounds: 23"
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
        "date": 1674735618386,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 19094.14643993937,
            "unit": "iter/sec",
            "range": "stddev: 0.0000032697001252054247",
            "extra": "mean: 52.37207136467187 usec\nrounds: 3363"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 535.6557763076422,
            "unit": "iter/sec",
            "range": "stddev: 0.00002350601220469234",
            "extra": "mean: 1.8668705617125128 msec\nrounds: 397"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 534.0003156668436,
            "unit": "iter/sec",
            "range": "stddev: 0.00009650302155047092",
            "extra": "mean: 1.8726580690335923 msec\nrounds: 507"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7794.231076956092,
            "unit": "iter/sec",
            "range": "stddev: 0.000004279362002274287",
            "extra": "mean: 128.30001960764724 usec\nrounds: 2856"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 518.9626780300579,
            "unit": "iter/sec",
            "range": "stddev: 0.00003849704769775466",
            "extra": "mean: 1.9269208410052192 msec\nrounds: 478"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 204599.36156313412,
            "unit": "iter/sec",
            "range": "stddev: 4.791128007446788e-7",
            "extra": "mean: 4.887600784088594 usec\nrounds: 11991"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 524.8018149763658,
            "unit": "iter/sec",
            "range": "stddev: 0.0000266445499858444",
            "extra": "mean: 1.9054812149326017 msec\nrounds: 442"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.709656129829177,
            "unit": "iter/sec",
            "range": "stddev: 0.0041016181227924225",
            "extra": "mean: 48.286653999998045 msec\nrounds: 21"
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
        "date": 1675847248394,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16865.70220328581,
            "unit": "iter/sec",
            "range": "stddev: 0.00010630720005223834",
            "extra": "mean: 59.29192795810055 usec\nrounds: 2679"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 481.92798119236534,
            "unit": "iter/sec",
            "range": "stddev: 0.00025810164509148316",
            "extra": "mean: 2.074998835979275 msec\nrounds: 378"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 479.46427100305647,
            "unit": "iter/sec",
            "range": "stddev: 0.00030278354181180077",
            "extra": "mean: 2.0856611440680743 msec\nrounds: 236"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7322.020229127598,
            "unit": "iter/sec",
            "range": "stddev: 0.00003413477458307354",
            "extra": "mean: 136.57432903857844 usec\nrounds: 3027"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 483.06016757754725,
            "unit": "iter/sec",
            "range": "stddev: 0.0001762096132990704",
            "extra": "mean: 2.0701354968156562 msec\nrounds: 471"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 189988.40374661738,
            "unit": "iter/sec",
            "range": "stddev: 0.0000046954456628110635",
            "extra": "mean: 5.2634791401988625 usec\nrounds: 11026"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 492.6220073696173,
            "unit": "iter/sec",
            "range": "stddev: 0.000330814422442089",
            "extra": "mean: 2.0299539708742524 msec\nrounds: 412"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.223263359719237,
            "unit": "iter/sec",
            "range": "stddev: 0.0049384988535401755",
            "extra": "mean: 52.02030379999982 msec\nrounds: 20"
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
        "date": 1683890648642,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 19089.186718268305,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024947360010318036",
            "extra": "mean: 52.385678591692034 usec\nrounds: 3522"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 531.5722108917511,
            "unit": "iter/sec",
            "range": "stddev: 0.000024299371012442654",
            "extra": "mean: 1.8812119586206872 msec\nrounds: 435"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 530.0647687081826,
            "unit": "iter/sec",
            "range": "stddev: 0.0003499766552074092",
            "extra": "mean: 1.8865619053254445 msec\nrounds: 507"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8167.463248390177,
            "unit": "iter/sec",
            "range": "stddev: 0.000004113679147146571",
            "extra": "mean: 122.43703700743336 usec\nrounds: 3756"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 518.1653024647829,
            "unit": "iter/sec",
            "range": "stddev: 0.00005751267779763922",
            "extra": "mean: 1.929886071574553 msec\nrounds: 489"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 204270.57032796214,
            "unit": "iter/sec",
            "range": "stddev: 6.269733571130397e-7",
            "extra": "mean: 4.895467802309809 usec\nrounds: 12563"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 533.6840237128079,
            "unit": "iter/sec",
            "range": "stddev: 0.000028635890531536255",
            "extra": "mean: 1.8737679142857973 msec\nrounds: 455"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.758023538451877,
            "unit": "iter/sec",
            "range": "stddev: 0.003414734305187821",
            "extra": "mean: 48.17414327272603 msec\nrounds: 22"
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
        "date": 1736290849675,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 26437.09871461368,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020856719446452118",
            "extra": "mean: 37.82563324345528 usec\nrounds: 4428"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 749.0573854378207,
            "unit": "iter/sec",
            "range": "stddev: 0.000024758334829359198",
            "extra": "mean: 1.335011201332064 msec\nrounds: 601"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 749.6784739114621,
            "unit": "iter/sec",
            "range": "stddev: 0.000028021978880885575",
            "extra": "mean: 1.333905180420188 msec\nrounds: 715"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 11495.03080275527,
            "unit": "iter/sec",
            "range": "stddev: 0.0000035706384469908677",
            "extra": "mean: 86.99411225242717 usec\nrounds: 5256"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 727.1670797816611,
            "unit": "iter/sec",
            "range": "stddev: 0.00005948057504686131",
            "extra": "mean: 1.3751997688072728 msec\nrounds: 545"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 276318.65603805694,
            "unit": "iter/sec",
            "range": "stddev: 4.501361316835e-7",
            "extra": "mean: 3.6190100745939917 usec\nrounds: 16278"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 750.4489100528268,
            "unit": "iter/sec",
            "range": "stddev: 0.000024009705366601",
            "extra": "mean: 1.3325357484090508 msec\nrounds: 628"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 29.250810873076276,
            "unit": "iter/sec",
            "range": "stddev: 0.0021385239863231684",
            "extra": "mean: 34.18708644827496 msec\nrounds: 29"
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
        "date": 1738051128548,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 21999.66452455925,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024543809695443695",
            "extra": "mean: 45.45523859619102 usec\nrounds: 3793"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 634.0793115733203,
            "unit": "iter/sec",
            "range": "stddev: 0.00010682155115969849",
            "extra": "mean: 1.57708977685888 msec\nrounds: 484"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 644.5517892730126,
            "unit": "iter/sec",
            "range": "stddev: 0.00004184526338910344",
            "extra": "mean: 1.5514657109677656 msec\nrounds: 602"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9626.382381143987,
            "unit": "iter/sec",
            "range": "stddev: 0.000006020439129061977",
            "extra": "mean: 103.88118406336994 usec\nrounds: 3928"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 628.7373547018412,
            "unit": "iter/sec",
            "range": "stddev: 0.000022916320506761175",
            "extra": "mean: 1.5904892440726992 msec\nrounds: 590"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 171695.91061737313,
            "unit": "iter/sec",
            "range": "stddev: 5.16634970883513e-7",
            "extra": "mean: 5.824250539248514 usec\nrounds: 14852"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 634.8308601100468,
            "unit": "iter/sec",
            "range": "stddev: 0.00004481349157487748",
            "extra": "mean: 1.5752227291323735 msec\nrounds: 539"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 25.112578483945203,
            "unit": "iter/sec",
            "range": "stddev: 0.002564494007354953",
            "extra": "mean: 39.82068191999133 msec\nrounds: 25"
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
        "date": 1738051820906,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 21921.77381847729,
            "unit": "iter/sec",
            "range": "stddev: 0.000002296099932598706",
            "extra": "mean: 45.61674654069856 usec\nrounds: 3685"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 633.4553154450545,
            "unit": "iter/sec",
            "range": "stddev: 0.000017417214880851905",
            "extra": "mean: 1.5786433164546385 msec\nrounds: 474"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 636.788196103915,
            "unit": "iter/sec",
            "range": "stddev: 0.000020506421912276112",
            "extra": "mean: 1.5703808677961328 msec\nrounds: 590"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9740.790641367896,
            "unit": "iter/sec",
            "range": "stddev: 0.000008097485121817667",
            "extra": "mean: 102.66107103802514 usec\nrounds: 4392"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 621.1191390558281,
            "unit": "iter/sec",
            "range": "stddev: 0.000020450455865043673",
            "extra": "mean: 1.6099970796586849 msec\nrounds: 590"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 168081.71274399923,
            "unit": "iter/sec",
            "range": "stddev: 5.61062716223095e-7",
            "extra": "mean: 5.949487208778466 usec\nrounds: 15049"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 635.4757678149936,
            "unit": "iter/sec",
            "range": "stddev: 0.000018528934852817906",
            "extra": "mean: 1.5736241264373916 msec\nrounds: 522"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 24.82036351261304,
            "unit": "iter/sec",
            "range": "stddev: 0.002029167301065224",
            "extra": "mean: 40.28949855999599 msec\nrounds: 25"
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
        "date": 1738052942032,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22187.059827812678,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024063463661878304",
            "extra": "mean: 45.07131669363626 usec\nrounds: 5589"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 637.4221296019867,
            "unit": "iter/sec",
            "range": "stddev: 0.00001656452203443863",
            "extra": "mean: 1.5688190816726284 msec\nrounds: 502"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 640.2154473877013,
            "unit": "iter/sec",
            "range": "stddev: 0.000044820468049448226",
            "extra": "mean: 1.5619741824105358 msec\nrounds: 614"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9610.453869462195,
            "unit": "iter/sec",
            "range": "stddev: 0.000003315287862740707",
            "extra": "mean: 104.05335830990887 usec\nrounds: 4711"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 621.8278002886935,
            "unit": "iter/sec",
            "range": "stddev: 0.00003124460618506154",
            "extra": "mean: 1.6081622589658002 msec\nrounds: 502"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 170446.5571251579,
            "unit": "iter/sec",
            "range": "stddev: 5.72118626114152e-7",
            "extra": "mean: 5.8669416200979985 usec\nrounds: 16581"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 632.4525694026385,
            "unit": "iter/sec",
            "range": "stddev: 0.000018874849830177014",
            "extra": "mean: 1.5811462366964781 msec\nrounds: 545"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 25.02030307521271,
            "unit": "iter/sec",
            "range": "stddev: 0.0023952723451848164",
            "extra": "mean: 39.96754144000306 msec\nrounds: 25"
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
        "date": 1738053310302,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22456.121328636254,
            "unit": "iter/sec",
            "range": "stddev: 0.000002410359202080564",
            "extra": "mean: 44.53128772174876 usec\nrounds: 4056"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 629.478288164717,
            "unit": "iter/sec",
            "range": "stddev: 0.0000193587795261231",
            "extra": "mean: 1.5886171434372454 msec\nrounds: 488"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 631.8925865034672,
            "unit": "iter/sec",
            "range": "stddev: 0.00006421531290722485",
            "extra": "mean: 1.582547447713272 msec\nrounds: 612"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9691.415829819674,
            "unit": "iter/sec",
            "range": "stddev: 0.0000037585760404816045",
            "extra": "mean: 103.18409792334818 usec\nrounds: 4432"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 621.9886988792745,
            "unit": "iter/sec",
            "range": "stddev: 0.000018330477481036682",
            "extra": "mean: 1.6077462529493578 msec\nrounds: 593"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 169416.27944243592,
            "unit": "iter/sec",
            "range": "stddev: 5.940470869650762e-7",
            "extra": "mean: 5.902620475972493 usec\nrounds: 15003"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 623.7190535621626,
            "unit": "iter/sec",
            "range": "stddev: 0.00018422644909148796",
            "extra": "mean: 1.6032859574977465 msec\nrounds: 400"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 25.074712437632467,
            "unit": "iter/sec",
            "range": "stddev: 0.0021452512674462977",
            "extra": "mean: 39.880816280037834 msec\nrounds: 25"
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
        "date": 1738150752361,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 21730.096568593977,
            "unit": "iter/sec",
            "range": "stddev: 0.000005711021874962156",
            "extra": "mean: 46.01912360782039 usec\nrounds: 3681"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 623.9209534894981,
            "unit": "iter/sec",
            "range": "stddev: 0.0001804216227628287",
            "extra": "mean: 1.602767136457186 msec\nrounds: 469"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 639.5901145270128,
            "unit": "iter/sec",
            "range": "stddev: 0.00007006042737187162",
            "extra": "mean: 1.5635013382586693 msec\nrounds: 609"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9776.088673897719,
            "unit": "iter/sec",
            "range": "stddev: 0.000004057566690473221",
            "extra": "mean: 102.29039786331037 usec\nrounds: 4401"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 632.5968030493163,
            "unit": "iter/sec",
            "range": "stddev: 0.000019302854408859296",
            "extra": "mean: 1.5807857314164158 msec\nrounds: 592"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 172759.0865530388,
            "unit": "iter/sec",
            "range": "stddev: 6.444573389365844e-7",
            "extra": "mean: 5.788407544589499 usec\nrounds: 11027"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 636.418584357592,
            "unit": "iter/sec",
            "range": "stddev: 0.0000293643329086905",
            "extra": "mean: 1.5712928952403413 msec\nrounds: 525"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 25.042656071109523,
            "unit": "iter/sec",
            "range": "stddev: 0.0025858305897618547",
            "extra": "mean: 39.93186653845599 msec\nrounds: 26"
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
        "date": 1738150794123,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22188.821970593573,
            "unit": "iter/sec",
            "range": "stddev: 0.0000032874452512420583",
            "extra": "mean: 45.067737319506236 usec\nrounds: 3727"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 628.2778499432603,
            "unit": "iter/sec",
            "range": "stddev: 0.000018134340374424192",
            "extra": "mean: 1.5916524831972187 msec\nrounds: 476"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 635.1218731980331,
            "unit": "iter/sec",
            "range": "stddev: 0.000016917548134694254",
            "extra": "mean: 1.5745009614685348 msec\nrounds: 597"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9703.52441103051,
            "unit": "iter/sec",
            "range": "stddev: 0.000006384060510211528",
            "extra": "mean: 103.05533923975572 usec\nrounds: 4401"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 614.0218336661919,
            "unit": "iter/sec",
            "range": "stddev: 0.000016656755064529656",
            "extra": "mean: 1.6286065823249567 msec\nrounds: 577"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 168776.39381273,
            "unit": "iter/sec",
            "range": "stddev: 5.757033371954239e-7",
            "extra": "mean: 5.924999209958086 usec\nrounds: 15205"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 624.9008990305971,
            "unit": "iter/sec",
            "range": "stddev: 0.00003207614003511898",
            "extra": "mean: 1.6002537387148756 msec\nrounds: 532"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 24.794804243799035,
            "unit": "iter/sec",
            "range": "stddev: 0.0026195773213650198",
            "extra": "mean: 40.33103025002068 msec\nrounds: 24"
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
        "date": 1738179397777,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22744.600383582634,
            "unit": "iter/sec",
            "range": "stddev: 0.00000226732474353294",
            "extra": "mean: 43.966479214196866 usec\nrounds: 3512"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 627.6163131172912,
            "unit": "iter/sec",
            "range": "stddev: 0.0000249755135591756",
            "extra": "mean: 1.5933301590475335 msec\nrounds: 503"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 626.4467070332931,
            "unit": "iter/sec",
            "range": "stddev: 0.00002557583866377503",
            "extra": "mean: 1.596304982966179 msec\nrounds: 587"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9590.588228244533,
            "unit": "iter/sec",
            "range": "stddev: 0.000006079750726950031",
            "extra": "mean: 104.26889114631925 usec\nrounds: 4382"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 605.9214060324892,
            "unit": "iter/sec",
            "range": "stddev: 0.00013583675911623785",
            "extra": "mean: 1.6503790591388685 msec\nrounds: 558"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 169386.62761982458,
            "unit": "iter/sec",
            "range": "stddev: 7.844952870748118e-7",
            "extra": "mean: 5.903653753851361 usec\nrounds: 14585"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 629.608524480953,
            "unit": "iter/sec",
            "range": "stddev: 0.00002224699689136348",
            "extra": "mean: 1.588288533457193 msec\nrounds: 523"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 24.0800928005204,
            "unit": "iter/sec",
            "range": "stddev: 0.006765281309726588",
            "extra": "mean: 41.52807915999347 msec\nrounds: 25"
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
        "date": 1738179507426,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22392.44153165074,
            "unit": "iter/sec",
            "range": "stddev: 0.0000023133288611378414",
            "extra": "mean: 44.65792613934231 usec\nrounds: 3642"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 623.5901760636524,
            "unit": "iter/sec",
            "range": "stddev: 0.000019925854781192015",
            "extra": "mean: 1.6036173089069412 msec\nrounds: 505"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 635.8394840294819,
            "unit": "iter/sec",
            "range": "stddev: 0.000028518118289529753",
            "extra": "mean: 1.5727239737657328 msec\nrounds: 610"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9581.218578938206,
            "unit": "iter/sec",
            "range": "stddev: 0.000003934945349723061",
            "extra": "mean: 104.37085760659271 usec\nrounds: 4305"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 627.3113020875437,
            "unit": "iter/sec",
            "range": "stddev: 0.00001978749334325741",
            "extra": "mean: 1.594104867347737 msec\nrounds: 588"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 170516.56969104096,
            "unit": "iter/sec",
            "range": "stddev: 6.070098058120068e-7",
            "extra": "mean: 5.864532706773895 usec\nrounds: 13606"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 639.773669758089,
            "unit": "iter/sec",
            "range": "stddev: 0.00011351488522443196",
            "extra": "mean: 1.5630527595456059 msec\nrounds: 524"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 25.13073780643704,
            "unit": "iter/sec",
            "range": "stddev: 0.002508474790102786",
            "extra": "mean: 39.791907730773346 msec\nrounds: 26"
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
        "date": 1738746157060,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22381.15615628821,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019192964996748783",
            "extra": "mean: 44.68044425484427 usec\nrounds: 3552"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 623.2256175491178,
            "unit": "iter/sec",
            "range": "stddev: 0.000036822068311672136",
            "extra": "mean: 1.604555351772246 msec\nrounds: 506"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 629.9305899405803,
            "unit": "iter/sec",
            "range": "stddev: 0.000023875440122374907",
            "extra": "mean: 1.5874764870433222 msec\nrounds: 579"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9828.875717317267,
            "unit": "iter/sec",
            "range": "stddev: 0.000003079348475905756",
            "extra": "mean: 101.74103618363219 usec\nrounds: 4505"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 617.1354381172556,
            "unit": "iter/sec",
            "range": "stddev: 0.000024283265260663",
            "extra": "mean: 1.6203898499991831 msec\nrounds: 580"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 160990.50473726494,
            "unit": "iter/sec",
            "range": "stddev: 5.615172021080825e-7",
            "extra": "mean: 6.211546461277273 usec\nrounds: 14894"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 631.2627031697293,
            "unit": "iter/sec",
            "range": "stddev: 0.00002163156376755453",
            "extra": "mean: 1.5841265371433282 msec\nrounds: 525"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 25.095757379515074,
            "unit": "iter/sec",
            "range": "stddev: 0.0025308261642899674",
            "extra": "mean: 39.84737280000445 msec\nrounds: 25"
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
        "date": 1738746283408,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 22505.463569824456,
            "unit": "iter/sec",
            "range": "stddev: 0.000002484110614842564",
            "extra": "mean: 44.433654827746345 usec\nrounds: 3575"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 632.3595987019984,
            "unit": "iter/sec",
            "range": "stddev: 0.000020036924667983237",
            "extra": "mean: 1.5813786997977608 msec\nrounds: 503"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 630.4900059364908,
            "unit": "iter/sec",
            "range": "stddev: 0.0000656712845978336",
            "extra": "mean: 1.5860679639396695 msec\nrounds: 610"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 9593.185625893286,
            "unit": "iter/sec",
            "range": "stddev: 0.000005913864948316634",
            "extra": "mean: 104.24065988057887 usec\nrounds: 4225"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 621.3338052791664,
            "unit": "iter/sec",
            "range": "stddev: 0.00002349564432467371",
            "extra": "mean: 1.6094408376037068 msec\nrounds: 585"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 172736.05669856595,
            "unit": "iter/sec",
            "range": "stddev: 6.805786572062818e-7",
            "extra": "mean: 5.7891792779839575 usec\nrounds: 13638"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 632.8449257940206,
            "unit": "iter/sec",
            "range": "stddev: 0.00002274809221268123",
            "extra": "mean: 1.5801659446748597 msec\nrounds: 488"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 24.96070174635746,
            "unit": "iter/sec",
            "range": "stddev: 0.0022833050321737877",
            "extra": "mean: 40.06297620001533 msec\nrounds: 25"
          }
        ]
      }
    ]
  }
}