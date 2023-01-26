window.BENCHMARK_DATA = {
  "lastUpdate": 1674735619349,
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
      }
    ]
  }
}