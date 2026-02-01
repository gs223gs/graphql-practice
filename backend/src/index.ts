import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";

const typeDefs = `#graphql
  type Todo {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    addTodo(title: String!, description:String): Todo!
    toggleTodo(id: ID!, completed: Boolean!): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    todos: async () => {
      console.log('TODOS')
      const items = await prisma.todo.findMany({ orderBy: { id: "desc" } });
      return items.map((item) => ({
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      }));
    },
    todo: async (_: unknown, args: { id: string }) => {
      console.log('TODO')
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
    addTodo: async (_: unknown, args: { title: string, description: string | null }) => {
      console.log('ADD')
      const item = await prisma.todo.create({
        data: { title: args.title, description: args.description },
      });
      return {
        ...item,
        createdAt: item.createdAt.toISOString(),
        updatedAt: item.updatedAt.toISOString(),
      };
    },
    toggleTodo: async (_: unknown, args: { id: string; completed: boolean }) => {
      console.log('TOGGLE')
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
      console.log('DELETE')
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
