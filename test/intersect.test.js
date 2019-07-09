const { processEvent } = require('../src/functions/intersect');

/* processEvent Tests */
const processEventTests = [
    {
        name: 'Test: Empty arrays',
        parsedEvent: [],
        expectedResponse: {
            message: 'Invalid event, please refer to https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html',
            reason: 'Expected two records with an array in each record body'
        }
    },
    {
        name: 'Test: One item on array',
        parsedEvent: [[3, 5, 6, 1, 2, 16]],
        expectedResponse: {
            message: 'Invalid event, please refer to https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html',
            reason: 'Expected two records with an array in each record body'
        }
    },
    {
        name: 'Test: Valid array',
        parseEvent: [[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]],
        expectedResponse: {
            message: 'Parsed with success',
            result: [1, 3, 6, 16]
        }
    },
];

processEventTests.forEach(testData => {
    test(testData.name, () => {
        const respose = processEvent(testData.parseEvent);
        expect(respose).toEqual(testData.expectedResponse);
    });
})