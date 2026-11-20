"""Hypothesis strategies: random dataclass schemas, valid input data, corrupted input data and Config options.

Pipeline:  spec (plain tuples)  ->  `Materializer` (real dataclasses + per-class metadata)  ->  `gen_value`
(valid data for the spec)  ->  `mutate` (corruption).  Specs are plain tuples so Hypothesis can shrink them.

Covered features: nested dataclasses, Optional/Union (incl. unions of dataclasses and PEP 604 flavours), Literal,
Enum (+cast), NewType, list/set/tuple/Tuple[...]/Dict, Any, generics (+inheritance), self referencing dataclasses
(forward references as strings), defaults, default_factory, init=False fields, InitVar, frozen/slots/kw_only,
`__post_init__` raising, `type_hooks`, `cast`, `strict`, `strict_unions_match`, `convert_key`, `check_types`.
"""

import copy
import itertools
import sys
from collections import OrderedDict, defaultdict
from dataclasses import InitVar, dataclass, field, make_dataclass
from enum import Enum
from typing import Any, Dict, Generic, List, Literal, NewType, Optional, Set, Tuple, TypeVar, Union

import hypothesis.strategies as st

_T = TypeVar("_T")
_U = TypeVar("_U")


@dataclass
class Box(Generic[_T]):
    item: _T
    items: List[_T]


@dataclass
class Duo(Generic[_T, _U]):
    first: _T
    second: _U


@dataclass
class IntBox(Box[int]):
    extra: str = "x"


class Color(Enum):
    RED = "red"
    GREEN = "green"


MyInt = NewType("MyInt", int)
MyStr = NewType("MyStr", str)

PRIMS = {"int": int, "str": str, "float": float, "bool": bool}


# --- hooks / casts / key conversion ---------------------------------------------------------------------------------
def _strip(value):
    return value.strip() if isinstance(value, str) else value


def _inc(value):
    return value + 1 if type(value) is int else value


HOOKS = {
    "none": {},
    "str": {str: _strip},
    "int": {int: _inc},
    "both": {str: _strip, int: _inc},
    "opt_int": {Optional[int]: _inc},
}
CASTS = [Color, int, str, float, list, tuple, set]


def convert_key_fn(style: str):
    return None if style == "identity" else (lambda name: "k_" + name)


# --- specs -----------------------------------------------------------------------------------------------------------
def _prim():
    return st.sampled_from(sorted(PRIMS)).map(lambda n: ("prim", n))


def _literal():
    values = st.one_of(st.sampled_from(["a", "b", "c"]), st.integers(0, 3))
    return st.lists(values, min_size=1, max_size=3, unique=True).map(lambda v: ("literal", tuple(v)))


def _leaf():
    return st.one_of(
        _prim(),
        _prim(),
        st.just(("any",)),
        st.just(("none",)),
        _literal(),
        st.just(("enum",)),
        st.sampled_from([("newtype", "int"), ("newtype", "str")]),
        st.sampled_from(["int", "str"]).map(lambda n: ("box", ("prim", n))),
        st.sampled_from(["int", "str"]).map(lambda n: ("duo", ("prim", n), ("prim", "int"))),
        st.just(("intbox",)),
    )


def _dataclass_spec(children):
    field_spec = st.tuples(children, st.sampled_from(["req", "req", "default", "default", "init_false"]))
    return st.fixed_dictionaries(
        {
            "fields": st.lists(field_spec, min_size=1, max_size=4),
            "initvars": st.lists(st.sampled_from(["int", "str"]), max_size=1),
            "frozen": st.booleans(),
            "slots": st.booleans(),
            "kw_only": st.booleans(),
            "post_init": st.sampled_from([False, False, False, True]),
            "recursive": st.sampled_from([False, False, False, True]),
            "broken_ref": st.sampled_from([False] * 9 + [True]),
        }
    ).map(lambda d: ("dc", _freeze(d)))


def _freeze(d):
    return {**d, "fields": tuple(d["fields"]), "initvars": tuple(d["initvars"])}


def _extend(children):
    return st.one_of(
        children.map(lambda s: ("optional", s)),
        children.map(lambda s: ("optional_none_first", s)),
        st.lists(children, min_size=2, max_size=3).map(lambda m: ("union", tuple(m))),
        children.map(lambda s: ("list", s)),
        st.sampled_from(["int", "str"]).map(lambda n: ("set", n)),
        st.lists(children, min_size=1, max_size=3).map(lambda m: ("tuple", tuple(m))),
        children.map(lambda s: ("tuple_var", s)),
        children.map(lambda s: ("dict", s)),
        _dataclass_spec(children),
        _dataclass_spec(children),
    )


def type_specs():
    return st.recursive(_leaf(), _extend, max_leaves=7)


def schemas():
    """Top-level spec: always a dataclass."""
    return _dataclass_spec(type_specs())


# --- materialisation -------------------------------------------------------------------------------------------------
_counter = itertools.count()
_MODULE = sys.modules[__name__]


@dataclass
class FieldInfo:
    name: str
    spec: tuple
    has_default: bool
    init: bool


@dataclass
class DCInfo:
    cls: type
    fields: List[FieldInfo]
    initvars: List[Tuple[str, str]]
    recursive: bool


def _default_for(spec):
    """(kind, value) of a sensible default for a spec, or None."""
    kind = spec[0]
    if kind == "prim":
        return "value", {"int": 0, "str": "d", "float": 0.5, "bool": False}[spec[1]]
    if kind in ("none", "optional", "optional_none_first"):
        return "value", None
    if kind == "literal":
        return "value", spec[1][0]
    if kind == "list":
        return "factory", list
    if kind == "set":
        return "factory", set
    if kind == "dict":
        return "factory", dict
    if kind == "tuple_var":
        return "value", ()
    return None


class Materializer:
    """Turns specs into real types. Keeps per-dataclass metadata used by the data generator. Use as context manager:
    on exit names registered for string forward references are removed again."""

    def __init__(self):
        self.infos: Dict[int, DCInfo] = {}
        self._memo: Dict[int, Any] = {}
        self._keep: List[Any] = []
        self._registered: List[str] = []

    def __enter__(self):
        return self

    def __exit__(self, *exc):
        for name in self._registered:
            _MODULE.__dict__.pop(name, None)
        return False

    def type_of(self, spec):  # pylint: disable=too-many-return-statements,too-many-branches
        kind = spec[0]
        if kind == "prim":
            return PRIMS[spec[1]]
        if kind == "any":
            return Any
        if kind == "none":
            return type(None)
        if kind == "literal":
            return Literal[spec[1]]  # type: ignore[valid-type]
        if kind == "enum":
            return Color
        if kind == "newtype":
            return MyInt if spec[1] == "int" else MyStr
        if kind == "box":
            return Box[self.type_of(spec[1])]  # type: ignore[misc]
        if kind == "duo":
            return Duo[self.type_of(spec[1]), self.type_of(spec[2])]  # type: ignore[misc]
        if kind == "intbox":
            return IntBox
        if kind == "optional":
            return Optional[self.type_of(spec[1])]
        if kind == "optional_none_first":
            return Union[None, self.type_of(spec[1])]
        if kind == "union":
            return Union[tuple(self.type_of(s) for s in spec[1])]
        if kind == "list":
            return List[self.type_of(spec[1])]  # type: ignore[misc]
        if kind == "set":
            return Set[PRIMS[spec[1]]]  # type: ignore[misc]
        if kind == "tuple":
            return Tuple[tuple(self.type_of(s) for s in spec[1])]  # type: ignore[misc]
        if kind == "tuple_var":
            return Tuple[self.type_of(spec[1]), ...]  # type: ignore[misc]
        if kind == "dict":
            return Dict[str, self.type_of(spec[1])]  # type: ignore[misc]
        if kind == "dc":
            return self._dataclass(spec)
        raise AssertionError(kind)

    def _dataclass(self, spec):
        if id(spec) in self._memo:
            return self._memo[id(spec)]
        self._keep.append(spec)
        opts = spec[1]
        name = f"DC{next(_counter)}"
        fields_meta, required, defaulted = [], [], []
        for index, (fspec, mode) in enumerate(opts["fields"]):
            fname = f"f{index}"
            ftype = self.type_of(fspec)
            default = _default_for(fspec)
            if mode == "req" or default is None:
                required.append((fname, ftype, field()))
                fields_meta.append(FieldInfo(fname, fspec, False, True))
                continue
            kwargs = {"default" if default[0] == "value" else "default_factory": default[1]}
            if mode == "init_false":
                kwargs["init"] = False
            item = (fname, ftype, field(**kwargs))
            (required if opts["kw_only"] else defaulted).append(item)
            fields_meta.append(FieldInfo(fname, fspec, True, mode != "init_false"))
        initvars = []
        for index, prim in enumerate(opts["initvars"]):
            iname = f"iv{index}"
            required.append((iname, InitVar[PRIMS[prim]], field()))  # type: ignore[valid-type]
            initvars.append((iname, prim))
        if opts["recursive"]:
            defaulted.append(("parent_ref", f'Optional["{name}"]', field(default=None)))
            defaulted.append(("kids", f'List["{name}"]', field(default_factory=list)))
        if opts["broken_ref"]:  # unresolvable string annotation -> ForwardReferenceError at from_dict time
            defaulted.append(("ghost", f'"Undefined{name}"', field(default=None)))
        namespace = {}
        if opts["post_init"]:

            def __post_init__(self, *_initvars):  # pylint: disable=invalid-name
                for f in self.__dataclass_fields__.values():
                    if type(getattr(self, f.name, None)) is int and getattr(self, f.name) < 0:
                        raise ValueError("negative")

            namespace["__post_init__"] = __post_init__
        cls = make_dataclass(
            name,
            required + defaulted,
            namespace=namespace,
            frozen=opts["frozen"],
            slots=opts["slots"],
            kw_only=opts["kw_only"],
        )
        cls.__module__ = __name__
        if opts["recursive"]:
            _MODULE.__dict__[name] = cls
            self._registered.append(name)
        self._memo[id(spec)] = cls
        self.infos[id(spec)] = DCInfo(cls, fields_meta, initvars, opts["recursive"])
        return cls


# --- data ------------------------------------------------------------------------------------------------------------
_texts = st.text(alphabet="abc ", max_size=3)
_scalars = st.one_of(st.none(), st.integers(-3, 3), _texts)


def _container(draw, items, kind):
    """Sometimes use a dict/list subclass-ish container to exercise container type preservation."""
    return items


@st.composite
def gen_value(draw, mat, spec, cfg, depth=2):  # pylint: disable=too-many-return-statements,too-many-branches
    """Draw data that is valid for `spec` (modulo the intentional quirks of v1)."""
    kind = spec[0]
    cast = cfg.get("cast", ())
    if kind == "prim":
        name = spec[1]
        if name == "int":
            return draw(st.integers(-3, 20))
        if name == "str":
            return draw(_texts)
        if name == "float":
            return draw(st.one_of(st.floats(-10, 10, allow_nan=False), st.integers(-3, 3)))
        return draw(st.booleans())
    if kind == "any":
        return draw(st.one_of(_scalars, st.lists(st.integers(0, 2), max_size=2)))
    if kind == "none":
        return None
    if kind == "literal":
        return draw(st.sampled_from(spec[1]))
    if kind == "enum":
        member = draw(st.sampled_from(list(Color)))
        return member.value if Color in cast or draw(st.booleans()) else member
    if kind == "newtype":
        return draw(st.integers(-3, 9)) if spec[1] == "int" else draw(_texts)
    if kind == "box":
        inner = spec[1]
        return {
            "item": draw(gen_value(mat, inner, cfg, depth)),
            "items": draw(st.lists(gen_value(mat, inner, cfg, depth), max_size=2)),
        }
    if kind == "duo":
        return {
            "first": draw(gen_value(mat, spec[1], cfg, depth)),
            "second": draw(gen_value(mat, spec[2], cfg, depth)),
        }
    if kind == "intbox":
        data = {"item": draw(st.integers(0, 5)), "items": draw(st.lists(st.integers(0, 5), max_size=2))}
        if draw(st.booleans()):
            data["extra"] = draw(_texts)
        return data
    if kind in ("optional", "optional_none_first"):
        return None if draw(st.booleans()) else draw(gen_value(mat, spec[1], cfg, depth))
    if kind == "union":
        return draw(gen_value(mat, draw(st.sampled_from(spec[1])), cfg, depth))
    if kind == "list":
        return draw(st.lists(gen_value(mat, spec[1], cfg, depth), max_size=3))
    if kind == "set":
        return draw(st.sets(st.integers(0, 4) if spec[1] == "int" else st.sampled_from(["a", "b", "c"]), max_size=3))
    if kind == "tuple":
        return tuple(draw(gen_value(mat, s, cfg, depth)) for s in spec[1])
    if kind == "tuple_var":
        return tuple(draw(st.lists(gen_value(mat, spec[1], cfg, depth), max_size=3)))
    if kind == "dict":
        values = st.dictionaries(st.sampled_from(["a", "b", "c"]), gen_value(mat, spec[1], cfg, depth), max_size=3)
        data = draw(values)
        container = draw(st.sampled_from([dict, dict, dict, OrderedDict, defaultdict]))
        if container is defaultdict:
            return defaultdict(None, data)
        return container(data)
    if kind == "dc":
        return draw(gen_dc(mat, spec, cfg, depth))
    raise AssertionError(kind)


@st.composite
def gen_dc(draw, mat, spec, cfg, depth=2):
    info = mat.infos[id(spec)]
    key = convert_key_fn(cfg.get("key_style", "identity")) or (lambda n: n)
    data = {}
    for f in info.fields:
        if f.has_default or not f.init:
            include = draw(st.booleans()) if f.init else draw(st.sampled_from([False, False, True]))
            if not include:
                continue
        data[key(f.name)] = draw(gen_value(mat, f.spec, cfg, depth))
    for name, prim in info.initvars:
        data[key(name)] = draw(gen_value(mat, ("prim", prim), cfg, depth))
    if info.recursive and depth > 0:
        if draw(st.booleans()):
            data[key("parent_ref")] = draw(gen_dc(mat, spec, cfg, depth - 1))
        data[key("kids")] = draw(st.lists(gen_dc(mat, spec, cfg, depth - 1), max_size=2))
    return data


# --- corruption ------------------------------------------------------------------------------------------------------
_BAD = [None, "x", 123, 1.5, True, [], {}, [1], {"a": 1}, (), (1, "x"), {1, 2}]


def _paths(node, prefix=()):
    """All addressable positions (path tuples) below `node`; sets are leaves."""
    if isinstance(node, dict):
        for k, v in node.items():
            yield prefix + (k,)
            yield from _paths(v, prefix + (k,))
    elif isinstance(node, (list, tuple)):
        for i, v in enumerate(node):
            yield prefix + (i,)
            yield from _paths(v, prefix + (i,))


def _rebuild(node, path, fn):
    """Return a copy of `node` where the position `path` is transformed by `fn(parent_container, key)`."""
    if len(path) == 1:
        return fn(node, path[0])
    head, rest = path[0], path[1:]
    child = _rebuild(node[head], rest, fn)
    if isinstance(node, dict):
        new = copy.copy(node)
        new[head] = child
        return new
    items = list(node)
    items[head] = child
    return type(node)(items) if isinstance(node, tuple) else items


@st.composite
def mutate(draw, data):
    """Return a corrupted copy of valid `data`: wrong leaf, missing key, extra key or confused container type."""
    paths = list(_paths(data))
    op = draw(st.sampled_from(["replace", "replace", "delete", "extra", "retype"]))
    if op == "extra" or not paths:
        out = copy.copy(data)
        out["__extra__"] = draw(st.sampled_from(_BAD))
        return out
    path = draw(st.sampled_from(paths))
    if op == "replace":
        bad = draw(st.sampled_from(_BAD))
        return _rebuild(data, path, lambda parent, key: _with(parent, key, bad))
    if op == "delete":

        def delete(parent, key):
            if isinstance(parent, dict):
                out = copy.copy(parent)
                del out[key]
                return out
            return _with(parent, key, None)

        return _rebuild(data, path, delete)

    def retype(parent, key):
        value = parent[key]
        if isinstance(value, (list, tuple)):
            value = tuple(value) if isinstance(value, list) else list(value)
        elif isinstance(value, dict):
            value = list(value.items())
        else:
            value = [value]
        return _with(parent, key, value)

    return _rebuild(data, path, retype)


def _with(parent, key, value):
    if isinstance(parent, dict):
        out = copy.copy(parent)
        out[key] = value
        return out
    items = list(parent)
    items[key] = value
    return tuple(items) if isinstance(parent, tuple) else items


# --- Config ----------------------------------------------------------------------------------------------------------
def config_params():
    return st.fixed_dictionaries(
        {
            "check_types": st.sampled_from([True, True, True, False]),
            "strict": st.sampled_from([False, False, True]),
            "strict_unions_match": st.sampled_from([False, False, True]),
            "cast": st.lists(st.sampled_from(CASTS), max_size=2, unique=True).map(tuple),
            "hooks": st.sampled_from(sorted(HOOKS)),
            "key_style": st.sampled_from(["identity", "identity", "prefix"]),
        }
    )


def config_kwargs(params):
    """Keyword arguments for `Config(...)` of any implementation."""
    kwargs = {
        "check_types": params["check_types"],
        "strict": params["strict"],
        "strict_unions_match": params["strict_unions_match"],
        "cast": list(params["cast"]),
        "type_hooks": dict(HOOKS[params["hooks"]]),
    }
    convert_key = convert_key_fn(params["key_style"])
    if convert_key is not None:
        kwargs["convert_key"] = convert_key
    return kwargs
