import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';



const getStore = () => {

    const reducer = combineReducers({
            anecdote: anecdoteReducer, 
            notification: notificationReducer,
            filter: filterReducer
      })
        
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

  return store
};


export default getStore;
