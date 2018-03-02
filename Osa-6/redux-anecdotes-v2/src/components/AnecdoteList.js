import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, resetNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

let timer = null

class AnecdoteList extends React.Component {
  render() {
    const startTimer = () =>
      timer = setTimeout(() => {
        this.props.resetNotification()
      }, 5000)
    const clearTimer = () => clearTimeout(timer)

    const vote = (id) => () => {
      const anecdote = this.props.anecdotes.anecdotes.find(anecdote => anecdote.id === id)
      this.props.voteAnecdote(anecdote.id)
      this.props.createNotification(`You voted ${anecdote.content}`)
      clearTimer()
      startTimer()
    }

    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote.id)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()))
}

const mapStateToProps = (state) => ({
  anecdotes: anecdotesToShow(state.anecdotes, state.filter)
})

const mapDispatchToProps = {
  voteAnecdote,
  createNotification,
  resetNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
