function arrayAscSorted(arr1, arr2) {
    const arr = arr1.filter(item => arr2.includes(item))
    return arr.sort((a, b) => a - b)
}

module.exports = arrayAscSorted