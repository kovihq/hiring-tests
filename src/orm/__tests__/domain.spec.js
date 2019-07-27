import container from '@spark/services-container'
import dynamoDBORMProvider from '@spark/dynamodborm/lib/provider'
import domainProvider, { DomainName } from '../'

dynamoDBORMProvider(container)
domainProvider(container)
const Domain = container[DomainName]
  
describe('Domain instantiate', () => {
    it('PaymentCardORM constructor', () => {
        const { PaymentCardORM } = Domain

        expect(PaymentCardORM).toBeDefined()
    })

    it('Model constructor', () => {
        const { Model } = Domain

        expect(Model).toBeDefined()
    })

    it('Model and PaymentCardORM instantiate', () => {
        const {
            Model,
            PaymentCardORM
        } = Domain
        const paymentCard = new PaymentCardORM({})
        const model = new Model({})

        expect(model).toBeDefined()
        expect(paymentCard).toBeDefined()
        expect(model).toBeInstanceOf(Model)
        expect(paymentCard).toBeInstanceOf(PaymentCardORM)
    })
})
