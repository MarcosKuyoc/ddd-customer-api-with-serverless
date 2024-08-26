import { v4 as uuidv4 } from 'uuid';
import { Customer, CustomerRepository } from '../../domain';
import { DynamoDBClient } from '../aws/dynamodb.client';
import { CustomerOutPut } from '../../domain/inputs-oupts.interface';
import { AttributeMap } from 'aws-sdk/clients/dynamodb';

const TABLE_NAME = 'customersTable';

export class DynamoDBRepository implements CustomerRepository {
  async create(
    customer: Omit<Customer, 'id' | 'credit'>,
  ): Promise<Pick<Customer, 'id'>> {
    try {
      const id = uuidv4();
      const params = {
        TableName: TABLE_NAME,
        Item: { ...customer, id },
      };
      await DynamoDBClient.put(params).promise();
      return { id };
    } catch (error) {
      console.error('DynamoDBRepository -> create');
      throw error;
    }
  }

  async find(): Promise<Customer[] | []> {
    try {
      const params = {
        TableName: TABLE_NAME,
        ProjectionExpression: '#id, #name, #email, #phone, #address, #credit',
        ExpressionAttributeNames: {
          '#id': 'id',
          '#name': 'name',
          '#email': 'email',
          '#phone': 'phone',
          '#address': 'address',
          '#credit': 'credit',
        },
      };

      const result = await DynamoDBClient.scan(params).promise();
      return result.Items?.map((item: AttributeMap) => this.toCustomerInstance(item as unknown as CustomerOutPut)) ?? [];
    } catch (error) {
      console.error('DynamoDBRepository -> find');
      throw error;
    }
  }

  async findById(id: string): Promise<Customer | null> {
    try {
      const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': id },
      };
      const customer = await DynamoDBClient.query(params).promise();

      if (customer.Items && customer.Items.length > 0) {
        const result = customer.Items[0] as CustomerOutPut;
        return this.toCustomerInstance(result);
      } else {
        return null;
      }
    } catch (error) {
      console.error('DynamoDBRepository -> findById');
      throw error;
    }
  }

  async findByEmail(email: string): Promise<boolean> {
    try {
      const params = {
        TableName: TABLE_NAME,
        IndexName: 'email-index',
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': email },
      };

      const customer = await DynamoDBClient.query(params).promise();

      return (customer.Count ?? 0) > 0;
    } catch (error: any) {
      console.error('DynamoDBRepository -> findByEmail');
      console.error(error.message);
      throw error;
    }
  }

  async sortedByCredit(): Promise<Customer[] | []> {
    try {
      const params = {
        TableName: TABLE_NAME,
        IndexName: 'credit',
        KeyConditionExpression: '#credit IS NOT NULL', // Filtra los ítems donde el atributo 'credit' no es nulo
        FilterExpression: '#credit > :zero', // Filtra los ítems donde 'credit' es mayor que 0
        ExpressionAttributeNames: {
          '#id': 'id',
          '#name': 'name',
          '#email': 'email',
          '#phone': 'phone',
          '#address': 'address',
          '#credit': 'credit',
        },
        ExpressionAttributeValues: {
          ':zero': 0,
        },
        ProjectionExpression: '#id, #name, #email, #phone, #address, #credit', // Usando los nombres escapados
        ScanIndexForward: false, // Ordena en orden desendente
      };

      const result = await DynamoDBClient.scan(params).promise();
      return result.Items?.map((item: AttributeMap) => this.toCustomerInstance(item as unknown as CustomerOutPut)) ?? [];
    } catch (error) {
      console.error('DynamoDBRepository -> sortedByCredit');
      throw error;
    }
  }

  async update(id: string, data: any): Promise<void> {
    try {
      const ExpressionAttributeNames: { [key: string]: string } = {};
      const ExpressionAttributeValues: { [key: string]: any } = {};
      let UpdateExpression = 'SET';

      // Genera nombres únicos para las claves de los atributos y valores
      Object.entries(data).forEach(([attributeName, attributeValue], index) => {
        const keyName = `#attr${index}`;
        const valueName = `:val${index}`;

        UpdateExpression += ` ${keyName} = ${valueName}, `;
        ExpressionAttributeNames[keyName] = attributeName;
        ExpressionAttributeValues[valueName] = attributeValue;
      });

      // Elimina la última coma y espacio de la expresión de actualización
      UpdateExpression = UpdateExpression.slice(0, -2);

      const params = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        ReturnValues: 'ALL_NEW', // Devuelve los nuevos valores del elemento después de la actualización
      };

      await DynamoDBClient.update(params).promise();
    } catch (error) {
      console.error('DynamoDBRepository -> update');
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const params = {
        TableName: TABLE_NAME,
        Key: { id },
      };

      await DynamoDBClient.delete(params).promise();
    } catch (error) {
      console.error('DynamoDBRepository -> delete');
      throw error;
    }
  }

  private toCustomerInstance(customerOuput: CustomerOutPut): Customer {
    const customer = new Customer(
      customerOuput.name,
      customerOuput.email,
      customerOuput.phone,
      customerOuput.address,
      customerOuput.credit
    );
    customer.id = customerOuput.id;
    return customer;
  }
}
