import { APIGatewayProxyHandler } from 'aws-lambda';
import { validate } from 'class-validator';
import { ArrayService } from '../service/arrayService';
import { badRequest, successResponse } from '../utils/responseUtils';
import { KoviRequest } from './../request/koviRequest';

export const run: APIGatewayProxyHandler = async (event, context) => {
  console.log("Execution of service -->> ", context.functionName);
  const request = new KoviRequest(JSON.parse(event.body));

  const errors = await validate(request);
  if (errors.length) {
    return badRequest(errors.map(error => error.constraints));
  }
  const response = new ArrayService().getSameValueOfArrays(request.firstArray, request.secondArray);
  return successResponse(response);
}
