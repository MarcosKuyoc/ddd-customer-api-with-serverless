import {APIGatewayProxyEvent} from 'aws-lambda';

export const pathParametersGuard = (
  event: APIGatewayProxyEvent,
): {id: string} => {
  try {
    if (!event.pathParameters) {
      throw new Error('path parameter is missing');
    }

    if (!event.pathParameters.id) {
      throw new Error('id invalid');
    }

    return {id: event.pathParameters.id};
  } catch (error: any) {
    console.error('pathGuard');
    console.error(error.message);
    throw error;
  }
};
