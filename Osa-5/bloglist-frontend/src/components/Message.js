import React from 'react'

const Message = ({ notification }) => {
  return (
    <div>
      {notification.error && <div className="error">{notification.message}</div>}
      {!notification.error && <div className="success">{notification.message}</div>}
    </div>
  )
}

export default Message