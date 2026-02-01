import { gql, useMutation } from '@apollo/client'
import { useMemo } from 'react'
import { useGetTodo } from '../hooks/useGetTodos'
import { TodoForm } from './TodoForm'



const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!, $completed: Boolean!) {
    toggleTodo(id: $id, completed: $completed) {
      id
      title
      completed
      createdAt
    }
  }
`

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`
function App() {
  const { data, loading, error } = useGetTodo()
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const items = useMemo(() => data?.todos ?? [], [data])



  return (
    <div>
      <h1>Todo</h1>
      <TodoForm />

      {loading && <p>Loading...</p>}
      {error && <p>Failed to load: {error.message}</p>}

      {items.length === 0 && !loading && <p>No todos yet.</p>}
      {items.map((todo: any) => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={(event) =>
                toggleTodo({
                  variables: { id: todo.id, completed: event.target.checked },
                  optimisticResponse: {
                    toggleTodo: {
                      ...todo,
                      completed: event.target.checked,
                    },
                  },
                })
              }
            />
            {todo.title ? todo.title : 'titleなし'}
            {todo.description ? todo.description : '詳細なし'}
          </label>
          <button
            type="button"
            onClick={() =>
              deleteTodo({
                variables: { id: todo.id },
                update(cache) {
                  cache.modify({
                    fields: {
                      todos(existing = [], { readField }) {
                        return existing.filter(
                          (ref: any) => readField('id', ref) !== todo.id,
                        )
                      },
                    },
                  })
                },
              })
            }
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )
}

export default App
