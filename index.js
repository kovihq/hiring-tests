
function intersection (array1, array2) {
  console.log(array1.filter(value => array2.indexOf(value) !== -1).sort((a,b) => a - b))
}

intersection([3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1])
