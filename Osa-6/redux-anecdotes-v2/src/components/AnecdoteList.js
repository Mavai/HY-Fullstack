import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, resetNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

class AnecdoteList extends React.Component {
  render() {
    const vote = (id) => async () => {
      const anecdote = this.props.anecdotes.find(anecdote => anecdote.id === id)
      this.props.voteAnecdote(anecdote)
      this.props.createNotification(`You voted ${anecdote.content}`, 5)
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
  createNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
