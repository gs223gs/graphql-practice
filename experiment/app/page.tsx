"use client";

import { gql, useQuery } from "@apollo/client";

const HELLO_QUERY = gql`
  query HelloQuery {
    hello
    time
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(HELLO_QUERY);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-6 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Apollo Client + Apollo Server
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          GraphQL endpoint: <span className="font-mono">/api/graphql</span>
        </p>
        <div className="w-full rounded-lg border border-black/10 bg-zinc-50 p-4 text-sm text-black shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <div className="space-y-2">
              <p>hello: {data.hello}</p>
              <p>time: {data.time}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
