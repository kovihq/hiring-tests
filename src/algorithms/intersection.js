'use strict'

const intersect = (list1, list2) => {
  return list1.filter(listItem => list2.includes(listItem))
}

const recursiveIntersect = (...lists) => {
  const list1 = lists.shift()
  const list2 = lists.shift()
  const list3 = lists.shift()

  if (undefined === list3) {
    return intersect(list1, list2)
  }

  return recursiveIntersect(intersect(list1, list2), list3, ...lists)
}

module.exports = {
  intersect,
  recursiveIntersect
}
