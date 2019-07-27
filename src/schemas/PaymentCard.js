import v4 from 'uuid/v4'

export const PaymentCardSchema = hasToBe => ({
    financialInstitutionId: {
        type: 'String',
        keyType: 'HASH',
        indexKeyConfigurations: {
            'financialInstitutionId-accountId-index': 'HASH',
            'financialInstitutionId-status-index': 'HASH',
            'financialInstitutionId-reference-index': 'HASH'
        },
        validator: hasToBe.string().guid().required()
    },
    accountId: {
        type: 'String',
        indexKeyConfigurations: {
            'accountId-id-index': 'HASH',
            'financialInstitutionId-accountId-index': 'RANGE'
        },
        validator: hasToBe.string().guid().required()
    },
    reference: {
        type: 'String',
        indexKeyConfigurations: {
            'financialInstitutionId-reference-index': 'RANGE'
        },
        validator: hasToBe.string().required()
    },
    paymentMethodId: {
        type: 'String',
        indexKeyConfigurations: {
            'paymentMethodId-id-index': 'HASH'
        },
        validator: hasToBe.string().guid().required()
    },
    status: {
        type: 'String',
        indexKeyConfigurations: {
            'financialInstitutionId-status-index': 'RANGE'
        },
        validator: hasToBe.string().valid(
            'pending',
            'processing',
            'created',
            'error'
        ).required()
    },
    id: {
        type: 'String',
        keyType: 'RANGE',
        indexKeyConfigurations: {
            'id-index': 'HASH',
            'paymentMethodId-id-index': 'RANGE',
            'accountId-id-index': 'RANGE'
        },
        defaultProvider: v4,
        validator: hasToBe.string().guid()
    },
    privateLabelAccountId: {
        type: 'String',
        validator: hasToBe.string()
    },
    org: {
        'type': 'String',
        'validator': hasToBe.string().required().regex(/^([0-9]){1,4}$/)
    },
    logo: {
        type: 'String',
        validator: hasToBe.string().required().regex(/^([0-9]){1,4}$/)
    },
    embossingName: {
        type: 'String',
        validator: hasToBe.string().required()
    },
    dueDate: {
        type: 'Number',
        validator: hasToBe.number().integer().min(1).max(31).required()
    },
    addresses: (embed, embedClass, itemSchema) => ({
        type: 'List',
        memberType: embed(embedClass),
        validator: hasToBe.array().items(hasToBe.object().keys(itemSchema))
    }),
    codeProposal: {
        type: 'String',
        validator: hasToBe.string().required().regex(/^([0-9]){1,18}$/)
    },
    dateProposal: {
        type: 'String',
        validator: hasToBe.string()
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
    createdAt: {// remove when we put the commons
        type: 'String',
        defaultProvider: () => (new Date()).toISOString(),
        validator: hasToBe.date().iso()
    },
    updatedAt: {// remove when we put the commons
        type: 'String',
        defaultProvider: () => (new Date()).toISOString(),
        validator: hasToBe.date().iso()
    },
    creditCards: (embed, embedClass, itemSchema) => ({
        type: 'List',
        memberType: embed(embedClass),
        validator: hasToBe.array().items(hasToBe.object().keys(itemSchema))
    })
})

