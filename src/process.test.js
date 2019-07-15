const { intersect, sortArrayBySizeAsc, validateBody } = require('./process');

describe('intersect', () => {
    test('Should return the intersect items sorted', () => {
        expect(intersect([3, 1, 2], [3, 1])).toEqual([1, 3]);
        expect(intersect([], [])).toEqual([]);
        expect(intersect([1], [1])).toEqual([1]);
        expect(intersect([2], [1])).toEqual([]);
    });
});

describe('getBiggerArray', () => {
    test('Should return the biggest array', () => {
        const method = sortArrayBySizeAsc;
        expect(method([[1], []])).toEqual([[], [1]]);
        expect(method([[], [1, 2], [1]])).toEqual([[] ,[1] , [1, 2]]);
        expect(method([[], []])).toEqual([[], []]);
    })
});

describe('validateBody', () => {
    const method = validateBody;

    test('Should validade the body', () => {
        expect(method([[], []])).toBeTruthy();
        expect(method([[3,2,1], [1,3]])).toBeTruthy();
    });
    
    test('Should not validade the body', () => {
        expect(method([[]])).toBeFalsy();
        expect(method([[false], ['a']])).toBeFalsy();
    })
})