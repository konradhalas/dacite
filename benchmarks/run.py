"""Benchmark harness.

    python -m benchmarks.run all   --label dacite-1.9.2 --out benchmarks/results/v1.json
    python -m benchmarks.run all   --label dacite-v2 --libs dacite --out benchmarks/results/v2.json

Measurements per (library, scenario):
  * warm_us   - time of one conversion after warm-up (min / median of repeats, GC enabled)
  * cold_us   - time of "first conversion for this type" in a FRESH interpreter (median of N runs):
                includes type introspection, schema/plan building, TypeAdapter/Converter construction
  * tm_peak_kb - tracemalloc peak during one warm conversion (includes the result objects)
  * rss_mb    - peak-RSS growth caused by one conversion (fresh process, big_list scenario only)

Correctness guard: every result must equal the result of dacite on the same input, otherwise it is flagged
and its timings are not reported (no benchmarking of something that does the wrong thing).
"""

import argparse
import gc
import json
import os
import platform
import resource
import statistics
import subprocess
import sys
import time
import tracemalloc
from typing import Any, Dict, List, Optional

from .backends import BUILDERS, versions
from .scenarios import BY_NAME, SCENARIOS, WARMUP, Scenario


def oracle(sc: Scenario, data: Any) -> Any:
    from dacite import from_dict

    cfg = sc.dacite_config()
    return from_dict(sc.cls, data, cfg) if cfg else from_dict(sc.cls, data)


def time_warm(fn, arg, target=0.25, repeat=7):
    """Return (min, median) seconds per call."""
    n = 1
    while True:
        t0 = time.perf_counter()
        for _ in range(n):
            fn(arg)
        dt = time.perf_counter() - t0
        if dt >= 0.05 or n >= 1 << 20:
            break
        n *= 2
    n = max(1, int(n * target / max(dt, 1e-9)))
    samples = []
    for _ in range(repeat):
        t0 = time.perf_counter()
        for _ in range(n):
            fn(arg)
        samples.append((time.perf_counter() - t0) / n)
    return min(samples), statistics.median(samples)


def tracemalloc_peak(fn, arg) -> int:
    gc.collect()
    tracemalloc.start()
    base = tracemalloc.get_traced_memory()[0]
    result = fn(arg)
    peak = tracemalloc.get_traced_memory()[1]
    tracemalloc.stop()
    del result
    return peak - base


def bench_warm(lib: str, sc: Scenario) -> Dict[str, Any]:
    data = sc.data()
    try:
        convert = BUILDERS[lib](sc)
        result = convert(data)
    except Exception as exc:  # pylint: disable=broad-except
        return {"status": f"N/A ({type(exc).__name__}: {str(exc)[:80]})"}
    if result != oracle(sc, data):
        return {"status": "MISMATCH"}
    for _ in range(3):
        convert(data)
    best, med = time_warm(convert, data)
    return {
        "status": "ok",
        "warm_min_us": best * 1e6,
        "warm_med_us": med * 1e6,
        "tm_peak_kb": tracemalloc_peak(convert, data) / 1024,
    }


# --- subprocess probes ---------------------------------------------------------------------------------------------
def cold_one(lib: str, name: str) -> float:
    """Time (seconds) of build + first conversion; measured inside a fresh interpreter."""
    sc = BY_NAME[name]
    data = sc.data()
    oracle(WARMUP, WARMUP.data())  # import dacite (oracle) outside the measured region
    BUILDERS[lib](WARMUP)(WARMUP.data())  # import the library under test; scenario type itself stays cold
    gc.collect()
    t0 = time.perf_counter()
    convert = BUILDERS[lib](sc)
    convert(data)
    return time.perf_counter() - t0


def rss_one(lib: str, name: str) -> Dict[str, float]:
    sc = BY_NAME[name]
    data = sc.data()
    BUILDERS[lib](WARMUP)(WARMUP.data())  # import + tiny warm-up on an unrelated type
    gc.collect()
    scale = 1 if sys.platform == "darwin" else 1024  # ru_maxrss: bytes on macOS, KiB on Linux
    before = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss * scale
    convert = BUILDERS[lib](sc)
    result = convert(data)
    after = resource.getrusage(resource.RUSAGE_SELF).ru_maxrss * scale
    assert result is not None
    return {"rss_before_mb": before / 2**20, "rss_delta_mb": (after - before) / 2**20}


def _spawn(*args: str) -> str:
    env = dict(os.environ, PYTHONHASHSEED="0")
    out = subprocess.run(
        [sys.executable, "-m", "benchmarks.run", *args], capture_output=True, text=True, env=env, check=True
    )
    return out.stdout.strip().splitlines()[-1]


def bench_cold(lib: str, name: str, runs: int) -> float:
    samples = [float(_spawn("cold-one", lib, name)) for _ in range(runs)]
    return statistics.median(samples) * 1e6


def bench_rss(lib: str, name: str, runs: int = 3) -> Dict[str, float]:
    outs = [json.loads(_spawn("rss-one", lib, name)) for _ in range(runs)]
    return {k: statistics.median(o[k] for o in outs) for k in outs[0]}


def main(argv: Optional[List[str]] = None) -> None:
    p = argparse.ArgumentParser()
    p.add_argument("cmd", choices=["all", "warm", "cold-one", "rss-one"])
    p.add_argument("pos", nargs="*")
    p.add_argument("--label", default="run")
    p.add_argument("--libs", default="dacite,msgspec,pydantic,cattrs")
    p.add_argument("--scenarios", default="")
    p.add_argument("--cold-runs", type=int, default=9)
    p.add_argument("--skip-cold", action="store_true")
    p.add_argument("--out", default="")
    args = p.parse_args(argv)

    if args.cmd == "cold-one":
        print(cold_one(*args.pos))
        return
    if args.cmd == "rss-one":
        print(json.dumps(rss_one(*args.pos)))
        return

    libs = args.libs.split(",")
    names = args.scenarios.split(",") if args.scenarios else [s.name for s in SCENARIOS]
    results: Dict[str, Dict[str, Any]] = {}
    for name in names:
        sc = BY_NAME[name]
        for lib in libs:
            if lib not in sc.libs:
                continue
            key = f"{lib}|{name}"
            print(f"[{args.label}] {key}", file=sys.stderr, flush=True)
            res = bench_warm(lib, sc)
            if res["status"] == "ok" and args.cmd == "all":
                if not args.skip_cold:
                    res["cold_us"] = bench_cold(lib, name, args.cold_runs)
                if name.startswith("big_list"):
                    res.update(bench_rss(lib, name))
            results[key] = res
    payload = {
        "label": args.label,
        "python": platform.python_version(),
        "machine": f"{platform.machine()} {platform.system()}",
        "versions": versions(),
        "results": results,
    }
    text = json.dumps(payload, indent=1)
    if args.out:
        os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)
        with open(args.out, "w") as fh:
            fh.write(text)
    else:
        print(text)


if __name__ == "__main__":
    main()
