import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'

const App = () => {

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])


  const [notification, setNotification] = useState(null)

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    // setNotification(anecdote)
    // setTimeout(() => {
    //   setNotification("")
    // }, 5000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>

      <div>
        <h1>Software anecdotes</h1>

        <Menu />
        {/* {notification && <Notification notification ={notification} />} */}
        <Routes>
          <Route path="/anecdotes/:id" element = {<Anecdote anecdotes={anecdotes}/>}/>
          <Route path="/" element ={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/About" element ={<About />}/>

          <Route path="/Create" element= {<CreateNew addNew={addNew}/>} />

        </Routes>

        <Footer />
      </div>

    </Router>
  )
}

export default App
