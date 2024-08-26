import {CustomerDto, CustomerRepository} from '../domain';

export class CustomerFindApplication {
  constructor(readonly repository: CustomerRepository) {}

  async findById(id: string): Promise<CustomerDto | null> {
    return await this.repository.findById(id);
  }

  async find(): Promise<CustomerDto[] | []> {
    return await this.repository.find();
  }
}
