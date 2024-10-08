import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const DealTasks = new GraphQLObjectType({
  name: "Task",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    status: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});
