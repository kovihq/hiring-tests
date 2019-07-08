const getDifference = array1 => array2 =>
  array1.filter(value => ~array2.indexOf(value)).sort((a, b) => a - b);

const getDifferenceFromBaseArray = getDifference([3, 5, 6, 1, 2, 16]);
const difference = getDifferenceFromBaseArray([16, 6, 91, 1, 4, 3, 123, 1, 1]);

console.log('Difference', difference);