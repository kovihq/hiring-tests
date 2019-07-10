const arrayCommonElements = (array1, array2) =>
    array1.filter( value => array2.includes(value) )
    .sort((a,b) => a-b);

module.exports = arrayCommonElements;