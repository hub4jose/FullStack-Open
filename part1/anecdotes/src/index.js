import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = ({handleClick,text}) => {

    return (
        <button onClick={handleClick}>{text}</button>
    )

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState([0,0,0,0,0,0])
  const [maxVote, setMax] = useState(0)

const nextAnecdote = () =>{
  setSelected(Math.floor((Math.random() * 5)))
}


const addVote = () =>{

    const newVote = [...voted]

    newVote[selected] += 1   
    
    setMax(newVote.indexOf(Math.max(...newVote)))

    setVoted(newVote)

}


  return (
    <div>
      <h2>Anecdote of the day!!</h2>
      {props.anecdotes[selected]}
      <br/>
      has {voted[selected]} votes
      <br/>
      <Button handleClick={() =>addVote()} text="Vote"/>
      <Button handleClick={() =>nextAnecdote()} text="Next anecdote" />
      <br/>
      <h2>Anecdote with most vote!!</h2>
      {props.anecdotes[maxVote]}
    </div>
  )
}


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)