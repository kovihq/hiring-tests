'use strict'

/**
* @function String.prototype.replaceAll
* Add to String prototype the replaceAll function
* @param {string} needle
* @return {string} replacement
*/
String.prototype.replaceAll = function (needle, replacement) {
  return this.split(needle).join(replacement)
}

/**
* @function mergeArrayAndSort
* Convert a string like "{[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}"
* to sorted asc array
* @param {string} str - Input string
* @return {array} arr - Array sorted
*/
const mergeArraysAndSort = (str) => {
  try {
    return str
      .replaceAll('{[', '')
      .replaceAll(']', '')
      .replaceAll('[', '')
      .replaceAll('{', '')
      .replaceAll('}', '')
      .replaceAll(']}', '')
      .split(',')
      .map(item => parseInt(item, 10))
      .sort((a, b) => a - b)
  } catch (error) {
    throw error
  }
}

/**
* @function getDuplicatedArray
* Get duplicated values in integer array sorted
* @param {arr} arr - Array asc sorted
* @return {array} duplicated - Array asc sorted of duplicated values
*/
const getDuplicatedArray = (arr) => {
  const result = []
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i + 1] === arr[i] && !result.includes(arr[i])) {
      result.push(arr[i])
    }
  }

  return result
}

module.exports.sort = async event =>
  `${getDuplicatedArray(mergeArraysAndSort(event))}`
    .replaceAll(',', ', ')
