import React from 'react'
import ReactDOM from 'react-dom'


import { Provider } from 'react-redux'
import App from './App'
import getStore from './store'

const store = getStore();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)