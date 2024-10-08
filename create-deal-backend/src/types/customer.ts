import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";

export const Customer = new GraphQLObjectType({
  name: "Customer",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});
