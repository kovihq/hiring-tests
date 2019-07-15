'use strict'

const Joi = require('joi');

/**
 * Find the intersection between two arrays. The Set was used to avoid O(n^2)
 * @param {number[]} stArray - The first numbers array.
 * @param {number[]} ndArray - The second numbers color.
 * @return {number[]}.
 */
const intersect = (stArray, ndArray) => {
	const [smallArray, biggerArray] = sortArrayBySizeAsc([stArray, ndArray]);
	const ref = new Set(biggerArray);
	return smallArray
		.filter((item) => ref.has(item))
		.sort();
}

/**
 * Order arrays list by length.
 * @param {Array[]} arrays - The first numbers array.
 * @return {Array[]} - Sorted arrays.
 */
const sortArrayBySizeAsc = (arrays) => arrays
	.sort((prev, next) => prev.length - next.length);

const bodySchema = Joi
	.array()
	.items(Joi.array().items(Joi.number()))
	.length(2);

/**
 * Order arrays list by length.
 * @param {Array[]} arrays - The first numbers array.
 * @return {boolean} - Sorted arrays.
 */
const validateBody = (body) => !bodySchema.validate(body).error;

module.exports = {
	intersect,
	sortArrayBySizeAsc,
	validateBody
} 
