'use strict';

const intersectSorted = require('../../libs/js/intersectSorted').intersectSorted;

test('Deve retornar erro se o primeiro parâmetro não for um array!', () => {
    expect(() => intersectSorted({}, [])).toThrow("O primeiro parâmetro deve ser um Array!");
});

test('Deve retornar erro se o segundo parâmetro não for um array!', () => {
    expect(() => intersectSorted([], {})).toThrow("O segundo parâmetro deve ser um Array!");
});

test('Deve retornar [] se o primeiro parâmetro for vazio', () => {
    expect(intersectSorted([], [1])).toStrictEqual([]);
});

test('Deve retornar [] se o segundo parâmetro for vazio', () => {
    expect(intersectSorted([1], [])).toStrictEqual([]);
});

test('Deve retornar [1,2,3] ao receber [1,2,3] e [1,2,3]', () => {
    expect(intersectSorted([1, 2, 3], [1, 2, 3])).toStrictEqual([1, 2, 3]);
});

test('Deve retornar [] ao receber [3,4] e [1,2]', () => {
    expect(intersectSorted([3, 4], [1, 2])).toStrictEqual([]);
});

test('Deve retornar [2] ao receber [1,2,3] e [2]', () => {
    expect(intersectSorted([1, 2, 3], [2])).toStrictEqual([2]);
});