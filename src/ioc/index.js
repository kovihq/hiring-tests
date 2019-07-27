const awsXRay = require('aws-xray-sdk')
const AWS = awsXRay.captureAWS(require('aws-sdk'))
const container = require('@spark/services-container')
const { default: DynamoDBORMProvider } = require('@spark/dynamodborm/lib/provider')

const HelpersProvider = require('./helpers')
const PresenterProvider = require('../helpers/presenter')
MessagesntCardORMProvider = require('../orm')

const chargeService = require( '../services/charge')

container.register(chargeService)

DynamoDBORMProvider(container)
MessagesORMProvider(container)
HelpersProvider(container)
PresenterProvider(container)

console.log('container', container)
module.exports = container

