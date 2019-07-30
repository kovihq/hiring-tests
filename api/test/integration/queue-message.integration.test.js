/**
 * File to make tests about integration involving the API
 * Using fake data, is possible verify if the call of the methods exposed by API get the correct result
 */
const should = require('should'); // eslint-disable-line
const request = require('supertest');

describe('Queue Message Integration Test', () => {
    let agent;
    let server;

    before((done) => {
        // require the server only here, cleaning cache, to avoid that its started before it is necessary
        delete require.cache[require.resolve('../../src/index')];
        server = require('../../src/index');
        agent = request.agent(server);
        server.once('server-started', () => {
            done();
        });
    });
    after((done) => {
        // close connection with server, waiting every closes before exit the tests
        server.once('server-stopped', () => {
            done();
        });
        server.app.close();
    });
    describe('Get Equals - Get', () => {
        it(`Should be able to get a list of items sending arryas with equals values`, async () => {
            let array1 = [2057, 1, 333, 35, 10, 666666, 97, 12, 341259];
            let array2 = [1, 22, 333, 4444, 55555, 666666]
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.length(3);
                    results.body.should.be.Array();
                    results.body.should.containDeepOrdered([1, 333, 666666]);
                });

            array1 = [2057, 333, 35, 10, 666666, 97, 12, 341259];
            array2 = [1, 22, 333, 4444, 55555, 666666]
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.length(2);
                    results.body.should.be.Array();
                    results.body.should.containDeepOrdered([333, 666666]);
                });
        });
    });
});