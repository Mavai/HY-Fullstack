const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  if (action.type==='VOTE_ANECDOTE') {
    const old = state.filter(a => a.id !== action.anecdote.id)
    return [...old, action.anecdote]
  }
  if (action.type === 'CREATE_ANECDOTE') {
    return [...state, action.anecdote]
  }
  if (action.type === 'INIT_ANECDOTES') {
    return action.anecdotes
  }
  return state
}

export const initAnecdotes = (anecdotes) => ({
  type: 'INIT_ANECDOTES',
  anecdotes
})

export const newAnecdote = (anecdote) => ({
    type: 'CREATE_ANECDOTE',
    anecdote
  })

export const voteAnecdote = (anecdote) => ({
  type: 'VOTE_ANECDOTE',
  anecdote
})

export default anecdoteReducer