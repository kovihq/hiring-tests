function removeId(obj) {
   const isArray = obj instanceof Array
    return Object.keys(obj).reduce(
    (clean, key) => key === 'id' ? clean : 
      obj[key] instanceof Object ?
      isArray ? [ ...clean, removeId(obj[key]) ] : { ...clean, [key]: removeId(obj[key]) } :
      isArray ? [ ...clean, obj[key] ] : { ...clean, [key]: obj[key] },
      isArray ? [] : {}
  )
}

module.exports = { removeId }