import React, {useEffect} from 'react'

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initialize } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';





const App = () => {

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(initialize());
  },[dispatch])

  return (
    <div>
      <Notification />
      <Filter />
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App