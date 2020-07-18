const handler = require('../handler');

test('Should be valid', () => {
    expect(handler.bothElements([3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1])).resolves.toStrictEqual([1, 3, 6, 16])
    expect(handler.bothElements([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12])).resolves.toStrictEqual([])
    expect(handler.bothElements([-1, -2, -3], [-1, -2, -3])).resolves.toStrictEqual([-3, -2, -1])
    expect(handler.handler({
        "Records": [
            {
                "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
                "receiptHandle": "MessageReceiptHandle",
                "body": "{\"arr1\": [3, 5, 6, 1, 2, 16], \"arr2\":[16, 6, 91, 1, 4, 3, 123, 1, 1]}",
                "attributes": {
                    "ApproximateReceiveCount": "1",
                    "SentTimestamp": "1523232000000",
                    "SenderId": "123456789012",
                    "ApproximateFirstReceiveTimestamp": "1523232000001"
                },
                "messageAttributes": {

                },
                "md5OfBody": "7b270e59b47ff90a553787216d55d91d",
                "eventSource": "aws:sqs",
                "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
                "awsRegion": "us-east-1"
            }
        ]
    })).resolves.toStrictEqual([1, 3, 6, 16])
});

test('Should be throw error', () => {
    expect(handler.handler(undefined)).resolves.toThrow
    expect(handler.handler({})).resolves.toThrow
    expect(handler.handler(
        {
            "Records": [
                {
                    "messageId": "19dd0b57-b21e-4ac1-bd88-01bbb068cb78",
                    "receiptHandle": "MessageReceiptHandle",
                    "body": "{[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}",
                    "attributes": {
                        "ApproximateReceiveCount": "1",
                        "SentTimestamp": "1523232000000",
                        "SenderId": "123456789012",
                        "ApproximateFirstReceiveTimestamp": "1523232000001"
                    },
                    "messageAttributes": {

                    },
                    "md5OfBody": "7b270e59b47ff90a553787216d55d91d",
                    "eventSource": "aws:sqs",
                    "eventSourceARN": "arn:aws:sqs:us-east-1:123456789012:MyQueue",
                    "awsRegion": "us-east-1"
                }
            ]
        }
    )).resolves.toThrow


})