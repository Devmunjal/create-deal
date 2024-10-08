import { gql } from "apollo-server-express";

export const customerSchema = gql`
  type Customer {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    customer(id: ID!): Customer
    customers: [Customer!]!
  }

  type Mutation {
    createCustomer(name: String!, email: String!): Customer
  }
`;

export default customerSchema;
