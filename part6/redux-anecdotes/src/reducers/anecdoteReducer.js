import anecdoteService from './../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)


export const vote = (id) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      data: anecdote
    })
  }
}
export const createAnecdote = (data) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_ANECDOTE',
      data
    })
  }
}
export const setAnecdotes = (data) => {
  return {
    type: 'SET_ANECDOTES',
    data
  }
}
const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_ANECDOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(item => item.id === id)
      const changedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(item => item.id !== id ? item : changedAnecdote)
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    
    default: return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default reducer