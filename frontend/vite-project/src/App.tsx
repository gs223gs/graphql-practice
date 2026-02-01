import { gql, useQuery } from '@apollo/client'
import './App.css'

const GET_HELLO = gql`
  query GetHello {
    hello
    time
  }
`

function App() {
  const { data, loading, error } = useQuery(GET_HELLO)

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h1>GraphQL Client</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load: {error.message}</p>}
      {data && (
        <div>
          <p>hello: {data.hello}</p>
          <p>time: {data.time}</p>
        </div>
      )}
    </div>
  )
}

export default App
