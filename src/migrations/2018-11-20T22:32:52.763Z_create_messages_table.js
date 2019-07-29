// migration of kind: undefined TODO: add recomendations on template
module.exports.up = function({ Model }) {
    return this.createTable(Model)
}

module.exports.down = function({ Model }) {
    return this.dropTable(Model)
}
