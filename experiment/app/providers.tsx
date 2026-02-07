"use client";

import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../lib/apollo-client";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  const client = getApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
