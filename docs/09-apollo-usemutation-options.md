AIが書いたテックブログ

# Apollo Client の `useMutation` options リファレンス

Apollo Client の `useMutation` は「フックに渡す options」と「`mutate()` 実行時に渡す options」の2段構えです。  
`mutate()` に渡した options は、`useMutation` に渡した同名 options を上書きします。

## 使いどころの全体像

- `useMutation(MUTATION, options)` は「既定の挙動」を決める
- `mutate({ ...options })` は「その1回だけ上書きする挙動」を決める

## Options 一覧（公式 API に準拠）

### Operation options

- `variables`  
  ミューテーションに渡す GraphQL 変数。
- `awaitRefetchQueries`  
  `refetchQueries` を待ち合わせてからミューテーション完了にするか。既定は `false`。
- `errorPolicy`  
  GraphQL エラーと部分データの扱い方を指定する。
- `onCompleted`  
  成功時に呼ばれるコールバック。
- `onError`  
  エラー時に呼ばれるコールバック。
- `refetchQueries`  
  ミューテーション後に再フェッチするクエリ指定。
- `onQueryUpdated`  
  更新対象クエリごとに呼ばれるコールバック。`false` を返すとそのクエリを無視できる。

### Networking options

- `client`  
  使う `ApolloClient` インスタンスを明示的に指定する。
- `context`  
  Apollo Link へ渡す `context`。
- `notifyOnNetworkStatusChange`  
  ネットワーク状態の変化で再レンダーするか。既定は `true`。

### Caching options

- `fetchPolicy`  
  `network-only` または `no-cache` のみサポート。既定は `network-only`。
- `optimisticResponse`  
  楽観的 UI 更新のための仮レスポンス。
- `update`  
  ミューテーション完了後にキャッシュを直接更新する関数。

### Other

- `keepRootFields`  
  `ROOT_MUTATION` のフィールドをキャッシュから消さないようにする。既定では自動で削除される。
- `updateQueries`  
  監視中クエリの結果へミューテーション結果を反映するための reducers マップ。

## `refetchQueries` の指定方法

以下のいずれかを指定できます。

- `refetchQueries: [ ... ]` の配列  
  各要素は `DocumentNode` またはクエリ名文字列。
- `refetchQueries: "active"`  
  アクティブなクエリを全て再フェッチ。
- `refetchQueries: "all"`  
  アクティブ / 非アクティブ含めて全て再フェッチ。

## 使い方（例）

```tsx
import { gql, useMutation } from "@apollo/client";

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
    }
  }
`;

const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  variables: { text: "hello" },
  refetchQueries: ["GetTodos"],
  awaitRefetchQueries: true,
  onCompleted: (data) => {
    // 成功時処理
  },
  onError: (err) => {
    // エラー処理
  },
});

addTodo({
  variables: { text: "override" },
  refetchQueries: ["GetTodos"],
});
```

## 一次情報（公式ドキュメント）

- Apollo Client `useMutation` API Reference  
  https://www.apollographql.com/docs/react/api/react/useMutation
- Mutations in Apollo Client  
  https://www.apollographql.com/docs/react/data/mutations
