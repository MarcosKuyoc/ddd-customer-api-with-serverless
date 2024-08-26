import {APIGatewayProxyEvent} from 'aws-lambda';

export const bodyRequestGuard = <T>(event: APIGatewayProxyEvent): T => {
  try {
    if (!event.body) {
      throw new Error('body request is missing');
    }

    let bodyReaquest: T;

    if (typeof event.body === 'string') {
      bodyReaquest = JSON.parse(event.body);
    } else {
      bodyReaquest = event.body;
    }

    return bodyReaquest;
  } catch (error: any) {
    console.error('bodyGuard');
    console.error(error.message);
    throw error;
  }
};
