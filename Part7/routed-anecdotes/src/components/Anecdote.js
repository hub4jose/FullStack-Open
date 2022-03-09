import React from 'react'
import {useParams} from 'react-router-dom'

const Anecdote = ({anecdotes}) => {
     const id = useParams().id;
     const anecdote = anecdotes.find(anecdote=> Number(anecdote.id) === Number(id) )

     console.log(anecdotes)
  return (
    <div>
    <h2>{anecdote.content}</h2>
    <h3>{anecdote.author}</h3>
    <h4>Votes: {anecdote.votes}</h4>
    <h5>Link: {anecdote.info}</h5>
    
    </div>
  )
}

export default Anecdote