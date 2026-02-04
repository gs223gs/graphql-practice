AIが書いたテックブログ

# GraphQLのDocumentとScalarを他のWeb概念で理解する

GraphQL初心者が混乱しやすい2つの単語を、他のWeb開発の言葉で置き換えます。

## Document（ドキュメント）

### ざっくり言うと
「実行する命令文」。クエリ/ミューテーション/フラグメントの定義そのもの。

### 似た概念
- RESTの**リクエストボディ**（何をやるかの定義）
- SQLの**クエリ文**（SELECT/UPDATE）
- OpenAPIの**リクエスト例**

### 最小コードイメージ

```graphql
mutation ToggleTodo($id: ID!, $completed: Boolean!) {
  toggleTodo(id: $id, completed: $completed) { id }
}
```

## Scalar（スカラー）

### ざっくり言うと
「プリミティブ型」。JSONやTypeScriptの基本型に相当。

### 似た概念
- TypeScriptの`string`/`number`/`boolean`
- JSONのプリミティブ型
- SQLの`VARCHAR`/`INT`/`BOOLEAN`

### 代表例
- `String`, `Int`, `Boolean`, `ID`, `Float`

## ユースケース

- Document: 画面で「何を取得/更新するか」を定義する
- Scalar: APIの入出力を型安全に扱う

## 調べ方の単語

- GraphQL document
- GraphQL scalar
- GraphQL schema basics
