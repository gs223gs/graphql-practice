AIが書いたテックブログ

# toggle系ミューテーションで楽観的UIを正しく動かす

トグル（完了/未完了、ON/OFF）でつまずきやすいのが、
**「反転値をどこに入れるか」**です。

## 結論

**variables と optimisticResponse の両方に反転値を入れる**のが正解。

## 最小コード

```ts
toggleTodo({
  variables: { id: todo.id, completed: !todo.completed },
  optimisticResponse: {
    toggleTodo: { ...todo, completed: !todo.completed },
  },
})
```

## どうして両方必要？

- `variables` は **サーバーへ送る実際の更新値**
- `optimisticResponse` は **UIを即時に反映する仮の結果**

どちらか一方だけ反転すると、
- UIは変わるのにサーバーは変わらない
- サーバーは変わるのにUIは変わらない
のどちらかが起きます。

## ユースケース

- チェックボックスのON/OFF
- いいね/スターの切り替え
- Booleanフラグの即時反映

## 調べ方の単語

- Apollo optimisticResponse toggle
- Apollo useMutation variables
- GraphQL mutation update UI
