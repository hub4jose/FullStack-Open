import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../reducers/notificationReducers'
import { setLoggedUser, removeLoggedUser } from '../reducers/userLoggedReducers'
import { Button, Typography, Grid } from '@material-ui/core'

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const handleLogOut = async (event) => {
    event.preventDefault()

    try {
      window.localStorage.removeItem('loggedBlogUser', JSON.stringify(user))

      dispatch(removeLoggedUser(user))
    } catch (exception) {
      dispatch(setError('Cannot Log Out'))
    }
  }
  return (
    <div className="navContainer">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="body2">
            <NavLink className={'navLink'} to="/">
              Blogs
            </NavLink>
            <NavLink className={'navLink'} to="/users">
              Users
            </NavLink>
          </Typography>
        </Grid>
        <Grid item xs={5}></Grid>

        <Grid item xs={3}>
          <Typography variant="body2">
            {' '}
            {user.name} logged-in{'  '}
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleLogOut}
            >
              log-out
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default Navigation
