import v4 from 'uuid/v4'

export const CreditCardSchema = hasToBe => ({
    id: {
        type: 'String',
        keyType: 'HASH',
        defaultProvider: v4,
        validator: hasToBe.string().guid()
    },
    cardNumber: {
        type: 'String',
        validator: hasToBe.string().alphanum()
    },
    last4Digits: {
        type: 'String',
        validator: hasToBe.string().required().regex(/^([0-9]){1,4}$/)
    },
    bin: {
        type: 'String',
        validator: hasToBe.string()
    },
    expirationDate: {
        type: 'String',
        validator: hasToBe.number()
    },
    token: {
        type: 'String',
        validator: hasToBe.string()
    },
    status: {
        type: 'String',
        validator: hasToBe.string().valid('active', 'blocked', 'created')
    },
    statusHistory: {
        type: 'List',
        memberType: {
            type: 'Any'
        },
        validator: hasToBe.array().items(hasToBe.object())
    }
})
