import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    console.log(content)
   props.createAnecdote(newAnecdote)
    props.setNotification(`You added '${content}'`)
    setTimeout(() => {
      props.removeNotification()
    }, 5000)
    
  }

  return <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">add</button>
    </form>
  </>
}
const mapDispatchToProps = {
  createAnecdote,
  setNotification,
  removeNotification
}
export default connect(null, mapDispatchToProps)(NewAnecdote)