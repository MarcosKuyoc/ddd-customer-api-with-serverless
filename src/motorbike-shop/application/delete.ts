import {CustomerRepository} from '../domain';

export class CustomerDeleteApplication {
  constructor(readonly repository: CustomerRepository) {}

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
