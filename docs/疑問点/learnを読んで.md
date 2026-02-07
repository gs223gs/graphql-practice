https://graphql.org/learn/response/

上記を読んで出た疑問点

## schema エラーが出た場合は何が返ってくるのか？

読んでわかったこと: errors が返ってくる => 部分的に分割されることもある

回答: `errors` が返る。パース/バリデーション（schema）系のエラーなら `data` は `null` になることが多い。実行時エラーは `data` が部分的に返ることがある。

## error時に部分データが返ってくるとは何か？

読んでわかったこと: エラーのschema が決まっている(db error とかは自分で定義しなければいけないはず)

回答: nullable なフィールドでエラーが起きると、そのフィールドだけ `null` になり、他は返る。non-null でエラーが起きると親まで `null` に巻き上げられる。

### 追加の疑問点: schema って自分で決めてresできるのか？

rest なら当たり前だけど gql なら変わるのか？

回答: レスポンスの形は schema で固定される。schema 自体は自分で設計できるが、返せる形は定義した schema に従う。

## resolver て何？

回答: 各フィールドの値を返すための関数。例えば `Query.todos` の resolver が DB から Todo 一覧を取得して返す。
