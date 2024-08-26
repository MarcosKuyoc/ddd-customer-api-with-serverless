import {CustomerRepository} from '../domain';

export class CustomerAddCreditApplication {
  constructor(readonly repository: CustomerRepository) {}

  async add(id: string, credit: number) {
    const customer = await this.repository.findById(id);

    if (!customer) {
      throw new Error('Customer not exist');
    }

    const totalCredit = customer.credit + credit;
    await this.repository.update(id, {credit: totalCredit});
  }
}
