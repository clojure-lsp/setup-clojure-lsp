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
      - uses: actions/checkout@v6
      - name: Setup clojure-lsp
        uses: clojure-lsp/setup-clojure-lsp@v1
        with:
          clojure-lsp-version: 2026.02.20-16.08.58

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
      - uses: actions/checkout@v6
      - name: Install Clojure
        uses: DeLaGuardo/setup-clojure@main
        with:
          cli: '1.12.4.1618'

      - name: Setup clojure-lsp
        uses: clojure-lsp/setup-clojure-lsp@v1
        with:
          clojure-lsp-version: 2026.02.20-16.08.58

      - name: check if clean-ns return no diffs
        run: clojure-lsp clean-ns --dry
```
