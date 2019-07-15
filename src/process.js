'use strict'

const Joi = require('joi');

const intersect = (stArray, ndArray) => {
    const [smallArray, biggerArray] = sortArrayBySizeAsc([stArray, ndArray]);
    const a = new Set(biggerArray);
    return smallArray
        .filter((item) => a.has(item))
        .sort();
}

const sortArrayBySizeAsc = (arrays) => arrays
    .sort((prev, next) => prev.length - next.length);

const bodySchema = Joi
    .array()
    .items(Joi.array().items(Joi.number()))
    .length(2);

const validateBody = (body) => !bodySchema.validate(body).error;

module.exports = {
    intersect,
    sortArrayBySizeAsc,
    validateBody
} 
