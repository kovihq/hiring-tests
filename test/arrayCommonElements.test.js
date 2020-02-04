const arrayCommonElements = require('../src/arrayCommonElements.js');


test('Verify if payload {[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]} has common elements', () => {
    payload = {
        array1: [3, 5, 6, 1, 2, 16],
        array2: [16, 6, 91, 1, 4, 3, 123, 1, 1]
    };

    const commonElements = arrayCommonElements(payload.array1, payload.array2);
    const expectedResult = [1, 3, 6, 16];

    expect(commonElements).toEqual(expectedResult);
});