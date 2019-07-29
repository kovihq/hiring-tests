export const StatusHistorySchema = hasToBe => ({
    'status': {
        'type': 'String',
        'validator': hasToBe.string().valid(
            'sending_to_db',
            'proccessing_output',
            'message_processed',
            'error'
        ).required()
    }
})
