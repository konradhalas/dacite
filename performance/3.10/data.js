window.BENCHMARK_DATA = {
  "lastUpdate": 1673351452442,
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
        "date": 1671725126884,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2788.0856778819325,
            "unit": "iter/sec",
            "range": "stddev: 0.00010097620705123894",
            "extra": "mean: 358.66903514948126 usec\nrounds: 1707"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 2092.73367715835,
            "unit": "iter/sec",
            "range": "stddev: 0.00014058335506003528",
            "extra": "mean: 477.84388950908703 usec\nrounds: 1792"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 182.33652044345723,
            "unit": "iter/sec",
            "range": "stddev: 0.0008861981070070033",
            "extra": "mean: 5.484364830303434 msec\nrounds: 165"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1452.4153658164475,
            "unit": "iter/sec",
            "range": "stddev: 0.00048546415397584305",
            "extra": "mean: 688.5082763069428 usec\nrounds: 1473"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 2403.530541666502,
            "unit": "iter/sec",
            "range": "stddev: 0.00008675206953266443",
            "extra": "mean: 416.0546257534319 usec\nrounds: 1825"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 19227.870642596015,
            "unit": "iter/sec",
            "range": "stddev: 0.00002627318389841662",
            "extra": "mean: 52.00783896396064 usec\nrounds: 10153"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 1685.599319807805,
            "unit": "iter/sec",
            "range": "stddev: 0.00024278830929571328",
            "extra": "mean: 593.2607994372124 usec\nrounds: 1421"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 84.52554078055277,
            "unit": "iter/sec",
            "range": "stddev: 0.0013077314081634522",
            "extra": "mean: 11.8307435925932 msec\nrounds: 81"
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
        "date": 1671801429544,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3266.098900342353,
            "unit": "iter/sec",
            "range": "stddev: 0.0002486780626573428",
            "extra": "mean: 306.17566415247865 usec\nrounds: 2254"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 78.75666545300871,
            "unit": "iter/sec",
            "range": "stddev: 0.00015951603769233976",
            "extra": "mean: 12.69733798717855 msec\nrounds: 78"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 78.73820444637435,
            "unit": "iter/sec",
            "range": "stddev: 0.0000797538707733119",
            "extra": "mean: 12.700315012657708 msec\nrounds: 79"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1909.867738827753,
            "unit": "iter/sec",
            "range": "stddev: 0.000004746602264526158",
            "extra": "mean: 523.5964667447519 usec\nrounds: 1714"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 78.59406245336474,
            "unit": "iter/sec",
            "range": "stddev: 0.00004008872320554982",
            "extra": "mean: 12.723607468355114 msec\nrounds: 79"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 23393.696955572337,
            "unit": "iter/sec",
            "range": "stddev: 0.0000012031406627198388",
            "extra": "mean: 42.74655698494896 usec\nrounds: 11038"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 78.92553648330995,
            "unit": "iter/sec",
            "range": "stddev: 0.000045712465355140075",
            "extra": "mean: 12.67017044871739 msec\nrounds: 78"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.148040236943249,
            "unit": "iter/sec",
            "range": "stddev: 0.002605894860578615",
            "extra": "mean: 317.65794739999933 msec\nrounds: 5"
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
        "date": 1672821240177,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 2953.626540807768,
            "unit": "iter/sec",
            "range": "stddev: 0.00009003375426276028",
            "extra": "mean: 338.5668384895121 usec\nrounds: 1907"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 68.21444342652438,
            "unit": "iter/sec",
            "range": "stddev: 0.0009862732104279513",
            "extra": "mean: 14.659651970584896 msec\nrounds: 68"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 68.6953291085596,
            "unit": "iter/sec",
            "range": "stddev: 0.0015905451412462914",
            "extra": "mean: 14.557030484848463 msec\nrounds: 66"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 1652.8542685828306,
            "unit": "iter/sec",
            "range": "stddev: 0.0001744601417863118",
            "extra": "mean: 605.0140166667006 usec\nrounds: 600"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 68.31992125636596,
            "unit": "iter/sec",
            "range": "stddev: 0.0010131017643336055",
            "extra": "mean: 14.637019212120673 msec\nrounds: 33"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 20100.65987507403,
            "unit": "iter/sec",
            "range": "stddev: 0.000004464756200635411",
            "extra": "mean: 49.749610520998736 usec\nrounds: 9980"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 72.67179045787957,
            "unit": "iter/sec",
            "range": "stddev: 0.00012457063170209906",
            "extra": "mean: 13.760497624997944 msec\nrounds: 72"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 2.931353367507706,
            "unit": "iter/sec",
            "range": "stddev: 0.0013887399593770875",
            "extra": "mean: 341.1393559999965 msec\nrounds: 5"
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
        "date": 1672828158415,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 3907.275260454984,
            "unit": "iter/sec",
            "range": "stddev: 0.000003615036146757101",
            "extra": "mean: 255.93282616171624 usec\nrounds: 2324"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 92.69320319876297,
            "unit": "iter/sec",
            "range": "stddev: 0.00003468125479778736",
            "extra": "mean: 10.78827751648295 msec\nrounds: 91"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 92.75169027613637,
            "unit": "iter/sec",
            "range": "stddev: 0.000018400428527205057",
            "extra": "mean: 10.781474677419276 msec\nrounds: 93"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 2200.1235980820193,
            "unit": "iter/sec",
            "range": "stddev: 0.000004604966300422414",
            "extra": "mean: 454.5199191862495 usec\nrounds: 1819"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 92.52229566830275,
            "unit": "iter/sec",
            "range": "stddev: 0.00003386749173372284",
            "extra": "mean: 10.808205663044204 msec\nrounds: 92"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 33526.790613056386,
            "unit": "iter/sec",
            "range": "stddev: 6.915717951541211e-7",
            "extra": "mean: 29.826893111879563 usec\nrounds: 9814"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 92.10883198461042,
            "unit": "iter/sec",
            "range": "stddev: 0.000024017087964291396",
            "extra": "mean: 10.85672218888934 msec\nrounds: 90"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 3.6379098829973033,
            "unit": "iter/sec",
            "range": "stddev: 0.004604105488290174",
            "extra": "mean: 274.88311479999936 msec\nrounds: 5"
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
        "date": 1672928544542,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 4630.771288071344,
            "unit": "iter/sec",
            "range": "stddev: 0.0000033325922958956935",
            "extra": "mean: 215.94674791561275 usec\nrounds: 2519"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 125.65370381683626,
            "unit": "iter/sec",
            "range": "stddev: 0.000018168460168051494",
            "extra": "mean: 7.958380609756531 msec\nrounds: 123"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 125.74344149258744,
            "unit": "iter/sec",
            "range": "stddev: 0.000024033547290464198",
            "extra": "mean: 7.952701056451917 msec\nrounds: 124"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 2282.5076860580916,
            "unit": "iter/sec",
            "range": "stddev: 0.000004401678454970943",
            "extra": "mean: 438.11462546573404 usec\nrounds: 1877"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 124.95617301918344,
            "unit": "iter/sec",
            "range": "stddev: 0.000027847384158631422",
            "extra": "mean: 8.00280591056897 msec\nrounds: 123"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 32905.383215535854,
            "unit": "iter/sec",
            "range": "stddev: 8.0491215581788e-7",
            "extra": "mean: 30.390164230874625 usec\nrounds: 9785"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 125.08304221825213,
            "unit": "iter/sec",
            "range": "stddev: 0.000017195493191273798",
            "extra": "mean: 7.994688826444931 msec\nrounds: 121"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 4.934981803907784,
            "unit": "iter/sec",
            "range": "stddev: 0.004250652645816137",
            "extra": "mean: 202.63499233333468 msec\nrounds: 6"
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
        "date": 1673347551807,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 8409.077642775741,
            "unit": "iter/sec",
            "range": "stddev: 0.000023431856177317787",
            "extra": "mean: 118.91910652758719 usec\nrounds: 2206"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 238.48931505553674,
            "unit": "iter/sec",
            "range": "stddev: 0.0005966135906859929",
            "extra": "mean: 4.1930599690268355 msec\nrounds: 226"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 241.0616991706364,
            "unit": "iter/sec",
            "range": "stddev: 0.00038942392395914207",
            "extra": "mean: 4.148315569999141 msec\nrounds: 200"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 4492.641826504546,
            "unit": "iter/sec",
            "range": "stddev: 0.00015720582658130026",
            "extra": "mean: 222.58618394648207 usec\nrounds: 2392"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 237.8137745971502,
            "unit": "iter/sec",
            "range": "stddev: 0.0004106049661927618",
            "extra": "mean: 4.204970892430313 msec\nrounds: 251"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 57870.522412491984,
            "unit": "iter/sec",
            "range": "stddev: 0.000006744166866055496",
            "extra": "mean: 17.27995460058503 usec\nrounds: 8238"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 238.80794849219097,
            "unit": "iter/sec",
            "range": "stddev: 0.0002403025614586471",
            "extra": "mean: 4.187465309734864 msec\nrounds: 226"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 9.615331772151404,
            "unit": "iter/sec",
            "range": "stddev: 0.0015121155474185138",
            "extra": "mean: 104.00057155555152 msec\nrounds: 9"
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
        "date": 1673350838611,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17042.881921696175,
            "unit": "iter/sec",
            "range": "stddev: 0.0000030094479875424577",
            "extra": "mean: 58.67552240252076 usec\nrounds: 4062"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 469.6074086773675,
            "unit": "iter/sec",
            "range": "stddev: 0.000010780526830955048",
            "extra": "mean: 2.1294382957382725 msec\nrounds: 399"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 469.66829251639007,
            "unit": "iter/sec",
            "range": "stddev: 0.000010900209821339296",
            "extra": "mean: 2.129162253304768 msec\nrounds: 454"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6509.670331382999,
            "unit": "iter/sec",
            "range": "stddev: 0.0000032169241059841068",
            "extra": "mean: 153.61761027728528 usec\nrounds: 3464"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 460.3176544937172,
            "unit": "iter/sec",
            "range": "stddev: 0.000009146446439061156",
            "extra": "mean: 2.172412876711964 msec\nrounds: 438"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 141805.79785543354,
            "unit": "iter/sec",
            "range": "stddev: 3.5520578361379816e-7",
            "extra": "mean: 7.051897842847497 usec\nrounds: 11962"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 465.03006016665955,
            "unit": "iter/sec",
            "range": "stddev: 0.000010340294870474527",
            "extra": "mean: 2.1503986207722043 msec\nrounds: 414"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 18.587356945556852,
            "unit": "iter/sec",
            "range": "stddev: 0.0001288628448047522",
            "extra": "mean: 53.8000105625045 msec\nrounds: 16"
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
        "date": 1673351451306,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 18257.055179434712,
            "unit": "iter/sec",
            "range": "stddev: 0.000002829293667287893",
            "extra": "mean: 54.77334598442961 usec\nrounds: 4084"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 495.60576999079206,
            "unit": "iter/sec",
            "range": "stddev: 0.00000771116777056497",
            "extra": "mean: 2.017732763721817 msec\nrounds: 419"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 498.33802352478006,
            "unit": "iter/sec",
            "range": "stddev: 0.000007696814750919869",
            "extra": "mean: 2.0066700769227466 msec\nrounds: 481"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6830.686099713509,
            "unit": "iter/sec",
            "range": "stddev: 0.00001647927395419923",
            "extra": "mean: 146.39817807495822 usec\nrounds: 3594"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 488.2183191957435,
            "unit": "iter/sec",
            "range": "stddev: 0.00000768636523813922",
            "extra": "mean: 2.048263984947 msec\nrounds: 465"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 186069.59987734372,
            "unit": "iter/sec",
            "range": "stddev: 3.9432072741592493e-7",
            "extra": "mean: 5.3743330488118195 usec\nrounds: 11710"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 492.3637313007105,
            "unit": "iter/sec",
            "range": "stddev: 0.000007712540020141612",
            "extra": "mean: 2.03101881074431 msec\nrounds: 428"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 19.548355622503657,
            "unit": "iter/sec",
            "range": "stddev: 0.0002723605825236048",
            "extra": "mean: 51.15519787499778 msec\nrounds: 16"
          }
        ]
      }
    ]
  }
}