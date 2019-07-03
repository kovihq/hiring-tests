'use strict';

const intersectSorted = require('../intersectSorted').intersectSorted;

module.exports.intersectSorted = async (event) => {
  let payload = event.payload;
  if (!payload) {
    return createResponse(400, "A mensagem deve conter um payload!");
  }
  if (!payload.arrayA || !Array.isArray(payload.arrayA) || !payload.arrayB || !Array.isArray(payload.arrayB)) {
    return createResponse(400, "É necessário enviar dois arrays de nomes arrayA e arrayB!")
  }
  const arrayA = payload.arrayA
  const arrayB = payload.arrayB
  return createResponse(200, intersectSorted(arrayA, arrayB));
};

function createResponse(statusCode, payload) {
  return {
    statusCode,
    payload
  }
}