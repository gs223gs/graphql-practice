AIが書いたテックブログ

# GraphQLのvariablesとmutation引数の理解

GraphQLを初めて触ると「mutationの引数」「variables」「useMutationの引数」が混ざって見えます。
ここでは **最小の考え方** に絞って整理します。

## 3つのレイヤーがある

1) **GraphQLの引数**（スキーマ側の設計）
2) **GraphQLドキュメント内の変数**（クエリ文の中の$xxx）
3) **useMutationの引数**（React側で渡すoptions）

この3つが別物です。

---

## 1) GraphQLの引数（スキーマ側）

サーバーが「何を受け取れるか」を定義します。

```graphql
# schema側のイメージ
mutation ToggleTodo($id: ID!, $completed: Boolean!) { ... }
```

ここで `id` と `completed` が **mutationの引数**です。

---

## 2) GraphQLドキュメント内の変数

クライアント側で書くGraphQL文では、
**$変数名** を使って引数に値を差し込みます。

```graphql
mutation ToggleTodo($id: ID!, $completed: Boolean!) {
  toggleTodo(id: $id, completed: $completed) { id }
}
```

- `$id` と `$completed` が **variables**
- `toggleTodo(id: $id, completed: $completed)` が **引数に変数を渡している部分**

---

## 3) useMutationの引数（React側）

Reactで実行するときは、**optionsオブジェクト**を渡します。
その中に `variables` を入れます。

```ts
const [toggleTodo] = useToggleTodoMutation()

toggleTodo({
  variables: { id: "1", completed: true },
})
```

ここで渡す `variables` は、
GraphQL文の `$id` / `$completed` に対応します。

---

## よくある勘違い

### ❌ 間違い
```ts
toggleTodo({ id: todo.id, completed: todo.completed })
```

`useMutation` の戻り値は **「optionsを受け取る関数」** です。
直接 `id` や `completed` は渡せません。

### ✅ 正しい
```ts
toggleTodo({
  variables: { id: todo.id, completed: todo.completed },
})
```

---

## ユースケース

- **variables**: UIから受け取った値をmutationに渡す
- **mutation引数**: サーバー側のAPI設計を表す
- **useMutation引数**: Apolloに「どう実行するか」を伝える

---

## 調べ方の単語

- GraphQL variables
- Apollo useMutation options
- GraphQL mutation arguments

