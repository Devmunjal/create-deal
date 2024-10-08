import { dynamoDB } from "../utils/db";

const dealTableName = "Deals";
const customerTableName = "Customers";
const taskTableName = "Tasks";

const getCurrentTimestamp = () => new Date().toISOString();

interface CreateDealInput {
  customerId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  images?: string[];
  roomAreaInMeters: number;
  peopleRequired: number;
  status: string;
}

export const dealResolver = {
  Query: {
    deal: async (_: any, args: { id: string }) => {
      const result = await dynamoDB
        .get({
          TableName: dealTableName,
          Key: { id: args.id },
        })
        .promise();

      return result.Item;
    },

    deals: async () => {
      const result = await dynamoDB
        .scan({
          TableName: dealTableName,
        })
        .promise();

      const customerPromises = result.Items.map(async (deal: any) => {
        const customerResult = await dynamoDB
          .get({
            TableName: customerTableName,
            Key: { id: deal.customerId },
          })
          .promise();

        return {
          ...deal,
          customer: customerResult.Item,
        };
      });

      const dealsWithCustomer = await Promise.all(customerPromises);

      return dealsWithCustomer;
    },
  },
  Mutation: {
    createDeal: async (_: any, args: CreateDealInput) => {
      if (
        !args.customerId ||
        !args.street ||
        !args.city ||
        !args.state ||
        !args.zip ||
        !args.roomAreaInMeters ||
        !args.peopleRequired ||
        !args.status
      ) {
        throw new Error("Fields cannot be empty");
      }
      const deal = {
        id: Date.now().toString(),
        customerId: args.customerId,
        street: args.street,
        city: args.city,
        state: args.state,
        zip: args.zip,
        images: args?.images || [],
        roomAreaInMeters: args.roomAreaInMeters,
        peopleRequired: args.peopleRequired,
        status: args.status,
        createdAt: getCurrentTimestamp(), // Set created timestamp
        updatedAt: getCurrentTimestamp(), // Set updated timestamp
      };

      await dynamoDB
        .put({
          TableName: dealTableName,
          Item: deal,
        })
        .promise();

      const customerResult = await dynamoDB
        .get({
          TableName: customerTableName,
          Key: { id: args.customerId },
        })
        .promise();

      const customer = customerResult.Item;

      const dealWithCustomer = {
        ...deal,
        customer: {
          id: customer.id,
          name: customer.name,
          email: customer.email,
        },
      };

      return dealWithCustomer;
    },
    updateDeal: async (
      _: any,
      args: {
        id: string;
        title: string;
        description: string;
        customerId: string;
      }
    ) => {
      const updatedDeal = {
        title: args.title,
        description: args.description,
        customerId: args.customerId,
        updatedAt: getCurrentTimestamp(), // Update timestamp
      };

      await dynamoDB
        .update({
          TableName: dealTableName,
          Key: { id: args.id },
          UpdateExpression:
            "set title = :t, description = :d, customerId = :c, updatedAt = :u",
          ExpressionAttributeValues: {
            ":t": updatedDeal.title,
            ":d": updatedDeal.description,
            ":c": updatedDeal.customerId,
            ":u": updatedDeal.updatedAt,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();

      return { id: args.id, ...updatedDeal };
    },
    deleteDeal: async (_: any, args: { id: string }) => {
      await dynamoDB
        .delete({
          TableName: dealTableName,
          Key: { id: args.id },
        })
        .promise();

      return args.id;
    },
  },
  Deal: {
    customer: async (deal: any) => {
      const result = await dynamoDB
        .get({
          TableName: customerTableName,
          Key: { id: deal.customerId },
        })
        .promise();

      return result.Item;
    },
    tasks: async (deal: any) => {
      const result = await dynamoDB
        .query({
          TableName: taskTableName,
          KeyConditionExpression: "dealId = :dealId",
          ExpressionAttributeValues: {
            ":dealId": deal.id,
          },
        })
        .promise();

      return result.Items;
    },
  },
};

export default dealResolver;
