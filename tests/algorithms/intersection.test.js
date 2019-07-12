/* eslint-env jest */

const { intersect, recursiveIntersect } = require('../../src/algorithms/intersection')

const sequence = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const odd = [1, 3, 5, 7, 9]
const even = [0, 2, 4, 6, 8, 10]
const fibonacci = [1, 2, 3, 5, 8]
const prime = [2, 3, 5, 7]

describe('intersection', function () {
  describe('intersect', function () {
    test('Should return items in common between two lists', function () {
      expect(intersect(sequence, odd)).toEqual(odd)
      expect(intersect(sequence, even)).toEqual(even)
      expect(intersect(sequence, fibonacci)).toEqual(fibonacci)
      expect(intersect(odd, fibonacci)).toEqual([1, 3, 5])
      expect(intersect(even, fibonacci)).toEqual([2, 8])
      expect(intersect(odd, even)).toEqual([])
      expect(intersect(
        ['A', 'B', 'C', 'D'],
        ['C', 'D', 'E', 'F']
      )).toEqual(['C', 'D'])
    })
  })

  describe('recursiveIntersect', function () {
    test('Should return items in common between two or more lists', function () {
      expect(recursiveIntersect(sequence, prime)).toEqual(prime)
      expect(recursiveIntersect(sequence, prime, odd)).toEqual([3, 5, 7])
      expect(recursiveIntersect(sequence, prime, even)).toEqual([2])
      expect(recursiveIntersect(
        ['A', 'B', 'C', 'D', 'E'],
        ['B', 'C', 'D', 'E', 'F'],
        ['C', 'D', 'E', 'F', 'G'],
        ['D', 'E', 'F', 'G', 'H']
      )).toEqual(['D', 'E'])
    })
  })
})
