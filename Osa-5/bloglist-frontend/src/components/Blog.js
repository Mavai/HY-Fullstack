import React from 'react'
import PropTypes from 'prop-types'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const blogInfoStyle = {
  paddingLeft: 5,
}

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility} className="title">
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style = {{ ...showWhenVisible, ...blogInfoStyle }} className="content">
          Url: <a href={this.props.blog.url}>{this.props.blog.url}</a> <br/>
          Likes: {this.props.blog.likes}
          <button onClick={this.props.handleLike}>Like</button> <br/>
          Added by {this.props.blog.user.username} <br/>
          {this.props.user.username === this.props.blog.user.username && <button onClick={this.props.handleDelete}>Delete</button>}
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog