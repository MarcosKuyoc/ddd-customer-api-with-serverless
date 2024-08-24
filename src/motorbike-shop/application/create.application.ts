import { CustomerDto, CustomerRepository } from "../domain";

export class CustomerCreateApplication {
  constructor(readonly repository: CustomerRepository) {}

  async create({name, email, phone, address}: Omit<CustomerDto, 'id' | 'credit'>): Promise<Pick<CustomerDto, 'id'>> {
    const existeEmail = await this.repository.findByEmail(email);
    if (existeEmail) {
      throw new Error(`the email ${email} exist in database`)
    }
    const customer = new CustomerDto(name, email, phone, address);
    return await this.repository.create(customer);
  }
}