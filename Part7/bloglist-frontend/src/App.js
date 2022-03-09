/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import notificationReducers, {
  setMessage,
  setError,
} from './reducers/notificationReducers'
import { setBlogs, createBlogs } from './reducers/noteReducers'
import { setLoggedUser, removeLoggedUser } from './reducers/userLoggedReducers'
import { setUsers } from './reducers/userReducer'
import Indivisual from './components/Indivisual'

const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(setBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(setUsers())
  }, [dispatch])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      //const returnedBlog = await blogService.create(blogObject)

      dispatch(createBlogs(blogObject))

      let noteMessage = `a new blog ${blogObject.title} by ${blogObject.author} added!!`
      dispatch(setMessage(noteMessage))
    } catch (exception) {
      dispatch(setError('All information are required!!'))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

      dispatch(setLoggedUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setError('Wrong credentials'))
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => {
    return (
      <>
        <Togglable buttonLabel="Create" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <List dense>
                {blogs
                  .sort((min, max) => max.likes - min.likes)
                  .map((blog) => (
                    <ListItem key={blog.id}>
                      <Link to={`/blogs/${blog.id}`}>
                        <ListItemText primary={blog.title} />
                      </Link>
                    </ListItem>
                  ))}
              </List>
            </Grid>
          </Grid>
        </div>
      </>
    )
  }

  return (
    <Container maxWidth="xl">
      <div>
        <Router>
          {user && <Navigation />}
          <Notification />
          <Typography
            sx={{ mt: 4, mb: 2 }}
            variant="h6"
            component="div"
            color="primary"
          >
            Blogs
          </Typography>

          <Routes>
            <Route
              path="/"
              element={user === null ? loginForm() : blogForm()}
            />
          </Routes>

          <Routes>
            <Route path="/blogs/:blogId" element={<Blog />} />
          </Routes>

          <Routes>
            <Route path="/users/:id" element={<Indivisual />} />
          </Routes>
          <Routes>
            <Route path="/users" element={<Users />} />
          </Routes>
        </Router>
        <Footer />
      </div>
    </Container>
  )
}

export default App
