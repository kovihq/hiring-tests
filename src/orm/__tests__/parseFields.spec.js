import v4 from 'uuid/v4'
import container from '@spark/services-container'
import DynamoDBORMProvider from '@spark/dynamodborm/lib/provider'
import DomainProvider, { DomainName } from '../'

DynamoDBORMProvider(container)
DomainProvider(container)
const Domain = container[DomainName]
const { parseFields } = Domain

describe('parserFields test', () => {

    it('should parse fields PaymentCard', () => {
  
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
            'createdAt': (new Date()).toISOString()
        }

        const parsed = parseFields(data)

        expect(parsed).toHaveProperty('accountId')
        expect(parsed).toHaveProperty('paymentMethodId')
        expect(parsed).toHaveProperty('org')
        expect(parsed).toHaveProperty('logo')
        expect(parsed).toHaveProperty('dueDate')
        expect(parsed).toHaveProperty('status')
        expect(parsed).toHaveProperty('codeProposal')
        expect(parsed).toHaveProperty('dateProposal')
        expect(parsed).toHaveProperty('privateLabelAccountId')
    })

    it('should exclued unlisted keys', () => {

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
            'foo': 1,
            'bar': 2
        }

        const parsed = parseFields(data)

        expect(parsed).toHaveProperty('accountId')
        expect(parsed).toHaveProperty('paymentMethodId')
        expect(parsed).toHaveProperty('org')
        expect(parsed).toHaveProperty('logo')
        expect(parsed).toHaveProperty('dueDate')
        expect(parsed).toHaveProperty('status')
        expect(parsed).toHaveProperty('codeProposal')
        expect(parsed).toHaveProperty('dateProposal')
        expect(parsed).toHaveProperty('privateLabelAccountId')
        expect(parsed).not.toHaveProperty('foo')
        expect(parsed).not.toHaveProperty('bar')
    })

    it('should parse list keys - creditCards', () => {

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
            'creditCards': [
                {
                    'number': '1234',
                    'last4Digits': '1234',
                    'token': v4()
                }
            ]
        }

        const parsed = parseFields(data)

        expect(parsed).toHaveProperty('creditCards')
        expect(parsed.creditCards).toBeInstanceOf(Array)
        expect(parsed.creditCards).toHaveLength(1)

    })

    it('not should throw a error', () => {
        expect(Domain).toBeDefined()
    })
})
