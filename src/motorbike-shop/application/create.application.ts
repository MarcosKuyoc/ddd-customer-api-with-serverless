import { CustomerDto, CustomerRepository } from "../domain";

export class CustomerCreateApplication {
  constructor(readonly repository: CustomerRepository) {}

  async create({name, email, phone, address}: Omit<CustomerDto, 'id' | 'credit'>): Promise<Pick<CustomerDto, 'id'>> {
    const customer = new CustomerDto(name, email, phone, address);
    return await this.repository.create(customer);
  }
}