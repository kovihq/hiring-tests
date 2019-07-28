const { region } = require('../config')
const {
    tableName,
    readCapacity,
    writeCapacity,
    indexes
} = require('./config')
  
const {
    MessageModel,
    StatusHistoryModel,
} = require('../models')
  
const {
    MessageSchema,
    StatusHistorySchema,
} = require('../schemas')
  
const DomainName = 'MessageORM'

function MessageORM(AggregationRoot) {
    return new AggregationRoot(
        {
            ModelClass: MessageModel,
            tableName,
            readCapacity,
            writeCapacity,
            indexes,
            region,
            className: 'MessageORM',
            schema: MessageSchema
        },
        {
            ModelClass: StatusHistoryModel,
            schema: StatusHistorySchema,
            className: 'StatusHistoryORM',
            key: 'statusHistory'
        }
    )
}
MessageORM.inject = [
    'AggregationRoot'
]
MessageORM.autoCall = true
MessageORM.DomainName = DomainName

module.exports = MessageORM
  
