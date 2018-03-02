import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Message from './components/Message'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      notification: null,
    }
  }

  notificationTimer = () => setTimeout(() => {
    this.setState({ notification: null })
  }, 5000)

  componentDidMount = async () => {
    const blogs = await blogService.getAll()
    const sortedBlogs = blogs.sort( (a, b) => b.likes - a.likes )
    this.setState({ blogs: sortedBlogs })
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleInputFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user, notification: { message: 'Kirjautuminen onnistui', error: false } })

      clearTimeout(this.timer)
      this.timer = this.notificationTimer()

    } catch(exception) {
      this.setState({ notification: { message: 'Käyttäjätunnus tai salasana virheellinen', error: true } })

      clearTimeout(this.timer)
      this.timer = this.notificationTimer()
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null, notification: { message: 'Ulos kirjautuminen onnistui', error: false } })

    clearTimeout(this.timer)
    this.timer = this.notificationTimer()
  }

  addBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }

      const createdBlog = await blogService.create(blogObject)
      this.setState({
        title: '',
        author: '',
        url:'',
        blogs: this.state.blogs.concat(createdBlog),
        notification: { message: `A new blog ${createdBlog.title} by ${createdBlog.author} added`, error: false }
      })

      clearTimeout(this.notificationTimer)
      this.timer = this.notificationTimer()

    } catch(exception) {
      console.log(exception)
      this.setState({ notification: { message: 'Title and url must be provided', error: true } })

      clearTimeout(this.timer)
      this.timer = this.notificationTimer()
    }
  }

  likeBlog = (blog) => async () => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user._id : null
    })
    const blogs = this.state.blogs.filter(blog => blog.id !== updatedBlog.id).concat(updatedBlog)
    this.setState({ blogs: blogs.sort( (a, b) => b.likes - a.likes ) })
  }

  deleteBlog = (blogToBeDeleted) => async () => {
    if (window.confirm(`delete ${blogToBeDeleted.title} by ${blogToBeDeleted.author}`)) {
      await blogService.remove(blogToBeDeleted)
      this.setState({ blogs: this.state.blogs.filter(blog => blog.id !== blogToBeDeleted.id) })
    }
  }

  render() {
    const blogs = () => {
      return (
        <div>
          <h2>blogs</h2>
          <p>
            <b>{this.state.user.username}</b> logged in
            <button onClick={this.logout}>Logout</button>
          </p>
          <Togglable buttonLabel = 'Add blog'>
            <BlogForm state={this.state} handleInput={this.handleInputFieldChange} handleSubmit={this.addBlog}/>
          </Togglable>
          {this.state.blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={this.state.user} handleLike={this.likeBlog(blog)} handleDelete={this.deleteBlog(blog)}/>
          )}
        </div>
      )
    }

    return (
      <div>
        {this.state.notification && <Message notification={this.state.notification} />}
        {this.state.user ?
          blogs() :
          <LoginForm state={this.state} handleInput={this.handleInputFieldChange} handleSubmit={this.login}/>
        }
      </div>
    )
  }
}

export default App
