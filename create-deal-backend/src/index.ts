// src/index.ts
import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers";
import schema from "./schema";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

export const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Define an async function to start the server
const startServer = async () => {
  // Start the Apollo server
  await server.start();

  // Apply Apollo middleware to the Express app
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(
      `Server is running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
};

// Call the function to start the server
startServer().catch((error) => {
  console.error("Error starting the server:", error);
});

export default app;
