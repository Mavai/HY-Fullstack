import React from 'react'
import PropTypes from 'prop-types'

const actionFor = {

  new(anecdote) {
    return {
      type: 'NEW',
      data: anecdote
    }
  },
  vote(id) {
    return {
      type: 'VOTE',
      data: { id }
    }
  }
}

class App extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = {
      content: event.target.content.value,
      votes: 0
    }
    this.context.store.dispatch(actionFor.new(anecdote))
  }

  render() {
    const anecdotes = this.context.store.getState()

    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.context.store.dispatch(actionFor.vote(anecdote.id))}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name='content' type='text'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

App.contextTypes = {
  store: PropTypes.object
}

export default App