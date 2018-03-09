import anecdoteService from '../services/anecdotes'

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  if (action.type === 'VOTE_ANECDOTE') {
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

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE_ANECDOTE',
      anecdote
    })
  }
}

export const voteAnecdote = (votedAnecdote) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.update({ ...votedAnecdote, votes: votedAnecdote.votes + 1 })
    dispatch({
      type: 'VOTE_ANECDOTE',
      anecdote
    })
  }
}

export default anecdoteReducer