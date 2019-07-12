/* eslint-env jest */

const { sortAscending, sortDescending } = require('../../src/algorithms/sorting')

const disorderedNumbers = [1, 0, 4, 2, 3, 8, 10, 6, 5, 7, 9]
const disorderedLetters = ['E', 'D', 'A', 'G', 'B', 'C', 'F']

describe('sorting', function () {
  describe('sortAscending', function () {
    test('Should sort numbers and letters in ascending order', function () {
      expect(sortAscending(disorderedNumbers)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      expect(sortAscending(disorderedLetters)).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
    })
  })

  describe('sortDescending', function () {
    test('Should sort numbers and letters in descending order', function () {
      expect(sortDescending(disorderedNumbers)).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0])
      expect(sortDescending(disorderedLetters)).toEqual(['G', 'F', 'E', 'D', 'C', 'B', 'A'])
    })
  })
})
