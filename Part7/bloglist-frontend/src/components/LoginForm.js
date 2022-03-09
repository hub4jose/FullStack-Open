/* eslint-disable linebreak-style */
import React from 'react'

import PropTypes from 'prop-types'

import { Typography, Button, TextField } from '@material-ui/core'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <Typography variant="h4" color="primary">
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            id="userName"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            variant="outlined"
            label="Username"
            size="small"
          />
        </div>
        <div>
          <TextField
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            variant="outlined"
            label="Password"
            size="small"
          />
        </div>
        <Button
          id="login"
          type="submit"
          color="primary"
          size="small"
          variant="outlined"
        >
          login
        </Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm
