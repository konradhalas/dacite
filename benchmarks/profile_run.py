"""cProfile breakdown of warm dacite calls, aggregated into buckets.

    python -m benchmarks.profile_run [scenario ...]

cProfile only sees Python frames and C *functions*; `functools.lru_cache` wrappers are not recorded separately,
so their lookup cost (hashing args incl. `typed=True`) is attributed to the calling function's own time.
"""
import cProfile
import pstats
import sys
from collections import defaultdict

from dacite import from_dict

from .scenarios import BY_NAME

BUCKETS = {
    # (module file suffix, function name) -> bucket ; first match wins
    "type introspection": {
        "types.py": {
            "is_optional", "is_union", "is_generic", "is_generic_collection", "extract_generic",
            "extract_origin_collection", "is_subclass", "is_init_var", "extract_init_var", "is_tuple",
            "is_literal", "is_new_type", "extract_new_type", "is_type_generic", "is_generic_dataclass",
            "extract_optional",
        },
        "generics.py": {"orig", "get_fields", "get_concrete_type_hints"},
        "dataclasses.py": {"get_fields", "is_frozen"},
    },
    "type checking (is_instance)": {"types.py": {"is_instance"}},
    "dispatch (_build_*)": {"core.py": {"_build_value", "_build_value_for_union", "_build_value_for_collection"}},
    "from_dict body (per-field loop, config, defaults)": {
        "core.py": {"from_dict", "<genexpr>", "<lambda>"},
        "dataclasses.py": {"get_default_value_for_field"},
        "config.py": {"hashable_forward_references"},
    },
    "cache plumbing (cache())": {"cache.py": {"cache", "get_cache_size"}},
}


def bucket(filename: str, func: str) -> str:
    base = filename.rsplit("/", 1)[-1]
    for name, mapping in BUCKETS.items():
        if base in mapping and func in mapping[base]:
            return name
    if "dataclasses" in filename and "site-packages" not in filename and base == "dataclasses.py" and "dacite" not in filename:
        return "object creation (dataclass __init__/setattr)"
    if func in ("__init__", "<string>") or base == "<string>":
        return "object creation (dataclass __init__/setattr)"
    if base in ("typing.py",):
        return "typing module internals"
    if base == "exceptions.py":
        return "exceptions"
    return "builtins / other"


def profile(name: str, top: int = 12, loops: int = 200) -> None:
    sc = BY_NAME[name]
    data = sc.data()
    cfg = sc.dacite_config()
    if name.startswith("big_list"):
        loops = 3
    for _ in range(5):
        from_dict(sc.cls, data, cfg)
    pr = cProfile.Profile()
    pr.enable()
    for _ in range(loops):
        from_dict(sc.cls, data, cfg)
    pr.disable()
    st = pstats.Stats(pr)
    total = sum(v[2] for v in st.stats.values())  # tottime
    agg = defaultdict(float)
    ncalls = defaultdict(int)
    for (fn, _line, func), (_cc, nc, tt, _ct, _callers) in st.stats.items():
        b = bucket(fn, func)
        agg[b] += tt
        ncalls[b] += nc
    print(f"\n### {name}  ({loops} calls, profiler overhead inflates absolute numbers)\n")
    print("| bucket | share | calls/from_dict |")
    print("|---|---:|---:|")
    for b, t in sorted(agg.items(), key=lambda kv: -kv[1]):
        print(f"| {b} | {100 * t / total:.1f}% | {ncalls[b] / loops:.1f} |")
    print(f"\ntop {top} functions by own time:\n")
    print("| function | calls/from_dict | own time share |")
    print("|---|---:|---:|")
    rows = sorted(st.stats.items(), key=lambda kv: -kv[1][2])[:top]
    for (fn, line, func), (_cc, nc, tt, _ct, _c) in rows:
        print(f"| `{fn.rsplit('/', 1)[-1]}:{line}({func})` | {nc / loops:.1f} | {100 * tt / total:.1f}% |")


if __name__ == "__main__":
    for scn in sys.argv[1:] or ["flat10", "nested5", "opt_literal", "union_dataclasses", "collections", "big_list_10k"]:
        profile(scn)
