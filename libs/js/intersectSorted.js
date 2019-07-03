'use strict';
/**
 * Retorna um array com os números em comum ordenados nos arrays arrayA e arrayB
 * @param {Array} arrayA 
 * @param {Array} arrayB 
 */
function intersectSorted(arrayA, arrayB) {
    if (!Array.isArray(arrayA)) {
        throw "O primeiro parâmetro deve ser um Array!";
    }
    if (!Array.isArray(arrayB)) {
        throw "O segundo parâmetro deve ser um Array!";
    }
    const sortedA = arrayA.sort();
    const lengthA = arrayA.length;
    let currentPositionInA = 0;

    const sortedB = arrayB.sort();
    const lengthB = arrayB.length;
    let currentPositionInB = 0;

    let intersection = [];

    while (currentPositionInA < lengthA && currentPositionInB < lengthB) {
        const candidateA = sortedA[currentPositionInA];
        const candidateB = sortedB[currentPositionInB];
        if (candidateA === candidateB) {
            intersection.push(candidateA);
            currentPositionInA++;
            currentPositionInB++;
        } else if (candidateA < candidateB) {
            currentPositionInA++;
        } else {
            currentPositionInB++;
        }
    }
    return intersection;
}

module.exports = { intersectSorted }