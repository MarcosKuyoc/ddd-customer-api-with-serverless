import {DynamoDBRepository} from '../db/dynamodb.repository';
import {CustomerFindApplication} from '../../application/find.application';

export const handler = async () => {
  try {
    const repository = new DynamoDBRepository();
    const application = new CustomerFindApplication(repository);
    const customer = await application.find();
    console.info(`find customers`);
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
