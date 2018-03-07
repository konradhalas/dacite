from setuptools import setup

setup(
    name='dacite',
    version='0.0.3',
    description='Simple creation of data classes from dictionaries.',
    author='Konrad Hałas',
    author_email='halas.konrad@gmail.com',
    url='https://github.com/konradhalas/dacite',
    license='MIT',
    classifiers=[
        'Programming Language :: Python :: 3.6',
    ],
    keywords='dataclasses validation',
    py_modules=['dacite'],
    install_requires=['dataclasses'],
)
