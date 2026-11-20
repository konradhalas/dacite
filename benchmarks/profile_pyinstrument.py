"""Inclusive-time aggregation of selected functions with pyinstrument (sampling, no root needed).

PYTHONPATH=. python benchmarks/profile_pyinstrument.py
"""

import sys, json, collections
from pyinstrument import Profiler
from dacite import from_dict
from benchmarks.scenarios import BY_NAME


def run(name, loops):
    sc = BY_NAME[name]
    d = sc.data()
    cfg = sc.dacite_config()
    for _ in range(5):
        from_dict(sc.cls, d, cfg)
    p = Profiler(interval=0.0002)
    p.start()
    for _ in range(loops):
        from_dict(sc.cls, d, cfg)
    p.stop()
    root = json.loads(p.output(__import__("pyinstrument.renderers.jsonrenderer", fromlist=["x"]).JSONRenderer()))[
        "root_frame"
    ]
    tot = root["time"]
    incl = collections.Counter()
    selft = collections.Counter()

    def walk(f, stack):
        key = f["function"] + " " + f["file_path_short"].split("/")[-1]
        if key not in stack:
            incl[key] += f["time"]
        selft[key] += f.get("time", 0) - sum(c["time"] for c in f.get("children", []))
        for c in f.get("children", []):
            walk(c, stack | {key})

    walk(root, frozenset())
    print(f"\n## {name}: inclusive share of selected functions (no recursion double-count)")
    for k in [
        "__hash__ typing.py",
        "is_instance types.py",
        "_build_value core.py",
        "from_dict core.py",
        "orig generics.py",
        "get_origin typing.py",
        "is_dataclass dataclasses.py",
        "__init__ exceptions.py",
    ]:
        for kk, v in incl.items():
            if kk.startswith(k.split()[0]) and kk.endswith(k.split()[1]):
                print(f"  {kk:40s} {100*v/tot:5.1f}%")
    print("  top self-time:", ", ".join(f"{k.strip()} {100*v/tot:.0f}%" for k, v in selft.most_common(6)))


for n, l in [("flat10", 30000), ("opt_literal", 20000), ("union_dataclasses", 3000), ("big_list_10k", 8)]:
    run(n, l)
