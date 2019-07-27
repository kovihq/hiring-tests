const services = require('../ioc')

const {
	presenter,
	chargePaymentCard,
} = services


// handler
async function handler(event, context, callback) {
	const {
		body,
		headers: {
			Authorization,
			authorization
		},
	} = event
	const jwtToken = Authorization || authorization
	try {
		const payload = await chargePaymentCard(body, jwtToken)
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
