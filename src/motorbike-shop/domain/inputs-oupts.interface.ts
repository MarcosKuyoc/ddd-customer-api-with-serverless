export interface CustomerInput {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface CustomerOutPut extends CustomerInput {
  id: string;
  credit: number;
};