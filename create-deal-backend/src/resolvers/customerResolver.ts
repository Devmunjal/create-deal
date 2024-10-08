import { dynamoDB } from "../utils/db";

const customerTableName = "Customers";

const getCurrentTimestamp = () => new Date().toISOString();

const customerResolver = {
  Query: {
    customer: async (_: any, args: { id: string }) => {
      const result = await dynamoDB
        .get({
          TableName: customerTableName,
          Key: { id: args.id },
        })
        .promise();

      return result.Item;
    },

    customers: async () => {
      const result = await dynamoDB
        .scan({
          TableName: customerTableName,
        })
        .promise();

      return result.Items;
    },
  },
  Mutation: {
    createCustomer: async (_: any, args: { name: string; email: string }) => {
      const customer = {
        id: Date.now().toString(),
        name: args.name,
        email: args.email,
        createdAt: getCurrentTimestamp(), // Set created timestamp
        updatedAt: getCurrentTimestamp(), // Set updated timestamp
      };

      await dynamoDB
        .put({
          TableName: customerTableName,
          Item: customer,
        })
        .promise();

      return customer;
    },
  },
};

export default customerResolver;
