import { gql, useMutation } from '@apollo/client'
import { useMemo, useState } from 'react'
import { useGetTodo } from '../hooks/useGetTodos'

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
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [addTodo, { loading: adding }] = useMutation(ADD_TODO)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)
  const [isError, setIsError] = useState(false)
  const items = useMemo(() => data?.todos ?? [], [data])

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
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
      setIsError(false)
    } catch {
      console.log('error')
      setIsError(true)
    }
    setTitle('')
    setDesc('')
  }

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Add a todo"
        />
        <input
          value={desc}
          onChange={(event) => setDesc(event.target.value)}
          placeholder="desc"
        />
        <button type="submit" disabled={adding}>
          {adding ? 'Adding...' : 'Add'}
        </button>
        {isError ? 'error' : 'errorじゃない'}
      </form>

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
