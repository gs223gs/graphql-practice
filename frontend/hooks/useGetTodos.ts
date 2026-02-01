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
  const { data, loading, error } = useQuery(GET_TODOS)
  return { data, loading, error }
}