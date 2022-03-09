import React from 'react'

import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Indivisual = () => {
  const { id } = useParams()
  const users = useSelector((state) => state.users)
  const user = users.find((user) => user.id === id)
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <div>added blogs</div>
      <ul>
        {user.blogs.map((blog) => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default Indivisual
