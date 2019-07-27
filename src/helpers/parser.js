function parser(parserFields) {
    const paymentMethod = {
        type: 'Document',
        members: {
            id: { type: 'String' },
            paymentAccountId: { type: 'String' },
            privateLabelAccountId: { type: 'String' },
            kind: { type: 'String' }
        }
    }
    const device = {
        type: 'Document',
        members: {
          id: { type: 'String' },
          name: { type: 'String' },
          manufacturer: { type: 'String' },
          version: { type: 'String' },
          fingerprint: { type: 'String' },
          carrier: { type: 'String' },
          country: { type: 'String' },
          locale: { type: 'String' },
          ip: { type: 'String' },
        }
    }
    const person = {
        id: { type: 'String' },
        latitude: { type: 'String' },
        longitude: { type: 'String' },
        paymentMethod,
        device,
    }
      
    return parserFields({
        confirm: {
            type: 'Document',
            members: {
                payer: {
                    type: 'Document',
                    members: { ...person }
                },
                token: { type: 'String' }
            }
        },
        pay: {
            type: 'Document',
            members: {
                paymentMethod,
            }
        },
        create: {
            type: 'Document',
            members: {
                digitableLine: { type: 'String' },
                amount: { type: 'Number'},
                description: { type: 'String' },
                flow: { type: 'String' },
                kind: { type: 'String' },
                service: {
                    type: 'Document',
                    members: {
                        kind: { type: 'String' },
                        billetId: { type: 'String'},
                        provider: { type: 'String'},
                        id: { type: 'String' },
                    }
                },
                payer: {
                    type: 'Document',
                    members: {
                       ...person
                    }
                },
                payee: {
                    type: 'Document',
                    members: person,
                }

            },
        
        }
    })
}

parser.inject = ['parseFields']
parser.autoCall = true

module.exports = {
    parser
}


