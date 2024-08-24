import { CustomerDto, CustomerRepository } from "../domain";

export class CustomerUpdateApplication {
  constructor(readonly repository: CustomerRepository) {}

  async update(id: string, data: Omit<CustomerDto, 'id' | 'credit'>): Promise<void> {
    await this.repository.update(id, data);
  }
}