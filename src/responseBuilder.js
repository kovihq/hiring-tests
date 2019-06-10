module.exports = (httpStatusCode, message) => {
  return {
    statusCode: httpStatusCode,
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
