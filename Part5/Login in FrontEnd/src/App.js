/* eslint-disable indent */
import React, { useState, useEffect, useRef } from 'react'
import  loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Footer from './components/Footer'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

 // const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError,setIsError]= useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async(blogObject) => {

    try{
      blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)

        setBlogs(blogs.concat(returnedBlog))

        let noteMessage = `a new blog ${blogObject.title} by ${blogObject.author} added!!`
        setErrorMessage(noteMessage )

        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)

    }catch(exception){
      setErrorMessage('All information are required!!' )
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }


  const updateLikes = async(blogId, updatedBlog) => {

      await blogService.update(blogId, updatedBlog)

      setBlogs(blogs.map((blog) => (blog.id===updatedBlog.id?updatedBlog:blog)))

  }


  const removeBlog = async(blogId) => {

    try {
      await blogService.remove(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
    } catch (error) {
      setErrorMessage(error.message)
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }

  }


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setIsError(true)
      setTimeout(() => {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()

    try {

      window.localStorage.removeItem(
        'loggedBlogUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(null)

    } catch (exception) {
      setErrorMessage('Cannot Log Out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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


  const blogForm = () => (

    <Togglable buttonLabel="Create" ref={blogFormRef}>
          <BlogForm   addBlog={addBlog} />
    </Togglable>
  )

  return (

    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} isError={isError} />


      {user === null ?
      loginForm() :
      <div>
        <p>{user.name} logged-in <button onClick={handleLogOut}>log-out</button></p>
        {blogForm()}


      <ul>
        {blogs.sort((min,max) => max.likes - min.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              updateLikes = {updateLikes}
              removeBlog = {removeBlog}
              user = {user}
            />
        )}
      </ul>
      </div>
      }

      <Footer />
    </div>
  )
}

export default App