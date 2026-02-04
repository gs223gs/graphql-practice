AIが書いたテックブログ

# GraphQL Codegenの導入とハマりどころ

Codegenは「最初だけ設定、あとは自動化」が正解です。
ただしパス設定をミスると、何も生成されないので注意。

## 最小構成（frontendディレクトリで実行する前提）

```ts
// frontend/codegen.ts
const config = {
  schema: "http://localhost:4000/graphql",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "src/__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
      config: { withHooks: true, withHOC: false, withComponent: false },
    },
  },
};
export default config;
```

## よくある落とし穴

- `documents`が浅すぎてクエリを拾えない
- `generates`が`/src/...`など絶対パスになっている
- ルートで実行して`backend/node_modules`まで拾い、重複クエリ名で失敗

## ユースケース

- 型付きの`useXxxQuery`/`useXxxMutation`を自動生成したい
- 手書きの型定義をなくして保守を楽にしたい

## 調べ方の単語

- GraphQL Codegen config
- typescript-react-apollo withHooks
- documents glob pattern
