const container = require('@spark/services-container')
const {default: DynamoDBORMProvider} = require('@spark/dynamodborm/lib/provider')
const saveMessageInput = require('../saveMessageInput')
const MessageORM = require('../../orm')

DynamoDBORMProvider(container)
container.register(saveMessageInput)
container.register(MessageORM)
describe('saveMessageInput function', () => {
    test('should save a new message into database', async (done) => {
        const { saveMessageInput, MessageORM: { MessageORM } } = container
        const [code, message] = await saveMessageInput([[1],[1]])
        expect(code).toMatch('saved')
        expect(message).toHaveProperty('createdAt')
        expect(message).toHaveProperty('updatedAt')

        const message2delete = new MessageORM({messageId: '1|1'})
        await message2delete.delete()
        return done()
    }, 30000)

    test('should return a already saved message ', async done => {
        const { saveMessageInput, MessageORM: { MessageORM } } = container
        await saveMessageInput([[1, 1]])
        const [code, message] = await saveMessageInput([[1, 1]])
        expect(code).toMatch('already_saved')
        expect(message).toHaveProperty('createdAt')
        expect(message).toHaveProperty('updatedAt')

        const message2delete = new MessageORM({messageId: '1|1'})
        await message2delete.delete()
        return done()
    })

    test('should throw if a invalid input is suplied ', done => {
        const { saveMessageInput } = container
        return saveMessageInput([[1, 'a']]).then(done).catch(err => {
            expect(err.code).toMatch('ValidationError')
            return done()
        })
        
    })
})