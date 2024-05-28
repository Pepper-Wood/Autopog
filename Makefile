.PHONY: help
help:             ## Show the help.
	@echo "Usage: make <target>"
	@echo ""
	@echo "Targets:"
	@fgrep "##" Makefile | fgrep -v fgrep


.PHONY: install
install:          ## Install all dependencies.
	rm -rf node_modules
	touch package-lock.json
	rm package-lock.json
	npm install

.PHONY: node-modules
node-modules:     ## Rebuild node_modules/ folder with only "dependencies", not "devDependencies".
	rm -rf node_modules
	touch package-lock.json
	rm package-lock.json
	npm install --omit=dev

.PHONY: lint
lint:             ## Run all linting commands.
lint: lint-html lint-js

.PHONY: lint-html
lint-html:        ## Lint HTML files.
	# Use pa11y for checking HTML accessibility.
	realpath index.html | xargs -I{} node_modules/pa11y/bin/pa11y.js {}
	realpath twitch.html | xargs -I{} node_modules/pa11y/bin/pa11y.js {}

.PHONY: jslint
lint-js:          ## Lint JavaScript files.
	node_modules/eslint/bin/eslint.js js --fix
