const initialState = 'Initial notification'
let timer = null

const startTimer = (dispatch, length) =>
  timer = setTimeout(() => {
    dispatch({
      type: 'RESET_NOTIFICATION',
    })
  }, length * 1000)

const clearTimer = () => clearTimeout(timer)

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_NOTIFICATION':
      return action.content
    case 'RESET_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const createNotification = (content, length) => {
  return (dispatch) => {
    clearTimer()
    dispatch({
      type: 'CREATE_NOTIFICATION',
      content
    })
    startTimer(dispatch, length)
  }
}

export default notificationReducer