import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

type Context = {
  request: NextRequest;
};

export const runtime = "nodejs";

const schemaPath = path.join(process.cwd(), "graphql", "schema.graphql");
const typeDefs = readFileSync(schemaPath, "utf8");

const resolvers = {
  Query: {
    hello: () => "Hello from Apollo Server",
    time: () => new Date().toISOString(),
    boom: () => {
      throw new Error("Boom");
    },
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
