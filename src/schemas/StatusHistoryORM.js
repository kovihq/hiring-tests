export const StatusHistorySchema = hasToBe => ({
    'status': {
        'type': 'String',
        'validator': hasToBe.string().valid(
            'sending_to_db',
            'processing',
            'created',
            'error'
        ).required()
    }
})
