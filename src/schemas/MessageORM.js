import v4 from 'uuid/v4'

export const MessageSchema = hasToBe => ({
    status: {
        type: 'String',
        indexKeyConfigurations: {
            'status-messageId-index': 'HASH'
        },
        validator: hasToBe.string().valid(
            'pending',
            'processing',
            'created',
            'error'
        ).required()
    },
    messageId: {
        type: 'String',
        keyType: 'HASH',
        indexKeyConfigurations: {
            'status-messageId-index': 'RANGE'
        },
        validator: hasToBe.string().required()
    },
    input: {
        type: 'Any',
        validator: hasToBe.array().items(
            hasToBe.array().items(
                hasToBe.number()
            )
        ).required()
    },
    output: {
        type: 'Any',
        validator: hasToBe.array().items(
            hasToBe.number()
        )
    },
    statusReason: {
        type: 'String',
        validator: hasToBe.string()
    },
    statusHistory: (embed, embedClass, itemSchema) => ({
        type: 'List',
        memberType: embed(embedClass),
        validator: hasToBe.array().items(
            hasToBe.object().keys(itemSchema)
        ).min(0)
    }),
})

