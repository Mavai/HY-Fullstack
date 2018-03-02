import React from 'react'

const BlogForm = ({ state, handleInput, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
      Title:
          <input
            type="text"
            name="title"
            value={state.title}
            onChange={handleInput}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            name="author"
            value={state.author}
            onChange={handleInput}
          />
        </div>
        <div>
          Url:
          <input
            type="text"
            name="url"
            value={state.url}
            onChange={handleInput}
          />
        </div>
        <button type="submit">Lisää</button>
      </form>
    </div>
  )
}

export default BlogForm