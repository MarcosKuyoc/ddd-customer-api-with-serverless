import { CustomerAddCreditApplication } from "../../../../motorbike-shop/application/add-credit.application";
import { CustomerDto } from "../../../../motorbike-shop/domain";

describe('CustomerAddCreditApplication', () => {
  const mockCustomerRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    sortedByCredit: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };
  const customerId = '123456';
  const expectedResult: CustomerDto = {
    id: customerId,
    name: 'test-name',
    email: 'test-email@gmail.com',
    phone: 'phone-number',
    address: 'address',
    credit: 0.0
  };

  it('should add credit to an existing customer when customer ID exists', async() => {
    // Arrange
    const mockFindById = mockCustomerRepository.findById.mockResolvedValueOnce(expectedResult);
    const mockUpdate = mockCustomerRepository.update.mockResolvedValueOnce(void 0);

    // Act
    const customer = new CustomerAddCreditApplication(mockCustomerRepository);
    await customer.add(customerId, 50);

    // Assers
    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith(customerId, {credit: 50});
  });

  it('should not update credit when customer ID does not exist', async() => {
    // Arrange
    const mockFindById = mockCustomerRepository.findById.mockResolvedValueOnce(null);

    // Act
    const customer = new CustomerAddCreditApplication(mockCustomerRepository);
    
    // Asseerts
    await expect(customer.add('0000', 50)).rejects.toThrow('Customer not exist');
    expect(mockFindById).toHaveBeenCalledTimes(1);
    expect(mockCustomerRepository.update).not.toHaveBeenCalled();
  })
})