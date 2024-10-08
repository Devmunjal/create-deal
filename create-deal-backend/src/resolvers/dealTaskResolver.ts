import { dynamoDB } from "../utils/db";

const taskTableName = "Tasks";

const getCurrentTimestamp = () => new Date().toISOString();

export const dealTaskResolver = {
  Query: {
    tasks: async (_: any, args: { dealId: string }) => {
      const result = await dynamoDB
        .query({
          TableName: taskTableName,
          KeyConditionExpression: "dealId = :dealId",
          ExpressionAttributeValues: {
            ":dealId": args.dealId,
          },
        })
        .promise();

      return result.Items;
    },
  },
  Mutation: {
    createTask: async (
      _: any,
      args: { title: string; status: string; dealId: string }
    ) => {
      const task = {
        id: Date.now().toString(),
        title: args.title,
        status: args.status,
        dealId: args.dealId,
        createdAt: getCurrentTimestamp(), // Set created timestamp
        updatedAt: getCurrentTimestamp(), // Set updated timestamp
      };

      await dynamoDB
        .put({
          TableName: taskTableName,
          Item: task,
        })
        .promise();

      return task;
    },
    updateTask: async (
      _: any,
      args: { id: string; title: string; status: string }
    ) => {
      const updatedTask = {
        title: args.title,
        status: args.status,
        updatedAt: getCurrentTimestamp(), // Update timestamp
      };

      await dynamoDB
        .update({
          TableName: taskTableName,
          Key: { id: args.id },
          UpdateExpression: "set title = :t, status = :s, updatedAt = :u",
          ExpressionAttributeValues: {
            ":t": updatedTask.title,
            ":s": updatedTask.status,
            ":u": updatedTask.updatedAt,
          },
          ReturnValues: "ALL_NEW",
        })
        .promise();

      return { id: args.id, ...updatedTask };
    },
    deleteTask: async (_: any, args: { id: string }) => {
      await dynamoDB
        .delete({
          TableName: taskTableName,
          Key: { id: args.id },
        })
        .promise();

      return args.id;
    },
  },
};

export default dealTaskResolver;
