import { CustomerCreateApplication } from "../../../../motorbike-shop/application/create.application";
import { CustomerDto } from "../../../../motorbike-shop/domain";

describe('CustomerCreateApplication', () => {
  const mockCustomerRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  const payload: Omit<CustomerDto, 'id' | 'credit'> = {
    name: 'test-name',
    email: 'test-email@gmail.com',
    phone: 'phone-number',
    address: 'address'
  };

  // happi path
  it('should return the ID of created customer', async() => {
    // Arrange
    const customerId = {
      id: '123456',
    }
    const mockCreate = mockCustomerRepository.create.mockResolvedValueOnce(customerId);

    // Act
    const customer = new CustomerCreateApplication(mockCustomerRepository);
    const result = await customer.create(payload)
    
    // Asserts
    expect(result).toBeDefined();
    expect(mockCreate).toHaveBeenCalledTimes(1);
    expect(typeof result.id).toBe('string');
  });

  it('should return throw error in database', async() => {
    // Arrange
    const mockCreate = mockCustomerRepository.create.mockRejectedValueOnce(new Error('any error in database'));

    try {
      // Act
      const customer = new CustomerCreateApplication(mockCustomerRepository);
      await customer.create(payload);
    } catch (error: any) {
      // Asserts
      expect(error).toBeDefined();
      expect(mockCreate).toHaveBeenCalledTimes(1);
      expect(error.message).toEqual('any error in database');
    }
  })
})