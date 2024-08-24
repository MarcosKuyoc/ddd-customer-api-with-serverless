# Coding Challenge TaxDown Senior Bakend - Resolved

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
yarn i
```

## Deploy - Offline
```bash
docker-compose up -d
yarn run deploy:offline
```

## Dependecies to used
### For serverless
1. serverless
2. serverless-offline
3. serverless-plugin-typescript
4. aws-lambda

```bash
yarn add -D serverless@3.2.0 serverless-offline@13.7.0 serverless-dynamodb@0.2.54 @types/aws-lambda
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
yarn add -D serverless-dynamodb@0.2.54 aws-sdk
yarn add uuid
```

### For linters
```bash
yarn add -D eslint prettier
```