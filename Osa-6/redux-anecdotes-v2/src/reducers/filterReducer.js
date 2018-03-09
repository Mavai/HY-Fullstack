const initialState = ''

const filterRefucer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_FILTER':
      return action.content
    case 'RESET_FILTER':
      return initialState
    default:
      return state
  }
}

export const updateFilter = (content) => ({
  type: 'UPDATE_FILTER',
  content
})

export const resetFilter = () => ({
  type: 'RESET_FILTER'
})

export default filterRefucer