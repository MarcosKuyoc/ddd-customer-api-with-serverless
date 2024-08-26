# Proposal and Action Plan

To address the challenge, we have opted to use Node.js, TypeScript, Jest and Serverless.

Below are the proposed steps:

## 1. Set Up the Project Skeleton

1. Initialize the project with Node.js, TypeScript, Jest, and Serverless.
2. Install the necessary libraries and dependencies.

## 2. Use Hexagonal Architecture

1. Define the project layers:
   - Application
   - Domain
   - Infrastructure

## 3. Configure the Test Folder

1. Create a folder for unit tests.

## 4. Implement CRUD and Basic Functions

1. Create the necessary application, domain, and repository services.
   1. Implement the classes, methods, and interfaces required to meet the tasks.
   2. Ensure that the code is easy to understand.

## 5. Create and Run Tests

1. Implement the required unit tests.
2. Use the AAA pattern for testing:
   - Arrange
   - Act
   - Assert
3. Create and test the application services.
4. Create and test the endpoints.

## 6. Implement Repositories with DynamoDB

1. Configure and connect DynamoDB with the project.
2. Implement the methods defined in the repositories.

## 7. Integrate Serverless for Local Deployment

1. Configure Serverless for offline.
2. Integrate local DynamoDB with Docker.
3. Adjust the Serverless configuration as needed.
4. Optimize the deployment with the necessary files (optional).

## 8. Test the Endpoints

1. Create the `test/e2e/local` folder for end-to-end local tests.
2. Create test files to verify the endpoints using Rest Client.

## 9. Deploy to Production

1. Deploy the project to the production environment.
2. Identify and fix any issues post-deployment.

## 10. Integrate Linting and Formatting Tools

1. Set up ESLint and Prettier to detect issues and format code.
2. Review and adjust version migration settings if needed.

## 11. Review, Adjust, and Fix Issues

1. Review the code, make adjustments, and fix any detected issues.

## 12. Integrate DDD to Encapsulate Available Credit Logic

1. Apply Domain-Driven Design (DDD) to manage available credit.

## 13. Review, Adjust, and Fix Issues (Again)

1. Review the code, make adjustments, and fix any issues after integrating DDD.

## 14. Redeploy and Test in Production

1. Perform a new deployment in production and conduct final tests.

## AWS Deployment

1. Create an AWS account.
2. Create a user and grant the necessary permissions.
3. Associate credentials with AWS CLI.
4. Test deployments and adjust as needed.
