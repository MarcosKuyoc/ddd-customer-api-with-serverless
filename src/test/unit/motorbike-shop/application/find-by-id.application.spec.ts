import { CustomerFindApplication } from "../../../../motorbike-shop/application/find.application";
import { CustomerDto } from "../../../../motorbike-shop/domain";

describe('CustomerFindApplication', () => {
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
  
  describe('findById', () => {
    // happi path
    it('should return customer', async() => {
      // Arrange
      const mockFindById = mockCustomerRepository.findById.mockResolvedValueOnce(expectedResult);
  
      // Act
      const customer = new CustomerFindApplication(mockCustomerRepository);
      const result = await customer.findById(customerId)
      
      // Asserts
      expect(result).toBeDefined();
      expect(mockFindById).toHaveBeenCalledTimes(1);
      expect(typeof result!.id).toBe('string');
      expect(typeof result!.name).toBe('string');
      expect(typeof result!.phone).toBe('string');
      expect(typeof result!.address).toBe('string');
      expect(typeof result!.credit).toBe('number');
      expect(result).toEqual(expectedResult);
    });
  
    it('should return throw error in database', async() => {
      // Arrange
      const mockFindById = mockCustomerRepository.findById.mockRejectedValueOnce(new Error('any error in database'));
  
      try {
        // Act
        const customer = new CustomerFindApplication(mockCustomerRepository);
        await customer.findById(customerId);
      } catch (error: any) {
        // Asserts
        expect(error).toBeDefined();
        expect(mockFindById).toHaveBeenCalledTimes(1);
        expect(error.message).toEqual('any error in database');
      }
    });
  });

  describe('find', () => {
    // happi path
    const expected: CustomerDto[] = [expectedResult];
    it('should return customer', async() => {
      // Arrange
      const mockFind = mockCustomerRepository.find.mockResolvedValueOnce(expected);
  
      // Act
      const customer = new CustomerFindApplication(mockCustomerRepository);
      const result = await customer.find()
      
      // Asserts
      expect(result).toBeDefined();
      expect(mockFind).toHaveBeenCalledTimes(1);
      expect(result.length).toBeGreaterThan(0);
      expect(result).toEqual(expected);
    });
  
    it('should return throw error in database', async() => {
      // Arrange
      const mockFind= mockCustomerRepository.find.mockRejectedValueOnce(new Error('any error in database'));
  
      try {
        // Act
        const customer = new CustomerFindApplication(mockCustomerRepository);
        await customer.find();
      } catch (error: any) {
        // Asserts
        expect(error).toBeDefined();
        expect(mockFind).toHaveBeenCalledTimes(1);
        expect(error.message).toEqual('any error in database');
      }
    });
  })
})