import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Paper,
  Button,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import notificationReducers, {
  setMessage,
  setError,
} from '../reducers/notificationReducers'
import {
  removeBlogs,
  updateBlogs,
  updateComment,
} from '../reducers/noteReducers'

const Blog = () => {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { blogId } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  )
  const user = useSelector((state) => state.user)

  const handleDisplay = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 0,
    marginBottom: 5,
  }

  const incrementLikes = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateBlogs(blog.id, updatedBlog))
    } catch (error) {
      dispatch(setError(error.message))
    }
  }

  const addComments = (e) => {
    e.preventDefault()

    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(e.target.comment.value),
    }

    dispatch(updateComment(blog.id, updatedBlog))

    e.target.comment.value = ''
  }

  const deleteBlog = () => {
    const result = window.confirm(`Delete ${blog.title} by ${blog.author}?`)
    if (result) {
      try {
        dispatch(removeBlogs(blog.id))
        navigate('/')
      } catch (error) {
        dispatch(setError(error.message))
      }
    }
  }

  return (
    <Paper elevation={3}>
      <>
        <div style={blogStyle} className="content">
          <div className="blogTitle">
            <Typography variant="h5" color="textPrimary">
              <span style={{ marginRight: 5 }}>{blog.title}</span>
              by
              <span style={{ marginLeft: 5 }}>{blog.author}</span>
            </Typography>
          </div>

          <FormControlLabel
            value="start"
            control={
              <Switch
                checked={visible}
                onChange={() => setVisible(!visible)}
                inputProps={{ 'aria-label': 'controlled' }}
                color="primary"
              />
            }
            label={visible ? 'Hide' : 'Show'}
            labelPlacement="start"
          />

          <Typography variant="h6" color="primary">
            <div style={handleDisplay} className="display">
              <div>Link: {blog.url}</div>
              <div>
                Likes:{blog.likes}
                {
                  <Button
                    onClick={incrementLikes}
                    color="primary"
                    startIcon={<ThumbUpIcon />}
                  ></Button>
                }
              </div>
              <div>Entered By: {blog.user.name}</div>

              {user.username === blog.user.username && (
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={deleteBlog}
                  startIcon={<DeleteIcon />}
                >
                  remove
                </Button>
              )}
            </div>
            <div>
              <form onSubmit={addComments}>
                <TextField
                  type="text"
                  name="comment"
                  label="*Required"
                  variant="outlined"
                  size="small"
                />

                <Button
                  type="submit"
                  color="primary"
                  size="small"
                  variant="contained"
                >
                  Add Comment
                </Button>
              </form>
            </div>
            <div>
              <p>Comments:</p>
              {blog.comments.length > 0 &&
                blog.comments.map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
            </div>
          </Typography>
        </div>
      </>
    </Paper>
  )
}

export default Blog
