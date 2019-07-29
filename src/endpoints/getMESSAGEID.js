const services = require('../ioc')

const {
	presenter,
	showMessage,
} = services


// handler
async function handler(event, context, callback) {
	const {
		pathParams: { messageid },
	} = event
	try {
		console.log("messageid", messageid.replace('%7C', '|'))
		const payload = await showMessage(messageid.replace('%7C', '|'))
		console.log('->', payload)
		return callback(presenter.succeeded({status: 200, data: payload }))
	} catch (error) {
		console.log('>!<', error)
		return callback(presenter.failed(error))
	}
}

module.exports = {
	handler
}
