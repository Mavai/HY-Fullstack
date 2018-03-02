const initialState = ''

const filterRefucer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.content
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const updateFilter = (content) => ({
  type: 'UPDATE',
  content
})

export const resetFilter = () => ({
  type: 'RESET'
})

export default filterRefucer