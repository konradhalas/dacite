"""Benchmark scenarios: dataclasses + input data + (optional) dacite Config.

Every scenario declares which libraries can take part (`libs`). Libraries that can not express the scenario
natively (e.g. `type_hooks`, `forward_references`) are simply not listed - they are reported as N/A, not faked.
"""
import random
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Any, Callable, Dict, List, Literal, Optional, Set, Tuple, Union

ALL_LIBS = ("dacite", "msgspec", "pydantic", "cattrs")
DACITE_ONLY = ("dacite",)


# --- 1. flat dataclass, ~10 simple fields -------------------------------------------------------------------------
@dataclass
class Flat10:
    s1: str
    s2: str
    i1: int
    i2: int
    i3: int
    f1: float
    f2: float
    b1: bool
    b2: bool
    o1: Optional[str] = None


FLAT10_DATA = dict(s1="a", s2="bb", i1=1, i2=2, i3=3, f1=1.5, f2=2.5, b1=True, b2=False, o1="x")


# --- 2. deeply nested (5 levels) ----------------------------------------------------------------------------------
@dataclass
class L5:
    a: int
    b: str
    c: float


@dataclass
class L4:
    leaf: L5
    x: int
    y: str


@dataclass
class L3:
    child: L4
    x: int
    y: str


@dataclass
class L2:
    child: L3
    x: int
    y: str


@dataclass
class L1:
    child: L2
    x: int
    y: str


def _l5():
    return dict(a=1, b="b", c=1.5)


NESTED5_DATA = dict(
    child=dict(
        child=dict(child=dict(leaf=_l5(), x=4, y="four"), x=3, y="three"),
        x=2,
        y="two",
    ),
    x=1,
    y="one",
)


# --- 3. big list of small dataclasses (10k) -----------------------------------------------------------------------
@dataclass
class Item:
    id: int
    name: str
    price: float
    active: bool
    tags: List[str]


@dataclass
class Payload:
    items: List[Item]


def make_big_payload(n: int = 10_000) -> Dict[str, Any]:
    rnd = random.Random(42)
    return dict(
        items=[
            dict(
                id=i,
                name=f"item-{i}",
                price=round(rnd.random() * 100, 2),
                active=bool(i % 2),
                tags=["t%d" % (i % 7), "t%d" % (i % 11)],
            )
            for i in range(n)
        ]
    )


# --- 4a. Optional / Union / Literal (no union of dataclasses - msgspec can't do untagged ones) --------------------
@dataclass
class Dog:
    kind: Literal["dog"]
    name: str
    bark_volume: int


@dataclass
class Cat:
    kind: Literal["cat"]
    name: str
    lives: int


@dataclass
class OptLiteral:
    status: Literal["a", "b", "c"]
    maybe_int: Optional[int]
    maybe_str: Optional[str]
    num: Union[int, str]
    opt_dog: Optional[Dog]
    default_opt: Optional[int] = None


OPT_LITERAL_DATA = dict(
    status="b",
    maybe_int=None,
    maybe_str="s",
    num="seven",
    opt_dog=dict(kind="dog", name="rex", bark_volume=7),
)


# --- 4b. unions of dataclasses -------------------------------------------------------------------------------------
@dataclass
class UnionDC:
    pet: Union[Dog, Cat]
    pets: List[Union[Dog, Cat]]
    maybe_pet: Optional[Union[Dog, Cat]]
    by_name: Dict[str, Union[Dog, Cat]]


UNION_DC_DATA = dict(
    pet=dict(kind="cat", name="tom", lives=9),
    pets=[
        dict(kind="dog", name="rex", bark_volume=3),
        dict(kind="cat", name="tom", lives=9),
        dict(kind="dog", name="fido", bark_volume=5),
        dict(kind="cat", name="kit", lives=2),
    ],
    maybe_pet=dict(kind="dog", name="d", bark_volume=1),
    by_name={"a": dict(kind="cat", name="a", lives=1), "b": dict(kind="dog", name="b", bark_volume=2)},
)


# --- 5. generic collections ---------------------------------------------------------------------------------------
@dataclass
class Pair:
    a: int
    b: str


@dataclass
class Colls:
    lst: List[Pair]
    dct: Dict[str, Pair]
    tup: Tuple[int, str, float]
    tup_var: Tuple[Pair, ...]
    st: Set[int]
    nested: List[List[int]]


COLLS_DATA = dict(
    lst=[dict(a=i, b=str(i)) for i in range(20)],
    dct={f"k{i}": dict(a=i, b=str(i)) for i in range(20)},
    tup=(1, "x", 2.5),
    tup_var=tuple(dict(a=i, b=str(i)) for i in range(10)),
    st=set(range(20)),
    nested=[list(range(10)) for _ in range(10)],
)
# NOTE: tuple/set inputs are given as native tuple/set (dacite 1.x keeps the container type of the input data);
# msgspec/pydantic/cattrs accept them too.


# --- 6. type_hooks + cast (dacite specific) ------------------------------------------------------------------------
class Color(Enum):
    RED = "red"
    GREEN = "green"


@dataclass
class Hooked:
    name: str
    created: datetime
    color: Color
    scores: List[float]
    tag: str = "none"


HOOKED_DATA = dict(name=" Bob ", created="2024-01-02T03:04:05", color="green", scores=[1, 2, 3], tag="t")


# --- 7. forward references (resolved through Config.forward_references) -------------------------------------------
def make_forward_ref_classes():
    @dataclass
    class Inner:
        a: int
        b: str

    @dataclass
    class Outer:
        inner: "Inner"
        inners: List["Inner"]
        opt: Optional["Inner"] = None

    return Inner, Outer


FWD_INNER, FWD_OUTER = make_forward_ref_classes()
FWD_DATA = dict(
    inner=dict(a=1, b="x"),
    inners=[dict(a=i, b=str(i)) for i in range(5)],
    opt=dict(a=9, b="z"),
)


# --- warm-up type: used ONLY to pre-import a library in cold/rss probes, so that import cost is excluded
# while the scenario's own type stays cold ---------------------------------------------------------------------------
@dataclass
class Warmup:
    q: int
    r: str



# --- scenario registry ---------------------------------------------------------------------------------------------
@dataclass
class Scenario:
    name: str
    group: str
    cls: Any
    data: Callable[[], Any]
    libs: Tuple[str, ...] = ALL_LIBS
    config_kwargs: Dict[str, Any] = field(default_factory=dict)
    description: str = ""

    def dacite_config(self):
        from dacite import Config

        return Config(**self.config_kwargs) if self.config_kwargs else None


WARMUP = Scenario("warmup", "-", Warmup, lambda: dict(q=1, r="r"))
_BIG = None


def _big():
    global _BIG
    if _BIG is None:
        _BIG = make_big_payload()
    return _BIG


SCENARIOS: List[Scenario] = [
    Scenario("flat10", "flat", Flat10, lambda: FLAT10_DATA, description="flat dataclass, 10 simple fields"),
    Scenario("nested5", "nested", L1, lambda: NESTED5_DATA, description="5 levels of nested dataclasses"),
    Scenario("big_list_10k", "bulk", Payload, _big, description="list of 10k small dataclasses (5 fields)"),
    Scenario("opt_literal", "union", OptLiteral, lambda: OPT_LITERAL_DATA, description="Optional/Literal/Union[int,str]"),
    Scenario(
        "union_dataclasses",
        "union",
        UnionDC,
        lambda: UNION_DC_DATA,
        libs=("dacite", "pydantic", "cattrs"),
        description="Union[Dog, Cat] (also in list/dict/Optional)",
    ),
    Scenario("collections", "collections", Colls, lambda: COLLS_DATA, description="list/dict/tuple/set of dataclasses+ints"),
    Scenario(
        "type_hooks_cast",
        "config",
        Hooked,
        lambda: HOOKED_DATA,
        libs=DACITE_ONLY,
        config_kwargs=dict(
            type_hooks={str: str.strip, datetime: datetime.fromisoformat},
            cast=[Color],
        ),
        description="type_hooks (str, datetime) + cast (Enum)",
    ),
    Scenario(
        "forward_refs",
        "config",
        FWD_OUTER,
        lambda: FWD_DATA,
        libs=DACITE_ONLY,
        config_kwargs=dict(forward_references={"Inner": FWD_INNER}),
        description="string annotations resolved via Config.forward_references",
    ),
    Scenario(
        "flat10_nocheck",
        "check_types",
        Flat10,
        lambda: FLAT10_DATA,
        libs=DACITE_ONLY,
        config_kwargs=dict(check_types=False),
        description="flat10 with check_types=False",
    ),
    Scenario(
        "nested5_nocheck",
        "check_types",
        L1,
        lambda: NESTED5_DATA,
        libs=DACITE_ONLY,
        config_kwargs=dict(check_types=False),
        description="nested5 with check_types=False",
    ),
    Scenario(
        "big_list_10k_nocheck",
        "check_types",
        Payload,
        _big,
        libs=DACITE_ONLY,
        config_kwargs=dict(check_types=False),
        description="big list with check_types=False",
    ),
]
BY_NAME = {s.name: s for s in SCENARIOS}
