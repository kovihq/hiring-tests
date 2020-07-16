'use strict';

module.exports.bothElements = async (arr1, arr2) => {
  let arryAux = Array()

  //loop the first array and find an element equal in the second array
  for (var i = 0; i < arr1.length; i++) {
    if (arr2.indexOf(arr1[i]) > -1) {
      arryAux.push(arr1[i]);
    }
  }

  //sorts elements from smallest to largest
  return arryAux.sort((a, b) => a - b);
}


module.exports.arrayChallenge = async event => {
  const body = event

  try {
    return await this.bothElements(a, b);
  } catch (error) {
    return error
  }
};
