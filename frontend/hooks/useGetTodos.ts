import { gql, useQuery } from '@apollo/client'
const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      description
      completed
      createdAt
    }
  }
`

export const useGetTodo = () => {
  // Apollo はクエリ結果を自動で正規化してキャッシュに保存します
  // `fetchPolicy` で「まずキャッシュを見るか」を指定できます
  const { data, loading, error } = useQuery(GET_TODOS, {
    // まずキャッシュを見て、なければネットワークに取りに行く
    fetchPolicy: 'cache-first',
    // 2回目以降の再実行はキャッシュだけで返す（再リクエストを抑える）
    nextFetchPolicy: 'cache-only',
  })
  return { data, loading, error }
}
