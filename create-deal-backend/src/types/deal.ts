import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { Customer } from "./customer";
import { DealTasks } from "./dealTasks";

export const DealType = new GraphQLObjectType({
  name: "Deal",
  fields: {
    id: { type: GraphQLID },
    customerId: { type: GraphQLID },
    status: {
      type: GraphQLString,
      resolve: (parent) => {
        return [
          "NEW",
          "INPROGRESS",
          "PAUSED",
          "COMPLETED",
          "ONHOLD",
          "CLOSED",
          "CANCELLED",
        ].includes(parent.status)
          ? parent.status
          : "NEW";
      },
    },
    street: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    zip: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    roomAreaInMeters: { type: GraphQLString },
    peopleRequired: { type: GraphQLString },
    customer: { type: Customer },
    tasks: { type: new GraphQLList(DealTasks) },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});
