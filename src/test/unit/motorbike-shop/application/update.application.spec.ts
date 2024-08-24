import { CustomerUpdateApplication } from "../../../../motorbike-shop/application/update.application";
import { CustomerDto } from "../../../../motorbike-shop/domain";

describe('CustomerUpdateApplication', () => {
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
  const payload: Omit<CustomerDto, 'id' | 'credit'> = {
    name: 'test-name',
    email: 'test-email@gmail.com',
    phone: 'phone-number',
    address: 'address'
  };

  // happy path
  it('should update customer data when valid id and data are provided', async() => {
    // Arrange
    const mockUpdate = mockCustomerRepository.update.mockResolvedValueOnce(void 0);

    // Act
    const customer = new CustomerUpdateApplication(mockCustomerRepository);
    await customer.update(customerId, payload);

    expect(mockUpdate).toHaveBeenCalledTimes(1);
  });

  it('should return throw error in database', async() => {
    // Arrange
    const nonExistentId = '00000';
    const mockDelete = mockCustomerRepository.delete.mockRejectedValueOnce(new Error('any error in database'));

    try {
      // Act
      const customer = new CustomerUpdateApplication(mockCustomerRepository);
      await customer.update(nonExistentId, payload);
    } catch (error: any) {
      // Asserts
      expect(error).toBeDefined();
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(error.message).toEqual('any error in database');
    }
  });
});