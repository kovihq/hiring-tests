/**
 * Returns equals sorted elements of two arrays list
 * @param {*} arr1 
 * @param {*} arr2 
 */
function returnEqualsElements (arr1, arr2) {
	try {
        // create a empty return
        const arrRetorno = [];
        // walks through the elements of the first array
        for (let i = 0; i < arr1.length; i++) {
            // verify if the element exists, if it is a number, if it is a integer, if it has in the second array and if it is already at a return array
            if (arr1[i] && !isNaN(arr1[i]) && Number.isInteger(arr1[i]) && arr2.indexOf(arr1[i]) >= 0 && arrRetorno.indexOf(arr1[i]) < 0) {
                // add the element to return array
                arrRetorno.push(arr1[i]);
            }
        }
        // return the sorted array
        return arrRetorno.sort((a, b) => a - b);
    } catch (err) {
        // if an error occurs returns an empty array
        return [];
    }
}