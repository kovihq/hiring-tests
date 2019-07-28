const awsXRay = require('aws-xray-sdk')
const AWS = awsXRay.captureAWS(require('aws-sdk'))
const container = require('@spark/services-container')
const { Presenter } = require('@spark/utils/lib/Presenter')
const { default: DynamoDBORMProvider } = require('@spark/dynamodborm/lib/provider')

const presenter = require('../helpers/presenter')
const messageORM = require('../orm')

const saveMessageInput = require( '../services/saveMessageInput')
DynamoDBORMProvider(container)

container.register(presenter)
container.register(messageORM)
container.register(saveMessageInput)
container.service(`Presenter`, () => Presenter)


console.log('container', container)
module.exports = container

