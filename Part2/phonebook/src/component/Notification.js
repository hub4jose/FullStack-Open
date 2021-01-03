import React from 'react'

const Notification = ({ message, isError }) => {
    if (message === null) {
      return null
    }
   let messageType = (isError)?"error":"success"
   
    return (
      <div className={messageType}>
        {message}
      </div>
    )
  }

  export default Notification