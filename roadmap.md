# No1（GraphQL の理解）

1. GraphQL とは（[https://graphql.org/learn/）(P0)](https://graphql.org/learn/）%28P0%29)
   実施

   * GraphQL IDEで `query { __typename }` を実行
   * `query { currentAccount { id } }` を実行
     成果物
   * `docs/no1/graphql_is.json`（レスポンス）
     検収
   * `data` が返り、HTTP 200で取得できる

2. GraphQL ができた理由／解決したかった課題（[https://graphql.org/learn/）(P0)](https://graphql.org/learn/）%28P0%29)
   実施

   * 同一画面要件（例：ヘッダーにAccount＋一覧にTodos）を想定
   * REST想定：必要になりそうなエンドポイントを列挙（例：`/me`, `/todos` 等）
   * GraphQL：1クエリで必要フィールドだけ取得するクエリを書く
     成果物
   * `docs/no1/why_graphql.md`（REST案 vs GraphQL案、payload例付き）
     検収
   * 「呼び出し本数」「取得フィールドの過不足」を具体例で比較できる

3. GraphQL のリクエスト／レスポンス全体像（data / errors / partial response）（[https://graphql.org/learn/response/）(P0)](https://graphql.org/learn/response/）%28P0%29)
   実施

   * 全成功：通常Queryを実行
   * 全失敗：存在しないフィールドを要求（validation error）
   * 部分成功：一部フィールドのresolverで例外を投げる（execution error）
     成果物
   * `docs/no1/response_all_success.json`
   * `docs/no1/response_all_error.json`
   * `docs/no1/response_partial.json`
     検収
   * partialで `data` と `errors` が同居し、`errors[].path` が入る

4. Serving over HTTP（GET/POST、Content-Type、運用の前提）（[https://graphql.org/learn/serving-over-http/）(P0)](https://graphql.org/learn/serving-over-http/）%28P0%29)
   実施

   * curlでPOST（JSON body）を実行
   * curlでGET（query params）を実行
   * variablesをbodyに入れる／入れないを試す
     成果物
   * `docs/no1/http_post.sh` `docs/no1/http_get.sh`
     検収
   * POST/GET両方で同じQueryが通り、Content-Typeの差異を説明できる

5. GraphQL over HTTP（仕様の位置づけを把握）（[https://graphql.github.io/graphql-over-http/draft/）(P2)](https://graphql.github.io/graphql-over-http/draft/）%28P2%29)
   実施

   * 自サーバの挙動を3点だけ仕様観点でチェック（例：GETの扱い、エラー時status、content-type）
   * 1点だけ設定で切替可能にする（例：エラー時 200/400）
     成果物
   * `docs/no1/graphql_over_http_check.md`（3点チェック＋切替方法）
     検収
   * 切替で実際にHTTP status（または挙動）が変わる

6. Schema（type / input / enum / interface / union / scalar）（[https://graphql.org/learn/schema/）(P0)](https://graphql.org/learn/schema/）%28P0%29)
   実施

   * type：`Todo`, `Account` を定義
   * input：`AddTodoInput`, `SignInInput` を定義
   * enum：`TodoStatus` を定義
   * interface：`Node { id: ID! }` を導入
   * union：`SearchResult = Todo | Account` を導入
   * scalar：`DateTime` を導入（既存実装でも可）
   * それぞれ対応するQuery/Mutationを1本ずつ実行
     成果物
   * `schema.graphql`（またはSDL相当）
   * `docs/no1/schema_exec_logs/`（実行ログ）
     検収
   * 上記6種がスキーマに存在し、実行で返却される

7. Nullable / Non-Null（String と String!）（[https://graphql.org/learn/schema/）(P0)](https://graphql.org/learn/schema/）%28P0%29)
   実施

   * `String!` のフィールドでnullを返すバグを意図的に作る
   * どの階層までnull伝播するかを観測
   * 修正して再観測
     成果物
   * `docs/no1/nullability_notes.md`（観測結果＋修正内容）
     検収
   * 「どの親がnull化するか」を具体的に説明できる

8. Operation（query / mutation の概念）（[https://graphql.org/learn/queries/）(P0)](https://graphql.org/learn/queries/）%28P0%29)
   実施

   * Query：`currentAccount`, `todos` を実装して実行
   * Mutation：`signIn`, `addTodo`, `toggleTodo` を実装して実行
     成果物
   * `docs/no1/operations.http`（IDEでなくテキストとして保存）
     検収
   * Mutation後にQuery結果が変化する

9. Field / Selection Set（必要なフィールドだけ取る設計）（[https://graphql.org/learn/queries/）(P0)](https://graphql.org/learn/queries/）%28P0%29)
   実施

   * 同じ `todos` を「最小」と「詳細」で2クエリ作成
   * Networkでpayloadサイズを比較
     成果物
   * `docs/no1/selectionset_compare.md`（2クエリ＋bytes比較）
     検収
   * 必要フィールドだけ取るメリットが数値で示せる

10. Arguments（フィールド引数）（[https://graphql.org/learn/queries/）(P0)](https://graphql.org/learn/queries/）%28P0%29)
    実施

    * `todos(status: ..., first: ..., after: ...)` を実装
    * 引数なし／status指定／first指定で実行
      成果物
    * `docs/no1/arguments_examples.graphql`
      検収
    * 引数でレスポンスが変化する

11. Aliases（同一フィールドの多重取得）（[https://graphql.org/learn/queries/）(P1)](https://graphql.org/learn/queries/）%28P1%29)
    実施

    * `open: todos(status: OPEN)` と `done: todos(status: DONE)` を1レスポンスで取得
      成果物
    * `docs/no1/aliases.graphql` ＋実行ログ
      検収
    * レスポンスに `open` と `done` が別キーで返る

12. Variables（クエリ文字列と入力の分離）（[https://graphql.org/learn/queries/#variables）(P0)](https://graphql.org/learn/queries/#variables）%28P0%29)
    実施

    * Query/Mutationそれぞれでvariablesを使う
    * 変数未指定／型不一致を起こしてエラーを観測
      成果物
    * `docs/no1/variables.graphql`
    * `docs/no1/variables_errors.json`
      検収
    * 直書きなしで実行でき、失敗時エラーが保存されている

13. Fragments（再利用と境界）（[https://graphql.org/learn/queries/#fragments）(P1)](https://graphql.org/learn/queries/#fragments）%28P1%29)
    実施

    * `fragment TodoFields on Todo { ... }` を作成
    * 一覧/詳細の2クエリで参照
    * fragmentを1回変更して両方に反映確認
      成果物
    * `docs/no1/fragments.graphql`
      検収
    * fragment変更が2クエリに反映される

14. Directives（@include / @skip）（[https://graphql.org/learn/queries/#directives）(P2)](https://graphql.org/learn/queries/#directives）%28P2%29)
    実施

    * `includeDetails` 変数で `description` 等の取得を切替
      成果物
    * `docs/no1/directives.graphql` ＋ true/false実行ログ
      検収
    * true/falseでレスポンス形状が変わる

15. Errors（GraphQL のエラー概念／レスポンス構造）（[https://spec.graphql.org/October2021/）(P1)](https://spec.graphql.org/October2021/）%28P1%29)
    実施

    * validation error（存在しないフィールド）
    * execution error（resolver例外）
    * auth error（未認証）
    * 可能なら `extensions.code` を付与
      成果物
    * `docs/no1/errors_validation.json`
    * `docs/no1/errors_execution.json`
    * `docs/no1/errors_auth.json`
      検収
    * `message/path/locations` を確認でき、`extensions` の方針が決まっている

16. Introspection / Schema exploration（既存Schemaを読むための前提）（[https://graphql.org/learn/）(P1)](https://graphql.org/learn/）%28P1%29)
    実施

    * `__type(name:"Todo")` を直接叩く
    * `__schema` でQuery/Mutationのフィールドを取得
      成果物
    * `docs/no1/introspection.graphql` ＋実行ログ
      検収
    * IDE依存ではなくクエリとして再実行できる

---

No2（Apollo Client の理解：全体像）

1. Apollo Client とは（[https://www.apollographql.com/docs/react/）(P0)](https://www.apollographql.com/docs/react/）%28P0%29)
   実施

   * ReactにApollo導入して `todos` を表示
     成果物
   * 最小ページ（一覧表示）
     検収
   * NetworkにGraphQL POSTが出る

2. Apollo Client の主要構成（Client / Link / Cache）（[https://www.apollographql.com/docs/react/）(P0)](https://www.apollographql.com/docs/react/）%28P0%29)
   実施

   * `client.ts` に Client/Link/Cache を分けて実装
     成果物
   * `src/apollo/client.ts` 等
     検収
   * Link差替・Cache設定変更が1ファイルで追える

3. React 統合（ApolloProvider の位置づけ）（[https://www.apollographql.com/docs/react/）(P0)](https://www.apollographql.com/docs/react/）%28P0%29)
   実施

   * ルートにProvider配置
   * Provider外でhookを呼んで失敗も確認（学習用）
     成果物
   * `src/main.tsx` 等のProvider配置
     検収
   * Provider配下でのみ動作することを説明できる

4. Devtools（キャッシュ／watched query／Explorer で調査できる状態にする）（[https://www.apollographql.com/docs/react/development-testing/developer-tooling）(P0)](https://www.apollographql.com/docs/react/development-testing/developer-tooling）%28P0%29)
   実施

   * Devtools導入
   * watched query と cache を確認
     成果物
   * `docs/no2/devtools_check.md`（確認手順＋スクショ）
     検収
   * cacheが正規化されているのを目視できる

---

No3（Apollo Client の理解：基本的な使い方）

1. Queries の基本（useQuery の概念）（[https://www.apollographql.com/docs/react/data/queries/）(P0)](https://www.apollographql.com/docs/react/data/queries/）%28P0%29)
   実施：`loading/error/data` の3状態UIを作る
   成果物：一覧画面
   検収：3状態が再現できる（サーバ停止でerror等）

2. useQuery の主要パラメータ（document / variables / skip）（[https://www.apollographql.com/docs/react/data/queries/）(P0)](https://www.apollographql.com/docs/react/data/queries/）%28P0%29)
   実施：variablesで絞り込み、未ログインはskip
   成果物：絞り込みUI（最小でselect）
   検収：skip時にリクエストが飛ばない

3. Mutations の基本（useMutation の概念）（[https://www.apollographql.com/docs/react/data/mutations/）(P0)](https://www.apollographql.com/docs/react/data/mutations/）%28P0%29)
   実施：フォームでaddTodo
   成果物：追加フォーム
   検収：追加後に一覧が更新される

4. useMutation の主要パラメータ（variables）（[https://www.apollographql.com/docs/react/data/mutations/）(P0)](https://www.apollographql.com/docs/react/data/mutations/）%28P0%29)
   実施：variablesのみで入力を渡し、失敗も観測
   成果物：失敗時の表示/ログ
   検収：型不一致/未入力がエラーとして扱える

5. Fragments の扱い（Apollo と fragment の関係）（[https://www.apollographql.com/docs/react/data/fragments/）(P1)](https://www.apollographql.com/docs/react/data/fragments/）%28P1%29)
   実施：Query/Mutationを同一fragmentで揃える
   成果物：`TodoFields` fragment
   検収：Devtoolsで同一エンティティが統合される

6. Error handling（エラーの見え方・握り方）（[https://www.apollographql.com/docs/react/data/error-handling/）(P0)](https://www.apollographql.com/docs/react/data/error-handling/）%28P0%29)
   実施：graphQLErrorsとnetworkErrorを分岐表示
   成果物：エラー表示コンポーネント
   検収：2種のエラーで表示が変わる

---

No4（Apollo Client の理解：Query オプション）

1. fetchPolicy（[https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy）(P0)](https://www.apollographql.com/docs/react/data/queries/#setting-a-fetch-policy）%28P0%29)
   実施：3種類を切替してNetwork比較
   成果物：比較メモ
   検収：policyごとの発火差が説明できる

2. nextFetchPolicy（[https://www.apollographql.com/docs/react/data/queries/#nextfetchpolicy）(P1)](https://www.apollographql.com/docs/react/data/queries/#nextfetchpolicy）%28P1%29)
   実施：初回と2回目以降でpolicy変更
   成果物：設定コード
   検収：再訪時の挙動が変わる

3. errorPolicy（[https://www.apollographql.com/docs/react/data/queries/）(P1)](https://www.apollographql.com/docs/react/data/queries/）%28P1%29)
   実施：partial時に3種類を比較
   成果物：採用方針メモ
   検収：採用理由が明文化されている

4. notifyOnNetworkStatusChange（[https://www.apollographql.com/docs/react/data/queries/）(P2)](https://www.apollographql.com/docs/react/data/queries/）%28P2%29)
   実施：refetch中の表示を初回と分離
   成果物：再フェッチ中UI
   検収：refetch時のみ表示が出る

5. returnPartialData（[https://www.apollographql.com/docs/react/data/queries/）(P2)](https://www.apollographql.com/docs/react/data/queries/）%28P2%29)
   実施：キャッシュ部分表示→後から補完を再現
   成果物：段階的描画UI
   検収：先出し描画が起きる

6. pollInterval（[https://www.apollographql.com/docs/react/data/queries/）(P2)](https://www.apollographql.com/docs/react/data/queries/）%28P2%29)
   実施：ポーリング開始/停止UI
   成果物：トグルUI
   検収：停止でネットワークが止まる

---

No5（Apollo Client の理解：Mutation オプション）

1. refetchQueries（[https://www.apollographql.com/docs/react/data/mutations/#refetching-queries）(P0)](https://www.apollographql.com/docs/react/data/mutations/#refetching-queries）%28P0%29)
   実施：愚直に整合を取る
   成果物：refetch版実装
   検収：確実に正しい一覧になる

2. awaitRefetchQueries（[https://www.apollographql.com/docs/react/data/mutations/）(P1)](https://www.apollographql.com/docs/react/data/mutations/）%28P1%29)
   実施：refetch完了まで完了扱いにしない
   成果物：disable/完了表示
   検収：順序が保証される

3. update（[https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly）(P1)](https://www.apollographql.com/docs/react/data/mutations/#updating-the-cache-directly）%28P1%29)
   実施：cache.modify等で直接更新
   成果物：update版実装
   検収：refetchなしでUI更新

4. optimisticResponse（[https://www.apollographql.com/docs/react/performance/optimistic-ui/）(P2)](https://www.apollographql.com/docs/react/performance/optimistic-ui/）%28P2%29)
   実施：即表示＋失敗で巻き戻し
   成果物：optimistic版実装
   検収：成功/失敗で挙動が正しい

5. onCompleted / onError（[https://www.apollographql.com/docs/react/data/mutations/）(P2)](https://www.apollographql.com/docs/react/data/mutations/）%28P2%29)
   実施：成功でフォームリセット、失敗で整形表示
   成果物：後処理集約
   検収：副作用が一箇所にまとまっている

---

No6（Apollo Client の理解：Cache）

1. InMemoryCache とは（[https://www.apollographql.com/docs/react/caching/overview/）(P0)](https://www.apollographql.com/docs/react/caching/overview/）%28P0%29)
   実施：Devtoolsでキャッシュ観測
   成果物：観測メモ
   検収：正規化の実体を説明できる

2. 正規化（normalized cache）の概念（[https://www.apollographql.com/docs/react/caching/overview/）(P0)](https://www.apollographql.com/docs/react/caching/overview/）%28P0%29)
   実施：`todos` と `node(id)` の両方で同一Todoを参照
   成果物：2クエリ
   検収：片方更新が他方に効く

3. cache ID と keyFields（[https://www.apollographql.com/docs/react/caching/cache-configuration/）(P0)](https://www.apollographql.com/docs/react/caching/cache-configuration/）%28P0%29)
   実施：keyFields変更を1回試す
   成果物：変更前後メモ
   検収：統合挙動の差が説明できる

4. typePolicies（[https://www.apollographql.com/docs/react/caching/cache-configuration/）(P1)](https://www.apollographql.com/docs/react/caching/cache-configuration/）%28P1%29)
   実施：Queryフィールドにpolicy設定
   成果物：cache設定
   検収：後続（pagination等）で効果が出る

5. field policies（read / merge）（[https://www.apollographql.com/docs/react/caching/cache-field-behavior/）(P1)](https://www.apollographql.com/docs/react/caching/cache-field-behavior/）%28P1%29)
   実施：readかmergeを1つ採用して使う
   成果物：policy実装
   検収：表示/結合に影響がある

6. keyArgs（[https://www.apollographql.com/docs/react/caching/cache-field-behavior/）(P1)](https://www.apollographql.com/docs/react/caching/cache-field-behavior/）%28P1%29)
   実施：filter引数でキャッシュ分離/統合を制御
   成果物：keyArgs設定
   検収：status別一覧が意図通りに保持される

7. cache interaction（readQuery / writeQuery / modify）（[https://www.apollographql.com/docs/react/caching/cache-interaction/）(P1)](https://www.apollographql.com/docs/react/caching/cache-interaction/）%28P1%29)
   実施：3つを最低1回ずつ使用
   成果物：利用箇所3つ
   検収：用途が説明できる

8. Garbage collection / eviction（[https://www.apollographql.com/docs/react/caching/garbage-collection）(P1)](https://www.apollographql.com/docs/react/caching/garbage-collection）%28P1%29)
   実施：ログアウトでclear/reset/evict方針を実装
   成果物：ログアウト処理
   検収：ユーザ切替でデータ混線しない

---

No7（Apollo Client の理解：Pagination）

1. Pagination 全体像（[https://www.apollographql.com/docs/react/pagination/core-api）(P0)](https://www.apollographql.com/docs/react/pagination/core-api）%28P0%29)
   実施：fetchMoreで“増えるUI”を作る
   成果物：もっと読むボタン/無限スクロール
   検収：重複なし・順序維持

2. Cursor-based pagination（[https://www.apollographql.com/docs/react/pagination/cursor-based）(P0)](https://www.apollographql.com/docs/react/pagination/cursor-based）%28P0%29)
   実施：field policy mergeで結合を一元化
   成果物：merge実装
   検収：UI側で手結合していない

---

No8（Apollo Client の理解：Network / Link）

1. Apollo Link とは（[https://www.apollographql.com/docs/react/networking/overview/）(P1)](https://www.apollographql.com/docs/react/networking/overview/）%28P1%29)
   実施：ログLink等、カスタムLinkを1つ挿入
   成果物：Linkチェーン
   検収：全リクエストでログが出る

2. Authentication（[https://www.apollographql.com/docs/react/networking/authentication/）(P1)](https://www.apollographql.com/docs/react/networking/authentication/）%28P1%29)
   実施：token保存＋Authorization付与
   成果物：Auth Link
   検収：未ログイン401、ログイン後成功

3. Error handling（[https://www.apollographql.com/docs/react/data/error-handling/）(P1)](https://www.apollographql.com/docs/react/data/error-handling/）%28P1%29)
   実施：Error Linkでnetwork/GraphQLを分岐処理
   成果物：統一エラー処理
   検収：種別ごとにログ/表示が分かれる

---

No9（Apollo Client の理解：Subscriptions）

1. Subscriptions の基本（[https://www.apollographql.com/docs/react/data/subscriptions）(P1)](https://www.apollographql.com/docs/react/data/subscriptions）%28P1%29)
   実施：`todoAdded` を配信し、受信で一覧へ追加
   成果物：subscription実装
   検収：別タブ追加がリアルタイム反映

---

No10（Apollo Client の理解：Suspense）

1. Suspense 対応（[https://www.apollographql.com/docs/react/data/suspense）(P1)](https://www.apollographql.com/docs/react/data/suspense）%28P1%29)
   実施：`useQuery`版と`useSuspenseQuery`版を並べて比較
   成果物：2実装
   検収：fallback/エラー境界の責務差が説明できる

---

No11（Apollo Client の理解：SSR / フレームワーク統合）

1. SSR の前提（[https://www.apollographql.com/docs/react/performance/server-side-rendering）(P0)](https://www.apollographql.com/docs/react/performance/server-side-rendering）%28P0%29)
   実施：サーバでQuery→cache抽出→hydrate
   成果物：SSRページ1つ
   検収：初回HTMLにデータが入り、二重フェッチ方針が明確

2. Next.js（App Router）でのセットアップ参照（[https://github.com/apollographql/skills/blob/main/skills/apollo-client/references/setup-nextjs.md）(P0)](https://github.com/apollographql/skills/blob/main/skills/apollo-client/references/setup-nextjs.md）%28P0%29)
   実施：Provider配置とClient/Server境界を固定
   成果物：Next構成
   検収：READMEに配置理由が書かれている

---

No12（型・運用の理解）

1. Static typing の考え方（[https://www.apollographql.com/docs/react/development-testing/static-typing/）(P1)](https://www.apollographql.com/docs/react/development-testing/static-typing/）%28P1%29)
   実施：nullability含め型を導入し、anyなしでUIを書く
   成果物：型付きhooks/型付きdata参照
   検収：TSで危険箇所が検出される

2. GraphQL Code Generator（[https://the-guild.dev/graphql/codegen）(P1)](https://the-guild.dev/graphql/codegen）%28P1%29)
   実施：codegen導入し、TypedDocumentNode等へ置換
   成果物：`codegen.yml`＋生成物
   検収：variables/resultが生成型で補完される

---

No13（テストの理解）

1. Testing 全体像（[https://www.apollographql.com/docs/react/development-testing/testing）(P1)](https://www.apollographql.com/docs/react/development-testing/testing）%28P1%29)
   実施：テスト3本（UI/統合寄り/ロジック）を作る
   成果物：`tests/` に3本
   検収：CIで落ちるべき時に落ちる

2. MockedProvider（[https://www.apollographql.com/docs/react/api/react/testing）(P1)](https://www.apollographql.com/docs/react/api/react/testing）%28P1%29)
   実施：Query1本＋Mutation1本、成功/失敗を両方
   成果物：MockedProviderテスト2本以上
   検収：成功/失敗が安定して再現できる
