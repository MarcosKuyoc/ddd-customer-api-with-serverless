import { CustomerDeleteApplication } from "../../../../motorbike-shop/application/delete";

describe('CustomerDeleteApplication', () => {
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

  // happy path
  it('should delete a customer when a valid id is provided', async() => {
    // Arrange
    const mockDelete = mockCustomerRepository.delete.mockResolvedValueOnce(void 0);

    // Act
    const customer = new CustomerDeleteApplication(mockCustomerRepository);
    await customer.delete(customerId);

    // Asserts
    expect(mockDelete).toHaveBeenCalledTimes(1);

  });

  it('should return throw error in database', async() => {
    // Arrange
    const nonExistentId = '00000';
    const mockDelete = mockCustomerRepository.delete.mockRejectedValueOnce(new Error('any error in database'));

    try {
      // Act
      const customer = new CustomerDeleteApplication(mockCustomerRepository);
      await customer.delete(nonExistentId);
    } catch (error: any) {
      // Asserts
      expect(error).toBeDefined();
      expect(mockDelete).toHaveBeenCalledTimes(1);
      expect(error.message).toEqual('any error in database');
    }
  });
})