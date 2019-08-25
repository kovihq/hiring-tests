const assert = require('assert')
const arrayAscSorted = require('../index')

describe('Test function "arrayAscSorted":', () => {
    it('Must return only the elemens that are in both arrays asc sorted.',() => {
        const arr1 = [3, 5, 6, 1, 2, 16]
        const arr2 = [16, 6, 91, 1, 4, 3, 123, 1, 1]
        const expected = [1, 3, 6, 16]

        const result = arrayAscSorted(arr1, arr2)
        assert.deepEqual(result, expected)
    })
})