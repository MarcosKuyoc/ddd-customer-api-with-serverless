import {APIGatewayProxyEvent} from 'aws-lambda';
import {DynamoDBRepository} from '../db/dynamodb.repository';
import {pathParametersGuard} from '../guards/path-parameter.guard';
import {CustomerDeleteApplication} from '../../application/delete';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const pathParameters = pathParametersGuard(event);
    const {id} = pathParameters;
    const repository = new DynamoDBRepository();
    const application = new CustomerDeleteApplication(repository);
    await application.delete(id);
    console.info(`delete customer by id ${id}`);
    return {
      statusCode: 204,
    };
  } catch (error: any) {
    console.error('[delete - hander]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
