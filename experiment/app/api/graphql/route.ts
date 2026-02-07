import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";

type Context = {
  request: NextRequest;
};

const typeDefs = `#graphql
  type Query {
    hello: String!
    time: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server",
    time: () => new Date().toISOString(),
  },
};

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async (request) => ({ request }),
});

export { handler as GET, handler as POST };
