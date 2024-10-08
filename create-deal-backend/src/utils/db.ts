const AWS = require("aws-sdk");

// Configure the AWS SDK to connect to DynamoDB Local
AWS.config.update({
  region: "us-west-2", // You can use any region
  endpoint: "http://localhost:8000", // DynamoDB Local endpoint
});

AWS.config.credentials = new AWS.Credentials(
  "accessKeyId",
  "secretAccessKey",
  null
);

// Create DynamoDB service object
export const dynamoDB = new AWS.DynamoDB.DocumentClient();

const dynamoDBLocal = new AWS.DynamoDB();

// Example: List Tables
dynamoDBLocal.listTables({}, (err: any, data: any) => {
  if (err) {
    console.error(
      "Unable to list tables. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("Table names are:", data.TableNames);
    if (data.TableNames.length === 0) {
      // Create tables for deal, customer, and task
      const dealTableParams = {
        TableName: "Deals",
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };
      const customerTableParams = {
        TableName: "Customers",
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      const taskTableParams = {
        TableName: "Tasks",
        AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
        KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };

      dynamoDBLocal.createTable(dealTableParams, (err: any, data: any) => {
        if (err) {
          console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log(
            "Created table. Table description JSON:",
            JSON.stringify(data, null, 2)
          );
        }
      });

      dynamoDBLocal.createTable(customerTableParams, (err: any, data: any) => {
        if (err) {
          console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log(
            "Created table. Table description JSON:",
            JSON.stringify(data, null, 2)
          );
        }
      });

      const customers = [
        {
          name: "John Doe",
          email: "john@example.com",
        },
        {
          name: "Jane Doe",
          email: "jane@example.com",
        },
        {
          name: "Bob Smith",
          email: "bob@example.com",
        },
        {
          name: "Alice Johnson",
          email: "alice@example.com",
        },
        {
          name: "Mike Brown",
          email: "mike@example.com",
        },
      ];

      customers.forEach((customer) => {
        dynamoDBLocal.put(
          {
            TableName: "Customers",
            Item: customer,
          },
          (err: any, data: any) => {
            if (err) {
              console.error(
                "Unable to add item. Error JSON:",
                JSON.stringify(err, null, 2)
              );
            } else {
              console.log("Added item:", JSON.stringify(data, null, 2));
            }
          }
        );
      });

      dynamoDBLocal.createTable(taskTableParams, (err: any, data: any) => {
        if (err) {
          console.error(
            "Unable to create table. Error JSON:",
            JSON.stringify(err, null, 2)
          );
        } else {
          console.log(
            "Created table. Table description JSON:",
            JSON.stringify(data, null, 2)
          );
        }
      });
    }
  }
});
