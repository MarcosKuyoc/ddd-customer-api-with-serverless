import { Customer, CustomerRepository } from '../domain';
import { CustomerInput } from '../domain/inputs-oupts.interface';

export class CustomerCreateApplication {
  constructor(readonly repository: CustomerRepository) { }

  async create({
    name,
    email,
    phone,
    address,
  }: CustomerInput): Promise<Pick<Customer, 'id'>> {
    const existeEmail = await this.repository.findByEmail(email);
    if (existeEmail) {
      throw new Error(`the email ${email} exist in database`);
    }
    const customer = new Customer(name, email, phone, address);
    return await this.repository.create(customer);
  }
}
