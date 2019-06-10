module.exports = class QueueMessageArrayChallenge {
  getCommomElementsOrdered (arr1, arr2) {
    const orderFunction = (a, b) => a - b
    const arr1Sorted = arr1.sort(orderFunction)
    const arr2Sortes = arr2.sort(orderFunction)

    let arr1Index = 0
    let arr2Index = 0
    let returnValues = []
    let valuesMap = new Map()
    while (arr1Index < arr1.length && arr2Index < arr2.length) {
      if (arr1Sorted[arr1Index] === arr2Sortes[arr2Index]) {
        if (valuesMap.get(arr1Sorted[arr1Index]) === undefined) {
          returnValues.push(arr1Sorted[arr1Index])
          valuesMap.set(arr1Sorted[arr1Index], true)
        }
        arr1Index++
        arr2Index++
      } else if (arr1Sorted[arr1Index] < arr2Sortes[arr2Index]) {
        arr1Index++
      } else {
        arr2Index++
      }
    }
    return returnValues
  }
}
