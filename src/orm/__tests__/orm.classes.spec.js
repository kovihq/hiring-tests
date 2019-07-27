const container = require('@spark/services-container')
const { 
    default: dynamoDBORMProvider
} = require('@spark/dynamodborm/lib/provider')

const domainProvider = require('../')
const { DomainName } = domainProvider

dynamoDBORMProvider(container)
domainProvider(container)

const Domain = container[DomainName]

describe('ORM classes', () => {
    const {
        Model,
        MessageORM,
        StatusHistoryORM,
    } = Domain

    describe('Classes constructors', () => {
        const tests = [
            {
                description: 'Model',
                assertion: 'toMatch',
                params: ['function'],
                input: typeof Model,
            },
            {
                description: 'MessageORM',
                assertion: 'toMatch',
                params: ['function'],
                input: typeof MessageORM,
            },
            {
                description: 'StatusHistoryORM',
                assertion: 'toMatch',
                params: ['function'],
                input: typeof StatusHistoryORM,
            },
        ]
        tests.map(({
            description,
            assertion,
            params,
            input
        }) => test(description, () => {
            expect(input)[assertion](...params)
        }))
    })
    
    describe('Classes intantiations', () => {
        const tests = [
            {
                description: 'Model',
                ClassDefinition: Model,
            },
            {
                description: 'MessageORM',
                ClassDefinition: MessageORM,
            },
            {
                description: 'StatusHistoryORM',
                ClassDefinition: StatusHistoryORM,
            },
        ]
        tests.map(({
            description,
            assertion,
            params,
            ClassDefinition,
        }) => test(description, () => {
            const instance = new ClassDefinition({})
            expect(instance).toBeInstanceOf(ClassDefinition)
        }))
    })

    describe('Classes validations', () => {
        const tests = [
            {
                className: 'Model',
                ClassDefinition: Model,
                kind: 'is required',
                validations: [
                    {
                        data: {},
                        field: 'messageId',
                        description: '"messageId" is required'
                    }
                ]
            },
        ]
        tests.map(({
            className,
            kind,
            ClassDefinition,
            validations,
        }) => describe(className, () => {
             validations.map(({
                 data,
                 description,
                 field,
             }) => test(`"${field}" ${kind}`, (done) => {
                 console.log(data)
                const instance = new ClassDefinition(data)
                return instance.validate().catch(err => {
                    console.log(err)
                    expect(err.code).toMatch('ValidationError')
                    expect(err.errors.find(({identifier}) => identifier === field).message)
                        .toMatch(`"${field}" ${kind}`)
                    return done()
                })
             }))
        }))
    })
})
