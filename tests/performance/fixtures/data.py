simple_data = {
    "attr_string": "some string",
    "attr_string_opt": None,
    "attr_int": 12,
    "attr_list": ["some", "string", "list"],
    "attr_set": {10.2, 365.0, 12.345},
}

nested_data = {
    "nested1": simple_data,
    "nested2": simple_data,
    "nested_list": [simple_data, simple_data, simple_data],
    "nested_dict": {"a": simple_data, "b": simple_data, "c": simple_data},
}

long_union_data = {
    "simple_type_union": True,
    "unrealistically_complex_union": nested_data,
    "unrealistically_complex_union2": [nested_data, nested_data, nested_data],
}

union_collection_data = {"collection": [1, nested_data, [nested_data, nested_data], "string", {"k": "v"}]}


forward_ref_data = {"inner": long_union_data}


cast_data = {"e": "z"}
