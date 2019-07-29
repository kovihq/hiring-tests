const container = require('@spark/services-container')
const {default: DynamoDBORMProvider} = require('@spark/dynamodborm/lib/provider')
const messageOrmDomain = require('../')
const { DomainName } = messageOrmDomain

DynamoDBORMProvider(container)
container.register(messageOrmDomain)

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
                errorType: 'must be a number',
                cases: [
                    {
                        data: { input: [['a']] },
                        field: 'input',
                    },
                    {
                        data: { output: ['a'] },
                        field: 'output',
                    },
                ]
            },
            // {
            //     className: 'Model',
            //     ClassDefinition: Model,
            //     errorType: 'must be an array',
            //     cases: [
            //         {
            //             data: { input: ['a'] },
            //             field: 'input',
            //         },
            //         {
            //             data: { output: 'a' },
            //             field: 'output',
            //         },
            //         {
            //             data: { statusHistory: 'a' },
            //             field: 'statusHistory',
            //         },
            //     ]
            // },
            // {
            //     className: 'Model',
            //     ClassDefinition: Model,
            //     errorType: 'is required',
            //     cases: [
            //         {
            //             data: {},
            //             field: 'messageId',
            //         },
            //         {
            //             data: {},
            //             field: 'status',
            //         },
            //         {
            //             data: {},
            //             field: 'input',
            //         },
            //     ]
            // },
            // {
            //     className: 'MessageORM',
            //     ClassDefinition: MessageORM,
            //     errorType: 'is required',
            //     cases: [
            //         {
            //             data: {},
            //             field: 'messageId',
            //         },
            //         {
            //             data: {},
            //             field: 'status',
            //         },
            //         {
            //             data: {},
            //             field: 'input',
            //         },
            //     ]
            // },
            // {
            //     className: 'StatusHistoryORM',
            //     ClassDefinition: StatusHistoryORM,
            //     errorType: 'is required',
            //     cases: [
            //         {
            //             data: {},
            //             field: 'status',
            //         },
            //     ]
            // },
        ]
        tests.map(({
            className,
            errorType,
            ClassDefinition,
            cases,
        }) => describe(className, () => {
             cases.map(({
                 data,
                 field,
             }) => test(`"${field}" ${errorType}`, (done) => {
                 console.log(data)
                const instance = new ClassDefinition(data)
                return instance.validate().catch(err => {
                    console.log(err)
                    expect(err.code).toMatch('ValidationError')
                    expect(err.errors.find(({identifier}) => identifier.match(field)).message)
                        .toMatch(errorType)
                    return done()
                })
             }))
        }))
    })
})
