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
      - name: Setup clojure-lsp
        uses: clojure-lsp/setup-clojure-lsp@v1
        with:
          clojure-lsp-version: 2021.07.01-19.49.02

      - name: Check clojure-lsp version
        run: clojure-lsp --version
```
