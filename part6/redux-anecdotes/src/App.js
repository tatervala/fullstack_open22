import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes, setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService, { getAll} from './services/anecdotes'
import AnecdoteList from './components/AnecdoteList'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import Filter from './components/Filter'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes()) 
  }, [dispatch]) 

  

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App