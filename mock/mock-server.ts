import { readFileSync } from 'fs';
import { resolve } from 'path';
import { faker } from '@faker-js/faker';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';

const schemaString = readFileSync(
  resolve('./schema.graphql'),
  'utf8'
);

const schema = addMocksToSchema({
  schema: makeExecutableSchema({ typeDefs: schemaString }),
});

const mocks = {
  Int: () => faker.datatype.number(),
  Float: () => faker.datatype.float(),
};

const app = express();
const PORT = 8080;

const server = new ApolloServer({
  schema,
  mocks,
});
(async () => {
  await server.start();
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
})();