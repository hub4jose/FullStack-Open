import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {

  const [visible,setVisible] = useState(false)


  const handleDisplay = { display : visible ? '' : 'none' }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }



  const incrementLikes = () => {

    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    updateLikes(blog.id, updatedBlog)

  }

  const deleteBlog = () => {
    window.confirm(`Delete ${blog.title} by ${blog.author}?`) && removeBlog(blog.id)
  }



  return (
    <>
      <div style={blogStyle} className='content'>

        <div className="blogTitle">
          <strong>{blog.title} </strong>
        by
          <strong> {blog.author}</strong>
        </div>

        {<button onClick={() => setVisible(!visible)}>{visible?'hide':'view'}</button>}
        <div style ={handleDisplay} className='display'>
          <div>{blog.url}</div>
          <div>Likes:{blog.likes}{<button onClick={incrementLikes} >like</button>}</div>
          <div>{blog.user.name}</div>
          {user.username===blog.user.username && <button onClick={deleteBlog}>remove</button>}
        </div>
      </div>
    </>
  )
}

export default Blog