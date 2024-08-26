import { Customer, CustomerRepository } from '../domain';

export class CustomerFindApplication {
  constructor(readonly repository: CustomerRepository) { }

  async findById(id: string): Promise<Customer | null> {
    return await this.repository.findById(id);
  }

  async find(): Promise<Customer[] | []> {
    return await this.repository.find();
  }
}
