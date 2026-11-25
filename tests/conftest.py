from sys import version_info


collect_ignore = []
if version_info < (3, 12):
    # The type alias tests use the "type" keyword, which was introduced in Python 3.12.
    # Evaluating this file on older versions would cause a SyntaxError.
    collect_ignore.append('core/test_type_alias.py')
