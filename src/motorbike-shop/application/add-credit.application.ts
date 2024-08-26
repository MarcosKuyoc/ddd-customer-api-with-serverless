import { Customer, CustomerRepository } from '../domain';

export class CustomerAddCreditApplication {
  constructor(readonly repository: CustomerRepository) { }

  async add(id: string, amount: number) {
    const customer: Customer | null = await this.repository.findById(id);
    if (!customer) {
      throw new Error('Customer not exist');
    }

    customer.addCredit(amount);
    await this.repository.update(id, { credit: customer.getCredit() });
  }
}
