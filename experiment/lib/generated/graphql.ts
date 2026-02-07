import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  boom: Scalars['String']['output'];
  hello: Scalars['String']['output'];
  nonNullCase: PartialResult;
  nullableCase: PartialResult;
  time: Scalars['String']['output'];
};

export type PartialResult = {
  __typename?: 'PartialResult';
  required: Scalars['String']['output'];
  safe?: Maybe<Scalars['String']['output']>;
};

export type BoomQueryVariables = Exact<{ [key: string]: never; }>;


export type BoomQuery = { __typename?: 'Query', boom: string };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string, time: string };

export type PartialCasesQueryVariables = Exact<{ [key: string]: never; }>;


export type PartialCasesQuery = { __typename?: 'Query', nullableCase: { __typename?: 'PartialResult', safe?: string | null, required: string }, nonNullCase: { __typename?: 'PartialResult', safe?: string | null, required: string } };


export const BoomDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Boom" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "boom" } }] } }] } as unknown as DocumentNode<BoomQuery, BoomQueryVariables>;
export const HelloDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Hello" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hello" } }, { "kind": "Field", "name": { "kind": "Name", "value": "time" } }] } }] } as unknown as DocumentNode<HelloQuery, HelloQueryVariables>;
export const PartialCasesDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "PartialCases" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nullableCase" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "safe" } }, { "kind": "Field", "name": { "kind": "Name", "value": "required" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "nonNullCase" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "safe" } }, { "kind": "Field", "name": { "kind": "Name", "value": "required" } }] } }] } }] } as unknown as DocumentNode<PartialCasesQuery, PartialCasesQueryVariables>;
