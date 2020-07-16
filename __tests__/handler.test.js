const handler = require('../handler');

test('the correct array is ​​generated', () => {
    expect(handler.bothElements([3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1])).resolves.toStrictEqual([1, 3, 6, 16])
    expect(handler.bothElements([1, 2, 3, 4, 5, 6], [7, 8, 9, 10, 11, 12])).resolves.toStrictEqual([])
    expect(handler.bothElements([-1, -2, -3], [-1, -2, -3])).resolves.toStrictEqual([-3, -2, -1])
});
