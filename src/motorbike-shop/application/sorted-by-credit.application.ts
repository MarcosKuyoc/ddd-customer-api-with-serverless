import { CustomerDto, CustomerRepository } from "../domain";

export class CustomerSortedByCreditApplication {
  constructor(readonly repository: CustomerRepository) {}

  async sorted(sort: string): Promise<CustomerDto[]  | []> {
    const result = await this.repository.sortedByCredit();

    if (result.length === 0) {
      return [];
    }
    
    if (sort === 'desc') {
      return result;
    } else {
      return result.sort((a, b) => b.credit - a.credit);
    }    
  }
}