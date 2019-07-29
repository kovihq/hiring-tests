// const awsXRay = require('aws-xray-sdk')
// const AWS = awsXRay.captureAWS(require('aws-sdk'))
const container = require('@spark/services-container')
const { default: DynamoDBORMProvider } = require('@spark/dynamodborm/lib/provider')


const Presenter = require('../helpers/Presenter.class');
const presenter = require('../helpers/presenter.instance');
const messageORM = require('../orm')

const saveMessageInput = require( '../services/saveMessageInput')
const proccessMessage = require( '../services/proccessMessage')
const showMessage = require( '../services/showMessage')
DynamoDBORMProvider(container)

container.register(presenter)
container.register(messageORM)
container.register(showMessage)
container.register(proccessMessage)
container.register(saveMessageInput)
container.service(`Presenter`, () => Presenter)


console.log('container', container)
module.exports = container

