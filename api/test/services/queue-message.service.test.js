const should = require('should'); // eslint-disable-line
const { GetEqualElements } = require('../../src/services/queue-message.service.js');

describe('Queue Message Service Test', () => {
    it(`Should return an empty array if no one items on arrays are equals`, async () => {
        const array1 = [1,2,3];
        const array2 = [4,5,6];
        const result = await GetEqualElements(array1, array2);
        result.should.have.length(0);
    });
    it(`Should return an empty array if on of arrays is empty`, async () => {
        const array1 = [];
        const array2 = [4,5,6];
        const result = await GetEqualElements(array1, array2);
        result.should.have.length(0);
    });
    it(`Should return an array with one item if one item on arrays are equals`, async () => {
        const array1 = [1,2,3];
        const array2 = [4,5,3];
        const result = await GetEqualElements(array1, array2);
        result.should.have.length(1);
    });
    it(`Should return an array with more than one item if more than one item on arrays are equals`, async () => {
        const array1 = [1,2,3,4,10,15];
        const array2 = [4,5,3];
        const result = await GetEqualElements(array1, array2);
        result.length.should.be.above(1);
    });
});