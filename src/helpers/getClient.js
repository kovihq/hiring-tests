const { HttpClient } = require('@spark/utils/lib/APIClient/HttpClient')

const getClient = (token, basePath) => {
    const client = new HttpClient({
        stage: process.env['STAGE'],
        basePath
    })

    client.jwtToken = token
    return client
}

module.exports = { getClient }
