import React from 'react'
import { updateFilter, resetFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

class AnecdoteFilter extends React.Component {

  handleFilter = (event) => {
    this.props.updateFilter(event.target.value)
  }

  render() {
    const style = {
      marginTop: 20
    }
    return (
      <div style={style}>
        <span>filter</span>
        <input name='filter' onChange={this.handleFilter}/>
      </div>
    )
  }
}

const mapDispatchToProps = {
  updateFilter,
  resetFilter
}

const ConnectedAnecdoteFilter = connect(
  null,
  mapDispatchToProps
)(AnecdoteFilter)

export default ConnectedAnecdoteFilter