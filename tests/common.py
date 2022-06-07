import sys

import pytest

literal_support = init_var_type_support = pytest.mark.skipif(sys.version_info < (3, 8), reason="requires Python 3.8")
pep_604_support = pytest.mark.skipif(sys.version_info < (3, 10), reason="requires Python 3.10")
