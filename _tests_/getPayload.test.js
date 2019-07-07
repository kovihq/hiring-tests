const getPayload = require('../getPayload')

test('Payload : {[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}, Response: 1, 3, 6, 16', () => {
  expect(getPayload([3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1])).toEqual([1, 3, 6, 16])
})
