from setuptools import setup

try:
    import pypandoc

    long_description = pypandoc.convert('README.md', 'rst')
except(IOError, ImportError):
    long_description = open('README.md').read()

setup(
    name='dacite',
    version='0.0.9',
    description='Simple creation of data classes from dictionaries.',
    long_description=long_description,
    author='Konrad Hałas',
    author_email='halas.konrad@gmail.com',
    url='https://github.com/konradhalas/dacite',
    license='MIT',
    classifiers=[
        'Programming Language :: Python :: 3.6',
    ],
    python_requires='>=3.6',
    keywords='dataclasses',
    py_modules=['dacite'],
    install_requires=['dataclasses'],
)
