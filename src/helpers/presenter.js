const presenterProvider = container => container.service('presenter', (c) => {
  const presenter = new c.Presenter({
      'EmailOrCPFAlreadyExistsErrors': err => ({
        code: 'email_cpf_already_exists',
        status: 422,
        errors: err.errors.map(({ identifier, message }) => ({ identifier, message })),
      }),
      'InvalidUpdateOperations': err => ({
        code: 'invalid_fields_updated',
        status: 422,
        errors: err.errors.map(({ identifier, message }) => ({ identifier, message })),
      }),
      'InvalidOperation': err => (console.log('err', JSON.stringify(err)),{
        code: 'invalid_operation',
        status: 422,
        message: err.error.message,
      }),
      'TokenAlreadyTouched': err => ({
        code: 'token_alredy_used',
        status: 422,
        message: 'This token was already used.',
      }),
      'InactiveItem': err => ({
        code: 'deleted_item',
        status: 404,
        message: 'This item was deleted.',
      }),
      'InconsistentTransactionData': err => ({
        code: 'inconsistent_transaction_data',
        status: 422,
        message: err.message,
      }),
      'nonexistent_payee_error': err => ({
        code: err.code,
        status: 422,
        message: err.message,
      }),
      'nonexistent_payer_error': err => ({
        code: err.code,
        status: 422,
        message: err.message,
      }),
      'invalid_merchant_error': err => ({
        code: err.code,
        status: 422,
        message: err.message,
      }),
      'not_allowed_to_cancel': err => ({
        code: err.code,
        status: 403,
        message: err.message,
      }),
  })

  presenter.register('links', {
    'payee': (value) => ({
      account: {
        href: `/accounts/${value.id}`,
        method: 'GET'
      },
      paymentAccount: {
        href: `/payment-accounts?customerId=${value.id}`,
        method: 'GET'
      },
      privateLabelAccount: {
        href: `/private-label-accounts?customerId=${value.id}`,
        method: 'GET'
      }
    }),
    'payer': (value) => ({
      account: {
        href: `/accounts/${value.id}`,
        method: 'GET'
      },
      paymentAccount: {
        href: `/payment-accounts?customerId=${value.id}`,
        method: 'GET'
      },
      privateLabelAccount: {
        href: `/private-label-accounts?customerId=${value.id}`,
        method: 'GET'
      }
    }),
    'self': ({ id, status }) => {
      const cancelTransaction = {
        href: `/transactions/${id}`,
        method: 'DELETE'
      }
      const confirmTransaction = {
        href: `/transactions/${id}/confirm`,
        method: 'POST'
      }
      const payTransaction = {
        href: `/transactions/${id}/pay`,
        method: 'POST'
      }
      return {
        self: {
          href: `/transactions/${id}`,
          method: 'GET'
        },
        ...(
          status === 'awaiting_payment' ?
            {
              confirmTransaction,
              cancelTransaction,
            } :
          status === 'under_analysis' ? 
            {
              payTransaction,
              cancelTransaction,
            } :
          {}
          )
      }
    }
  })

  return presenter
})

module.exports = presenterProvider
