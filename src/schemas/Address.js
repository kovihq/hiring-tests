import v4 from 'uuid/v4'

export const AddressSchema = hasToBe => ({
    id: {
      type: 'String',
      keyType: 'HASH',
      defaultProvider: v4,
      validator: hasToBe.string().guid()
    },
    kind: {
      type: 'String',
      validator: hasToBe.string().valid('delivery').required()
    },
    country: {
      type: 'String',
      validator: hasToBe.string().required().regex(/^([A-Za-z]){2}$/)
    },
    state: {
      type: 'String',
      validator: hasToBe.any()
        .when('country',{ is: 'BR', then: hasToBe.string().regex(/^([A-Za-z]){2}$/), otherwise: hasToBe.string() })
        .required()
    },
    city: {
      type: 'String',
      validator: hasToBe.string().required().regex(/^([A-Za-z0-9\.áàâãéêíóôõúçÁÀÂÃÉÈÍÓÔÕÚ]\s?){1,}$/)
    },
    neighborhood: {
      type: 'String',
      validator: hasToBe.string().required().regex(/^([A-Za-z0-9\.áàâãéêíóôõúçÁÀÂÃÉÈÍÓÔÕÚ]\s?){1,}$/)
    },
    zipCode: {
      type: 'String',
      validator: hasToBe.string().required().regex(/^([0-9]{8})$/)
    },
    street: {
      type: 'String',
      validator: hasToBe.string().required().regex(/^([A-Za-z0-9]{1,}\s){1}([A-Za-z0-9]{2,}\s?){1,}$/)
    },
    addressNumber: {
      type: 'String',
      validator: hasToBe.string().required().regex(/^([A-Za-z0-9]\s?){2,9}$/)
    },
    complement: {
      type: 'String',
      validator: hasToBe.string().allow('')
    }
})
