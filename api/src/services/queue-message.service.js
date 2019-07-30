/**
 * Get equal elements on two arrays and return then ordered
 * @param {Array} array1 
 * @param {Array} array2 
 * @returns {Array}
 */
const GetEqualElements = async (array1, array2) => {
    if (array1.length <= 0 || array2.length <= 0) {
        return [];
    }

    // get the greater and minor of two arrays, 
    // to do the verification iterating on minor and comparing with greater
    let minorArray, greaterArray;
    if (array1.length < array2.length) {
        minorArray = array1;
        greaterArray = array2;
    } else {
        minorArray = array2;
        greaterArray = array1;
    }

    // create a map to put the equal values
    const equalElements = {};
    for (let i = 0, len = minorArray.length; i < len; i++) {
        if (greaterArray.indexOf(minorArray[i]) >= 0) {
            equalElements[minorArray[i]] = minorArray[i];
        }
    }

    // get the keys of map and order for return, if it's necessary
    const equalArray = Object.values(equalElements);
    return equalArray.length > 0 ? equalArray.sort((a, b) => a - b) : equalArray;
}

module.exports = { GetEqualElements };