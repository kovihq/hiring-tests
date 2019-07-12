'use strict'

const { recursiveIntersect } = require('./src/algorithms/intersection')
const { sortAscending } = require('./src/algorithms/sorting')

module.exports.intersectAndAscending = async event => {
  return {
    statusCode: 200,
    body: sortAscending(recursiveIntersect(...event))
  }
}
