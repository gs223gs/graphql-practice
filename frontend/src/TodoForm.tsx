import { useState } from 'react'
import { useAddTodo } from '../hooks/useAddTodo'

export const TodoForm = () => {
  const { handleAdd, loading } = useAddTodo()
  const [desc, setDesc] = useState('')
  const [title, setTitle] = useState('')
  const [isError, setIsError] = useState(false)

  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const res = await handleAdd(title, desc)
    if (!res) return setIsError(false)
    setTitle('')
    setDesc('')
  }

  return (
    <form onSubmit={formAction}>
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
      <button type="submit" disabled={loading.loading}>
        {loading.loading ? 'Adding...' : 'Add'}
      </button>
      {isError ? 'error' : 'errorじゃない'}
    </form>
  )
}