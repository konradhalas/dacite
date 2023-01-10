window.BENCHMARK_DATA = {
  "lastUpdate": 1673350859997,
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
        "date": 1671725110685,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2901.780874289612,
            "unit": "iter/sec",
            "range": "stddev: 0.000004930698550913291",
            "extra": "mean: 344.61595941313493 usec\nrounds: 2045"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 2087.281702478073,
            "unit": "iter/sec",
            "range": "stddev: 0.000009009656981522485",
            "extra": "mean: 479.0920165748471 usec\nrounds: 1810"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 190.8516403032434,
            "unit": "iter/sec",
            "range": "stddev: 0.00009219137969108451",
            "extra": "mean: 5.239672021739525 msec\nrounds: 184"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1565.3367338772755,
            "unit": "iter/sec",
            "range": "stddev: 0.00006954132032971487",
            "extra": "mean: 638.8401794692702 usec\nrounds: 1432"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 2381.180536733192,
            "unit": "iter/sec",
            "range": "stddev: 0.000023085696206779852",
            "extra": "mean: 419.9597571765507 usec\nrounds: 2125"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 21902.31486216785,
            "unit": "iter/sec",
            "range": "stddev: 0.00003970380345455919",
            "extra": "mean: 45.657274415651514 usec\nrounds: 11038"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 1794.9418323016282,
            "unit": "iter/sec",
            "range": "stddev: 0.000007027399507772742",
            "extra": "mean: 557.1211178011904 usec\nrounds: 1528"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 84.606317382691,
            "unit": "iter/sec",
            "range": "stddev: 0.000048033759402340984",
            "extra": "mean: 11.819448369047945 msec\nrounds: 84"
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
        "date": 1671801424590,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2875.8911653937457,
            "unit": "iter/sec",
            "range": "stddev: 0.00004364248294320432",
            "extra": "mean: 347.71830451486767 usec\nrounds: 2082"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 67.57033027824292,
            "unit": "iter/sec",
            "range": "stddev: 0.000038492079210394805",
            "extra": "mean: 14.799394880595864 msec\nrounds: 67"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 66.76375218999206,
            "unit": "iter/sec",
            "range": "stddev: 0.0012475878892558765",
            "extra": "mean: 14.978187522388847 msec\nrounds: 67"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1545.2083206857308,
            "unit": "iter/sec",
            "range": "stddev: 0.00010388154671122004",
            "extra": "mean: 647.1619306037784 usec\nrounds: 1441"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 67.20563277090149,
            "unit": "iter/sec",
            "range": "stddev: 0.00004470555353438372",
            "extra": "mean: 14.879705149253166 msec\nrounds: 67"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 22463.475445038643,
            "unit": "iter/sec",
            "range": "stddev: 0.0000014654406404094735",
            "extra": "mean: 44.51670902157144 usec\nrounds: 11262"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 66.72020869061822,
            "unit": "iter/sec",
            "range": "stddev: 0.00003262820717441885",
            "extra": "mean: 14.98796271212224 msec\nrounds: 66"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.6942137652332065,
            "unit": "iter/sec",
            "range": "stddev: 0.0002608591572875441",
            "extra": "mean: 371.1657972000012 msec\nrounds: 5"
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
        "date": 1672821241714,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3101.6261009297705,
            "unit": "iter/sec",
            "range": "stddev: 0.000011339934689147369",
            "extra": "mean: 322.41152461937025 usec\nrounds: 2234"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 72.0782694323824,
            "unit": "iter/sec",
            "range": "stddev: 0.00018223482446557405",
            "extra": "mean: 13.873807013889442 msec\nrounds: 72"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 72.3616609038071,
            "unit": "iter/sec",
            "range": "stddev: 0.00004426390711789632",
            "extra": "mean: 13.819472736112774 msec\nrounds: 72"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1683.6365386828954,
            "unit": "iter/sec",
            "range": "stddev: 0.000005220138045690551",
            "extra": "mean: 593.952422048465 usec\nrounds: 1533"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 72.20561755738146,
            "unit": "iter/sec",
            "range": "stddev: 0.00003213166461863985",
            "extra": "mean: 13.849337957746915 msec\nrounds: 71"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 23636.821328027127,
            "unit": "iter/sec",
            "range": "stddev: 0.0000010143815089843508",
            "extra": "mean: 42.30687308256038 usec\nrounds: 11669"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 72.0304923081635,
            "unit": "iter/sec",
            "range": "stddev: 0.000025654636456298253",
            "extra": "mean: 13.88300937499862 msec\nrounds: 72"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.8444489348811377,
            "unit": "iter/sec",
            "range": "stddev: 0.0038511943150142695",
            "extra": "mean: 351.5619450000031 msec\nrounds: 5"
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
        "date": 1672828160847,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3223.0580950600506,
            "unit": "iter/sec",
            "range": "stddev: 0.00025217586652950954",
            "extra": "mean: 310.2643422818503 usec\nrounds: 1937"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 76.3682673353709,
            "unit": "iter/sec",
            "range": "stddev: 0.000019534430889614933",
            "extra": "mean: 13.094443999999429 msec\nrounds: 70"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 76.73093102035143,
            "unit": "iter/sec",
            "range": "stddev: 0.00004827901657092213",
            "extra": "mean: 13.032553974026053 msec\nrounds: 77"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1763.8814224756993,
            "unit": "iter/sec",
            "range": "stddev: 0.000004462008359983805",
            "extra": "mean: 566.9315336381558 usec\nrounds: 1531"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 76.67204330864203,
            "unit": "iter/sec",
            "range": "stddev: 0.000020460850596357642",
            "extra": "mean: 13.042563584415204 msec\nrounds: 77"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 26004.664059872393,
            "unit": "iter/sec",
            "range": "stddev: 0.0000011523578826034058",
            "extra": "mean: 38.4546402021433 usec\nrounds: 9497"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 76.17190080918243,
            "unit": "iter/sec",
            "range": "stddev: 0.0001968500343038648",
            "extra": "mean: 13.128200679999983 msec\nrounds: 75"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.029444665615424,
            "unit": "iter/sec",
            "range": "stddev: 0.0068680511108458395",
            "extra": "mean: 330.0935024000026 msec\nrounds: 5"
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
        "date": 1672928549262,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3408.6544359004943,
            "unit": "iter/sec",
            "range": "stddev: 0.000004986758828559082",
            "extra": "mean: 293.37089423552 usec\nrounds: 1995"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 89.76397304125662,
            "unit": "iter/sec",
            "range": "stddev: 0.000026263837869528976",
            "extra": "mean: 11.140326860759469 msec\nrounds: 79"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 89.89399583149545,
            "unit": "iter/sec",
            "range": "stddev: 0.000033405876764353125",
            "extra": "mean: 11.124213477777545 msec\nrounds: 90"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1576.1287413493092,
            "unit": "iter/sec",
            "range": "stddev: 0.000023275644386727486",
            "extra": "mean: 634.4659378166717 usec\nrounds: 1383"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 89.85672183961044,
            "unit": "iter/sec",
            "range": "stddev: 0.00002182520684726149",
            "extra": "mean: 11.128827977777197 msec\nrounds: 90"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 22905.220811298543,
            "unit": "iter/sec",
            "range": "stddev: 0.00000151688420246672",
            "extra": "mean: 43.658168949269694 usec\nrounds: 8689"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 89.86142569616699,
            "unit": "iter/sec",
            "range": "stddev: 0.0000369498925720259",
            "extra": "mean: 11.128245431817746 msec\nrounds: 88"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.557754578044411,
            "unit": "iter/sec",
            "range": "stddev: 0.007602062070125992",
            "extra": "mean: 281.07616140000005 msec\nrounds: 5"
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
        "date": 1673347532383,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 10457.744819826763,
            "unit": "iter/sec",
            "range": "stddev: 0.0000024623683924383133",
            "extra": "mean: 95.62291079278462 usec\nrounds: 3632"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 295.3530093533593,
            "unit": "iter/sec",
            "range": "stddev: 0.000011701466941314931",
            "extra": "mean: 3.3857789436084715 msec\nrounds: 266"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 295.7704712086923,
            "unit": "iter/sec",
            "range": "stddev: 0.000011218003701083404",
            "extra": "mean: 3.381000124567578 msec\nrounds: 289"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5071.814703894979,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021980560532212534",
            "extra": "mean: 197.16808645079925 usec\nrounds: 3181"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 289.8251823014374,
            "unit": "iter/sec",
            "range": "stddev: 0.000011565189140003769",
            "extra": "mean: 3.450355804348063 msec\nrounds: 276"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 83247.69609980336,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012876305437755606",
            "extra": "mean: 12.012344447360173 usec\nrounds: 10977"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 293.78322824841393,
            "unit": "iter/sec",
            "range": "stddev: 0.00001811936753197689",
            "extra": "mean: 3.4038702820517415 msec\nrounds: 273"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 11.60155096223479,
            "unit": "iter/sec",
            "range": "stddev: 0.0033667047237199597",
            "extra": "mean: 86.19537191666755 msec\nrounds: 12"
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
        "date": 1673350858833,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 11433.529414257559,
            "unit": "iter/sec",
            "range": "stddev: 0.00003497982024971879",
            "extra": "mean: 87.4620568827159 usec\nrounds: 2303"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 328.8556682545835,
            "unit": "iter/sec",
            "range": "stddev: 0.00025841405708177675",
            "extra": "mean: 3.040847692568432 msec\nrounds: 296"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 318.02274998904886,
            "unit": "iter/sec",
            "range": "stddev: 0.000268827138017181",
            "extra": "mean: 3.1444291329297513 msec\nrounds: 331"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4307.805435686661,
            "unit": "iter/sec",
            "range": "stddev: 0.00004377318918018053",
            "extra": "mean: 232.13676080071167 usec\nrounds: 1898"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 307.6122969450482,
            "unit": "iter/sec",
            "range": "stddev: 0.00045913656221871653",
            "extra": "mean: 3.2508453333341216 msec\nrounds: 336"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 97851.6408025065,
            "unit": "iter/sec",
            "range": "stddev: 0.000012304605354566089",
            "extra": "mean: 10.219552700381337 usec\nrounds: 11442"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 330.38754040590885,
            "unit": "iter/sec",
            "range": "stddev: 0.0003137173093751546",
            "extra": "mean: 3.026748523178011 msec\nrounds: 302"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 12.79723534355459,
            "unit": "iter/sec",
            "range": "stddev: 0.005453940412841969",
            "extra": "mean: 78.14187776922118 msec\nrounds: 13"
          }
        ]
      }
    ]
  }
}