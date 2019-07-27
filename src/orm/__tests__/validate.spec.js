const v4 = require('uuid/v4')
const container = require('@spark/services-container')
const dynamoDBORMProvider = require('@spark/dynamodborm/lib/provider')
const domainProvider, { DomainName } = require('../')

dynamoDBORMProvider(container)
domainProvider(container)

const { PaymentCardORM } = container[DomainName]

describe('Validate PaymentCardORM fields and error messages', () => {

    it('should validate if all the PaymentCardORM fields are valid', done => {

        expect.assertions(1)

        const data = {
            'accountId': v4(),
            'financialInstitutionId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'privateLabelAccountId': '123456',
            'updatedAt': (new Date()).toISOString(),
            'createdAt': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        const testNotThrow = async() => {
            await paymentCard.validate()
            return done
        }

        testNotThrow().then(d => {
            expect(d).toBeInstanceOf(Function)
            return d()

        }).catch(err => {
            expect(err).toBeUndefined()
            return done()
        })
    })

    it('should validate if paymentCard.accountId is required', async done => {

        expect.assertions(2)

        const data = {
            'financialInstitutionId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        try {

            await paymentCard.validate()
            return done

        } catch(err) {
      
            const field = err.errors[0].identifier
            const errorMessage = err.errors[0].message
      
            expect(field).toEqual('accountId')
            expect(errorMessage).toEqual('"accountId" is required')
      
            return done()
    
        }
    
    })

    it('should validate if paymentCard.paymentMethodId is required', async done => {

        expect.assertions(2)

        const data = {
            'accountId': v4(),
            'financialInstitutionId': v4(),
            'org': '1234',
            'logo': '1234',
            'dueDate': 10,
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        try {

            await paymentCard.validate()
            return done

        } catch(err) {
      
            const field = err.errors[0].identifier
            const errorMessage = err.errors[0].message
      
            expect(field).toEqual('paymentMethodId')
            expect(errorMessage).toEqual('"paymentMethodId" is required')
      
            return done()
    
        }
    })

    it('should validate if paymentCard.org is required', async done => {

        expect.assertions(2)

        const data = {
            'accountId': v4(),
            'financialInstitutionId': v4(),
            'paymentMethodId': v4(),
            'logo': '1234',
            'dueDate': 10,
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        try {

            await paymentCard.validate()
            return done

        } catch(err) {
      
            const field = err.errors[0].identifier
            const errorMessage = err.errors[0].message
      
            expect(field).toEqual('org')
            expect(errorMessage).toEqual('"org" is required')
      
            return done()
    
        }
    })

    it('should validate if paymentCard.org size is long than 4 chars', async done => {

        expect.assertions(2)

        const data = {
            'accountId': v4(),
            'financialInstitutionId': v4(),
            'paymentMethodId': v4(),
            'org': '1234567890',
            'logo': '1234',
            'dueDate': 10,
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        try {

            await paymentCard.validate()
            return done

        } catch(err) {
      
            const field = err.errors[0].identifier
            const errorMessage = err.errors[0].message
      
            expect(field).toEqual('org')
            expect(errorMessage).toMatch(/fails to match the required pattern/)
            return done()
        }

    })

    it('should validate if paymentCard.logo is required', async done => {

        expect.assertions(2)

        const data = {
            'accountId': v4(),
            'financialInstitutionId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'dueDate': 10,
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        try {

            await paymentCard.validate()
            return done

        } catch(err) {
      
            const field = err.errors[0].identifier
            const errorMessage = err.errors[0].message
      
            expect(field).toEqual('logo')
            expect(errorMessage).toEqual('"logo" is required')
      
            return done()
    
        }
    })

    it('should validate if paymentCard.logo size is long than 4 chars', async done => {

        expect.assertions(2)

        const data = {
            'accountId': v4(),
            'financialInstitutionId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234567890',
            'dueDate': 10,
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        try {
            await paymentCard.validate()
            return done

        } catch(err) {
      
            const field = err.errors[0].identifier
            const errorMessage = err.errors[0].message
      
            expect(field).toEqual('logo')
            expect(errorMessage).toMatch(/fails to match the required pattern/)
            return done()
        }

    })

    it('should validate if paymentCard.dueDate is required', async done => {

        expect.assertions(2)

        const data = {
            'accountId': v4(),
            'financialInstitutionId': v4(),
            'paymentMethodId': v4(),
            'org': '1234',
            'logo': '1234',
            'status': 'pending',
            'codeProposal': '123456789012345678',
            'dateProposal': (new Date()).toISOString(),
            'reference': v4(),
            'embossingName': 'Antonio Carlos'
        }

        const paymentCard = new PaymentCardORM(data)

        try {

            await paymentCard.validate()
            return done

        } catch(err) {
      
            const field = err.errors[0].identifier
            const errorMessage = err.errors[0].message
      
            expect(field).toEqual('dueDate')
            expect(errorMessage).toEqual('"dueDate" is required')
      
            return done()
    
        }
    })
})
