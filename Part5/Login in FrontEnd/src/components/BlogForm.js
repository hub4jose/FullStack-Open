/* eslint-disable linebreak-style */
import React , { useState } from 'react'

const BlogForm = ({ addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')

  }
  return  (
    <div className='formDiv'>
      <h1> Create New </h1>
      <form onSubmit={createBlog}>

        <div>
            title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className='inputTitle'
          />
        </div>

        <div>
            author
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className='inputAuthor'
          />
        </div>

        <div>
            url
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className='inputUrl'
          />
        </div>

        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
