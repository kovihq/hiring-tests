const services = require('../ioc')

const {
	presenter,
    saveMessageOutput,
    processMessage
} = services


async function handler(event, context, callback) {
    console.log('all record: ',  JSON.stringify(event, null, 2))
    const records = event.Records.reduce((list, record) => {
        if(record.eventName === 'INSERT') {
            return [
                ...list,
                record.dynamodb.Keys.messageId.S
            ]
        }
    }, [])
    console.log('all record: ',  JSON.stringify(records))
    const actions = records.map(async messageId => {
        const message = await Repository.get({messageId})
        message.changeStatus('proccessing_output')
        const output = processMessage(message)
        message.set('output', output)
        message.changeStatus('message_processed')
        return message.save()
    })
    await Promise.all(actions)
    return 'job done'
};

module.exports = { handler }
