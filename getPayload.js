const { intersection } = require('lodash/array')

module.exports = (arr1, arr2) => {
  return intersection(arr1, arr2).sort((a, b) => a - b)
}
