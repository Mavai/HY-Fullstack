const initialState = 'Initial notification'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW':
      return action.content
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export const createNotification = (content) => ({
  type: 'NEW',
  content
})

export const resetNotification = () => ({
  type: 'RESET',
})

export default notificationReducer