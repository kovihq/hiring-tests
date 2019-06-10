describe('QueueMessageArrayChallenge test', () => {
  const QueueMessageArrayChallenge = require('../src/QueueMessageArrayChallenge')
  const queueMessageArrayChallenge = new QueueMessageArrayChallenge()
  it('Should return empty when first array is empty', () => {
    expect(queueMessageArrayChallenge.getCommomElementsOrdered([], [1, 2, 3])).toEqual([])
  })

  it('Should return empty when second array is empty', () => {
    expect(queueMessageArrayChallenge.getCommomElementsOrdered([1, 2, 3], [])).toEqual([])
  })

  it('Should not return repeated values', () => {
    expect(queueMessageArrayChallenge.getCommomElementsOrdered([1, 1], [1, 1])).toEqual([1])
  })

  it('Should return elements ordered', () => {
    expect(queueMessageArrayChallenge.getCommomElementsOrdered([3, 2, 1], [3, 2, 1])).toEqual([1, 2, 3])
  })

  it('Should not return elements that are only on first array', () => {
    expect(queueMessageArrayChallenge.getCommomElementsOrdered([3, 2, 1], [3, 2])).toEqual([2, 3])
  })

  it('Should not return elements that are only on second array', () => {
    expect(queueMessageArrayChallenge.getCommomElementsOrdered([3, 2], [3, 2, 1])).toEqual([2, 3])
  })
})
