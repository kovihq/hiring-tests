'use strict';
const { intersect, validateBody } = require('./src/process');

const consumeQueue = async (event) => {
	if (event.Records.length > 1) {
		throw new Error('This function must consume only one message per execution');
	}

	try {

		const body = JSON.parse(event.Records[0].body);
		if (!validateBody(body)) {
			throw new Error();
		}

		return {
			error: false,
			response: intersect(body[0], body[1])
		};
	} catch (error) {
		return {
			error: true,
			message: 'Invalid body',
			body: event.Records[0].body
		}
	}
};

module.exports = {
	consumeQueue
}
