/**
 * File focused on exception and errors tests
 */
const should = require('should'); // eslint-disable-line
const sinon = require('sinon');
const queueMessageController = require('../../src/controllers/queue.message.controller');

describe('Controller Queue Message Test', () => {
    it(`Should return status 422 if doens't has param 'array1'`, async () => {
        const req = { body: {
            array: [1,2,3],
            array2: [4,5,6]
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(422).should.equal(true);
        res.send.calledWith(`param 'array1' is required`).should.equal(true);
    });
    it(`Should return status 422 if doens't has param 'array2'`, async () => {
        const req = { body: {
            array1: [1,2,3],
            array: [4,5,6]
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(422).should.equal(true);
        res.send.calledWith(`param 'array2' is required`).should.equal(true);
    });
    it(`Should return status 422 if first param is not an array`, async () => {
        const req = { body: {
            array1: 'asd',
            array2: [4,5,6]
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(422).should.equal(true);
        res.send.calledWith(`param 'array1' must be an array of int values`).should.equal(true);
    });
    it(`Should return status 422 if second param is not an array`, async () => {
        const req = { body: {
            array1: [1,2,3],
            array2: 456
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(422).should.equal(true);
        res.send.calledWith(`param 'array2' must be an array of int values`).should.equal(true);
    });
    it(`Should return status 422 if has one item not int in the first array`, async () => {
        const req = { body: {
            array1: [1,2,'a'],
            array2: [4,5,6]
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(422).should.equal(true);
        res.send.calledWith(`param 'array1' must be an array of int values`).should.equal(true);
    });
    it(`Should return status 422 if has one item not int in the second array`, async () => {
        const req = { body: {
            array1: [1,2,3],
            array2: [4,5,6.1]
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(422).should.equal(true);
        res.send.calledWith(`param 'array2' must be an array of int values`).should.equal(true);
    });
    it('Should return status 204 if params is ok and no one of items exists in both arrays', async () => {
        const req = { body: {
            array1: [1,2,3],
            array2: [4,5,6]
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(204).should.equal(true);
    });
    it('Should return status 200 if params is ok and least one of items exists in both arrays', async () => {
        const req = { body: {
            array1: [1,2,3],
            array2: [3,2,1]
        }};
        const res = { status: sinon.spy(), send: sinon.spy() };

        await queueMessageController.getEqualElements(req, res);

        res.status.calledWith(200).should.equal(true);
    });
});