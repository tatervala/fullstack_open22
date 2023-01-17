import { gql, useQuery, useMutation } from '@apollo/client'
import { useState } from 'react'
import Select from 'react-select'
export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      bookCount
    }
  }
`
const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
  }
}
`
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  const [newName, setNewName] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  const submit = async (event) => {
    event.preventDefault()
    const name = newName.value
    editAuthor({variables: {name, born}})
    
  }
  if (!props.show) {
    return null
  }
  if ( result.loading ) {
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
  const selected = authors.map((author) => (
    { value: author.name, label: author.name }
  ))
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <Select options={selected} defaultValue={newName} onChange={setNewName}></Select>
        </div>
        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={ ({ target }) => setBorn(parseInt(target.value)) }
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
