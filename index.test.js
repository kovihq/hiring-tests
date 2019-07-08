const getDifference = require('./');

it('should return difference between two arryas', () => {
  expect(
    getDifference([3, 5, 6, 1, 2, 16])([16, 6, 91, 1, 4, 3, 123, 1, 1]),
  ).toEqual([ 1, 3, 6, 16 ]);
});

it('should return empty array when pass empty arrays', () => {
  expect(getDifference([])([])).toEqual([]);
});

it('should return empty array when pass null parameters', () => {
  expect(getDifference()()).toEqual([]);
});