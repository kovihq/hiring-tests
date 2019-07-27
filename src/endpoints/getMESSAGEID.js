const services = require('../ioc')

const {
	presenter,
	chargePaymentCard,
} = services


// handler
async function handler(event, context, callback) {
	const {
		body,
	} = event
	try {
		const payload = await chargePaymentCard(body)
		console.log('->', payload)
		return callback(null, presenter.succeeded(payload))
	} catch (error) {
		console.log('>!<', error)
		return callback(presenter.failed(error))
	}
}

module.exports = {
	handler
}
