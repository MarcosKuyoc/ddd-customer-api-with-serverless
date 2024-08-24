import { v4 as uuidv4} from 'uuid';
import { CustomerDto, CustomerRepository } from "../../domain";
import { DynamoDBClient } from "../aws/dynamodb.client";

const TABLE_NAME = 'customersTable';

export class DynamoDBRepository implements CustomerRepository {
  async create(customer: Omit<CustomerDto, "id" | "credit">): Promise<Pick<CustomerDto, "id">> {
    try {
      const id = uuidv4();
      const params = {
        TableName: TABLE_NAME,
        Item: { ...customer, pk: id }
      }
      await DynamoDBClient.put(params).promise();
      return { id };
    } catch (error) {
      console.error('DynamoDBRepository -> create');
      throw error;
    }
  }

  async findById(id: string): Promise<CustomerDto | null> {
    try {
      const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'pk = :pk',
        ExpressionAttributeValues: { ':pk': id}
      }
      const customer = await DynamoDBClient.query(params).promise();

      if (customer.Items && customer.Items.length > 0) {
         const item = customer.Items[0];
         return {
          id: item.pk,
          name: item.name,
          email: item.email,
          phone: item.phone,
          address: item.address,
          credit: item.credit
         }
      } else {
        return null;
      }
    } catch (error) {
      console.error('DynamoDBRepository -> findById');
      throw error;
    }
  }

  async findByEmail(email: string): Promise<boolean> {
    try {
      const params = {
        TableName: TABLE_NAME,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': email}
      };
      console.log(params);
      const customer = await DynamoDBClient.query(params).promise();

      return (customer.Count ?? 0) > 0;
    } catch (error: any) {
      console.error('DynamoDBRepository -> findByEmail');
      console.error(error.message);
      throw error;
    }
  }

  async update(id: string, data: Omit<CustomerDto, "id" | "credit">): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}