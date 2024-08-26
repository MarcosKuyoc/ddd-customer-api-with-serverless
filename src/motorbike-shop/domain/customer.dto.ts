export class CustomerDto {
  public id?: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly credit: number;

  constructor(
    name: string,
    email: string,
    phone: string,
    address: string,
    credit: number = 0.0,
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.credit = credit;
  }
}
