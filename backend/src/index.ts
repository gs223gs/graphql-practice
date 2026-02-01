import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    hello: String!
    time: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello, GraphQL!",
    time: () => new Date().toISOString(),
  },
};

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`GraphQL server ready at ${url}`);
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
