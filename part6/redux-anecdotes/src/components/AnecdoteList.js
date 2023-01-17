import { useSelector, useDispatch } from 'react-redux'
import {vote} from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => 
      state.anecdotes.filter((anecdote) => 
        anecdote.content
          .toLowerCase()
          .includes(state.filter.toLowerCase())
      )
    )
    const sortAnecdotes = (anecdotes) => {
        return anecdotes.sort((a,b) => b.votes- a.votes)
    }
    
  return (
    <div>
    {sortAnecdotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id),dispatch(setNotification(`You voted '${anecdote.content}'`)))}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}
export default AnecdoteList