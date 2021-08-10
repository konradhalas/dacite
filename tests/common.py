import sys

import pytest

ndarray_support = pytest.mark.skipif(sys.version_info < (3, 7), reason="requires Python 3.7")
literal_support = init_var_type_support = pytest.mark.skipif(sys.version_info < (3, 8), reason="requires Python 3.8")
type_hints_with_generic_collections_support = pytest.mark.skipif(
    sys.version_info < (3, 9), reason="requires Python 3.9"
)
pep_604_support = pytest.mark.skipif(sys.version_info < (3, 10), reason="requires Python 3.10")
