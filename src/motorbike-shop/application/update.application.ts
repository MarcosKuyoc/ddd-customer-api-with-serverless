import { Customer, CustomerRepository } from '../domain';
import { CustomerInput } from '../domain/inputs-oupts.interface';

export class CustomerUpdateApplication {
  constructor(readonly repository: CustomerRepository) { }

  async update(
    id: string,
    data: CustomerInput,
  ): Promise<void> {
    const customer: Customer | null = await this.repository.findById(id);
    if (!customer) {
      throw new Error('Customer not exist');
    }
    await this.repository.update(id, data);
  }
}
