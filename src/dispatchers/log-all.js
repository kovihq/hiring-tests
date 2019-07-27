async function handler(event, context, callback) {
    console.log('message and atributes: ', {
        kind: event.Records[0].Sns.MessageAttributes.kind.Value,
        message: JSON.parse(event.Records[0].Sns.Message) || event.Records[0].Sns.Message,
        attrs: event.Records[0].Sns.MessageAttributes,
    })
    console.log('all record: ',  JSON.stringify(event.Records[0], 4, null))
    return callback(null, 'job done')
};

module.exports = { handler }
