import { HealthCheckApplication } from "../../../../motorbike-shop/application/health-check.application";

describe('health-check', () => {
  it('should return a string with health-check ', ()=> {

    // Arrange
    const response = 'health-check';
    // Act
    const healthCheck = new HealthCheckApplication();
    const result = healthCheck.health();
    // Asserts
    expect(result).toBeDefined();
    expect(result).toEqual(response);
  })
})