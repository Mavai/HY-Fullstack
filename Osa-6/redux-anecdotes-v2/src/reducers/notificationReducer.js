const initialState = 'Initial notification'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.content
    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const createNotification = (content) => ({
  type: 'CREATE_NOTIFICATION',
  content
})

export const resetNotification = () => ({
  type: 'RESET_NOTIFICATION',
})

export default notificationReducer