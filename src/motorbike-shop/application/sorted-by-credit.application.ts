import { Customer, CustomerRepository } from '../domain';

export class CustomerSortedByCreditApplication {
  constructor(readonly repository: CustomerRepository) { }

  async sorted(sort: string = 'desc'): Promise<Customer[] | []> {
    const result = await this.repository.sortedByCredit();

    if (result.length === 0) {
      return [];
    }

    if (sort === 'asc') {
      return result.sort((a, b) => a.getCredit() - b.getCredit());
    } else {
      return result.sort((a, b) => b.getCredit() - a.getCredit());
    }
  }
}
