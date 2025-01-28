window.BENCHMARK_DATA = {
  "lastUpdate": 1738051136073,
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
        "date": 1673356080587,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 14801.381854328116,
            "unit": "iter/sec",
            "range": "stddev: 0.000046536166086944534",
            "extra": "mean: 67.56125947170176 usec\nrounds: 1742"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 443.1088619904365,
            "unit": "iter/sec",
            "range": "stddev: 0.00023079951224960223",
            "extra": "mean: 2.256781765790057 msec\nrounds: 380"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 447.275895369108,
            "unit": "iter/sec",
            "range": "stddev: 0.0003544585319416454",
            "extra": "mean: 2.2357565215419544 msec\nrounds: 441"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6938.421664504797,
            "unit": "iter/sec",
            "range": "stddev: 0.00009894609748487449",
            "extra": "mean: 144.1249967720679 usec\nrounds: 3098"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 435.2993102673512,
            "unit": "iter/sec",
            "range": "stddev: 0.00031430094711077907",
            "extra": "mean: 2.297269893181825 msec\nrounds: 440"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 158346.0715991497,
            "unit": "iter/sec",
            "range": "stddev: 0.00005209602760298579",
            "extra": "mean: 6.315281395369772 usec\nrounds: 10320"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 435.90785715457724,
            "unit": "iter/sec",
            "range": "stddev: 0.0002769194353407493",
            "extra": "mean: 2.2940628015461306 msec\nrounds: 388"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 16.954988526056674,
            "unit": "iter/sec",
            "range": "stddev: 0.0024370133444824855",
            "extra": "mean: 58.97969193333192 msec\nrounds: 15"
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
        "date": 1673360923578,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 20099.1963284807,
            "unit": "iter/sec",
            "range": "stddev: 0.000002826851551063413",
            "extra": "mean: 49.753233097335006 usec\nrounds: 4097"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 539.5020809134793,
            "unit": "iter/sec",
            "range": "stddev: 0.0006048243760628345",
            "extra": "mean: 1.8535609692307589 msec\nrounds: 455"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 549.5262126824244,
            "unit": "iter/sec",
            "range": "stddev: 0.000025226825357732916",
            "extra": "mean: 1.8197494076190828 msec\nrounds: 525"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8783.250660224496,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029627501695183696",
            "extra": "mean: 113.85306405162306 usec\nrounds: 4028"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 539.5295114570775,
            "unit": "iter/sec",
            "range": "stddev: 0.000009399250896151024",
            "extra": "mean: 1.853466731225425 msec\nrounds: 506"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 218352.99566617337,
            "unit": "iter/sec",
            "range": "stddev: 3.747340862324592e-7",
            "extra": "mean: 4.579740236441909 usec\nrounds: 12854"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 546.5346428497128,
            "unit": "iter/sec",
            "range": "stddev: 0.000007526861711658376",
            "extra": "mean: 1.829710180466972 msec\nrounds: 471"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 21.900927852261105,
            "unit": "iter/sec",
            "range": "stddev: 0.00006958250973030397",
            "extra": "mean: 45.660165941177574 msec\nrounds: 17"
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
        "date": 1673362079070,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 15338.699056019797,
            "unit": "iter/sec",
            "range": "stddev: 0.000015441834981795094",
            "extra": "mean: 65.19457721595639 usec\nrounds: 3283"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 419.3023902962933,
            "unit": "iter/sec",
            "range": "stddev: 0.00048432747453391547",
            "extra": "mean: 2.384913664082301 msec\nrounds: 387"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 430.1185798047198,
            "unit": "iter/sec",
            "range": "stddev: 0.00047385789074458427",
            "extra": "mean: 2.324940253578478 msec\nrounds: 489"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 6610.541253292621,
            "unit": "iter/sec",
            "range": "stddev: 0.00007818653024942874",
            "extra": "mean: 151.27354352442978 usec\nrounds: 2355"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 421.98366672844764,
            "unit": "iter/sec",
            "range": "stddev: 0.0003464847756896905",
            "extra": "mean: 2.3697599666659936 msec\nrounds: 360"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 185512.7461356839,
            "unit": "iter/sec",
            "range": "stddev: 0.0000037246095519123065",
            "extra": "mean: 5.390465188136456 usec\nrounds: 11002"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 432.2185967324409,
            "unit": "iter/sec",
            "range": "stddev: 0.000317594822388922",
            "extra": "mean: 2.313644085562187 msec\nrounds: 374"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 17.335868832641168,
            "unit": "iter/sec",
            "range": "stddev: 0.003333024140329521",
            "extra": "mean: 57.6838697647003 msec\nrounds: 17"
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
        "date": 1673362189109,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 17048.966853350757,
            "unit": "iter/sec",
            "range": "stddev: 0.000014087698481011273",
            "extra": "mean: 58.654580573805426 usec\nrounds: 3171"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 483.6784513804664,
            "unit": "iter/sec",
            "range": "stddev: 0.00001974130613623133",
            "extra": "mean: 2.0674892527171727 msec\nrounds: 368"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 485.98952055046414,
            "unit": "iter/sec",
            "range": "stddev: 0.000026542362553330634",
            "extra": "mean: 2.0576575372805017 msec\nrounds: 456"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 7642.963171907914,
            "unit": "iter/sec",
            "range": "stddev: 0.000004393362816858256",
            "extra": "mean: 130.8393063668747 usec\nrounds: 3424"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 480.23762391792513,
            "unit": "iter/sec",
            "range": "stddev: 0.00005936463350046134",
            "extra": "mean: 2.0823024898417883 msec\nrounds: 443"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 188833.5414037178,
            "unit": "iter/sec",
            "range": "stddev: 8.714090467598271e-7",
            "extra": "mean: 5.2956693634318075 usec\nrounds: 11124"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 484.6918960502238,
            "unit": "iter/sec",
            "range": "stddev: 0.000044018502245861136",
            "extra": "mean: 2.0631663292682325 msec\nrounds: 410"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 18.912266506308455,
            "unit": "iter/sec",
            "range": "stddev: 0.0036350859157078443",
            "extra": "mean: 52.87573542105256 msec\nrounds: 19"
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
        "date": 1673942255283,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 20005.04977257184,
            "unit": "iter/sec",
            "range": "stddev: 0.0000013901357838981475",
            "extra": "mean: 49.98737875529116 usec\nrounds: 4227"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 552.5753704053911,
            "unit": "iter/sec",
            "range": "stddev: 0.000006775578580729254",
            "extra": "mean: 1.8097078761696535 msec\nrounds: 428"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 553.1131123275643,
            "unit": "iter/sec",
            "range": "stddev: 0.000006823024080686547",
            "extra": "mean: 1.8079484606537055 msec\nrounds: 521"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8707.570032835376,
            "unit": "iter/sec",
            "range": "stddev: 0.0000035690274004848407",
            "extra": "mean: 114.84260203812315 usec\nrounds: 3925"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 544.149840064678,
            "unit": "iter/sec",
            "range": "stddev: 0.000025026176245176484",
            "extra": "mean: 1.8377291076317133 msec\nrounds: 511"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 221885.74220374366,
            "unit": "iter/sec",
            "range": "stddev: 2.86631662636508e-7",
            "extra": "mean: 4.506824053082974 usec\nrounds: 12805"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 552.0205038893776,
            "unit": "iter/sec",
            "range": "stddev: 0.000008153670940034249",
            "extra": "mean: 1.8115269142256272 msec\nrounds: 478"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 21.871538908707244,
            "unit": "iter/sec",
            "range": "stddev: 0.0005095960657919847",
            "extra": "mean: 45.72151983333425 msec\nrounds: 18"
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
        "date": 1674735613840,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 20194.168825515328,
            "unit": "iter/sec",
            "range": "stddev: 0.0000015479742297388802",
            "extra": "mean: 49.5192453148406 usec\nrounds: 4109"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 561.4224940497533,
            "unit": "iter/sec",
            "range": "stddev: 0.00000766186906502017",
            "extra": "mean: 1.7811897645686068 msec\nrounds: 429"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 555.6044219894432,
            "unit": "iter/sec",
            "range": "stddev: 0.00034833848020262805",
            "extra": "mean: 1.7998416866793776 msec\nrounds: 533"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8835.980869671565,
            "unit": "iter/sec",
            "range": "stddev: 0.0000018950860451990298",
            "extra": "mean: 113.17362664651971 usec\nrounds: 4023"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 547.403871165199,
            "unit": "iter/sec",
            "range": "stddev: 0.000011548141606470934",
            "extra": "mean: 1.826804764590738 msec\nrounds: 514"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 218995.08606089256,
            "unit": "iter/sec",
            "range": "stddev: 3.4024213277377094e-7",
            "extra": "mean: 4.5663125049387885 usec\nrounds: 12675"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 554.0239671994063,
            "unit": "iter/sec",
            "range": "stddev: 0.000008743190412577867",
            "extra": "mean: 1.8049760645825568 msec\nrounds: 480"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 22.197861576402865,
            "unit": "iter/sec",
            "range": "stddev: 0.00007824354940968012",
            "extra": "mean: 45.049384444447405 msec\nrounds: 18"
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
        "date": 1675847236964,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 20160.22530952406,
            "unit": "iter/sec",
            "range": "stddev: 0.000002488792866696735",
            "extra": "mean: 49.60262024093459 usec\nrounds: 4150"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 557.1588070126934,
            "unit": "iter/sec",
            "range": "stddev: 0.000010285305621262598",
            "extra": "mean: 1.794820412804168 msec\nrounds: 453"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 555.3938916225951,
            "unit": "iter/sec",
            "range": "stddev: 0.000013345698670385921",
            "extra": "mean: 1.8005239436078035 msec\nrounds: 532"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8785.998913143236,
            "unit": "iter/sec",
            "range": "stddev: 0.0000021402838091943857",
            "extra": "mean: 113.81745091091126 usec\nrounds: 3952"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 547.221312154025,
            "unit": "iter/sec",
            "range": "stddev: 0.000008712392219047021",
            "extra": "mean: 1.8274142066282182 msec\nrounds: 513"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 226778.13931909515,
            "unit": "iter/sec",
            "range": "stddev: 3.2269108706789357e-7",
            "extra": "mean: 4.40959610570276 usec\nrounds: 12788"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 553.589347808011,
            "unit": "iter/sec",
            "range": "stddev: 0.000008649851347349385",
            "extra": "mean: 1.8063931395349169 msec\nrounds: 473"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 22.035275206607402,
            "unit": "iter/sec",
            "range": "stddev: 0.00008296325056334458",
            "extra": "mean: 45.381779470589244 msec\nrounds: 17"
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
        "date": 1683890642306,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 20653.50061711221,
            "unit": "iter/sec",
            "range": "stddev: 0.00000262189191244243",
            "extra": "mean: 48.41794224323706 usec\nrounds: 4467"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 557.8454583821482,
            "unit": "iter/sec",
            "range": "stddev: 0.000009041114978230316",
            "extra": "mean: 1.7926111703054448 msec\nrounds: 458"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 554.9004209082304,
            "unit": "iter/sec",
            "range": "stddev: 0.000007586137270635279",
            "extra": "mean: 1.8021251423151834 msec\nrounds: 527"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8723.861195187454,
            "unit": "iter/sec",
            "range": "stddev: 0.0000019529422794610194",
            "extra": "mean: 114.62814201487447 usec\nrounds: 3901"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 543.5054130117783,
            "unit": "iter/sec",
            "range": "stddev: 0.000023159427735442036",
            "extra": "mean: 1.8399080782997264 msec\nrounds: 447"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 223153.44601333622,
            "unit": "iter/sec",
            "range": "stddev: 3.709969000683392e-7",
            "extra": "mean: 4.48122141004373 usec\nrounds: 12723"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 556.2355655194463,
            "unit": "iter/sec",
            "range": "stddev: 0.000008963262067210996",
            "extra": "mean: 1.7977994612159325 msec\nrounds: 477"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 21.910894112388384,
            "unit": "iter/sec",
            "range": "stddev: 0.002640354445508135",
            "extra": "mean: 45.63939722727251 msec\nrounds: 22"
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
        "date": 1736290847092,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 23999.584759646405,
            "unit": "iter/sec",
            "range": "stddev: 0.000002688664828272976",
            "extra": "mean: 41.66738758253138 usec\nrounds: 4381"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 661.1230163323914,
            "unit": "iter/sec",
            "range": "stddev: 0.00010351860096895926",
            "extra": "mean: 1.512577803670402 msec\nrounds: 545"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 668.342275010588,
            "unit": "iter/sec",
            "range": "stddev: 0.00004996884091890118",
            "extra": "mean: 1.4962393333328465 msec\nrounds: 618"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 10546.033229069479,
            "unit": "iter/sec",
            "range": "stddev: 0.000003047662267074519",
            "extra": "mean: 94.82238281248372 usec\nrounds: 4864"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 652.2591622846279,
            "unit": "iter/sec",
            "range": "stddev: 0.000042519153051156205",
            "extra": "mean: 1.533132929091194 msec\nrounds: 550"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 254804.05461813728,
            "unit": "iter/sec",
            "range": "stddev: 4.6486346971335355e-7",
            "extra": "mean: 3.924584330098877 usec\nrounds: 14882"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 656.2315241626817,
            "unit": "iter/sec",
            "range": "stddev: 0.00004256811738416772",
            "extra": "mean: 1.523852425827835 msec\nrounds: 573"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 25.871702125674915,
            "unit": "iter/sec",
            "range": "stddev: 0.001896527757631628",
            "extra": "mean: 38.652269384611 msec\nrounds: 26"
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
        "date": 1738051135072,
        "tool": "pytest",
        "benches": [
          {
            "name": "tests/performance/test_from_dict.py::test_basic_scenario",
            "value": 19761.877395765052,
            "unit": "iter/sec",
            "range": "stddev: 0.0000029417891600650005",
            "extra": "mean: 50.602479712494265 usec\nrounds: 3623"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_union_matching",
            "value": 545.0459897914569,
            "unit": "iter/sec",
            "range": "stddev: 0.00009117908516134656",
            "extra": "mean: 1.834707563636264 msec\nrounds: 440"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_strict_unions_match",
            "value": 557.4966727774682,
            "unit": "iter/sec",
            "range": "stddev: 0.00006582727606911268",
            "extra": "mean: 1.7937326782919876 msec\nrounds: 516"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_collection_of_union",
            "value": 8481.069513434248,
            "unit": "iter/sec",
            "range": "stddev: 0.000006163611492844125",
            "extra": "mean: 117.90965731573978 usec\nrounds: 3814"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_type_hooks",
            "value": 547.3715796216522,
            "unit": "iter/sec",
            "range": "stddev: 0.000048767621765068464",
            "extra": "mean: 1.8269125347925594 msec\nrounds: 503"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_casting",
            "value": 153236.06678957102,
            "unit": "iter/sec",
            "range": "stddev: 7.780518849125574e-7",
            "extra": "mean: 6.525878802235468 usec\nrounds: 12624"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_forward_references",
            "value": 550.540412817688,
            "unit": "iter/sec",
            "range": "stddev: 0.00012405829923277452",
            "extra": "mean: 1.816397083153187 msec\nrounds: 457"
          },
          {
            "name": "tests/performance/test_from_dict.py::test_parsing_multiple_items",
            "value": 22.060733729409005,
            "unit": "iter/sec",
            "range": "stddev: 0.0023119255724296985",
            "extra": "mean: 45.32940800001168 msec\nrounds: 18"
          }
        ]
      }
    ]
  }
}