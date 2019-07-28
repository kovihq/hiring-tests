const services = require('../../ioc')

const { handler: post } = require('../post')
const { MessageORM: {MessageORM}} = services
describe('Post handler', () => {
    test('should return a message in data and status 202', (done) => {
        const event = {
            body: [[1],[1]]
        }
        return post(event, {}, async payload => {
            console.log('@payload', payload)
            const {status, data} = JSON.parse(payload)

            expect(status).toBe(202)
            expect(data).toHaveProperty('createdAt')
            expect(data).toHaveProperty('updatedAt')
            const message2delete = new MessageORM({messageId: '1|1'})
            await message2delete.delete()
            return done()
        })
        
    }, 30000)
    test('should return a message in data and status 200', (done) => {
        const messageAlredySaved = new MessageORM({input: [[1],[2]], status: 'sending_to_db'})
        return messageAlredySaved.save()
        .then(() => {
            const event = {
                body: [[1],[2]]
            }
            return post(event, {}, async (payload)=> {
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
            return post(event, {}, async (payload)=> {
            console.log('@payload', payload)
            const {status, code, errors} = JSON.parse(payload)
                expect(status).toBe(422)
                expect(code).toMatch('invalid_payload')
                expect(errors).toBeInstanceOf(Array)
                return done()
            })
    }, 30000)
})