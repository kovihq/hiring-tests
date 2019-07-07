const { intersection } = require('lodash/array')

module.exports = (arr1, arr2) => {
  /* Gets common numbers between two arrays, using lodash's intersection.
     Sorts the result using javascript sort function.
     And returns it as an array */
  return intersection(arr1, arr2).sort((a, b) => a - b)
}
