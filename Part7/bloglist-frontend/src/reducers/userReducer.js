import React from 'react'
import userService from '../services/users'

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'SETUSERS':
      return action.data.users

    default:
      return state
  }
}

export const setUsers = () => async (dispatch) => {
  const users = await userService.getUsers()
  console.log(users)
  dispatch({
    type: 'SETUSERS',
    data: { users },
  })
}

export default userReducer
