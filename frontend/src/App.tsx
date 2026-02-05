import { gql, useMutation } from '@apollo/client'
import { useMemo, useState } from 'react'
import { useGetTodo } from '../hooks/useGetTodos'
import { TodoForm } from './TodoForm'
import { useDeleteTodoMutation, useToggleTodoMutation } from '../__generated__/types'





type Todo = {
  id: string
  title: string
  completed: boolean
  description?: string
  createdAt: string
  updateAt: string
}

const TodoItem = (todo: Todo) => {
  const [toggleTodo] = useToggleTodoMutation();
  const [deleteTodo, { loading, error }] = useDeleteTodoMutation();
  return (
    <div >
      {todo.completed ? 'true' : 'false'}
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() =>
            toggleTodo({
              variables: { id: todo.id, completed: !todo.completed },
              optimisticResponse: { toggleTodo: { ...todo, completed: !todo.completed } },
            })
          }
        />
        {todo.title ? todo.title : 'titleなし'}
        {todo.description ? todo.description : '詳細なし'}
      </label>
      {error && <p>error</p>}
      <button
        type="button"
        disabled={loading}
        // クリック時に deleteTodo ミューテーションを実行して、この Todo を削除する
        onClick={() =>
          deleteTodo({
            // 削除対象の Todo の id をミューテーションの変数として渡す
            variables: { id: todo.id },
            // サーバーからレスポンスが返ってきたあとに、Apollo Client のキャッシュを手動で更新する
            update(cache) {
              cache.modify({
                fields: {
                  // キャッシュ上の todos フィールドを書き換える
                  todos(existing = [], { readField }) {
                    // existing: キャッシュ上の Todo 一覧
                    // readField('id', ref) でキャッシュ内の各 Todo の id を読み取り、
                    // 今削除した Todo の id と一致しないものだけを残した新しい配列を返す
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
  )
}
const TodoApp = () => {
  const { data, loading, error } = useGetTodo()
  const items = useMemo(() => data?.todos ?? [], [data])

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load: {error.message}</p>}
      {items.length === 0 && !loading && <p>No todos yet.</p>}
      {items.map((t: Todo) => {
        return (
          <div key={t.id}>
            <TodoItem {...t} />
          </div>)
      })}
    </div>
  )
}
function App() {
  const [isCacheTest, setIsCacheTest] = useState(false)

  return (
    <div>
      <h1>Todo</h1>
      <TodoForm />
      <button
        onClick={() => setIsCacheTest(prev => !prev)}
      >{isCacheTest ? <p>unmount</p> : <p>mount</p>}</button>
      {!isCacheTest && <TodoApp />}
    </div>
  )
}

export default App
