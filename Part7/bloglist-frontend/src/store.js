import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import notificationReducers from './reducers/notificationReducers'
import noteReducers from './reducers/noteReducers'
import userLoggedReducers from './reducers/userLoggedReducers'
import userReducer from './reducers/userReducer'

const getStore = () => {
  const reducers = combineReducers({
    notifications: notificationReducers,
    blogs: noteReducers,
    user: userLoggedReducers,
    users: userReducer,
  })
  const store = createStore(reducers, applyMiddleware(thunk))
  return store
}

export default getStore
