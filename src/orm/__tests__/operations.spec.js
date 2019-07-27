import v4 from 'uuid/v4'
import container from '@spark/services-container'
import DynamoDBORMProvider from '@spark/dynamodborm/lib/provider'
import DomainProvider, { DomainName } from '../'
import { keccak256 } from 'js-sha3'

DynamoDBORMProvider(container)
DomainProvider(container)
const Domain = container[DomainName]
const retrieve = []

describe('paymentCard save operations', () => {

    it('should create a specific paymentCard all fields', async done => {
        expect.assertions(1)
        const { parseFields, StatusHistoryORM, PaymentCardORM } = Domain

        const data = parseFields({
            'financialInstitutionId': v4(),
            'accountId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'codeProposal': '123456789012345678',
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        })

        const paymentCard = new PaymentCardORM(data)

        paymentCard.changeStatus({ 'status': 'pending' })

        try {
            await paymentCard.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await paymentCard.save()
            expect(paymentCard).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }
    
        retrieve.push({ 'id': paymentCard.id })

        return done()

    }, 50000)

    it('should create a paymentCard all fields required', async done => {
        expect.assertions(1)
        const { parseFields, CreditCardORM, StatusHistoryORM, PaymentCardORM } = Domain
        const data = parseFields({
            'financialInstitutionId': v4(),
            'accountId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'codeProposal': '123456789012345678',
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        })

        const creditCardItem = new CreditCardORM({
            'last4Digits': '1234'
        })

        const paymentCard = new PaymentCardORM(data)

        paymentCard.addItem('creditCards', creditCardItem)
        paymentCard.changeStatus({ 'status': 'pending' })

        try {
            await paymentCard.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await paymentCard.save()
            expect(paymentCard).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': paymentCard.id })

        return done()

    }, 50000)

    it('should create a paymentCard fields with paymentCard parent', async done => {
        expect.assertions(1)
        const { parseFields, CreditCardORM, StatusHistoryORM, PaymentCardORM } = Domain
        const data = parseFields({
            'financialInstitutionId': v4(),
            'accountId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'codeProposal': '123456789012345678',
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        })

        const paymentCard = new PaymentCardORM(data)

        paymentCard.changeStatus({ 'status': 'pending' })

        try {
            await paymentCard.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await paymentCard.save()
            expect(paymentCard).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': paymentCard.id })

        return done()

    }, 50000)

    it('should create a paymentCard  fields with creditCard', async done => {

        expect.assertions(1)

        const { parseFields, CreditCardORM, StatusHistoryORM, PaymentCardORM } = Domain
        const data = parseFields({
            'financialInstitutionId': v4(),
            'accountId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'codeProposal': '123456789012345678',
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        })

        const paymentCard = new PaymentCardORM(data)

        paymentCard.changeStatus({ 'status': 'pending' })

        const creditCardItem = new CreditCardORM({
            'cardNumber': '0001234567890',
            'last4Digits': '1234',
            'token': keccak256('1234'), // hash sha-3/keccak - card number
            'expirationDate': '0522'
        })

        creditCardItem.bin = parseInt(creditCardItem.cardNumber).toString().substring(0,6)

        paymentCard.addItem('creditCards', creditCardItem)

        try {
            await paymentCard.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await paymentCard.save()
            expect(paymentCard).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': paymentCard.id })
        return done()

    }, 50000)

})

describe('paymentCard get operations', () => {
  
    it('should retrieve a paymentCard with Id', async done => {

        expect.assertions(1)

        const { parseFields, Repository, PaymentCardORM } = Domain

        const data = parseFields({
            'financialInstitutionId': v4(),
            'accountId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'codeProposal': '123456789012345678',
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        })

        const paymentCard = new PaymentCardORM(data)

        paymentCard.changeStatus({ 'status': 'pending' })

        try {
            await paymentCard.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await paymentCard.save()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': paymentCard.id })

        try {
            const paymentCardAux = await Repository.get({ 'id': paymentCard.id, 'index': 'id-index' })

            expect(paymentCardAux).toBeInstanceOf(PaymentCardORM)
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }
        return done()
    }, 50000)

    it('should retrieve a paymentCard with accountId', async done => {
        expect.assertions(1)

        const { parseFields, Repository, PaymentCardORM } = Domain

        const data = parseFields({
            'financialInstitutionId': v4(),
            'accountId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'codeProposal': '123456789012345678',
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        })

        const paymentCard = new PaymentCardORM(data)

        paymentCard.changeStatus({ 'status': 'pending' })

        try {
            await paymentCard.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await paymentCard.save()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': paymentCard.id })

        try {
            const paymentCardAux = await Repository.get({
                'accountId': paymentCard.accountId, 'index': 'accountId-id-index' })

            expect(paymentCardAux).toBeInstanceOf(PaymentCardORM)
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }
        return done()
    }, 50000)
})

describe('paymentCard update operations', () => {
 
    it('should retrieve a paymentCard with Id', async done => {
        const { parseFields, Repository, PaymentCardORM } = Domain
        const data = parseFields({
            'financialInstitutionId': v4(),
            'accountId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'codeProposal': '123456789012345678',
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        })

        const paymentCard = new PaymentCardORM(data)

        paymentCard.changeStatus({ 'status': 'pending' })

        try {
            await paymentCard.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }
        try {
            await paymentCard.save()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': paymentCard.id })

        paymentCard.org = '9999'
        paymentCard.logo = '9999'
        paymentCard.dueDate = 15
        paymentCard.codeProposal = '9999999999'
        paymentCard.dateProposal = (new Date()).toISOString()
        paymentCard.privateLabelAccountId = '9999'
        paymentCard.updatedAt = (new Date()).toISOString()
    
        await paymentCard._save()

        const paymentCardUpdated = await Repository.get({ 'id': paymentCard.id, 'index': 'id-index' })

        expect(paymentCardUpdated).toBeInstanceOf(PaymentCardORM)

        expect(paymentCardUpdated.org).toEqual(paymentCard.org)
        expect(paymentCardUpdated.logo).toEqual(paymentCard.logo)
        expect(paymentCardUpdated.dueDate).toEqual(paymentCard.dueDate)
        expect(paymentCardUpdated.codeProposal).toEqual(paymentCard.codeProposal)
        expect(paymentCardUpdated.dateProposal).toEqual(paymentCard.dateProposal)
        expect(paymentCardUpdated.privateLabelAccountId).toEqual(paymentCard.privateLabelAccountId)
        expect(paymentCardUpdated.updatedAt).toEqual(paymentCard.updatedAt)
    
        return done()

    }, 50000)

})

describe('paymentCard delete operations', () => {
    it('should delete a paymentCard with Id', async done => {
        const { Repository } = Domain

        retrieve.forEach(async({ id }) => {
            const paymentCard = await Repository.get({ 'id': id, 'index': 'id-index' })

            await paymentCard.delete()
        })
        return done()
    }, 50000)
})
