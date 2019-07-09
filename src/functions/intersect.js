'use strict';

const { parseEvent, intersect } = require('../helpers/utils');


/**
 * @author Vitor Ferreira Garcia <vitfgarcia@gmail.com>
 * @param {*} arrays - parsed event
 * 
 * @description Function that process event
 */
function processEvent(arrays) {
  if (!arrays || arrays.length != 2) {
    return {
      message: 'Invalid event, please refer to https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html',
      reason: 'Expected two records with an array in each record body'
    };
  }

  const result = intersect(...arrays);

  return { message: 'Parsed with success', result };
}

/**
 * @author Vitor Ferreira Garcia <vitfgarcia@gmail.com>
 * @param {*} event 
 * 
 * @description Lambda handler (created from serverless init)
 */
async function handler(event) {
  return processEvent(parseEvent(event));
}

module.exports = {
  handler,
  processEvent
};

