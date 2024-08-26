import { Customer, CustomerRepository } from '../domain';

export class CustomerSortedByCreditApplication {
  constructor(readonly repository: CustomerRepository) { }

  async sorted(sort: string): Promise<Customer[] | []> {
    const result = await this.repository.sortedByCredit();

    if (result.length === 0) {
      return [];
    }

    if (sort === 'asc') {
      return result.sort((a, b) => a.getCredit() - b.getCredit());
    }

    return result;
  }
}
