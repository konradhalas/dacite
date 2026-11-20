"""Render benchmark JSON files into Markdown tables.

    python -m benchmarks.report benchmarks/results/baseline.json [more.json ...] > tables.md
"""
import json
import sys
from typing import Any, Dict, List

from .scenarios import SCENARIOS


def fmt_us(v: float) -> str:
    if v >= 1000:
        return f"{v / 1000:.2f} ms"
    return f"{v:.2f} µs" if v < 100 else f"{v:.0f} µs"


def load(paths: List[str]) -> List[Dict[str, Any]]:
    return [json.load(open(p)) for p in paths]


def columns(runs):
    cols = []  # (column title, run, lib)
    for run in runs:
        for key in run["results"]:
            lib = key.split("|")[0]
            if (run["label"], lib) not in [(c[1]["label"], c[2]) for c in cols]:
                cols.append((run["label"] if lib == "dacite" else f"{lib} {run['versions'].get(lib, '')}", run, lib))
    # dacite first
    cols.sort(key=lambda c: (c[2] != "dacite", c[0]))
    seen, out = set(), []
    for c in cols:
        if c[0] in seen:
            continue
        seen.add(c[0])
        out.append(c)
    return out


def table(runs, metric: str, title: str, fmt) -> str:
    cols = columns(runs)
    lines = [f"#### {title}", "", "| scenario | " + " | ".join(c[0] for c in cols) + " | dacite ÷ best other |", "|---|" + "---:|" * (len(cols) + 1)]
    for sc in SCENARIOS:
        cells, vals = [], {}
        for title_, run, lib in cols:
            res = run["results"].get(f"{lib}|{sc.name}")
            if not res:
                cells.append("–")
            elif res["status"] != "ok":
                cells.append(res["status"].split(" (")[0])
            elif metric not in res:
                cells.append("–")
            else:
                cells.append(fmt(res[metric]))
                vals[title_] = res[metric]
        d = [v for t, v in vals.items() if t.startswith("dacite")]
        o = [v for t, v in vals.items() if not t.startswith("dacite")]
        ratio = f"{d[0] / min(o):.1f}×" if d and o and metric != "rss_delta_mb" else "–"
        lines.append(f"| `{sc.name}` | " + " | ".join(cells) + f" | {ratio} |")
    return "\n".join(lines)


if __name__ == "__main__":
    runs = load(sys.argv[1:])
    print(f"_Python {runs[0]['python']}, {runs[0]['machine']}_\n")
    print(table(runs, "warm_min_us", "Warm call (min of 7 repeats, per conversion)", fmt_us))
    print()
    print(table(runs, "cold_us", "Cold call: build + first conversion in a fresh interpreter (median of 9)", fmt_us))
    print()
    print(table(runs, "tm_peak_kb", "tracemalloc peak during one warm conversion (KiB, includes result objects)", lambda v: f"{v:,.1f}"))
    print()
    print(table(runs, "rss_delta_mb", "Peak RSS growth for one conversion of the 10k list (MiB)", lambda v: f"{v:,.1f}"))
