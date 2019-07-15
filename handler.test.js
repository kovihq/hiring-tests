const { consumeQueue } = require('./handler');

describe('consumeQueue', () => {
	test('Should throw error by multiple records', () => {
		const event = {
			Records: [{}, {}]
		};

		expect(consumeQueue(event)).rejects.toThrowError();
	});

	test('Should return response with error when have a invalid json body', () => {
		const event = {
			Records: [{
				body: 'invalid json'
			}]
		};

		expect(consumeQueue(event)).resolves.toEqual({
			error: true,
			message: 'Invalid body',
			body: 'invalid json'
		});
	});

	test('Should return response with error when have a invalid json body', () => {
		const event = {
			Records: [{
				body: 'invalid json'
			}]
		};

		expect(consumeQueue(event)).resolves.toEqual({
			error: true,
			message: 'Invalid body',
			body: 'invalid json'
		});
	});

	test('Should return response with error when have a invalid body', () => {
		const event = {
			Records: [{
				body: '[["a"]]'
			}]
		};

		expect(consumeQueue(event)).resolves.toEqual({
			error: true,
			message: 'Invalid body',
			body: '[["a"]]'
		});
	});


	test('Should return response', () => {
		const event = {
			Records: [{
				body: '[[3,2,1],[3,1]]'
			}]
		};

		expect(consumeQueue(event)).resolves.toEqual({
			error: false,
			response: [1, 3]
		});
	});
});