import {APIGatewayProxyEvent} from 'aws-lambda';
import {DynamoDBRepository} from '../db/dynamodb.repository';
import {CustomerDto} from '../../domain';
import {pathParametersGuard} from '../guards/path-parameter.guard';
import {bodyRequestGuard} from '../guards/body-request.guard';
import {CustomerAddCreditApplication} from '../../application/add-credit.application';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    console.info('request to add credit');
    const {credit} = bodyRequestGuard<Pick<CustomerDto, 'credit'>>(event);
    const pathParameters = pathParametersGuard(event);
    const {id} = pathParameters;

    const repository = new DynamoDBRepository();
    const application = new CustomerAddCreditApplication(repository);
    await application.add(id, credit);
    console.info(`The credit was added to the user with id ${id}`);
    return {
      statusCode: 201,
      body: JSON.stringify(id),
    };
  } catch (error: any) {
    console.error('[create - hander]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
