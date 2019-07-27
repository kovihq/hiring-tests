const httpRequester = require('supertest')
const endpoint = process.env.ENDPOINT ? process.env.ENDPOINT : 'https://dev-api.stefanini-spark.com/payment-cards'
const request = httpRequester.agent(endpoint)
const type = 'application/json'
const parse = JSON.stringify
const credentials = {
    clientCredentials: [
        {
            allowed: [
                'get',
                'patch',
                'post',
                'delete'
            ],
            resources: [
                'payment-cards',
                'payment-cards/*',
                'authorizers',
                'authorizers/*',
            ]
        }
    ]
}
describe('charges endpoint', () => {
    let client
    beforeAll(async done => {
        client = await getTestClient(credentials)
        return done()
    }, sparkTimeout)

    const tests = [
        {
            message: 'should return a object with aut inside',
            target: 'body',
            assertion: 'toHaveProperty',
            params: ['aut'],
            body: {},
            path: '/fakeuuid/charges',
            method: 'post'
        },
        {
            message: 'should statusCode be 201',
            target: 'statusCode',
            assertion: 'toBe',
            params: [201],
            body: {},
            path: '/fakeuuid/charges',
            method: 'post'
        }
    ]
    
    tests.map(({
        message,
        target,
        params,
        body,
        path,
        method,
        assertion,
    }) => it(message, async done => {
        const data = await request[method](path)
            .type(type)
            .set('Authorization', client.token)
            .send(parse(body))
        expect(data[target])[assertion](...params)
        return done()
    }, sparkTimeout))

    it('should not access the api without Authorization - 401 error', async done => {
        const { statusCode } = await request.post('/fakeuuid/charges')
            .type(type)
            .send(parse({}))
        expect(statusCode).toBe(401)
        return done()
    }, sparkTimeout)
})