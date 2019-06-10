const QueueArrayChallenge = require('../QueueMessageArrayChallenge')
const responseBuilder = require('../responseBuilder')

module.exports.handler = async (event) => {
  let body
  try {
    body = JSON.parse(event.body)
  } catch (error) {
    console.log(error)
    return responseBuilder(400, { message: 'invalid json' })
  }

  if (!body.firstArray || !body.secondArray) {
    console.log('invalid body', body)
    return responseBuilder(400, { message: 'invalid request' })
  }

  const queueArrayChallenge = new QueueArrayChallenge()

  const result = queueArrayChallenge.getCommomElementsOrdered(body.firstArray, body.secondArray)
  return responseBuilder(200, result)
}
