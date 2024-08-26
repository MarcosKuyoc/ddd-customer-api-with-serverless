export class Customer {
  public id?: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  private credit: number;

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

  public getCredit(): number {
    return this.credit;
  }

  public addCredit(amount: number): void {
    if (amount > 0) {
      this.credit += amount;
    }
  }
}
