const should = require('should'); // eslint-disable-line
const { requestGetEqualsValidator } = require('../../src/validators/requestGetEquals.validator');


describe('Request Get Equals Validator Test', () => {
    it(`Should be rejected if array1 not exists`, async () => {
        const arrays = { array2: [4,5,6] };
        await requestGetEqualsValidator(arrays).should.be.rejectedWith('required-array1');
    });
    it(`Should be rejected if array2 not exists`, async () => {
        const arrays = { array1: [1,2,3] };
        await requestGetEqualsValidator(arrays).should.be.rejectedWith('required-array2');
    });
    it(`Should be rejected if array1 is not an array`, async () => {
        const arrays = { array1:123, array2: [4,5,6] };
        await requestGetEqualsValidator(arrays).should.be.rejectedWith('type-array1');
    });
    it(`Should be rejected if array2 is not an array`, async () => {
        const arrays = { array1:[1,2,3], array2: '456' };
        await requestGetEqualsValidator(arrays).should.be.rejectedWith('type-array2');
    });
    it(`Should be rejected if array1 has one non int item`, async () => {
        const arrays = { array1:[1,2,'3'], array2: [4,5,6] };
        await requestGetEqualsValidator(arrays).should.be.rejectedWith('type-array1');
    });
    it(`Should be rejected if array2 has one non int item`, async () => {
        const arrays = { array1:[1,2,3], array2: [4,5.22,6] };
        await requestGetEqualsValidator(arrays).should.be.rejectedWith('type-array2');
    });
    it(`Should be accepted if two arrays is valid`, async () => {
        const arrays = { array1:[1,2,3], array2: [4,5,6] };
        const result = await requestGetEqualsValidator(arrays);
        result.should.be.true();
    });
});