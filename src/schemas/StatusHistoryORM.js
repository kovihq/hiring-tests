export const StatusHistorySchema = hasToBe => ({
    'status': {
        'type': 'String',
        'validator': hasToBe.string().valid(
            'pending',
            'processing',
            'created',
            'error'
        ).required()
    }
})
