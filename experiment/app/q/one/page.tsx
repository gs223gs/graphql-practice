"use client";

import { useQuery } from "@apollo/client";
import { BoomDocument, HelloDocument } from "../../../lib/generated/graphql";

type CardProps = {
  title: string;
  body: string;
  loading: boolean;
  errorMessage?: string;
};

const ResponseCard = ({ title, body, loading, errorMessage }: CardProps) => {
  return (
    <section className="w-full rounded-lg borderp-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>
      {loading && <p className="mt-3 text-sm text-zinc-600">Loading...</p>}
      {errorMessage && (
        <p className="mt-3 text-sm text-red-600">Error: {errorMessage}</p>
      )}
      <pre className="mt-4 whitespace-pre-wrap rounded-md">
        {body}
      </pre>
    </section>
  );
};

const DataResponse = () => {
  const { data, error, loading } = useQuery(HelloDocument);

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
      title="data が返るケース"
      body={body}
      loading={loading}
      errorMessage={error?.message}
    />
  );
};

const ErrorsResponse = () => {
  const { data, error, loading } = useQuery(BoomDocument, {
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
      title="errors が返るケース"
      body={body}
      loading={loading}
      errorMessage={error?.message}
    />
  );
};

export default function OnePage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-6 py-16 text-black">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            問題1: data / errors の確認
          </h1>
          <p className="text-sm text-zinc-600">
            GraphQL レスポンスのトップレベルに登場しうるキーを、実行結果で確かめます。
          </p>
        </header>
        <DataResponse />
        <ErrorsResponse />
      </main>
    </div>
  );
}
