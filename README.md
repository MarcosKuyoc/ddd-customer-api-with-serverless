# Coding Challenge

## Overview
To sove the challenge web used serverless, Node.js, Typescript, DynamoDB and Jest

## Developer
Lcc. Juan Marcos Kuyoc Escamilla

## Requirements
1. You must have NVM installed to control Node versions
2. Yot must have Docker installed to manage Dynamo Local to testing

## Use npm for install yarn
```bash
nvm use
npm i -g yarn
```

## Install Dependencies with Yarn
```bash
yarn install
```

## Testing
```bash
yarn run test
```

## Deploy - Offline
```bash
docker-compose up -d
yarn run deploy:offline
```

## Dependecies to used(purely informative)
### For serverless
1. serverless
2. serverless-offline
3. serverless-plugin-typescript
4. aws-lambda

```bash
yarn add -D serverless@3.2.0 serverless-offline@13.7.0 serverless-plugin-typescript @types/aws-lambda
```

### For Node.js, Typescript and Jest
1. typescript
2. jest
3. ts-node
4. ts-jest

```bash
yarn add -D typescript ts-node jest ts-jest @types/node @types/jest
```

### For DynamoDB
1. serverless-dynamodb@0.2.54
2. aws-sdk
3. uuid

```bash
yarn add -D serverless-dynamodb@0.2.54
yarn add uuid aws-sdk
yarn add -D @types/uuid
```

### For linters(optional)
```bash
yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

## Deploy - Production
### Prerequisites
1. You need to have an aws account or create one
2. Create an AIM user for serverless and generate the credentials
3. Grant the necessary permissions
4. Configure aws cli on your computer

```bash
aws configure
```
### You will be asked for the following:
1. AWS Access Key ID:
2. AWS Secret Access Key:
3. Region [us-east-2]: 
4. Fotmat [json]:

### Deploy
```bash
yarn run deploy
```


# Endpoints to local

- POST http://localhost:3000/dev/customers [create]
- GET http://localhost:3000/dev/customers [find]
- GET http://localhost:3000/dev/customers/{id} [find-by-id]
- PATCH http://localhost:3000/dev/customers/{id} [update]
- DELETE http://localhost:3000/dev/customers/{id} [delete]

- POST http://localhost:3000/dev/customers/credit/{id} [add-credit]
- GET http://localhost:3000/dev/customers/credit/sorted?sort=desc [sort-available-credit]

## Test to REST-Client
We have a section for testing endpoints in /test/e2e/local