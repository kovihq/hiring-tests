const { region } = require('../config')
const {
    tableName,
    readCapacity,
    writeCapacity,
    indexes
} = require('./config')
  
const {
    PaymentCardModel,
    CreditCardModel,
    StatusHistoryModel,
    AddressModel
} = require('../models')
  
const {
    PaymentCardSchema,
    CreditCardSchema,
    StatusHistorySchema,
    AddressSchema
} = require('../schemas')
  
const DomainName = 'PaymentCardORM'

function PaymentCardDomainProvider(container) {
    container.service(DomainName, c => {
        const aggregationRoot = new c.AggregationRoot(
            {
                ModelClass: PaymentCardModel,
                tableName,
                readCapacity,
                writeCapacity,
                indexes,
                region,
                className: 'PaymentCardORM',
                schema: PaymentCardSchema
            },
            {
                ModelClass: CreditCardModel,
                schema: CreditCardSchema,
                className: 'CreditCardORM',
                key: 'creditCards'
            },
            {
                ModelClass: AddressModel,
                schema: AddressSchema,
                className: 'AddressORM',
                key: 'addresses'
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

PaymentCardDomainProvider.DomainName = DomainName
module.exports = PaymentCardDomainProvider
  
