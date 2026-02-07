import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import type { NextRequest } from "next/server";
import { readFileSync } from "node:fs";
import path from "node:path";

type Context = {
  request: NextRequest;
};

type PartialResultParent = {
  mode: "nullable-error" | "non-null-error";
};

export const runtime = "nodejs";

const schemaPath = path.join(process.cwd(), "graphql", "schema-three.graphql");
const typeDefs = readFileSync(schemaPath, "utf8");

const resolvers = {
  Query: {
    nullableCase: (): PartialResultParent => ({ mode: "nullable-error" }),
    nonNullCase: (): PartialResultParent => ({ mode: "non-null-error" }),
  },
  PartialResult: {
    safe: (parent: PartialResultParent) => {
      if (parent.mode === "nullable-error") {
        throw new Error("Nullable field failed");
      }
      return "OK";
    },
    required: (parent: PartialResultParent) => {
      if (parent.mode === "non-null-error") {
        throw new Error("Non-null field failed");
      }
      return "OK";
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
