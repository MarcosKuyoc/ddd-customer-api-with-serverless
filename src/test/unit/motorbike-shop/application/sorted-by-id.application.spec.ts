import { CustomerSortedByCreditApplication } from "../../../../motorbike-shop/application/sorted-by-credit.application";
import { Customer } from "../../../../motorbike-shop/domain";

describe('', () => {
  const mockCustomerRepository = {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
    sortedByCredit: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  it('should return sorted list of customers by credit in descending order when sort is "desc"', async () => {
    // Arrange
    const expectedResultDesc = [
      new Customer('Alice', 'alice@example.com', '1234567890', '123 Main St', 0),
      new Customer('Bob', 'bob@example.com', '0987654321', '456 Elm St', 0)
    ];

    const mockSortedByCredit = mockCustomerRepository.sortedByCredit.mockResolvedValueOnce(expectedResultDesc);

    // Act
    const customer = new CustomerSortedByCreditApplication(mockCustomerRepository);
    const result = await customer.sorted('desc');

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(expectedResultDesc);
    expect(mockSortedByCredit).toHaveBeenCalledTimes(1);
  });

  it('should return sorted list of customers by credit in descending order when sort is "asc"', async () => {
    // Arrange
    const expectedResultDesc = [
      new Customer('Bob', 'bob@example.com', '0987654321', '456 Elm St', 300),
      new Customer('Alice', 'alice@example.com', '1234567890', '123 Main St', 500)
    ];

    const mockSortedByCredit = mockCustomerRepository.sortedByCredit.mockResolvedValueOnce(expectedResultDesc);

    // Act
    const customer = new CustomerSortedByCreditApplication(mockCustomerRepository);
    const result = await customer.sorted('asc');

    // Assert
    expect(result).toBeDefined();
    expect(result).toEqual(expectedResultDesc);
    expect(mockSortedByCredit).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when repository result is empty', async () => {
    // Arrange
    const mockSortedByCredit = mockCustomerRepository.sortedByCredit.mockResolvedValueOnce([]);

    // Act
    const customer = new CustomerSortedByCreditApplication(mockCustomerRepository);
    const result = await customer.sorted('desc');

    expect(result).toBeDefined();
    expect(mockSortedByCredit).toHaveBeenCalledTimes(1);
    expect(result).toEqual([]);
  })
});