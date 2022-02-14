import anecdoteServices from '../services/anecdote'

const reducer = (state = [], action) => {

  switch (action.type) {
    case "INIT":
      return action.data
    case "VOTE":
     
      return state.map((anecdote) => anecdote.id===action.data.id? {...anecdote, votes:anecdote.votes +1} : anecdote)
    case "NEW":

      return [...state, action.data];
  
    default:
      break;
  }

  return state
}

export const initialize =  () => {
    
    return async dispatch =>{ 
      const anecdotes = await anecdoteServices.getAll();
      dispatch({
          type: "INIT",
          data: anecdotes
      })
    }
}

export const getVote = (anecdote) => {

  return async dispatch => {

    const anecdoteToUpdate = {...anecdote, votes: anecdote.votes + 1}

    const updatedAnecdote = await anecdoteServices.update(anecdoteToUpdate)

    dispatch({
        type: "VOTE",
        data: updatedAnecdote
      }
    )
  }

}

export const getNewData = (note)=> {
  
 return async dispatch =>{
  const newAnecdote = await anecdoteServices.createAnecdote(note)

  dispatch({
      type: "NEW",
      data: newAnecdote
  })
}
}

export default reducer