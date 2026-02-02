import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
// このファイルはGraphQL Codegenの自動生成物です。
// 目的: GraphQLの型とReact Hooksを「型安全に」使えるようにする。
// ---------- 基本ユーティリティ型 ----------
// 具体例: Maybe<string> は string | null
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
// ---------- GraphQLのスカラー型とTS型の対応 ----------
// 具体例: IDは入力も出力もstringとして扱う
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

// ---------- GraphQLのスキーマ型 ----------
// 具体的な使い方（最小例）:
// const [addTodo, { data, loading, error }] = useAddTodoMutation({
//   variables: { title: "hello", description: "note" },
// });
// ユースケース: データを追加/更新/削除したいとき
// 調べ方の単語: "GraphQL Mutation", "Apollo useMutation", "variables"
export type Mutation = {
  __typename?: 'Mutation';
  addTodo: Todo;
  deleteTodo: Scalars['Boolean']['output'];
  toggleTodo: Todo;
};


export type MutationAddTodoArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};


export type MutationDeleteTodoArgs = {
  id: Scalars['ID']['input'];
};


export type MutationToggleTodoArgs = {
  completed: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

// 具体的な使い方（最小例）:
// const { data, loading, error } = useGetTodosQuery();
// console.log(data?.todos);
// ユースケース: 一覧取得や詳細取得など「読む」処理
// 調べ方の単語: "GraphQL Query", "Apollo useQuery", "fetchPolicy"
export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
};


export type QueryTodoArgs = {
  id: Scalars['ID']['input'];
};

// 具体的な使い方（最小例）:
// const todo: Todo = data!.todos[0];
// console.log(todo.title, todo.completed);
// ユースケース: UIでTodoの表示や編集フォームの初期値に使う
// 調べ方の単語: "GraphQL type", "TypeScript type alias"
export type Todo = {
  __typename?: 'Todo';
  completed: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

// ---------- 操作ごとの型（variables / result） ----------
// 具体的な使い方（最小例）:
// const vars: ToggleTodoMutationVariables = { id: "1", completed: true };
// 調べ方の単語: "GraphQL Codegen variables type"
export type ToggleTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  completed: Scalars['Boolean']['input'];
}>;


// 具体的な使い方（最小例）:
// const result: ToggleTodoMutation | undefined = data;
// console.log(result?.toggleTodo.title);
// ユースケース: Mutation後のレスポンス型で安全に参照
// 調べ方の単語: "GraphQL Codegen result type"
export type ToggleTodoMutation = { __typename?: 'Mutation', toggleTodo: { __typename?: 'Todo', id: string, title: string, completed: boolean, createdAt: string } };

export type DeleteTodoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: boolean };


// ---------- GraphQLドキュメントとReact Hooks ----------
// 具体的な使い方（最小例）:
// const [toggleTodo] = useToggleTodoMutation();
// toggleTodo({ variables: { id: "1", completed: true } });
// ユースケース: UIイベント（チェックボックス変更）で更新
// 調べ方の単語: "useMutation", "Apollo Client hooks"
export const ToggleTodoDocument = gql`
    mutation ToggleTodo($id: ID!, $completed: Boolean!) {
  toggleTodo(id: $id, completed: $completed) {
    id
    title
    completed
    createdAt
  }
}
    `;
export type ToggleTodoMutationFn = Apollo.MutationFunction<ToggleTodoMutation, ToggleTodoMutationVariables>;


// 具体的な使い方（最小例）:
// const [toggleTodo, { loading, error }] = useToggleTodoMutation();
// ユースケース: 既存Todoの完了状態を切り替える
// 調べ方の単語: "useToggleTodoMutation", "Apollo MutationHookOptions"
export function useToggleTodoMutation(baseOptions?: Apollo.MutationHookOptions<ToggleTodoMutation, ToggleTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleTodoMutation, ToggleTodoMutationVariables>(ToggleTodoDocument, options);
      }
export type ToggleTodoMutationHookResult = ReturnType<typeof useToggleTodoMutation>;
export type ToggleTodoMutationResult = Apollo.MutationResult<ToggleTodoMutation>;
export type ToggleTodoMutationOptions = Apollo.BaseMutationOptions<ToggleTodoMutation, ToggleTodoMutationVariables>;
// 具体的な使い方（最小例）:
// const [deleteTodo] = useDeleteTodoMutation();
// deleteTodo({ variables: { id: "1" } });
// ユースケース: Todo削除
// 調べ方の単語: "GraphQL delete mutation", "Apollo cache update"
export const DeleteTodoDocument = gql`
    mutation DeleteTodo($id: ID!) {
  deleteTodo(id: $id)
}
    `;
export type DeleteTodoMutationFn = Apollo.MutationFunction<DeleteTodoMutation, DeleteTodoMutationVariables>;


// 具体的な使い方（最小例）:
// const [deleteTodo, { loading, error }] = useDeleteTodoMutation();
// ユースケース: 削除処理のUI連携
// 調べ方の単語: "useDeleteTodoMutation"
export function useDeleteTodoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTodoMutation, DeleteTodoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, options);
      }
export type DeleteTodoMutationHookResult = ReturnType<typeof useDeleteTodoMutation>;
export type DeleteTodoMutationResult = Apollo.MutationResult<DeleteTodoMutation>;
export type DeleteTodoMutationOptions = Apollo.BaseMutationOptions<DeleteTodoMutation, DeleteTodoMutationVariables>;
