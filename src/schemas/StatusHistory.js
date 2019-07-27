export const StatusHistorySchema = hasToBe => ({
    'createdAt': {
        'type': 'String',
        'defaultProvider': () => (new Date()).toISOString(),
        'validator': hasToBe.string()
    },
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
