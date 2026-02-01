import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

const typeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    addTodo(title: String!): Todo!
    toggleTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    todos: async () => {
      const items = await prisma.todo.findMany({ orderBy: { id: "desc" } });
      return items.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      }));
    },
    todo: async (_: unknown, args: { id: string }) => {
      const item = await prisma.todo.findUnique({
        where: { id: Number(args.id) },
      });
      if (!item) return null;
      return {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      };
    },
  },
  Mutation: {
    addTodo: async (_: unknown, args: { title: string }) => {
      const item = await prisma.todo.create({
        data: { title: args.title },
      });
      return {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      };
    },
    toggleTodo: async (_: unknown, args: { id: string; completed: boolean }) => {
      const item = await prisma.todo.update({
        where: { id: Number(args.id) },
        data: { completed: args.completed },
      });
      return {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      };
    },
    deleteTodo: async (_: unknown, args: { id: string }) => {
      await prisma.todo.delete({ where: { id: Number(args.id) } });
      return true;
    },
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
