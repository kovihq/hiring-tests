module.exports.tableName = 'messages'
module.exports.readCapacity = process.env.PAYMENT_CARDS_READ_CAPACITY || 5
module.exports.writeCapacity = process.env.PAYMENT_CARDS_WRITE_CAPACITY || 5
module.exports.indexes = [

    {
        name: 'status-messageId-index',
        readCapacity: process.env['MESSAGES_READ_CAPACITY'] || 5,
        writeCapacity: process.env['MESSAGES_WRITE_CAPACITY'] || 5,
        type: 'global',
        projection: 'all'
    },

]

