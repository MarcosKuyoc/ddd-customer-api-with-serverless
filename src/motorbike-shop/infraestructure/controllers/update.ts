import {APIGatewayProxyEvent} from 'aws-lambda';
import {DynamoDBRepository} from '../db/dynamodb.repository';
import {bodyRequestGuard} from '../guards/body-request.guard';
import {pathParametersGuard} from '../guards/path-parameter.guard';
import {CustomerUpdateApplication} from '../../application/update.application';
import {CustomerDto} from '../../domain';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const bodyRequest =
      bodyRequestGuard<Omit<CustomerDto, 'id' | 'credit'>>(event);
    const pathParameters = pathParametersGuard(event);
    const {id} = pathParameters;

    const repository = new DynamoDBRepository();
    const application = new CustomerUpdateApplication(repository);
    console.info('request customer update');
    await application.update(id, bodyRequest);
    console.info(`updated user ${id}`);
    return {
      statusCode: 200,
      body: JSON.stringify(id),
    };
  } catch (error: any) {
    console.error('[update - hander]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
