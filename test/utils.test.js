const { intersect, parseEvent } = require('../src/helpers/utils');

/* intersect Tests */
const intersectTests = [
    {
        name: 'Test: common number beetween arrays',
        payload: [[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]],
        expectedResponse: [1, 3, 6, 16]
    },
    {
        name: 'Test: no common number between arrays',
        payload: [[1, 20, 34, 47, 51, 158], [7, 50, 30, 123, 200]],
        expectedResponse: []
    },
    {
        name: 'Test: mixed content on arrays',
        payload: [[3, 5, '6', 1, 2, 16], ['test', [], 16, 6, 91, 1, true, 3, 123, 1, 1]],
        expectedResponse: [1, 3, 16]
    }
];

intersectTests.forEach(testData => {
    test(testData.name, () => {
        const result = intersect(...testData.payload);
        expect(result).toEqual(testData.expectedResponse);
    });
});

const parseEventTests = [
    {
        name: 'Test: No Event',
        expectedResponse: []
    },
    {
        name: 'Test: Empty Event',
        event: {},
        expectedResponse: []
    },
    {
        name: 'Test: Event without body on Records',
        event: {
            Records: [
                {
                    messageId: "059f36b4-87a3-44ab-83d2-661975830a7d",
                }
            ]
        },
        expectedResponse: []
    },
    {
        name: 'Test: Event with body that are not arrays',
        event: {
            Records: [
                {
                    messageId: "059f36b4-87a3-44ab-83d2-661975830a7d",
                    body: 1
                },
                {
                    messageId: "059f36b4-87a3-44ab-83d2-661975830a7d",
                    body: 'test'
                },
            ]
        },
        expectedResponse: []
    },
    {
        name: 'Test: Event with body on Records',
        event: {
            Records: [
                {
                    messageId: "059f36b4-87a3-44ab-83d2-661975830a7d",
                    body: [3, 5, 6, 1, 2, 16]
                },
                {
                    messageId: "059f36b4-87a3-44ab-83d2-661975830a7d",
                    body: [16, 6, 91, 1, 4, 3, 123, 1, 1]
                },
            ]
        },
        expectedResponse: [[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]]
    }
];

/* parseEvent Tests  */
parseEventTests.forEach(testData => {
    test(testData.name, () => {
        const respose = parseEvent(testData.event);
        expect(respose).toEqual(testData.expectedResponse);
    });
});
