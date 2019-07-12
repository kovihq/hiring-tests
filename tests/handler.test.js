/* eslint-env jest */

const handler = require('../handler')

const disorderedSequenceNumbers = [1, 0, 4, 2, 3, 8, 10, 6, 5, 7, 9]
const disorderedOddNumbers = [7, 5, 9, 1, 3]
const disorderedEvenNumbers = [6, 2, 10, 8, 0, 4]

describe('handler', function () {
  describe('intersectAndAscending', function () {
    test('Should return numbers that intersect and then sort in ascending order', function () {
      expect(handler.intersectAndAscending([
        disorderedSequenceNumbers,
        disorderedOddNumbers
      ])).resolves.toEqual({
        statusCode: 200,
        body: [1, 3, 5, 7, 9]
      })

      expect(handler.intersectAndAscending([
        disorderedSequenceNumbers,
        disorderedEvenNumbers
      ])).resolves.toEqual({
        statusCode: 200,
        body: [0, 2, 4, 6, 8, 10]
      })
    })
  })
})
