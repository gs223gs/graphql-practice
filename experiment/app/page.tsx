"use client";

import { useQuery } from "@apollo/client";
import { HelloDocument } from "../lib/generated/graphql";

export default function Home() {
  const { data, loading, error } = useQuery(HelloDocument);
  const qLinks = [
    { label: "問題1: data / errors の確認", href: "/q/one" },
    { label: "問題3: 部分的に data が返るケース", href: "/q/three" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 py-32 px-16 bg-white dark:bg-black sm:items-start">
        <header className="space-y-2">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Apollo Client + Apollo Server
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            GraphQL endpoint: <span className="font-mono">/api/graphql</span>
          </p>
        </header>

        <section className="w-full">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Q Links
          </h2>
          <ul className="mt-3 flex w-full flex-col gap-2">
            {qLinks.map((link) => (
              <li key={link.href}>
                <a
                  className="flex items-center justify-between rounded-lg border border-black/10 bg-zinc-50 px-4 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  href={link.href}
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-zinc-500">
                    {link.href}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="w-full rounded-lg border border-black/10 bg-zinc-50 p-4 text-sm text-black shadow-sm dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-100">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && (
            <div className="space-y-2">
              <p>hello: {data.hello}</p>
              <p>time: {data.time}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
