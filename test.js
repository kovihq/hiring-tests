const assert = require('assert');
const array = require('./array_function');

describe('array test', () => {
    it('only duplicate values in both arrays', async () => {
        const expected = '3, 18, 57';

        let a = [18, 0, 2, 3, 21, 57];
        let b = [18, 3, 4, 35, 57];


        const result = await array(a, b);
        assert.deepEqual(result, expected);

    });
});