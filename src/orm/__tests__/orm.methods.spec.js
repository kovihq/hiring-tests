const v4 = require('uuid/v4')
const container = require('@spark/services-container')
const DynamoDBORMProvider = require('@spark/dynamodborm/lib/provider')
const DomainProvider = require('../')
const { keccak256 } = require('js-sha3')
const { DomainName } = DomainProvider

DynamoDBORMProvider(container)
DomainProvider(container)

const Domain = container[DomainName]
const retrieve = []

describe('MessageORM save', () => {

    it('should create a specific message all fields', async done => {
        expect.assertions(1)
        const { StatusHistoryORM, MessageORM } = Domain

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

        const message = new MessageORM(data)

        message.changeStatus({ 'status': 'pending' })

        try {
            await message.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await message.save()
            expect(message).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }
    
        retrieve.push({ 'id': message.id })

        return done()

    }, 50000)

    it('should create a message all fields required', async done => {
        expect.assertions(1)
        const { parseFields, CreditCardORM, StatusHistoryORM, MessageORM } = Domain
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

        const message = new MessageORM(data)

        message.addItem('creditCards', creditCardItem)
        message.changeStatus({ 'status': 'pending' })

        try {
            await message.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await message.save()
            expect(message).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': message.id })

        return done()

    }, 50000)

    it('should create a message fields with message parent', async done => {
        expect.assertions(1)
        const { parseFields, CreditCardORM, StatusHistoryORM, MessageORM } = Domain
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

        const message = new MessageORM(data)

        message.changeStatus({ 'status': 'pending' })

        try {
            await message.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await message.save()
            expect(message).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': message.id })

        return done()

    }, 50000)

    it('should create a message  fields with creditCard', async done => {

        expect.assertions(1)

        const { parseFields, CreditCardORM, StatusHistoryORM, MessageORM } = Domain
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

        const message = new MessageORM(data)

        message.changeStatus({ 'status': 'pending' })

        const creditCardItem = new CreditCardORM({
            'cardNumber': '0001234567890',
            'last4Digits': '1234',
            'token': keccak256('1234'), // hash sha-3/keccak - card number
            'expirationDate': '0522'
        })

        creditCardItem.bin = parseInt(creditCardItem.cardNumber).toString().substring(0,6)

        message.addItem('creditCards', creditCardItem)

        try {
            await message.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await message.save()
            expect(message).toBeDefined()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': message.id })
        return done()

    }, 50000)

})

describe('message get operations', () => {
  
    it('should retrieve a message with Id', async done => {

        expect.assertions(1)

        const { parseFields, Repository, MessageORM } = Domain

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

        const message = new MessageORM(data)

        message.changeStatus({ 'status': 'pending' })

        try {
            await message.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await message.save()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': message.id })

        try {
            const messageAux = await Repository.get({ 'id': message.id, 'index': 'id-index' })

            expect(messageAux).toBeInstanceOf(MessageORM)
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }
        return done()
    }, 50000)

    it('should retrieve a message with accountId', async done => {
        expect.assertions(1)

        const { parseFields, Repository, MessageORM } = Domain

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

        const message = new MessageORM(data)

        message.changeStatus({ 'status': 'pending' })

        try {
            await message.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }

        try {
            await message.save()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': message.id })

        try {
            const messageAux = await Repository.get({
                'accountId': message.accountId, 'index': 'accountId-id-index' })

            expect(messageAux).toBeInstanceOf(MessageORM)
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }
        return done()
    }, 50000)
})

describe('message update operations', () => {
 
    it('should retrieve a message with Id', async done => {
        const { parseFields, Repository, MessageORM } = Domain
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

        const message = new MessageORM(data)

        message.changeStatus({ 'status': 'pending' })

        try {
            await message.validate()
        } catch (err) {
            console.log('erro de validacao: ', err)
            console.log('000', Object.keys(err))
        }
        try {
            await message.save()
        } catch (err) {
            console.log('erro ao salvar: ', err)
            console.log('000', Object.keys(err))
        }

        retrieve.push({ 'id': message.id })

        message.org = '9999'
        message.logo = '9999'
        message.dueDate = 15
        message.codeProposal = '9999999999'
        message.dateProposal = (new Date()).toISOString()
        message.privateLabelAccountId = '9999'
        message.updatedAt = (new Date()).toISOString()
    
        await message._save()

        const messageUpdated = await Repository.get({ 'id': message.id, 'index': 'id-index' })

        expect(messageUpdated).toBeInstanceOf(MessageORM)

        expect(messageUpdated.org).toEqual(message.org)
        expect(messageUpdated.logo).toEqual(message.logo)
        expect(messageUpdated.dueDate).toEqual(message.dueDate)
        expect(messageUpdated.codeProposal).toEqual(message.codeProposal)
        expect(messageUpdated.dateProposal).toEqual(message.dateProposal)
        expect(messageUpdated.privateLabelAccountId).toEqual(message.privateLabelAccountId)
        expect(messageUpdated.updatedAt).toEqual(message.updatedAt)
    
        return done()

    }, 50000)

})

describe('message delete operations', () => {
    it('should delete a message with Id', async done => {
        const { Repository } = Domain

        retrieve.forEach(async({ id }) => {
            const message = await Repository.get({ 'id': id, 'index': 'id-index' })

            await message.delete()
        })
        return done()
    }, 50000)
})
