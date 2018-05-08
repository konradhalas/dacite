from setuptools import setup

setup(
    name='dacite',
    version='0.0.15',
    description='Simple creation of data classes from dictionaries.',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    author='Konrad Hałas',
    author_email='halas.konrad@gmail.com',
    url='https://github.com/konradhalas/dacite',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3.6',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    python_requires='>=3.6',
    keywords='dataclasses',
    py_modules=['dacite'],
    install_requires=['dataclasses'],
)
