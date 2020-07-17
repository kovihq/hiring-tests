# hiring-tests
`This repo is designated to our hiring tests.`

## Serverless Installation

`npm install -g serverless`

## Building

`npm install`

## Running

### Locally

`serverless invoke local --function challenge --data '{"Records":[{"messageId":"19dd0b57-b21e-4ac1-bd88-01bbb068cb78","receiptHandle":"MessageReceiptHandle","body":"{\"arr1\": [3, 5, 6, 1, 2, 16], \"arr2\":[16, 6, 91, 1, 4, 3, 123, 1, 1]}","attributes":{"ApproximateReceiveCount":"1","SentTimestamp":"1523232000000","SenderId":"123456789012","ApproximateFirstReceiveTimestamp":"1523232000001"},"messageAttributes":{},"md5OfBody":"7b270e59b47ff90a553787216d55d91d","eventSource":"aws:sqs","eventSourceARN":"arn:aws:sqs:us-east-1:123456789012:MyQueue","awsRegion":"us-east-1"}]}'`

### Tests

 `npm run test`

