import { CustomerDto } from "./customer.dto";

export interface CustomerRepository {
  create(customer: Omit<CustomerDto, 'id' | 'credit'>): Promise<Pick<CustomerDto, 'id'>>;
  find():Promise<CustomerDto[] | []>;
  findById(id: string): Promise<CustomerDto | null>;
  findByEmail(email: string): Promise<boolean>;
  sortedByCredit(): Promise<CustomerDto[]>;
  update(id: string, data: any): Promise<void>;
  delete(id: string): Promise<void>;
}