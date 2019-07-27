
const { getFinancialInstitutionPaymentMethodIdByKind } = require('../helpers/getFinancialInstitutionPaymentMethodIdByKind')
const { hifenToCamelCase } = require('../helpers/hifenToCamelCase')
const { publishMessageFactory } = require('@spark/utils/lib/publishMessageToTransactionsEvents')
const { getFinancialInstitutionIdFromJwtToken } = require('@spark/utils/lib/getFinancialInstitutionId')
const { getAccountIdFromApiKey } = require('@spark/utils/lib/getAccountId')
const { Presenter } = require('@spark/utils/lib/Presenter')

function provider(container) {
    container.service(
        'publishMessageFactory',
        () => publishMessageFactory
    )
    container.service(
        'getFinancialInstitutionIdFromJwtToken',
        (c) => getFinancialInstitutionIdFromJwtToken
    )
    container.service(
        'Presenter',
        () => Presenter
    )
    
    container.service(
        'getFinancialInstitutionPaymentMethodIdByKind',
        (c) => getFinancialInstitutionPaymentMethodIdByKind.bind(null, c.AccountDomain)
    )
    
    container.service(
        'hifenToCamelCase',
        () => hifenToCamelCase
    )
    
    container.service(
        'getAccountIdFromApiKey',
        () => getAccountIdFromApiKey
    )
}

module.exports = provider