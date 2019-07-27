module.exports.tableName = 'messages'
module.exports.readCapacity = process.env.PAYMENT_CARDS_READ_CAPACITY || 5
module.exports.writeCapacity = process.env.PAYMENT_CARDS_WRITE_CAPACITY || 5
module.exports.indexes = [
]
