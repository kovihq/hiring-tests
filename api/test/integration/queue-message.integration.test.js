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
            let array2 = [1, 22, 333, 4444, 55555, 666666];
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
            array2 = [1, 22, 333, 4444, 55555, 666666];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.length(2);
                    results.body.should.be.Array();
                    results.body.should.containDeepOrdered([333, 666666]);
                });

            array1 = [98745, 10000, 6, 85, 1245, 80147, 14, 2, 4, 21, 587, 1021];
            array2 = [3500, 323, 21, 28, 51, 67, 10289, 25, 9987];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.length(1);
                    results.body.should.be.Array();
                    results.body.should.containDeepOrdered([21]);
                });

            array1 = [32, 9999997, 21, 32, 6, 85, 1245, 80147, 71, 14, 2, 4, 21, 587, 32];
            array2 = [3500, 323, 21, 28, 32, 51, 67, 10289, 25, 9987, 9999997, 71];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.length(4);
                    results.body.should.be.Array();
                    results.body.should.containDeepOrdered([21, 32, 71, 9999997]);
                });

            array1 = [32, 9999997, 21, 32, 6, 85, 1245, 80147, 71, 14, 2, 4, 21, 587, 32];
            array2 = [1245, 21, 4, 9999997, 71];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.length(5);
                    results.body.should.be.Array();
                    results.body.should.containDeepOrdered([4, 21, 71, 1245, 9999997]);
                });

            array1 = [32, 9919997, 8, 67, 25, 32, 100, 8, 8, 587, 9919997];
            array2 = [3500, 32, 8, 8, 51, 67, 10289, 25, 100, 67, 9919997, 71];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(200)
                .expect('Content-Type', /json/)
                .then((results) => {
                    results.body.should.have.length(6);
                    results.body.should.be.Array();
                    results.body.should.containDeepOrdered([8, 25, 32, 67, 100, 9919997]);
                });
        });
        it(`Should be able to get an empty list if sending array with no equals items`, async () => {
            let array1 = [98745, 10000, 6, 85, 1245, 80147, 14, 2];
            let array2 = [3500, 323, 28, 51, 67, 10289, 25, 9987];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(204);

            array1 = [];
            array2 = [3500, 323, 28, 51, 67, 10289, 25, 9987];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(204);

            array1 = [98745, 10000, 6, 85, 1245, 80147, 14, 2];
            array2 = [];
            await agent.post(`/queue-message/get-equals`)
                .send({ array1, array2 })
                .expect(204);
        });
    });
});