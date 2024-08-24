import { APIGatewayProxyEvent } from "aws-lambda";

export const queryGuard = (event: APIGatewayProxyEvent): {sort: string} => {
  try {
    const typeSort = ['asc', 'desc'];
    if (!event.queryStringParameters) {
      throw new Error('query parameter is missing');
    }

    if (!event.queryStringParameters.sort) {
      throw new Error('query invalid');
    }

    if (!typeSort.includes(event.queryStringParameters.sort)) {
      throw new Error('sort invalid');
    }

    console.info('sort1',event.queryStringParameters.sort);
    return { sort: event.queryStringParameters.sort };
  } catch (error: any) {
    console.error('queryGuard');
    console.error(error.message);
    throw error;
  }
}