build:
	yarn install

package: build
	yarn package

release: package
