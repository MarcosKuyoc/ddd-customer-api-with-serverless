import { CustomerDto, CustomerRepository } from "../../domain";

export class DynamoDBRepository implements CustomerRepository {
  async create(customer: Omit<CustomerDto, "id" | "credit">): Promise<Pick<CustomerDto, "id">> {
    return new Promise((resolve, reject) => {
      resolve({id: '123456'});
    });
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