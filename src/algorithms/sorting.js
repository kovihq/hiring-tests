'use strict'

const sortAscending = (list) => {
  return list.sort((a, b) => {
    if (a > b) {
      return 1
    }

    if (b > a) {
      return -1
    }

    return 0
  })
}

const sortDescending = (list) => {
  return list.sort((a, b) => {
    if (a > b) {
      return -1
    }

    if (b > a) {
      return 1
    }

    return 0
  })
}

module.exports = {
  sortAscending,
  sortDescending
}
