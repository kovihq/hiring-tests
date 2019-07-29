const services = require('../ioc')

const {
    MessageORM: {Repository, MessageORM},
    processMessage
} = services


async function handler(event, context, callback) {
    console.log('all event: ',  JSON.stringify(event, null, 2))
    
    const records = event.Records.filter((record) => {
        if(record.eventName === 'INSERT') return true
        return false
    }, []).map(record => record.dynamodb.Keys.messageId.S)

    console.log('all records: ',  JSON.stringify(records))
    const actions = records.map(async messageId => {
        console.log(`proccessing message: ${messageId}`)
        let message
        try {
            message = await Repository.get({messageId})
        } catch(err) {
            message = new MessageORM({messageId})
            message.changeStatus('error', err)
            message.set('statusReason', err.code)
            await message._save()
        }
        message.changeStatus('proccessing_output')
        console.log(JSON.stringify(message, null, 2))
        try {
            console.log(JSON.stringify(message.get('input'), null, 2))
            const input = message.get('input').map(item => item.map(({value}) => value))
            
            message.set('input', input)

            const output = processMessage({input})
            console.log(output)
            message.set('output', output)
            message.changeStatus('message_processed')
            console.log(message)
            console.log(JSON.stringify(message, null, 2))
            
            return message.save()
        } catch (err) {
            message.changeStatus('error', err)
            message.set('statusReason', err.code || err.message)
            return message._save()
        }
        
    })
    await Promise.all(actions)
    return 'job done'
};

module.exports = { handler }
