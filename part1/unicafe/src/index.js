import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistic = (props) => {
  if(props.text ==="positive"){

    return (
      <div>
        <table>
         <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}%</td>
        </tr>
        </tbody>
        </table>
      </div>
        )

  }
    return (
      <div>
       
        <table>
         <tbody>
        <tr>
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr>
        </tbody>
        </table>
     
      </div>
    )
}



const Statistics = ({good,neutral,bad}) =>{

  if(good+neutral+bad === 0){
    return (
      <div>
        No feedback given
      </div>
    )

  }
    return (
      <div>

        <Statistic text="good" value ={good} />
        <Statistic text="neutral" value ={neutral} />
        <Statistic text="bad" value ={bad} />
        <Statistic text="all" value ={good + neutral + bad} />
        <Statistic text="average" value = {(good*1 + neutral*0 + bad*-1)/(good + neutral + bad)}/>
        <Statistic text="positive" value ={(good/(good + neutral + bad))*100 }/>

    </div>
    )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  //const [rating, setRating] = useState([])

  const Good = () => {
   
  setGood(good + 1)

  }

  const Neutral = () => {

    setNeutral(neutral + 1)
  }

  const Bad = () => {
    setBad(bad + 1)
    
  }

  return (
    <div>
      <h1>give feedback</h1>

      <Button onClick ={Good} text = "good" />
      <Button onClick ={Neutral} text = "neutral" />
      <Button onClick ={Bad} text ="bad" />

      <h1>statistics</h1>

      <Statistics good ={good} neutral = {neutral} bad = {bad}/>

     
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
