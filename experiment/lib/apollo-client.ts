import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export const getApolloClient = () => {
  if (apolloClient) return apolloClient;

  apolloClient = new ApolloClient({
    link: new HttpLink({
      uri: "/api/graphql",
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  return apolloClient;
};
