# setup-clojure-lsp

This action sets up [clojure-lsp](https://github.com/clojure-lsp/clojure-lsp) environment for using in GitHub Actions.
So you can use a clojure interpreter in your CI environment.

# Usage

```yaml
name: Simple example of using the clojure-lsp action

on: [push]

jobs:
  simple:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Setup clojure-lsp
        uses: clojure-lsp/setup-clojure-lsp@v1
        with:
          clojure-lsp-version: 2022.03.26-18.47.08

      - name: Check clojure-lsp version
        run: clojure-lsp --version
```

Remember to install the build tool for your project, this is required for clojure-lsp scan the project classpath correctly, for example cleaning the namespaces on a `deps.edn` project:

```yaml
name: Check if namespaces are clean

on: [push]

jobs:
  simple:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - name: Install Clojure
        uses: DeLaGuardo/setup-clojure@master
        with:
          cli: '1.10.3.814'

      - name: Setup clojure-lsp
        uses: clojure-lsp/setup-clojure-lsp@v1
        with:
          clojure-lsp-version: 2022.03.26-18.47.08

      - name: check if clean-ns return no diffs
        run: clojure-lsp clean-ns --dry
```
