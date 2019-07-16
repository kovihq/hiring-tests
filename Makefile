PHONY: test install config

install:
    npm install

config:
    npm run config

test:
    npm test

deploy: install config test
    npm run deploy