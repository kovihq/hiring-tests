const unmock = process.env['UNMOCK']
const {
    getJwtToken,
    deleteClient,
    setClientData,
} = require('@spark/utils/lib/tests')

global.error = false
global.sparkTimeout = 900

if(unmock) {
    jest.unmock('@spark/utils/lib/APIClient/HttpClient')
    global.sparkTimeout = 90000

}
async function getTestClient(credentials) {
    if(unmock) {
        await setClientData(credentials)
        const token = await getJwtToken()
        return {
            token,
            delete: deleteClient
        }
    }
     
    return {
        delete: () => Promise.resolve(true),
        token: 'head.content.tail',
    }
}

global.getTestClient = getTestClient
global.unmock = unmock