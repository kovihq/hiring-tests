# hiring-tests
## how to run
If you don't have serverless installed globally, you need to run:

```bash
npm install -g serverless
```

Commands to run locally after clone the repository

```bash
npm install
serverless offline
```

## Request example

```bash
curl -X POST localhost:3000/array-challenge -d '{"firstArray":[3,2,1,1],"secondArray":[1,2,3,4,5]}'
```

## Tests

To run the tests:

```bash
npm test
```

To run with coverage:

```bash
npm run coverage
```