import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image, Menu } from 'semantic-ui-react'

const Menubar = ({ anecdotes, handleSubmit }) => {
  const menuStyle = {
    backgroundColor: 'lightBlue',
    padding: 10
  }
  return (
    <Menu>
      <Menu.Item
        name='Anecdotes'
        as={NavLink} exact
        to='/'
        activeClassName='active'
      />
      <Menu.Item
        name='Create new'
        as={NavLink}
        exact to='/create'
        activeClassName='active' />
      <Menu.Item
        name='About'
        as={NavLink}
        exact
        to='/about'
        activeClassName='active' />
    </Menu>
  )
}

const Anecdote = ({ anecdote }) => (
  <div>
    <p>Has {anecdote.votes} votes.</p>
    <p>For more information see <a href={anecdote.info}>here</a></p>
  </div>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id} >
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid>
      <Grid.Column width={10}>
        <p>According to Wikipedia:</p>

        <em>An anecdote is a brief, revealing account of an individual person or an incident.
          Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
          such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column width={6}>
        <Image src='https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg' size='small' />
      </Grid.Column>
    </Grid>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )

  }
}

const Notification = ({ content }) => {
  const notificationStyle = {
    margin: 25,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'green',
    padding: 10,
    color: 'green',
    fontSize: 20
  }
  return (
    <p style={notificationStyle}>{content}</p>
  )
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
    this.timer = null
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote), notification: `A new anecdote ${anecdote.content} created!` })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ notification: '' })
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menubar anecdotes={this.state.anecdotes} handleSubmit={this.addNew} />
            {this.state.notification && <Notification content={this.state.notification} />}
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />} />
            <Route path='/about' render={() => <About />} />
            <Route exact path='/create' render={({ history }) => <CreateNew history={history} addNew={this.addNew} />} />
            <Route exact path='/anecdotes/:id' render={({ match }) => <Anecdote anecdote={this.state.anecdotes.find(anecdote => anecdote.id === match.params.id)} />} />
          </div>
        </Router>
        <Footer />
      </Container>
    );
  }
}

export default App;
