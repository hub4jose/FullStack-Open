import React from 'react'
import blogService from '../services/blogs'

const userLoggedReducers = (state = null, action) => {
  switch (action.type) {
    case 'SETLOGGEDUSER':
      return action.data

    case 'REMOVELOGGEDUSER':
      return action.data

    default:
      return state
  }
}

export const setLoggedUser = (user) => {
  return async (dispatch) => {
    blogService.setToken(user.token)
    dispatch({
      type: 'SETLOGGEDUSER',
      data: user,
    })
  }
}

export const removeLoggedUser = () => {
  return async (dispatch) => {
    dispatch({
      type: 'REMOVELOGGEDUSER',
      data: null,
    })
  }
}

export default userLoggedReducers
