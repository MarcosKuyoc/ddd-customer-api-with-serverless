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
    throw new Error("Method not implemented.");
  }

  async update(id: string, data: Omit<CustomerDto, "id" | "credit">): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}