const services = require('../../ioc')

const { handler: post } = require('../post')
const { MessageORM: {MessageORM}} = services
describe('Post handler', () => {
    test('should return a message in data and status 201', (done) => {
        const event = {
            body: [[1],[1]]
        }
        return post(event, {}, async (err, payload)=> {
            const {status, data} = JSON.parse(payload)
            console.log('@payload', payload)

            expect(status).toBe(201)
            expect(data).toHaveProperty('createdAt')
            expect(data).toHaveProperty('updatedAt')
            const message2delete = new MessageORM({messageId: '1|1'})
            await message2delete.delete()
            return done()
        })
        
    }, 30000)
    test('should return a message in data and status 200', (done) => {
        const messageAlredySaved = new MessageORM({input: [[1],[1]], status: 'sending_to_db'})
        return messageAlredySaved.save()
        .then(() => {
            const event = {
                body: [[1],[1]]
            }
            return post(event, {}, async (err, payload)=> {
                console.log('@payload', payload)
                const {status, data} = JSON.parse(payload)
                expect(status).toBe(200)
                expect(data).toHaveProperty('createdAt')
                expect(data).toHaveProperty('updatedAt')
                const message2delete = new MessageORM({messageId: '1|1'})
                await message2delete.delete()
                return done()
            })
        })
        
    }, 30000)

    test('should return a code, and errors with a invalid payload', (done) => {
            const event = {
                body: [[true],[1]]
            }
            return post(event, {}, async (err, payload)=> {
            console.log('@payload', payload)
            const {status, code, errors} = JSON.parse(err)
                expect(status).toBe(422)
                expect(code).toMatch('invalid_payload')
                expect(errors).toBeInstanceOf(Array)
                return done()
            })
    }, 30000)
})