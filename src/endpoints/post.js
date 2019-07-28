const services = require('../ioc')

const {
	presenter,
	saveMessageInput,
} = services


// handler
async function handler(event, context, callback) {
	const {
		body,
	} = event
	try {
		const [code ,payload] = await saveMessageInput(body)
		console.log('code', code)
		console.log('payload', payload)
		return callback(null, presenter.succeeded({
			status: code === 'saved' ? 201 : 200,
			data: payload
		}))
	} catch (error) {
		console.log('>!<', error)
		return callback(presenter.failed(error))
	}
}

module.exports = {
	handler
}
