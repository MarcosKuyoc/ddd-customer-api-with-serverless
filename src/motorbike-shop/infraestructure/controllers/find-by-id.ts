import {APIGatewayProxyEvent} from 'aws-lambda';
import {DynamoDBRepository} from '../db/dynamodb.repository';
import {pathParametersGuard} from '../guards/path-parameter.guard';
import {CustomerFindApplication} from '../../application/find.application';

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const {id} = pathParametersGuard(event);
    const repository = new DynamoDBRepository();
    const application = new CustomerFindApplication(repository);
    const customer = await application.findById(id);
    console.info(`find customer by id ${id}`);
    return {
      statusCode: 200,
      body: JSON.stringify(customer),
    };
  } catch (error: any) {
    console.error('[find - hander]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
