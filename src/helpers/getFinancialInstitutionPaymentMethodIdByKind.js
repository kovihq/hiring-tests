async function getFinancialInstitutionPaymentMethodIdByKind(
    { Repository },
    {
        financialInstitutionId,
        kind: paymentMethodKind
    },
) {
    const account = await Repository.get({
        id: financialInstitutionId, index: 'id-index'
    })

    const paymentMethod = account.paymentsMethodsAvaliable.find(({ kind }) => kind === paymentMethodKind)
    return paymentMethod.id
}

module.exports = { getFinancialInstitutionPaymentMethodIdByKind }
