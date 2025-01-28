window.BENCHMARK_DATA = {
  "lastUpdate": 1738051844118,
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
        "date": 1673351477481,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 12406.036936009757,
            "unit": "iter/sec",
            "range": "stddev: 0.000045657443458367846",
            "extra": "mean: 80.60591832492457 usec\nrounds: 3367"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 358.6183605959003,
            "unit": "iter/sec",
            "range": "stddev: 0.0005003754599548453",
            "extra": "mean: 2.788479648220867 msec\nrounds: 253"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 362.19314366748665,
            "unit": "iter/sec",
            "range": "stddev: 0.0003339023107320632",
            "extra": "mean: 2.760957841096118 msec\nrounds: 365"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4768.103803088418,
            "unit": "iter/sec",
            "range": "stddev: 0.00005708896812153243",
            "extra": "mean: 209.72697770385693 usec\nrounds: 3319"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 351.554438807521,
            "unit": "iter/sec",
            "range": "stddev: 0.0003466068887701558",
            "extra": "mean: 2.844509667953612 msec\nrounds: 259"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 135320.06881008728,
            "unit": "iter/sec",
            "range": "stddev: 0.000004572381594732402",
            "extra": "mean: 7.389886871868455 usec\nrounds: 11403"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 370.24809343478614,
            "unit": "iter/sec",
            "range": "stddev: 0.0002704817676029568",
            "extra": "mean: 2.7008916932509086 msec\nrounds: 326"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 14.642609526916164,
            "unit": "iter/sec",
            "range": "stddev: 0.004489600330920341",
            "extra": "mean: 68.2938378000036 msec\nrounds: 15"
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
        "date": 1673356118748,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 13416.129689123418,
            "unit": "iter/sec",
            "range": "stddev: 0.0000034893520894619486",
            "extra": "mean: 74.53714470356599 usec\nrounds: 3559"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 378.47587301230135,
            "unit": "iter/sec",
            "range": "stddev: 0.000023925217916471684",
            "extra": "mean: 2.6421763481010525 msec\nrounds: 316"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 379.1287356265711,
            "unit": "iter/sec",
            "range": "stddev: 0.00003693643847979287",
            "extra": "mean: 2.637626499999636 msec\nrounds: 362"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4746.172842940075,
            "unit": "iter/sec",
            "range": "stddev: 0.000006501816128284581",
            "extra": "mean: 210.6960772588589 usec\nrounds: 2977"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 372.0288302330657,
            "unit": "iter/sec",
            "range": "stddev: 0.000043793761289231354",
            "extra": "mean: 2.687963724138067 msec\nrounds: 348"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 178932.16702374033,
            "unit": "iter/sec",
            "range": "stddev: 6.711499445481733e-7",
            "extra": "mean: 5.588710049363691 usec\nrounds: 11533"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 377.1215678854655,
            "unit": "iter/sec",
            "range": "stddev: 0.00004879152468323291",
            "extra": "mean: 2.651664834782685 msec\nrounds: 345"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 14.906486586158682,
            "unit": "iter/sec",
            "range": "stddev: 0.003714815690464166",
            "extra": "mean: 67.08488913333497 msec\nrounds: 15"
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
        "date": 1673360922235,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16281.823653509357,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020518808082484564",
            "extra": "mean: 61.41818148143754 usec\nrounds: 4590"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 450.5317162238761,
            "unit": "iter/sec",
            "range": "stddev: 0.000011411282041508273",
            "extra": "mean: 2.2195995620052744 msec\nrounds: 379"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 449.85072253006535,
            "unit": "iter/sec",
            "range": "stddev: 0.000010349775466302792",
            "extra": "mean: 2.2229596395350146 msec\nrounds: 430"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5508.099763371656,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018737352627414399",
            "extra": "mean: 181.55081479277223 usec\nrounds: 3353"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 441.34559120751805,
            "unit": "iter/sec",
            "range": "stddev: 0.000010019987899478708",
            "extra": "mean: 2.265798095465297 msec\nrounds: 419"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 209895.5218316105,
            "unit": "iter/sec",
            "range": "stddev: 2.704405254039788e-7",
            "extra": "mean: 4.764275060628753 usec\nrounds: 14026"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 447.90091854430403,
            "unit": "iter/sec",
            "range": "stddev: 0.000013262263462052973",
            "extra": "mean: 2.2326366359105494 msec\nrounds: 401"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.684344564960455,
            "unit": "iter/sec",
            "range": "stddev: 0.002616654061998234",
            "extra": "mean: 56.54719044444474 msec\nrounds: 18"
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
        "date": 1673362183895,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15818.676129319028,
            "unit": "iter/sec",
            "range": "stddev: 0.000002545007490830224",
            "extra": "mean: 63.21641531977232 usec\nrounds: 4517"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 444.31923575405835,
            "unit": "iter/sec",
            "range": "stddev: 0.000014093844736634231",
            "extra": "mean: 2.2506340476186915 msec\nrounds: 357"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 444.74462084754157,
            "unit": "iter/sec",
            "range": "stddev: 0.000010416883071148039",
            "extra": "mean: 2.248481382628796 msec\nrounds: 426"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5448.718595428835,
            "unit": "iter/sec",
            "range": "stddev: 0.0000026467211285059984",
            "extra": "mean: 183.5293899815166 usec\nrounds: 3254"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 435.1901395713395,
            "unit": "iter/sec",
            "range": "stddev: 0.000010696023611022296",
            "extra": "mean: 2.2978461804879036 msec\nrounds: 410"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 217872.54739920914,
            "unit": "iter/sec",
            "range": "stddev: 2.5249363300208974e-7",
            "extra": "mean: 4.589839389758886 usec\nrounds: 14750"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 436.03028596155536,
            "unit": "iter/sec",
            "range": "stddev: 0.00037586220237625847",
            "extra": "mean: 2.293418673417951 msec\nrounds: 395"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.436853452371746,
            "unit": "iter/sec",
            "range": "stddev: 0.0028025182498266073",
            "extra": "mean: 57.34979666666757 msec\nrounds: 18"
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
        "date": 1673942253423,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16361.76533686768,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020881280438981867",
            "extra": "mean: 61.118099386666884 usec\nrounds: 4729"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 451.6651973937051,
            "unit": "iter/sec",
            "range": "stddev: 0.000009616753858586069",
            "extra": "mean: 2.2140293424652007 msec\nrounds: 365"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 450.19150754376733,
            "unit": "iter/sec",
            "range": "stddev: 0.00002358982471140521",
            "extra": "mean: 2.2212769082561614 msec\nrounds: 436"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5515.890284589009,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022654589077940284",
            "extra": "mean: 181.29439644474553 usec\nrounds: 3375"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 445.1699129322356,
            "unit": "iter/sec",
            "range": "stddev: 0.000010909048069085037",
            "extra": "mean: 2.2463333009484434 msec\nrounds: 422"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 216163.08294600897,
            "unit": "iter/sec",
            "range": "stddev: 2.539324616170261e-7",
            "extra": "mean: 4.626136833224986 usec\nrounds: 14514"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 447.78989426391786,
            "unit": "iter/sec",
            "range": "stddev: 0.000010359207901911715",
            "extra": "mean: 2.2331901921185855 msec\nrounds: 406"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.70356255516623,
            "unit": "iter/sec",
            "range": "stddev: 0.002776722379253755",
            "extra": "mean: 56.485806000000906 msec\nrounds: 18"
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
        "date": 1674735613083,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15262.272235890312,
            "unit": "iter/sec",
            "range": "stddev: 0.000001486419612718091",
            "extra": "mean: 65.52104329841721 usec\nrounds: 3626"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 429.246234679998,
            "unit": "iter/sec",
            "range": "stddev: 0.000010443052855918974",
            "extra": "mean: 2.3296651646705704 msec\nrounds: 334"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 430.5199851993897,
            "unit": "iter/sec",
            "range": "stddev: 0.00000969986879134285",
            "extra": "mean: 2.32277254106302 msec\nrounds: 414"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5333.22131871479,
            "unit": "iter/sec",
            "range": "stddev: 0.0000022450784134498993",
            "extra": "mean: 187.503938096644 usec\nrounds: 3247"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 415.1672193166076,
            "unit": "iter/sec",
            "range": "stddev: 0.0002839854086633936",
            "extra": "mean: 2.408668010075712 msec\nrounds: 397"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 215632.16571513188,
            "unit": "iter/sec",
            "range": "stddev: 2.4318517100580467e-7",
            "extra": "mean: 4.637527043720757 usec\nrounds: 13737"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 425.79735256006666,
            "unit": "iter/sec",
            "range": "stddev: 0.000009414061711930184",
            "extra": "mean: 2.3485350343011615 msec\nrounds: 379"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.771679231165123,
            "unit": "iter/sec",
            "range": "stddev: 0.003880476350674959",
            "extra": "mean: 59.62432182352979 msec\nrounds: 17"
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
        "date": 1675847232103,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16135.780534677731,
            "unit": "iter/sec",
            "range": "stddev: 0.0000020827962564075475",
            "extra": "mean: 61.9740704734351 usec\nrounds: 4711"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 450.4372360818644,
            "unit": "iter/sec",
            "range": "stddev: 0.000012299543053437812",
            "extra": "mean: 2.2200651276047165 msec\nrounds: 384"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 451.93005075589224,
            "unit": "iter/sec",
            "range": "stddev: 0.000012737753124833707",
            "extra": "mean: 2.212731811764704 msec\nrounds: 425"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5465.345686117129,
            "unit": "iter/sec",
            "range": "stddev: 0.000002692386815577766",
            "extra": "mean: 182.97104290039024 usec\nrounds: 3310"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 442.0890283338066,
            "unit": "iter/sec",
            "range": "stddev: 0.00009930306521920831",
            "extra": "mean: 2.2619878257755213 msec\nrounds: 419"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 218677.51504377776,
            "unit": "iter/sec",
            "range": "stddev: 3.130102444481525e-7",
            "extra": "mean: 4.572943861191246 usec\nrounds: 14286"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 449.90973089890815,
            "unit": "iter/sec",
            "range": "stddev: 0.000011914826086596907",
            "extra": "mean: 2.22266808500013 msec\nrounds: 400"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.713275092091404,
            "unit": "iter/sec",
            "range": "stddev: 0.0027737005148533674",
            "extra": "mean: 56.45483372222218 msec\nrounds: 18"
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
        "date": 1683890650671,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14613.552816634421,
            "unit": "iter/sec",
            "range": "stddev: 0.0001376269597887514",
            "extra": "mean: 68.42962916325952 usec\nrounds: 3573"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 426.96466042365773,
            "unit": "iter/sec",
            "range": "stddev: 0.00006014868943512815",
            "extra": "mean: 2.342114213873685 msec\nrounds: 346"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 427.659098016564,
            "unit": "iter/sec",
            "range": "stddev: 0.00006959451963525721",
            "extra": "mean: 2.338311062801868 msec\nrounds: 414"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5292.940522199399,
            "unit": "iter/sec",
            "range": "stddev: 0.000004872646458919466",
            "extra": "mean: 188.93089688158173 usec\nrounds: 3239"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 418.8643714254663,
            "unit": "iter/sec",
            "range": "stddev: 0.00001538475033343234",
            "extra": "mean: 2.3874076388899605 msec\nrounds: 396"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 213447.67436066232,
            "unit": "iter/sec",
            "range": "stddev: 4.0944323085472243e-7",
            "extra": "mean: 4.684988969757061 usec\nrounds: 13055"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 425.1073257616613,
            "unit": "iter/sec",
            "range": "stddev: 0.000014472694826703948",
            "extra": "mean: 2.3523471354164696 msec\nrounds: 384"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.614820006811907,
            "unit": "iter/sec",
            "range": "stddev: 0.005190318847165216",
            "extra": "mean: 60.187230411765526 msec\nrounds: 17"
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
        "date": 1736290846543,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18892.72352733702,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028132368160268155",
            "extra": "mean: 52.9304310494482 usec\nrounds: 4554"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 531.0231964877757,
            "unit": "iter/sec",
            "range": "stddev: 0.00002210902617754075",
            "extra": "mean: 1.8831569065420668 msec\nrounds: 428"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 529.2392557755288,
            "unit": "iter/sec",
            "range": "stddev: 0.00009454961385180515",
            "extra": "mean: 1.889504584338958 msec\nrounds: 498"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6651.5848339473805,
            "unit": "iter/sec",
            "range": "stddev: 0.000005237682218415424",
            "extra": "mean: 150.34011065999596 usec\nrounds: 4184"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 516.1745262425447,
            "unit": "iter/sec",
            "range": "stddev: 0.00006189748212985434",
            "extra": "mean: 1.9373292348993427 msec\nrounds: 447"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 246514.97600191794,
            "unit": "iter/sec",
            "range": "stddev: 3.9799195811185154e-7",
            "extra": "mean: 4.056548677968432 usec\nrounds: 17174"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 523.1877345369312,
            "unit": "iter/sec",
            "range": "stddev: 0.000022066320066582533",
            "extra": "mean: 1.9113597930293433 msec\nrounds: 459"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 20.638622345775758,
            "unit": "iter/sec",
            "range": "stddev: 0.0020765984435115307",
            "extra": "mean: 48.452846476193045 msec\nrounds: 21"
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
        "date": 1738051131363,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16576.590282846115,
            "unit": "iter/sec",
            "range": "stddev: 0.000003299058007319493",
            "extra": "mean: 60.32603707620294 usec\nrounds: 3722"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 469.22709101264866,
            "unit": "iter/sec",
            "range": "stddev: 0.00004231233743864259",
            "extra": "mean: 2.1311642468082552 msec\nrounds: 393"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 463.3809347744414,
            "unit": "iter/sec",
            "range": "stddev: 0.00015763887772295151",
            "extra": "mean: 2.158051669706193 msec\nrounds: 439"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5953.645247380935,
            "unit": "iter/sec",
            "range": "stddev: 0.000007203129906960986",
            "extra": "mean: 167.964324115534 usec\nrounds: 3326"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 463.9245520941931,
            "unit": "iter/sec",
            "range": "stddev: 0.00007780893260290541",
            "extra": "mean: 2.155522908813338 msec\nrounds: 329"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 164065.56836949007,
            "unit": "iter/sec",
            "range": "stddev: 7.132527991780199e-7",
            "extra": "mean: 6.095124101529409 usec\nrounds: 14464"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 458.7352733000047,
            "unit": "iter/sec",
            "range": "stddev: 0.00012448286556087442",
            "extra": "mean: 2.179906491180193 msec\nrounds: 397"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 18.632488447195065,
            "unit": "iter/sec",
            "range": "stddev: 0.002217549342755059",
            "extra": "mean: 53.669696499961596 msec\nrounds: 18"
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
        "date": 1738051824416,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 16479.640338946807,
            "unit": "iter/sec",
            "range": "stddev: 0.0000028390968487979004",
            "extra": "mean: 60.68093595687713 usec\nrounds: 3888"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 463.60773540203166,
            "unit": "iter/sec",
            "range": "stddev: 0.000028542702674319056",
            "extra": "mean: 2.156995933497139 msec\nrounds: 391"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 466.460047586335,
            "unit": "iter/sec",
            "range": "stddev: 0.000024348334415628518",
            "extra": "mean: 2.143806324195245 msec\nrounds: 438"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 5891.618874133682,
            "unit": "iter/sec",
            "range": "stddev: 0.000004558594047592562",
            "extra": "mean: 169.73263569209448 usec\nrounds: 3379"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 459.7427252154133,
            "unit": "iter/sec",
            "range": "stddev: 0.000022752873251553176",
            "extra": "mean: 2.175129578247156 msec\nrounds: 377"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 166186.26150129028,
            "unit": "iter/sec",
            "range": "stddev: 5.277658537119006e-7",
            "extra": "mean: 6.01734458050996 usec\nrounds: 12183"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 460.93480378004347,
            "unit": "iter/sec",
            "range": "stddev: 0.00006733354354118506",
            "extra": "mean: 2.169504215778847 msec\nrounds: 380"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 18.06154685216096,
            "unit": "iter/sec",
            "range": "stddev: 0.004949923900776092",
            "extra": "mean: 55.366243444445395 msec\nrounds: 18"
          }
        ]
      }
    ]
  }
}