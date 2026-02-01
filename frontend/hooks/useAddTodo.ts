import { gql, useMutation } from '@apollo/client'

const ADD_TODO = gql`
  mutation AddTodo($title: String!, $description: String) {
    addTodo(title: $title, description: $description) {
      id
      title
      description
      completed
      createdAt
    }
  }
`

export const useAddTodo = () => {
  const [addTodo, loading] = useMutation(ADD_TODO)

  const handleAdd = async (
    title: string, desc: string
  ): Promise<boolean> => {
    const trimmed = title.trim()
    if (!trimmed) return false
    try {
      await addTodo({
        variables: { title: trimmed, description: desc },
        update(cache, { data: result }) {
          const newItem = result?.addTodo
          if (!newItem) return
          cache.modify({
            fields: {
              todos(existing = []) {
                return [newItem, ...existing]
              },
            },
          })
        },
      })
      return true
    } catch {
      console.log('error')
      return false
    }
  }

  return { handleAdd, loading }
}