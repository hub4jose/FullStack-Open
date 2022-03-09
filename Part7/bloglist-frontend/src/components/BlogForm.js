/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: title,
      author: author,
      url: url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div className="formDiv">
      <h1> Create New </h1>
      <form onSubmit={createBlog}>
        <div>
          <TextField
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="inputTitle"
            variant="outlined"
            label="Title"
            size="small"
          />
        </div>

        <div>
          <TextField
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className="inputAuthor"
            variant="outlined"
            label="Author"
            size="small"
          />
        </div>

        <div>
          <TextField
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="inputUrl"
            variant="outlined"
            label="Url"
            size="small"
          />
        </div>

        <Button type="submit" variant="outlined" color="primary" size="small">
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
