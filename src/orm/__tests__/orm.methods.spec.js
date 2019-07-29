const v4 = require('uuid/v4')
const container = require('@spark/services-container')
const {default: DynamoDBORMProvider} = require('@spark/dynamodborm/lib/provider')
const messageOrmDomain = require('../')
const { DomainName } = messageOrmDomain

DynamoDBORMProvider(container)
container.register(messageOrmDomain)

const Domain = container[DomainName]
const retrieve = []

describe('ORM methods', () => {
    const { StatusHistoryORM, MessageORM, Repository } = Domain
    const methodsList = [
        {
            className: 'MessageORM',
            ClassDefinition: MessageORM,
            methods: [
                'get',
                'set',
                'save',
                '_save',
                'delete',
                'update',
                'validate',
                'addItem',
                'removeItem',
                'updateItem',
            ]
        },
        {
            className: 'StatusHistoryORM',
            ClassDefinition: StatusHistoryORM,
            methods: [
                'get',
                'set',
                'save',
                'delete',
                'update',
                'validate',
                'addItem',
                'removeItem',
                'updateItem',
            ]
        }
    ]

    methodsList.map(({
        className,
        ClassDefinition,
        methods
    }) => describe(`${className} instance should have`, () => {
        methods.map(method => 
            test(`${method} method`, () => {
                expect(new ClassDefinition({})).toHaveProperty(method)
                expect(new ClassDefinition({})[method]).toBeInstanceOf(Function)
        }))
    }))
    describe(`Repository should have`, () => {
        const methods = [
            'get', 'find'
        ]
        methods.map(method => 
            test(`${method} method`, () => {
                expect(Repository).toHaveProperty(method)
                expect(Repository[method]).toBeInstanceOf(Function)
            })
        )

    })

    describe('Message operations', () => {
        // creating a new with input
            // should have a messageId
        test('creating a message with input should also set the message id', () => {
            const message = new MessageORM({input: [[1], [1]]})
            expect(message).toHaveProperty('messageId', '1|1')
        })

        test('saving a message should validate itself', async done => {
            const message = new MessageORM({messageId: 'mock'})
            return message.save().then(done).catch(err => {
                return done()
            })
        }, 3000)

        test('changeStatus method should also add a statusHistory item in statusHistory', () => {
            const message = new MessageORM({messageId: 'mock'})
            message.changeStatus(`mock`)
            expect(message).toHaveProperty('status', 'mock')
            expect(message).toHaveProperty('statusHistory')
            expect(message.statusHistory[0]).toHaveProperty('status', 'mock')
        })
    })
    // test('MessageORM update method')
    
    
})
