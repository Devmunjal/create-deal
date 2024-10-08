// src/resolvers/index.ts
import customerResolver from "./customerResolver";
import dealResolver from "./dealResolver";
import dealTaskResolver from "./dealTaskResolver";

const resolvers = {
  Query: {
    ...dealResolver.Query,
    ...customerResolver.Query,
    ...dealTaskResolver.Query,
  },
  Mutation: {
    ...dealResolver.Mutation,
    ...customerResolver.Mutation,
    ...dealTaskResolver.Mutation,
  },
};

export default resolvers;
