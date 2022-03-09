import React from 'react'

import { useSelector } from 'react-redux'

const Notification = () => {
  const msgState = useSelector((state) => state)
  if (Object.values(msgState).length === 0) {
    return null
  }

  return (
    <div className={msgState.message === null ? null : msgState.type}>
      {msgState.message}
    </div>
  )
}

export default Notification
