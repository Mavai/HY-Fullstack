import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const Statistiikka = ({ klik }) => {
  const palautteita = store.getState()
  const precisionRound = (num, precision) => Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision)
  const wellness = palautteita.good - palautteita.bad
  const totalCount = palautteita.good + palautteita.bad + palautteita.ok
  const avg = precisionRound(wellness / totalCount, 1)
  const positivity = precisionRound(palautteita.good / totalCount * 100, 1)

  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteita.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteita.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteita.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{avg || 0}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positivity || 0} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={klik('ZERO')}>nollaa tilasto</button>
    </div >
  )
}

const store = createStore(counterReducer)

class App extends React.Component {
  
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }
  
  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka klik={this.klik}/>
      </div>
    )
  }
}

const renderApp = () => {
  console.log(store.getState())
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)