PHONY: test

test:
	npm test

deploy: test
	npm run deploy