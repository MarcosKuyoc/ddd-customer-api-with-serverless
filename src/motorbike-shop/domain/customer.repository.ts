import { CustomerDto } from "./customer.dto";

export interface CustomerRepository {
  create(customer: Omit<CustomerDto, 'id' | 'credit'>): Promise<Pick<CustomerDto, 'id'>>;
  findById(id: string): Promise<CustomerDto | null>;
  update(id: string, data: Omit<CustomerDto, 'id' | 'credit'>): Promise<void>;
  delete(id: string): Promise<void>;
}