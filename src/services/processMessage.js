function processMessage({
    messageId,
    input:[arr1, arr2]
}) {
    const isInBoth = arr => (list, item) => arr.indexOf(item) >= 0
        ? [ ...list, item ]
        : list
    const unsortedItems = arr1.length < arr2.length
        ? arr1.reduce(isInBoth(arr2), [])
        : arr2.reduce(isInBoth(arr1), [])
    return unsortedItems.sort()
}

module.exports = processMessage
