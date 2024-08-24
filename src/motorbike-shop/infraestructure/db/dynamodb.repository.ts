import { v4 as uuidv4} from 'uuid';
import { CustomerDto, CustomerRepository } from "../../domain";
import { DynamoDBClient } from "../aws/dynamodb.client";

const TABLE_NAME = 'customersTable';

export class DynamoDBRepository implements CustomerRepository {
  async create(customer: Omit<CustomerDto, "id" | "credit">): Promise<Pick<CustomerDto, "id">> {
    try {
      const id = uuidv4();
      const params = {
        TableName: TABLE_NAME,
        Item: { ...customer, id }
      }
      await DynamoDBClient.put(params).promise();
      return { id };
    } catch (error) {
      console.error('DynamoDBRepository -> create');
      throw error;
    }
  }

  async find():Promise<CustomerDto[] | []> {
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
        }
      }

      const result = await DynamoDBClient.scan(params).promise();
      if (result.Items) {
        return result.Items as CustomerDto[];
      } else {
        return [];
      }
    } catch (error) {
      console.error('DynamoDBRepository -> find');
      throw error;
    }
  }

  async findById(id: string): Promise<CustomerDto | null> {
    try {
      const params = {
        TableName: TABLE_NAME,
        KeyConditionExpression: 'id = :id',
        ExpressionAttributeValues: { ':id': id}
      }
      const customer = await DynamoDBClient.query(params).promise();

      if (customer.Items && customer.Items.length > 0) {
         const item = customer.Items[0];
         return {
          id: item.id,
          name: item.name,
          email: item.email,
          phone: item.phone,
          address: item.address,
          credit: item.credit
         }
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
        ExpressionAttributeValues: { ':email': email}
      };

      const customer = await DynamoDBClient.query(params).promise();

      return (customer.Count ?? 0) > 0;
    } catch (error: any) {
      console.error('DynamoDBRepository -> findByEmail');
      console.error(error.message);
      throw error;
    }
  }

  async sortedByCredit(): Promise<CustomerDto[] | []> {
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
          '#credit': 'credit'
        },
        ExpressionAttributeValues: {
          ':zero': 0
        },
        ProjectionExpression: '#id, #name, #email, #phone, #address, #credit', // Usando los nombres escapados
        ScanIndexForward: false, // Ordena en orden desendente
      }

      const result = await DynamoDBClient.scan(params).promise();
      if (result.Items) {
        return result.Items as CustomerDto[];
      } else {
        return [];
      }
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
        ReturnValues: 'ALL_NEW' // Devuelve los nuevos valores del elemento después de la actualización
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
        Key: { id }
      };

      await DynamoDBClient.delete(params).promise();
    } catch (error) {
      console.error('DynamoDBRepository -> delete');
      throw error;
    }
  }
}