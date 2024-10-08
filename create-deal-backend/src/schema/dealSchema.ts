import { gql } from "apollo-server-express";

export const dealSchema = gql`
  enum DealStatus {
    NEW
    INPROGRESS
    PAUSED
    COMPLETED
    ONHOLD
    CLOSED
    CANCELLED
  }

  type Deal {
    id: ID!
    status: DealStatus!
    customer: Customer!
    tasks: [Task]
    street: String
    city: String
    state: String
    zip: String
    images: [String]
    roomAreaInMeters: String
    peopleRequired: String
    customerId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    deal(id: ID!): Deal
    deals: [Deal!]!
  }

  type Mutation {
    createDeal(
      customerId: ID!
      street: String
      city: String
      state: String
      zip: String
      status: DealStatus!
      images: [String]
      roomAreaInMeters: Int
      peopleRequired: Int
    ): Deal

    updateDeal(
      id: ID!
      title: String!
      description: String!
      customerId: ID!
    ): Deal
    deleteDeal(id: ID!): ID!
  }
`;

export default dealSchema;
