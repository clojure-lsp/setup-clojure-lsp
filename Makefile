build:
	yarn install

package: build
	yarn package

bump-deps:
	yarn upgrade --latest

release: package
