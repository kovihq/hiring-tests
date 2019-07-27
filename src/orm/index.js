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

function MessageDomainProvider(container) {
    container.service(DomainName, c => {
        const aggregationRoot = new c.AggregationRoot(
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

        return aggregationRoot
    })
}

MessageDomainProvider.DomainName = DomainName
module.exports = MessageDomainProvider
  
