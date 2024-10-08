import { gql } from "apollo-server-express";

export const taskSchema = gql`
  type Task {
    id: ID!
    title: String!
    status: String!
    dealId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    tasks(dealId: ID!): [Task!]!
  }

  type Mutation {
    createTask(title: String!, status: String!, dealId: ID!): Task
    updateTask(id: ID!, title: String!, status: String!): Task
    deleteTask(id: ID!): ID!
  }
`;

export default taskSchema;
