# Queue Message Array Challenge

## Problem:

John receives a message with 2 arrays in his queue, filled with integer elements.
John needs a function that receives only 2 arrays (arr1, arr2) from queue and returns only the elemens that are in both arrays asc sorted.

Example payload : {[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}

Example response: 1, 3, 6, 16

## Write rules:

- Javascript, typescript or elixir

## What we are judging:

- Programming Logic
- Unit Tests
- Deploy flow
- Performance
- Organization & Cleanliness
- Documentation

## What can I use:

Serverless Framework with NodeJS, Phoenix with Elixir, Docker for deploy start.
Any framework, libs for unit tests.

## How to submit:

Fork this repo and implement your solution. Then send us a pull request to this branch with your code.

## SOLUTION

To solve the problem, I create a funciton that receives two arrays, verify which of arrays is the minor, iterate on this minor array and verify if each value of them exists on the oher array. After this, I iterate on values that I found existing in both arrays and order than to return, if necessary.

For this solution, I used the following:

### Microservices

[Docker](https://docker.com) was used to create to services for this application:

1. API Service: a simple server, with the minimum configuration, running node and exposing the port 3000

### Languages and Libraries

[NodeJS](http://nodejs.org), in the last LTS version, with the following libraries:

1. [Express](https://expressjs.com/pt-br/) - used to manage and to configure the routes of API
2. [BodyParser](https://www.npmjs.com/package/body-parser) - used because of the necessity to parsing the requests
3. [Dotenv](https://www.npmjs.com/package/dotenv) - used to store enviroment variables
4. [AJV](https://github.com/epoberezkin/ajv) - used to validate data sent for API

### Linter

For this project, was chosen [ESLint](https://eslint.org/) with the basic NodeJS configuration. The linter is configurated only in *development* enviroment.

### Live Reload

In development mode, the [Nodemon](https://nodemon.io/) was used to watch files and restart files in every change.

### Endpoints

In the API there is 1 endpoint:

1. POST /queue-message/get-equals: receives two arrays on body and return an array with equal elements
    REQUEST EXAMPLE

    ```json
    {
        array1: [1,2,3,4,5,6],
        array2: [4,5,6]
    }
    ```

    RESPONSE EXAMPLE

    ```json
    [4,5,6]
    ```

### Tests

For the tests was used [Mocha](https://mochajs.org/) as library to execute the tests. For the assertion and validation was used [ShouldJS](https://shouldjs.github.io/). For faker returns and throws of server, was used [Sinon](https://sinonjs.org/). And for HTTP tests was used [Supertest](https://www.npmjs.com/package/supertest).  
To run the tests use

```bash
npm test
```

> My suggestion is to run the tests outside a container

### Running

To running this project, the best way is up the docker, because it will up all services. And both are integrated. For this, use

```bash
docker-compose up -d
```

But, if you want to run the service separated, you can do (inside of 'api' folder):

```bash
npm run start:dev
```
