"use client";

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  useQuery,
} from "@apollo/client";
import { PartialCasesDocument } from "../../../lib/generated/graphql";

const threeClient = new ApolloClient({
  link: new HttpLink({
    uri: "/api/q/three",
    fetch,
  }),
  cache: new InMemoryCache(),
});

type CardProps = {
  title: string;
  body: string;
  loading: boolean;
  errorMessage?: string;
};

const ResponseCard = ({ title, body, loading, errorMessage }: CardProps) => {
  return (
    <section className="w-full rounded-lg border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-950">
      <h2 className="text-lg font-semibold text-black dark:text-zinc-50">
        {title}
      </h2>
      {loading && <p className="mt-3 text-sm text-zinc-600">Loading...</p>}
      {errorMessage && (
        <p className="mt-3 text-sm text-red-600">Error: {errorMessage}</p>
      )}
      <pre className="mt-4 whitespace-pre-wrap rounded-md bg-zinc-50 p-4 text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
        {body}
      </pre>
    </section>
  );
};

const PartialCases = () => {
  const { data, error, loading } = useQuery(PartialCasesDocument, {
    errorPolicy: "all",
  });

  const body = JSON.stringify(
    {
      data,
      errors: error?.graphQLErrors?.map((e) => ({
        message: e.message,
        locations: e.locations,
        path: e.path,
      })),
    },
    null,
    2
  );

  return (
    <ResponseCard
      title="nullable / non-null のエラー伝播"
      body={body}
      loading={loading}
      errorMessage={error?.message}
    />
  );
};

export default function ThreePage() {
  return (
    <ApolloProvider client={threeClient}>
      <div className="min-h-screen bg-zinc-50 px-6 py-16 text-black">
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              問題3: 部分的に data が返るケース
            </h1>
            <p className="text-sm text-zinc-600">
              nullable フィールドの失敗では data の一部が null になり、non-null
              フィールドの失敗では親まで null 伝播します。
            </p>
          </header>
          <PartialCases />
        </main>
      </div>
    </ApolloProvider>
  );
}
