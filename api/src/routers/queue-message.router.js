const express = require('express');
const queueMessageRouter = express.Router();
const queueMessageController = require('../controllers/queue.message.controller');

queueMessageRouter.route('/get-equals')
    .post(queueMessageController.getEqualElements);

module.exports = queueMessageRouter;