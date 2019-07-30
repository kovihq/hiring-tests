/**
 * Config file that get env variables and makes other configurations
 */
"use strict";

require('dotenv').config({ path: __dirname + '/env/.env' });

module.exports = {
    portApi: process.env.PORT_API,
    env: process.env.ENV
}