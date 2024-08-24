import * as AWS from 'aws-sdk';

const options = process.env.IS_OFFLINE ? {
  region: 'localhost',
  endpoint: 'http://localhost:8080',
  accessKeyId: '123456',
  secretAccessKey: '123456'
}: {};

export const DynamoDBClient = new AWS.DynamoDB.DocumentClient(options);