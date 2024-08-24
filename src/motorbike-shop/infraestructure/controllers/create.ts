import { APIGatewayProxyEvent } from "aws-lambda";
import { CustomerDto } from "../../domain";
import { bodyRequestGuard } from "../guards/body-request.guard";
import { DynamoDBRepository } from "../db/dynamodb.repository";
import { CustomerCreateApplication } from "../../application/create.application";

export const handler = async(event: APIGatewayProxyEvent) => {
  try {
    const bodyRequest: Omit<CustomerDto, 'id' | 'credit'> = bodyRequestGuard<Omit<CustomerDto, 'id' | 'credit'>>(event);
    const repository = new DynamoDBRepository();
    const application = new CustomerCreateApplication(repository);
    const { id } = await application.create(bodyRequest);

    console.info(`The client was successfully created with id: ${id}`);
    return {
      statusCode: 201,
      body: id
    }
  } catch (error: any) {
    console.error('[create - handler]');
    console.error(error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
}