import { APIGatewayProxyEvent } from 'aws-lambda';
import { CustomerSortedByCreditApplication } from '../../application/sorted-by-credit.application';
import { DynamoDBRepository } from '../db/dynamodb.repository';
import { queryGuard } from '../guards/query.guard';

export const handler = async(event: APIGatewayProxyEvent) => {
  try {
    const { sort } = queryGuard(event);
    const repository = new DynamoDBRepository();
    const application = new CustomerSortedByCreditApplication(repository);
    const customer = await application.sorted(sort);
    return {
      statusCode: 200,
      body: JSON.stringify(customer)
    }
  } catch (error: any) {
    console.error('[customers-sorted-by-credit - hander]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
}