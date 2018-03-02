import React from 'react'

const LoginForm = ({ state, handleInput, handleSubmit }) => {
  return (
    <div>
      <h1>Login to application</h1>
      <form onSubmit={handleSubmit}>
        <div>
            Käyttäjätunnus:
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handleInput}
          />
        </div>
        <div>
            Salasana:
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleInput}
          />
        </div>
        <button type="submit">Kirjaudu</button>
      </form>
    </div>
  )
}

export default LoginForm