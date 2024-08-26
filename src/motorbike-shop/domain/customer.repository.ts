import { Customer } from './customer';

export interface CustomerRepository {
  create(
    customer: Omit<Customer, 'id' | 'credit'>,
  ): Promise<Pick<Customer, 'id'>>;
  find(): Promise<Customer[] | []>;
  findById(id: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<boolean>;
  sortedByCredit(): Promise<Customer[]>;
  update(id: string, data: any): Promise<void>;
  delete(id: string): Promise<void>;
}
