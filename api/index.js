'use strict';

// Express init
const express = require('express');
const server = express();

// CORS
const cors = require('cors');

// Body parser config
const bodyParser = require('body-parser');
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Get config variables
const config = require('./config');

// Get routers


// use CORS to avoid errors when accessing in localhost chrome
server.use(cors());

// listener to get requests for /
server.get('/', (req, res) => {
    res.send('Queue Message Array API is working!!!');
});

// use routers


// start server on the port defined by env
server.app = server.listen(config.portApi, () => {
    // in dev, emit an event to be catch in integration tests
    if (config.env === 'dev') {
        server.emit('server-started');
    }
    console.log(`Server listening on port ${config.portApi}`);
});

server.app.on('close', function () {
    console.log('Server stopped');
    // in dev, emit an event to be catch in integration tests
    if (config.env === 'dev') {
        server.emit('server-stopped');
    }
});

module.exports = server;