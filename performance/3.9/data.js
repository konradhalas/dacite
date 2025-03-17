window.BENCHMARK_DATA = {
  "lastUpdate": 1742225126124,
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
        "date": 1671725121407,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2142.6345437031423,
            "unit": "iter/sec",
            "range": "stddev: 0.0002760057094735483",
            "extra": "mean: 466.7151488520704 usec\nrounds: 1263"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 1631.0507873159418,
            "unit": "iter/sec",
            "range": "stddev: 0.00014562930487661303",
            "extra": "mean: 613.1016935687211 usec\nrounds: 1586"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 148.45903923662752,
            "unit": "iter/sec",
            "range": "stddev: 0.00029605172044947826",
            "extra": "mean: 6.73586468794338 msec\nrounds: 141"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1233.7321445546418,
            "unit": "iter/sec",
            "range": "stddev: 0.00019559559726171633",
            "extra": "mean: 810.5487114149761 usec\nrounds: 1244"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 1854.4907149468913,
            "unit": "iter/sec",
            "range": "stddev: 0.00010641838641904423",
            "extra": "mean: 539.2316024772537 usec\nrounds: 1776"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 16087.18393259665,
            "unit": "iter/sec",
            "range": "stddev: 0.00004034545485480057",
            "extra": "mean: 62.16128342846571 usec\nrounds: 9124"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 1407.820439972463,
            "unit": "iter/sec",
            "range": "stddev: 0.0000925158966729005",
            "extra": "mean: 710.3178584476015 usec\nrounds: 1314"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 66.9533196173809,
            "unit": "iter/sec",
            "range": "stddev: 0.0007150359785191927",
            "extra": "mean: 14.93577922222101 msec\nrounds: 63"
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
        "date": 1671801429934,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2623.1421820818773,
            "unit": "iter/sec",
            "range": "stddev: 0.00030969966589247644",
            "extra": "mean: 381.22218720387554 usec\nrounds: 1688"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 61.5328925711401,
            "unit": "iter/sec",
            "range": "stddev: 0.0005154380675382599",
            "extra": "mean: 16.251470688524332 msec\nrounds: 61"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 61.3211745375804,
            "unit": "iter/sec",
            "range": "stddev: 0.0004342557622369309",
            "extra": "mean: 16.307580661018726 msec\nrounds: 59"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1457.534704988466,
            "unit": "iter/sec",
            "range": "stddev: 0.000041186015656963954",
            "extra": "mean: 686.0900097798449 usec\nrounds: 1227"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 60.34281974065486,
            "unit": "iter/sec",
            "range": "stddev: 0.00031145511782841795",
            "extra": "mean: 16.571979968749595 msec\nrounds: 64"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 20152.546098190833,
            "unit": "iter/sec",
            "range": "stddev: 0.00000475537379734313",
            "extra": "mean: 49.62152152525152 usec\nrounds: 9756"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 60.81220661530606,
            "unit": "iter/sec",
            "range": "stddev: 0.00047079489505880384",
            "extra": "mean: 16.444067000001052 msec\nrounds: 59"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.421872511904388,
            "unit": "iter/sec",
            "range": "stddev: 0.0061868568270319595",
            "extra": "mean: 412.90365000000406 msec\nrounds: 5"
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
        "date": 1672821243941,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2225.236108861533,
            "unit": "iter/sec",
            "range": "stddev: 0.00028444387345159973",
            "extra": "mean: 449.3905145695377 usec\nrounds: 1510"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 56.738807664974786,
            "unit": "iter/sec",
            "range": "stddev: 0.0010364900387559947",
            "extra": "mean: 17.62462133333313 msec\nrounds: 54"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 57.0329295145245,
            "unit": "iter/sec",
            "range": "stddev: 0.0008323708439771847",
            "extra": "mean: 17.53373022413887 msec\nrounds: 58"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1310.0254136319413,
            "unit": "iter/sec",
            "range": "stddev: 0.00042426126700599267",
            "extra": "mean: 763.3439699674066 usec\nrounds: 1232"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 54.66219593775678,
            "unit": "iter/sec",
            "range": "stddev: 0.0017487910846503093",
            "extra": "mean: 18.29417905454601 msec\nrounds: 55"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 17463.18253570088,
            "unit": "iter/sec",
            "range": "stddev: 0.000019868226718277253",
            "extra": "mean: 57.263330893761704 usec\nrounds: 9018"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 55.604809176435225,
            "unit": "iter/sec",
            "range": "stddev: 0.0010069880081927539",
            "extra": "mean: 17.984055962263607 msec\nrounds: 53"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.252643024934861,
            "unit": "iter/sec",
            "range": "stddev: 0.00791752861381728",
            "extra": "mean: 443.9229779999948 msec\nrounds: 5"
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
        "date": 1672828163475,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3293.703461895206,
            "unit": "iter/sec",
            "range": "stddev: 0.000010050981969252675",
            "extra": "mean: 303.60960285860017 usec\nrounds: 1959"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 77.44821225297261,
            "unit": "iter/sec",
            "range": "stddev: 0.000022730892018944293",
            "extra": "mean: 12.911853881580308 msec\nrounds: 76"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 77.46306883980284,
            "unit": "iter/sec",
            "range": "stddev: 0.00010171561845913724",
            "extra": "mean: 12.909377526315742 msec\nrounds: 76"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1802.83608612847,
            "unit": "iter/sec",
            "range": "stddev: 0.0000043228797303756054",
            "extra": "mean: 554.6815973422556 usec\nrounds: 1505"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 77.12437450685826,
            "unit": "iter/sec",
            "range": "stddev: 0.000022615733983005863",
            "extra": "mean: 12.966069500000618 msec\nrounds: 76"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 27441.177951579197,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011625960888835084",
            "extra": "mean: 36.44158431407466 usec\nrounds: 9346"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 77.20539438885191,
            "unit": "iter/sec",
            "range": "stddev: 0.00002096056148141801",
            "extra": "mean: 12.95246281578992 msec\nrounds: 76"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.033951054890166,
            "unit": "iter/sec",
            "range": "stddev: 0.006575207993930999",
            "extra": "mean: 329.60320780000245 msec\nrounds: 5"
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
        "date": 1672928547248,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3900.8305815748145,
            "unit": "iter/sec",
            "range": "stddev: 0.0000050352299979007805",
            "extra": "mean: 256.35566043893334 usec\nrounds: 2141"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 104.132012164512,
            "unit": "iter/sec",
            "range": "stddev: 0.000038780367065031885",
            "extra": "mean: 9.603194821782175 msec\nrounds: 101"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 104.39636198073087,
            "unit": "iter/sec",
            "range": "stddev: 0.00002148708822377896",
            "extra": "mean: 9.57887785576835 msec\nrounds: 104"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1881.0285148902908,
            "unit": "iter/sec",
            "range": "stddev: 0.000008499317583641149",
            "extra": "mean: 531.624051461189 usec\nrounds: 1574"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 103.18891610062562,
            "unit": "iter/sec",
            "range": "stddev: 0.0002703411150210621",
            "extra": "mean: 9.690963310680003 msec\nrounds: 103"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 27523.810066317674,
            "unit": "iter/sec",
            "range": "stddev: 0.000001144016354867748",
            "extra": "mean: 36.3321792146703 usec\nrounds: 9882"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 103.76711415474075,
            "unit": "iter/sec",
            "range": "stddev: 0.000038093393852929406",
            "extra": "mean: 9.636964544554731 msec\nrounds: 101"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 4.007046147021087,
            "unit": "iter/sec",
            "range": "stddev: 0.017891622554876488",
            "extra": "mean: 249.56039020000276 msec\nrounds: 5"
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
        "date": 1673347535402,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 11353.70123091699,
            "unit": "iter/sec",
            "range": "stddev: 0.000001915541567915565",
            "extra": "mean: 88.07700499260312 usec\nrounds: 3405"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 322.3144227470185,
            "unit": "iter/sec",
            "range": "stddev: 0.00000993836765829891",
            "extra": "mean: 3.1025605105635945 msec\nrounds: 284"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 321.9241063070718,
            "unit": "iter/sec",
            "range": "stddev: 0.000008911300776365768",
            "extra": "mean: 3.1063222057876465 msec\nrounds: 311"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6156.751087922349,
            "unit": "iter/sec",
            "range": "stddev: 0.0000016511936077623794",
            "extra": "mean: 162.42332777781 usec\nrounds: 3420"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 316.655627886764,
            "unit": "iter/sec",
            "range": "stddev: 0.000015567512181019644",
            "extra": "mean: 3.158004822695271 msec\nrounds: 282"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 80510.39947277332,
            "unit": "iter/sec",
            "range": "stddev: 5.626529873479782e-7",
            "extra": "mean: 12.420755660741392 usec\nrounds: 10776"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 320.93681115490335,
            "unit": "iter/sec",
            "range": "stddev: 0.000009290774165074016",
            "extra": "mean: 3.1158781580756094 msec\nrounds: 291"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 12.762232361006173,
            "unit": "iter/sec",
            "range": "stddev: 0.0002849171983280174",
            "extra": "mean: 78.35619754545515 msec\nrounds: 11"
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
        "date": 1673350839042,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16109.182247739636,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017211558415099182",
            "extra": "mean: 62.07639746209434 usec\nrounds: 3467"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 450.98588211473543,
            "unit": "iter/sec",
            "range": "stddev: 0.000010051372200515059",
            "extra": "mean: 2.2173643115187134 msec\nrounds: 382"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 450.32129351113605,
            "unit": "iter/sec",
            "range": "stddev: 0.000010097000613258191",
            "extra": "mean: 2.22063671962532 msec\nrounds: 428"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6465.169903169155,
            "unit": "iter/sec",
            "range": "stddev: 0.0000061718214661974346",
            "extra": "mean: 154.67497606053803 usec\nrounds: 3300"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 433.834656210246,
            "unit": "iter/sec",
            "range": "stddev: 0.00010760567228366275",
            "extra": "mean: 2.3050256259734527 msec\nrounds: 385"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 130198.54620391216,
            "unit": "iter/sec",
            "range": "stddev: 6.359387095081777e-7",
            "extra": "mean: 7.6805773117761005 usec\nrounds: 10684"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 446.57555736778755,
            "unit": "iter/sec",
            "range": "stddev: 0.000019296031552792114",
            "extra": "mean: 2.2392627260977185 msec\nrounds: 387"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.842668874349187,
            "unit": "iter/sec",
            "range": "stddev: 0.00011077355574559769",
            "extra": "mean: 56.045427230766514 msec\nrounds: 13"
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
        "date": 1673351446690,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18228.065219280215,
            "unit": "iter/sec",
            "range": "stddev: 0.00000142675154971576",
            "extra": "mean: 54.86045764979371 usec\nrounds: 4451"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 496.30374497184755,
            "unit": "iter/sec",
            "range": "stddev: 0.000006938844187956392",
            "extra": "mean: 2.0148951325296247 msec\nrounds: 415"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 495.8706778215742,
            "unit": "iter/sec",
            "range": "stddev: 0.000006605170995634312",
            "extra": "mean: 2.0166548350733966 msec\nrounds: 479"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6944.965999913275,
            "unit": "iter/sec",
            "range": "stddev: 0.0000017334707302447912",
            "extra": "mean: 143.98918583798502 usec\nrounds: 3686"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 486.8362114766459,
            "unit": "iter/sec",
            "range": "stddev: 0.0000072106264167937005",
            "extra": "mean: 2.0540789210540704 msec\nrounds: 456"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 174992.77853590352,
            "unit": "iter/sec",
            "range": "stddev: 3.1858230303676237e-7",
            "extra": "mean: 5.714521526925915 usec\nrounds: 11683"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 492.49857331207426,
            "unit": "iter/sec",
            "range": "stddev: 0.000010360321046067566",
            "extra": "mean: 2.0304627346937405 msec\nrounds: 392"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.73960173729935,
            "unit": "iter/sec",
            "range": "stddev: 0.00011284598084680339",
            "extra": "mean: 50.65958337499943 msec\nrounds: 16"
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
        "date": 1673356055748,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18452.3462763235,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013686434794043979",
            "extra": "mean: 54.193650228812146 usec\nrounds: 3934"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 517.7690843931988,
            "unit": "iter/sec",
            "range": "stddev: 0.0000075972322156425765",
            "extra": "mean: 1.9313628992969971 msec\nrounds: 427"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 518.0706305467387,
            "unit": "iter/sec",
            "range": "stddev: 0.000008031966194328685",
            "extra": "mean: 1.9302387378042718 msec\nrounds: 492"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6878.592412686793,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019673078685981323",
            "extra": "mean: 145.3785803845002 usec\nrounds: 3589"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 497.8770677416145,
            "unit": "iter/sec",
            "range": "stddev: 0.0003781847037966911",
            "extra": "mean: 2.0085279375007774 msec\nrounds: 480"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 202475.9945354875,
            "unit": "iter/sec",
            "range": "stddev: 4.108233703841791e-7",
            "extra": "mean: 4.938857084239348 usec\nrounds: 12196"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 515.0498527633205,
            "unit": "iter/sec",
            "range": "stddev: 0.000010995753743903847",
            "extra": "mean: 1.941559626965911 msec\nrounds: 445"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.462820843106314,
            "unit": "iter/sec",
            "range": "stddev: 0.00010766228061429657",
            "extra": "mean: 48.86911768750046 msec\nrounds: 16"
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
        "date": 1673360918144,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18797.2848442864,
            "unit": "iter/sec",
            "range": "stddev: 0.00002528453165514923",
            "extra": "mean: 53.199172555176695 usec\nrounds: 4387"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 521.8833894181752,
            "unit": "iter/sec",
            "range": "stddev: 0.000008736251844458683",
            "extra": "mean: 1.9161368617515417 msec\nrounds: 434"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 521.6483625266193,
            "unit": "iter/sec",
            "range": "stddev: 0.000007218810554604407",
            "extra": "mean: 1.9170001706829296 msec\nrounds: 498"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6890.984156194482,
            "unit": "iter/sec",
            "range": "stddev: 0.000001677167113099565",
            "extra": "mean: 145.1171526930699 usec\nrounds: 3602"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 509.8275335390154,
            "unit": "iter/sec",
            "range": "stddev: 0.000009091067145328632",
            "extra": "mean: 1.961447615546392 msec\nrounds: 476"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 206468.33329301054,
            "unit": "iter/sec",
            "range": "stddev: 3.2020174169012585e-7",
            "extra": "mean: 4.843357739420723 usec\nrounds: 13890"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 521.8477772520797,
            "unit": "iter/sec",
            "range": "stddev: 0.00000932735948187311",
            "extra": "mean: 1.9162676236080773 msec\nrounds: 449"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.84897673449068,
            "unit": "iter/sec",
            "range": "stddev: 0.00006400668533906701",
            "extra": "mean: 47.963984647058936 msec\nrounds: 17"
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
        "date": 1673362079291,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18828.322890067848,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015713689993211491",
            "extra": "mean: 53.11147497515625 usec\nrounds: 4036"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 518.5558874411792,
            "unit": "iter/sec",
            "range": "stddev: 0.000008344847710687689",
            "extra": "mean: 1.928432449074126 msec\nrounds: 432"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 520.6740237365233,
            "unit": "iter/sec",
            "range": "stddev: 0.000008360712275358652",
            "extra": "mean: 1.9205874585862384 msec\nrounds: 495"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6879.307931758189,
            "unit": "iter/sec",
            "range": "stddev: 0.000003129543134447355",
            "extra": "mean: 145.3634595107336 usec\nrounds: 3680"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 510.2623171374805,
            "unit": "iter/sec",
            "range": "stddev: 0.000010189916736096301",
            "extra": "mean: 1.9597763080172133 msec\nrounds: 474"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 211998.11386191877,
            "unit": "iter/sec",
            "range": "stddev: 4.923906090805295e-7",
            "extra": "mean: 4.717023098853287 usec\nrounds: 13334"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 514.8812930868676,
            "unit": "iter/sec",
            "range": "stddev: 0.00007207061659072143",
            "extra": "mean: 1.942195246606651 msec\nrounds: 442"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.37129028754031,
            "unit": "iter/sec",
            "range": "stddev: 0.0017489749902607318",
            "extra": "mean: 49.08869226666658 msec\nrounds: 15"
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
        "date": 1673942262084,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 13026.078668280386,
            "unit": "iter/sec",
            "range": "stddev: 0.00009983030434734478",
            "extra": "mean: 76.76907421379892 usec\nrounds: 3180"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 400.79545898459406,
            "unit": "iter/sec",
            "range": "stddev: 0.00030183878910097317",
            "extra": "mean: 2.4950382485207707 msec\nrounds: 338"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 364.0531905215643,
            "unit": "iter/sec",
            "range": "stddev: 0.000410895276931876",
            "extra": "mean: 2.746851355889342 msec\nrounds: 399"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5111.754270040948,
            "unit": "iter/sec",
            "range": "stddev: 0.00006645110987263408",
            "extra": "mean: 195.62755703278154 usec\nrounds: 1955"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 372.1948847400614,
            "unit": "iter/sec",
            "range": "stddev: 0.000592743513268584",
            "extra": "mean: 2.686764490861807 msec\nrounds: 383"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 160489.56852889186,
            "unit": "iter/sec",
            "range": "stddev: 0.000011403491408093261",
            "extra": "mean: 6.230934565818692 usec\nrounds: 11737"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 387.90653655615785,
            "unit": "iter/sec",
            "range": "stddev: 0.0003063363744316663",
            "extra": "mean: 2.577940575268518 msec\nrounds: 372"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 15.524971414945202,
            "unit": "iter/sec",
            "range": "stddev: 0.0022077726130646388",
            "extra": "mean: 64.41235692307583 msec\nrounds: 13"
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
        "date": 1673955357779,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 19115.33770773539,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015080588102859963",
            "extra": "mean: 52.314011674265664 usec\nrounds: 4283"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 524.5706157070504,
            "unit": "iter/sec",
            "range": "stddev: 0.000011235972283036693",
            "extra": "mean: 1.906321036781931 msec\nrounds: 435"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 528.2089196114036,
            "unit": "iter/sec",
            "range": "stddev: 0.000007561843103116852",
            "extra": "mean: 1.8931902943549057 msec\nrounds: 496"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6776.004204599613,
            "unit": "iter/sec",
            "range": "stddev: 0.00019959035614474472",
            "extra": "mean: 147.57960145910047 usec\nrounds: 3701"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 516.1666385162869,
            "unit": "iter/sec",
            "range": "stddev: 0.000009182779208233518",
            "extra": "mean: 1.9373588399174435 msec\nrounds: 481"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 209525.88106465864,
            "unit": "iter/sec",
            "range": "stddev: 4.1243091772559186e-7",
            "extra": "mean: 4.772680085718886 usec\nrounds: 13513"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 523.8370133889306,
            "unit": "iter/sec",
            "range": "stddev: 0.00001606202313364277",
            "extra": "mean: 1.9089907250550378 msec\nrounds: 451"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.93724593691391,
            "unit": "iter/sec",
            "range": "stddev: 0.0008805048412211783",
            "extra": "mean: 47.7617735882314 msec\nrounds: 17"
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
        "date": 1674735626746,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14497.97791754299,
            "unit": "iter/sec",
            "range": "stddev: 0.00002219451485937732",
            "extra": "mean: 68.97513609742569 usec\nrounds: 2219"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 438.3557373704175,
            "unit": "iter/sec",
            "range": "stddev: 0.0002019655766147044",
            "extra": "mean: 2.2812522222219354 msec\nrounds: 369"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 430.3488218233872,
            "unit": "iter/sec",
            "range": "stddev: 0.0003002805438581301",
            "extra": "mean: 2.323696381375001 msec\nrounds: 451"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5658.074560796023,
            "unit": "iter/sec",
            "range": "stddev: 0.0000432327158003059",
            "extra": "mean: 176.73856879314647 usec\nrounds: 3198"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 430.1015330233115,
            "unit": "iter/sec",
            "range": "stddev: 0.00012119591635954622",
            "extra": "mean: 2.3250324010023933 msec\nrounds: 399"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 178273.65103104673,
            "unit": "iter/sec",
            "range": "stddev: 0.000001953598816616947",
            "extra": "mean: 5.609353901804861 usec\nrounds: 12738"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 431.83618113884467,
            "unit": "iter/sec",
            "range": "stddev: 0.00018712723168235032",
            "extra": "mean: 2.315692949494842 msec\nrounds: 396"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.479711910176388,
            "unit": "iter/sec",
            "range": "stddev: 0.0007333910144405657",
            "extra": "mean: 57.20918085714085 msec\nrounds: 14"
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
        "date": 1674735771826,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18117.85454361257,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015335844162170228",
            "extra": "mean: 55.19417310658059 usec\nrounds: 3934"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 510.3085735925597,
            "unit": "iter/sec",
            "range": "stddev: 0.000009965603716603441",
            "extra": "mean: 1.9595986658817524 msec\nrounds: 425"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 510.64061308813035,
            "unit": "iter/sec",
            "range": "stddev: 0.00000955057461833226",
            "extra": "mean: 1.958324454360257 msec\nrounds: 493"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6736.9779468345605,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018544083612688077",
            "extra": "mean: 148.434506969087 usec\nrounds: 3659"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 500.8364518705822,
            "unit": "iter/sec",
            "range": "stddev: 0.000010189923078241953",
            "extra": "mean: 1.9966597803835637 msec\nrounds: 469"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 202894.64138072386,
            "unit": "iter/sec",
            "range": "stddev: 4.667381077168399e-7",
            "extra": "mean: 4.928666391556094 usec\nrounds: 13333"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 506.6522940721908,
            "unit": "iter/sec",
            "range": "stddev: 0.00001786879178909897",
            "extra": "mean: 1.9737401995410961 msec\nrounds: 436"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.025876210653976,
            "unit": "iter/sec",
            "range": "stddev: 0.0002715931740288923",
            "extra": "mean: 49.93539306250128 msec\nrounds: 16"
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
        "date": 1675847234803,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15942.301503769753,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026262280780949583",
            "extra": "mean: 62.72620046506696 usec\nrounds: 3437"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 445.98988686715836,
            "unit": "iter/sec",
            "range": "stddev: 0.000027083321947078485",
            "extra": "mean: 2.2422033087442137 msec\nrounds: 366"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 448.6767648660124,
            "unit": "iter/sec",
            "range": "stddev: 0.00004842342185326214",
            "extra": "mean: 2.2287759882075204 msec\nrounds: 424"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5941.294240089074,
            "unit": "iter/sec",
            "range": "stddev: 0.000004933078024829801",
            "extra": "mean: 168.31349527388625 usec\nrounds: 3174"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 435.84460160999834,
            "unit": "iter/sec",
            "range": "stddev: 0.000042393617873178605",
            "extra": "mean: 2.2943957463417615 msec\nrounds: 410"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 175830.0399372396,
            "unit": "iter/sec",
            "range": "stddev: 0.000005502459117756143",
            "extra": "mean: 5.687310316012769 usec\nrounds: 11904"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 439.3200037117765,
            "unit": "iter/sec",
            "range": "stddev: 0.00005289168240519422",
            "extra": "mean: 2.2762450868412247 msec\nrounds: 380"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.60525732218124,
            "unit": "iter/sec",
            "range": "stddev: 0.0006945980439383886",
            "extra": "mean: 56.80121464286003 msec\nrounds: 14"
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
        "date": 1683890642975,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18209.023581330857,
            "unit": "iter/sec",
            "range": "stddev: 0.000001809064837363364",
            "extra": "mean: 54.91782662225056 usec\nrounds: 3899"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 516.8043389144697,
            "unit": "iter/sec",
            "range": "stddev: 0.00004627328384810919",
            "extra": "mean: 1.9349682746481325 msec\nrounds: 426"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 515.5245716501809,
            "unit": "iter/sec",
            "range": "stddev: 0.000010465304014782142",
            "extra": "mean: 1.9397717489954471 msec\nrounds: 498"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6846.103719649827,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019548256702108096",
            "extra": "mean: 146.06848522171518 usec\nrounds: 3654"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 503.7110630219314,
            "unit": "iter/sec",
            "range": "stddev: 0.000028509087134964955",
            "extra": "mean: 1.9852651121074547 msec\nrounds: 446"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 203311.10301293558,
            "unit": "iter/sec",
            "range": "stddev: 4.024432700851234e-7",
            "extra": "mean: 4.918570531469575 usec\nrounds: 12739"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 513.4448610964316,
            "unit": "iter/sec",
            "range": "stddev: 0.000009579998917082009",
            "extra": "mean: 1.9476288025642292 msec\nrounds: 390"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.22977141996853,
            "unit": "iter/sec",
            "range": "stddev: 0.003089848076636114",
            "extra": "mean: 49.432095857144176 msec\nrounds: 21"
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
        "date": 1736290847232,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 21243.21888720123,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027253817320823972",
            "extra": "mean: 47.07384532023475 usec\nrounds: 4338"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 598.4463457024401,
            "unit": "iter/sec",
            "range": "stddev: 0.000022511511032620783",
            "extra": "mean: 1.6709935772541598 msec\nrounds: 466"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 601.7150061999723,
            "unit": "iter/sec",
            "range": "stddev: 0.000034426578005790256",
            "extra": "mean: 1.6619163386257028 msec\nrounds: 567"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8045.4712526937765,
            "unit": "iter/sec",
            "range": "stddev: 0.000007268612829399952",
            "extra": "mean: 124.29352720204936 usec\nrounds: 4393"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 583.6289300654335,
            "unit": "iter/sec",
            "range": "stddev: 0.00005159466064413145",
            "extra": "mean: 1.7134174618243911 msec\nrounds: 537"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 228212.70221786885,
            "unit": "iter/sec",
            "range": "stddev: 5.145128783248947e-7",
            "extra": "mean: 4.381877039628256 usec\nrounds: 15444"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 601.2227725441684,
            "unit": "iter/sec",
            "range": "stddev: 0.00004544795641408586",
            "extra": "mean: 1.6632769842837842 msec\nrounds: 509"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 23.491725831443993,
            "unit": "iter/sec",
            "range": "stddev: 0.002183298882717451",
            "extra": "mean: 42.5681794166645 msec\nrounds: 24"
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
        "date": 1738051131297,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17379.388524236387,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026436817165693187",
            "extra": "mean: 57.53942370328233 usec\nrounds: 5223"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 494.95018263709494,
            "unit": "iter/sec",
            "range": "stddev: 0.000020436242686751987",
            "extra": "mean: 2.020405356094626 msec\nrounds: 410"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 498.99643069993124,
            "unit": "iter/sec",
            "range": "stddev: 0.00007059436917640385",
            "extra": "mean: 2.004022350615459 msec\nrounds: 482"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6866.644832566339,
            "unit": "iter/sec",
            "range": "stddev: 0.00000462633890100682",
            "extra": "mean: 145.63153102914458 usec\nrounds: 3819"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 487.9267763606804,
            "unit": "iter/sec",
            "range": "stddev: 0.000056390059130798166",
            "extra": "mean: 2.0494878503261114 msec\nrounds: 461"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 151717.63497089845,
            "unit": "iter/sec",
            "range": "stddev: 6.299828891709123e-7",
            "extra": "mean: 6.591191592142957 usec\nrounds: 16175"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 495.8606452312102,
            "unit": "iter/sec",
            "range": "stddev: 0.000020249921831762547",
            "extra": "mean: 2.016695637407803 msec\nrounds: 433"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.87679267170631,
            "unit": "iter/sec",
            "range": "stddev: 0.00021679344131399585",
            "extra": "mean: 50.3099275882398 msec\nrounds: 17"
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
        "date": 1738051821574,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17806.793487198065,
            "unit": "iter/sec",
            "range": "stddev: 0.000003251892137066257",
            "extra": "mean: 56.15834207988853 usec\nrounds: 3087"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 498.76759417318664,
            "unit": "iter/sec",
            "range": "stddev: 0.000025022879899531802",
            "extra": "mean: 2.0049418039231535 msec\nrounds: 408"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 502.0359171644226,
            "unit": "iter/sec",
            "range": "stddev: 0.00002239931032251634",
            "extra": "mean: 1.9918893565387839 msec\nrounds: 474"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6834.4218689191475,
            "unit": "iter/sec",
            "range": "stddev: 0.000004735419701462567",
            "extra": "mean: 146.3181552411467 usec\nrounds: 3472"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 492.76530322504914,
            "unit": "iter/sec",
            "range": "stddev: 0.000023388671818694856",
            "extra": "mean: 2.029363661473733 msec\nrounds: 449"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 151513.06808573013,
            "unit": "iter/sec",
            "range": "stddev: 6.611428211667487e-7",
            "extra": "mean: 6.60009075543354 usec\nrounds: 14203"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 497.12064562903765,
            "unit": "iter/sec",
            "range": "stddev: 0.000025944994089115706",
            "extra": "mean: 2.0115841270978354 msec\nrounds: 417"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.655357531251923,
            "unit": "iter/sec",
            "range": "stddev: 0.00026031762792298887",
            "extra": "mean: 50.87671381250658 msec\nrounds: 16"
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
        "date": 1738052951873,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17471.306822846207,
            "unit": "iter/sec",
            "range": "stddev: 0.00000310732043116956",
            "extra": "mean: 57.236703020541 usec\nrounds: 3310"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 498.70758881718393,
            "unit": "iter/sec",
            "range": "stddev: 0.00006759212633979098",
            "extra": "mean: 2.0051830419740813 msec\nrounds: 405"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 498.96532998468234,
            "unit": "iter/sec",
            "range": "stddev: 0.000027045861018716482",
            "extra": "mean: 2.0041472621568697 msec\nrounds: 473"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6679.9623026995405,
            "unit": "iter/sec",
            "range": "stddev: 0.000019071823341170308",
            "extra": "mean: 149.70144361381722 usec\nrounds: 2536"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 488.73251460934733,
            "unit": "iter/sec",
            "range": "stddev: 0.00006223655474706445",
            "extra": "mean: 2.04610900668092 msec\nrounds: 449"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 133046.92755671914,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028652130149446756",
            "extra": "mean: 7.51614500510499 usec\nrounds: 12910"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 496.32387555956285,
            "unit": "iter/sec",
            "range": "stddev: 0.00016853130318005723",
            "extra": "mean: 2.0148134096361683 msec\nrounds: 415"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.74323311971085,
            "unit": "iter/sec",
            "range": "stddev: 0.00105156617476572",
            "extra": "mean: 50.650265533340644 msec\nrounds: 15"
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
        "date": 1738053307965,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17378.07909313283,
            "unit": "iter/sec",
            "range": "stddev: 0.0000030528926802380846",
            "extra": "mean: 57.543759275164234 usec\nrounds: 3531"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 502.8506447060032,
            "unit": "iter/sec",
            "range": "stddev: 0.00004303196822597069",
            "extra": "mean: 1.988662062041623 msec\nrounds: 403"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 504.0534005500116,
            "unit": "iter/sec",
            "range": "stddev: 0.000023871414761766",
            "extra": "mean: 1.9839167812553642 msec\nrounds: 480"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6929.7092039569825,
            "unit": "iter/sec",
            "range": "stddev: 0.00000720728164339548",
            "extra": "mean: 144.30619966404694 usec\nrounds: 3581"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 496.88781314399864,
            "unit": "iter/sec",
            "range": "stddev: 0.000023068594473064633",
            "extra": "mean: 2.0125267184007165 msec\nrounds: 451"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 147473.28499542762,
            "unit": "iter/sec",
            "range": "stddev: 7.689647479054606e-7",
            "extra": "mean: 6.780889162610061 usec\nrounds: 14147"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 501.9414801538868,
            "unit": "iter/sec",
            "range": "stddev: 0.000040195321822267996",
            "extra": "mean: 1.9922641175091107 msec\nrounds: 417"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.951117555646572,
            "unit": "iter/sec",
            "range": "stddev: 0.0002508185328519327",
            "extra": "mean: 50.12250552936968 msec\nrounds: 17"
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
        "date": 1738150755248,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17749.161186937967,
            "unit": "iter/sec",
            "range": "stddev: 0.000006361277978409017",
            "extra": "mean: 56.34069066519741 usec\nrounds: 3695"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 499.3673861716985,
            "unit": "iter/sec",
            "range": "stddev: 0.00003171272535278219",
            "extra": "mean: 2.0025336609711393 msec\nrounds: 410"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 498.3794353324463,
            "unit": "iter/sec",
            "range": "stddev: 0.000022205867522429407",
            "extra": "mean: 2.0065033368259773 msec\nrounds: 478"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6885.352565283656,
            "unit": "iter/sec",
            "range": "stddev: 0.0000071437305260502205",
            "extra": "mean: 145.2358452989114 usec\nrounds: 3400"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 488.77992498398635,
            "unit": "iter/sec",
            "range": "stddev: 0.00003449672653771965",
            "extra": "mean: 2.045910539457533 msec\nrounds: 456"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 148470.00528429385,
            "unit": "iter/sec",
            "range": "stddev: 6.697585356196082e-7",
            "extra": "mean: 6.735367174569548 usec\nrounds: 14391"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 495.4754679426622,
            "unit": "iter/sec",
            "range": "stddev: 0.00002183251808897887",
            "extra": "mean: 2.0182633948603947 msec\nrounds: 428"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.775496788212088,
            "unit": "iter/sec",
            "range": "stddev: 0.00023041009815182332",
            "extra": "mean: 50.56762976473424 msec\nrounds: 17"
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
        "date": 1738150802325,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17794.77512787008,
            "unit": "iter/sec",
            "range": "stddev: 0.000004745891296790885",
            "extra": "mean: 56.196270692615016 usec\nrounds: 3576"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 495.46285159539315,
            "unit": "iter/sec",
            "range": "stddev: 0.00005605270148348116",
            "extra": "mean: 2.0183147874356155 msec\nrounds: 414"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 497.19729516914725,
            "unit": "iter/sec",
            "range": "stddev: 0.00004009583530593795",
            "extra": "mean: 2.0112740147948682 msec\nrounds: 473"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6842.640007556055,
            "unit": "iter/sec",
            "range": "stddev: 0.00000504824321352827",
            "extra": "mean: 146.1424243999012 usec\nrounds: 3631"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 487.5877773020584,
            "unit": "iter/sec",
            "range": "stddev: 0.00003491028681276213",
            "extra": "mean: 2.0509127721232945 msec\nrounds: 452"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 152440.58505280598,
            "unit": "iter/sec",
            "range": "stddev: 7.512010265710643e-7",
            "extra": "mean: 6.559932839759152 usec\nrounds: 13520"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 497.9574884511779,
            "unit": "iter/sec",
            "range": "stddev: 0.00002433917338722793",
            "extra": "mean: 2.00820355791887 msec\nrounds: 423"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.129705115505686,
            "unit": "iter/sec",
            "range": "stddev: 0.00026906938555805546",
            "extra": "mean: 49.677826588215204 msec\nrounds: 17"
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
        "date": 1738179401552,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17684.638745532084,
            "unit": "iter/sec",
            "range": "stddev: 0.000004478074707351139",
            "extra": "mean: 56.546249792783804 usec\nrounds: 3623"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 492.3167766016978,
            "unit": "iter/sec",
            "range": "stddev: 0.00022138122312213675",
            "extra": "mean: 2.0312125191074615 msec\nrounds: 314"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 499.5012485996006,
            "unit": "iter/sec",
            "range": "stddev: 0.000041887527593087796",
            "extra": "mean: 2.001996997612309 msec\nrounds: 419"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6874.127689883206,
            "unit": "iter/sec",
            "range": "stddev: 0.000006126217295380245",
            "extra": "mean: 145.47300328327046 usec\nrounds: 3654"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 493.20468035288206,
            "unit": "iter/sec",
            "range": "stddev: 0.000023397460874048804",
            "extra": "mean: 2.0275557792446572 msec\nrounds: 453"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 150904.3628519588,
            "unit": "iter/sec",
            "range": "stddev: 8.673503546498995e-7",
            "extra": "mean: 6.626713642341981 usec\nrounds: 13525"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 496.26953534214437,
            "unit": "iter/sec",
            "range": "stddev: 0.000033234889492235395",
            "extra": "mean: 2.015034026440022 msec\nrounds: 416"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.62641744743027,
            "unit": "iter/sec",
            "range": "stddev: 0.0006984481651907708",
            "extra": "mean: 50.95173394117998 msec\nrounds: 17"
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
        "date": 1738179501702,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17132.66707996046,
            "unit": "iter/sec",
            "range": "stddev: 0.0000032898863420616206",
            "extra": "mean: 58.36802847641091 usec\nrounds: 3582"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 489.22309687988275,
            "unit": "iter/sec",
            "range": "stddev: 0.000021015202653406027",
            "extra": "mean: 2.0440572131154444 msec\nrounds: 305"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 494.32871027255953,
            "unit": "iter/sec",
            "range": "stddev: 0.000022570156003792308",
            "extra": "mean: 2.022945419149592 msec\nrounds: 470"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6688.686316806529,
            "unit": "iter/sec",
            "range": "stddev: 0.000006141119291499308",
            "extra": "mean: 149.5061889039885 usec\nrounds: 3605"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 486.9461534399849,
            "unit": "iter/sec",
            "range": "stddev: 0.00007512335120137678",
            "extra": "mean: 2.053615154233368 msec\nrounds: 402"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 146611.23958307746,
            "unit": "iter/sec",
            "range": "stddev: 7.755555677266354e-7",
            "extra": "mean: 6.820759464579445 usec\nrounds: 13894"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 492.9772253312319,
            "unit": "iter/sec",
            "range": "stddev: 0.000022736140607461625",
            "extra": "mean: 2.0284912742735712 msec\nrounds: 412"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.296516982658556,
            "unit": "iter/sec",
            "range": "stddev: 0.00023011594436757776",
            "extra": "mean: 51.82282382352643 msec\nrounds: 17"
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
        "date": 1738746155955,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17753.518226655095,
            "unit": "iter/sec",
            "range": "stddev: 0.0000031103683624084606",
            "extra": "mean: 56.32686362405633 usec\nrounds: 3263"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 501.2886395699234,
            "unit": "iter/sec",
            "range": "stddev: 0.00003745709345435745",
            "extra": "mean: 1.9948586923053793 msec\nrounds: 286"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 502.69837956401733,
            "unit": "iter/sec",
            "range": "stddev: 0.00006484614728576436",
            "extra": "mean: 1.9892644190882114 msec\nrounds: 482"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6794.437225537987,
            "unit": "iter/sec",
            "range": "stddev: 0.000011069989392279598",
            "extra": "mean: 147.179224239697 usec\nrounds: 3581"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 497.1875944487554,
            "unit": "iter/sec",
            "range": "stddev: 0.00006641014104856139",
            "extra": "mean: 2.011313257139341 msec\nrounds: 455"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 148911.20878828858,
            "unit": "iter/sec",
            "range": "stddev: 7.248781089743542e-7",
            "extra": "mean: 6.715411204684593 usec\nrounds: 12923"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 499.1237412534143,
            "unit": "iter/sec",
            "range": "stddev: 0.00003461799283260732",
            "extra": "mean: 2.0035111884054446 msec\nrounds: 414"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.91743413574223,
            "unit": "iter/sec",
            "range": "stddev: 0.0003687924442127163",
            "extra": "mean: 50.20727033335485 msec\nrounds: 15"
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
        "date": 1738746289057,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17630.87147098111,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029187913311808165",
            "extra": "mean: 56.71869377789484 usec\nrounds: 3504"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 493.12433626007555,
            "unit": "iter/sec",
            "range": "stddev: 0.00003628331665516388",
            "extra": "mean: 2.0278861262134025 msec\nrounds: 309"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 494.9732383500509,
            "unit": "iter/sec",
            "range": "stddev: 0.000033643165414770155",
            "extra": "mean: 2.020311246186583 msec\nrounds: 459"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6829.869376535297,
            "unit": "iter/sec",
            "range": "stddev: 0.000005372880413069906",
            "extra": "mean: 146.415684527672 usec\nrounds: 3639"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 489.23294419879414,
            "unit": "iter/sec",
            "range": "stddev: 0.000041768559738333846",
            "extra": "mean: 2.044016070172211 msec\nrounds: 456"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 148569.06943445737,
            "unit": "iter/sec",
            "range": "stddev: 7.854368809292043e-7",
            "extra": "mean: 6.73087610904879 usec\nrounds: 12059"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 481.3588093713054,
            "unit": "iter/sec",
            "range": "stddev: 0.00022898015007086586",
            "extra": "mean: 2.077452371352844 msec\nrounds: 412"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.61830347184357,
            "unit": "iter/sec",
            "range": "stddev: 0.00047939130162348917",
            "extra": "mean: 50.97280717648252 msec\nrounds: 17"
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
        "date": 1738746680221,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17498.222703433283,
            "unit": "iter/sec",
            "range": "stddev: 0.0000068210232914314",
            "extra": "mean: 57.148661149671646 usec\nrounds: 3745"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 490.96856757590183,
            "unit": "iter/sec",
            "range": "stddev: 0.0002188493642516648",
            "extra": "mean: 2.036790267322773 msec\nrounds: 303"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 491.20414929468507,
            "unit": "iter/sec",
            "range": "stddev: 0.00002942972615806815",
            "extra": "mean: 2.035813421844847 msec\nrounds: 467"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6903.506633731523,
            "unit": "iter/sec",
            "range": "stddev: 0.000004469826400574972",
            "extra": "mean: 144.8539203415633 usec\nrounds: 3628"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 485.69509846817556,
            "unit": "iter/sec",
            "range": "stddev: 0.00007244083687527073",
            "extra": "mean: 2.058904862647123 msec\nrounds: 415"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 148983.77566095602,
            "unit": "iter/sec",
            "range": "stddev: 7.598167804299781e-7",
            "extra": "mean: 6.7121402687210105 usec\nrounds: 11371"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 494.2643840421562,
            "unit": "iter/sec",
            "range": "stddev: 0.00002251118101783333",
            "extra": "mean: 2.023208696167574 msec\nrounds: 418"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.811496238317314,
            "unit": "iter/sec",
            "range": "stddev: 0.00045041498885545135",
            "extra": "mean: 50.47574337499583 msec\nrounds: 16"
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
        "date": 1738747180754,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17782.431762637596,
            "unit": "iter/sec",
            "range": "stddev: 0.0000027807046876359223",
            "extra": "mean: 56.23527835495959 usec\nrounds: 5202"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 495.3235372469546,
            "unit": "iter/sec",
            "range": "stddev: 0.000185753863538204",
            "extra": "mean: 2.018882457228007 msec\nrounds: 339"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 500.2283114965561,
            "unit": "iter/sec",
            "range": "stddev: 0.00018640340273433646",
            "extra": "mean: 1.9990871708325622 msec\nrounds: 480"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6751.285269750135,
            "unit": "iter/sec",
            "range": "stddev: 0.00002277530347800504",
            "extra": "mean: 148.11994458012438 usec\nrounds: 2454"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 497.3068736836514,
            "unit": "iter/sec",
            "range": "stddev: 0.00011701119391659976",
            "extra": "mean: 2.010830842921595 msec\nrounds: 452"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 152697.80884925398,
            "unit": "iter/sec",
            "range": "stddev: 0.000001227005712902457",
            "extra": "mean: 6.5488824465531 usec\nrounds: 13815"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 478.3521443168732,
            "unit": "iter/sec",
            "range": "stddev: 0.00042345185807551655",
            "extra": "mean: 2.0905101228888263 msec\nrounds: 415"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.845817470499096,
            "unit": "iter/sec",
            "range": "stddev: 0.00040094906347472645",
            "extra": "mean: 50.38845094118722 msec\nrounds: 17"
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
          "id": "41780d123dc9c0018667b771d4e4762c01738071",
          "message": "Merge pull request #282 from avlonder/master - add generics support for pep604\n\nadd generics support for pep604",
          "timestamp": "2025-03-17T16:19:43+01:00",
          "tree_id": "a8f15d9ba452c95f87ae202bc776203217b08f19",
          "url": "https://github.com/konradhalas/dacite/commit/41780d123dc9c0018667b771d4e4762c01738071"
        },
        "date": 1742224818228,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17723.589427329935,
            "unit": "iter/sec",
            "range": "stddev: 0.0000041748966989870984",
            "extra": "mean: 56.42197953750785 usec\nrounds: 3763"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 494.79808155865607,
            "unit": "iter/sec",
            "range": "stddev: 0.00002295972959453733",
            "extra": "mean: 2.0210264293061018 msec\nrounds: 389"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 492.985887300296,
            "unit": "iter/sec",
            "range": "stddev: 0.00002692561372729302",
            "extra": "mean: 2.0284556328300387 msec\nrounds: 463"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6857.440364957345,
            "unit": "iter/sec",
            "range": "stddev: 0.000007797076646115897",
            "extra": "mean: 145.82700640171302 usec\nrounds: 3749"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 486.1672849009975,
            "unit": "iter/sec",
            "range": "stddev: 0.00007252625054395097",
            "extra": "mean: 2.056905166302251 msec\nrounds: 457"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 148667.38827588467,
            "unit": "iter/sec",
            "range": "stddev: 8.438811850703435e-7",
            "extra": "mean: 6.726424749887195 usec\nrounds: 14093"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 487.669784081199,
            "unit": "iter/sec",
            "range": "stddev: 0.00007084077960814588",
            "extra": "mean: 2.0505678896716226 msec\nrounds: 426"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.41178669886511,
            "unit": "iter/sec",
            "range": "stddev: 0.0021559989634400076",
            "extra": "mean: 51.51509315000169 msec\nrounds: 20"
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
          "id": "9898ccbb783e7e6a35ae165e7deb9fa84edfe21c",
          "message": "Merge pull request #228 from plonerma/bug/#227 - Improving type casting from list of values to mixed tuples\n\nImproving type casting from list of values to mixed tuples",
          "timestamp": "2025-03-17T16:24:48+01:00",
          "tree_id": "a508830a620f8cf669c48b9668257d8805536b57",
          "url": "https://github.com/konradhalas/dacite/commit/9898ccbb783e7e6a35ae165e7deb9fa84edfe21c"
        },
        "date": 1742225123121,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17124.936034839615,
            "unit": "iter/sec",
            "range": "stddev: 0.000003552481386076939",
            "extra": "mean: 58.394378698148856 usec\nrounds: 3718"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 479.1094947056522,
            "unit": "iter/sec",
            "range": "stddev: 0.0000411762881153336",
            "extra": "mean: 2.087205557498635 msec\nrounds: 400"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 482.6816352844833,
            "unit": "iter/sec",
            "range": "stddev: 0.000058003471243005515",
            "extra": "mean: 2.0717589543480748 msec\nrounds: 460"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6560.499014586043,
            "unit": "iter/sec",
            "range": "stddev: 0.0000057753769061769576",
            "extra": "mean: 152.42742934290317 usec\nrounds: 3333"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 473.58425189664376,
            "unit": "iter/sec",
            "range": "stddev: 0.00003377718337460993",
            "extra": "mean: 2.111556699774389 msec\nrounds: 443"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 149281.30704656977,
            "unit": "iter/sec",
            "range": "stddev: 9.151533741138722e-7",
            "extra": "mean: 6.698762355343259 usec\nrounds: 14164"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 473.33760566750334,
            "unit": "iter/sec",
            "range": "stddev: 0.00013455242969970992",
            "extra": "mean: 2.1126569873733025 msec\nrounds: 396"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.036820456539385,
            "unit": "iter/sec",
            "range": "stddev: 0.0005780946980859211",
            "extra": "mean: 52.52978050000401 msec\nrounds: 16"
          }
        ]
      }
    ]
  }
}