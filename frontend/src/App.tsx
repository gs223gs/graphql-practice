import { gql, useMutation, useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
      createdAt
    }
  }
`

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
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
  const { data, loading, error } = useQuery(GET_TODOS)
  const [title, setTitle] = useState('')
  const [addTodo, { loading: adding }] = useMutation(ADD_TODO)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [deleteTodo] = useMutation(DELETE_TODO)

  const items = useMemo(() => data?.todos ?? [], [data])

  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    await addTodo({
      variables: { title: trimmed },
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
    setTitle('')
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
        <button type="submit" disabled={adding}>
          {adding ? 'Adding...' : 'Add'}
        </button>
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
            {todo.title}
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
