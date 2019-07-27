const stage = process.env['STAGE']
     
const config = {
    iss: 'http://localhost:4444',
    region: 'us-east-1',
    stage,
    apikey: process.env['PAYMENT_ACCOUNTS_API_KEY_READ'] || 
        stage === 'staging' ? 'd912fdce-fff6-43eb-8a29-7d721c7541aa.7kluWrpJkos0O7FApUa' :
        stage === 'dev' ? '4d0a6f7b-7238-4a6c-943b-9b2e81c0c726.0tKNFyMgiDyTd7z7jKB' :
        'put another envs'
}
module.exports = config