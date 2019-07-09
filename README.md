# Hiring Test

Project with the challange of creating a function that returns elements that are present in two arrays received by a queue.
The parse event function was based on AWS SQS documentation, and based on it extrapolated that each SQS message should contain 2 records with an array on body property of each record

# Project Structure

- src/functions - contains all the lambda functions on the project
- src/helpers - contais useful helper functions
- test - contain test files
- reports/unit - output folder for a file containing unit test results in html form
- reports/mutant - output folder containing mutant test results

# Testing

The project contains 2 levels of testing:

- Typical unit testing, that can be runned using:
    ```
    npm run unit-test
    ```
    or
    ```
    yarn unit-test
    ```
- Mutant testing, that can be runned using:
    ```
    npm run mutant-test
    ```
    or
    ```
    yarn mutant-test
    ```

**Note**: mutant testing was added to check how effective the unit tests actually are. 

## Considered metrics for mutant testing
- Good: 70% or higher mutant overall score
- Acceptable: between 50 and 70% mutant overall score
- Rejected: lower than 50% mutant overall score

**Note**: mutant testing is not integrated on deploy pipeline, at the current stage it is used as a development metric.

## Testing frameworks

For **unit testing** jest was the chosen framework for it's simplicity and easy customization

For **mutant testing** stryker was used to establish a better metric for unit testing than coverage


# Build and Deploy

It was created a Dockerfile with the steps needed to build, test and deploy the function on AWS.

To build the function use:
```
docker build --build-arg ACCESS_KEY_ID=value --build-arg SECRET_ACCESS_KEY=value .
```

## Steps

1. Build
1. Unit Testing
1. Deploy