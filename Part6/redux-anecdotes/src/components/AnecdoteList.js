import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {getVote} from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdote, filter}) => {
        if (filter==="") {
            return anecdote
        } else {
           return anecdote.filter(anecdote=>anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        }

    });
    
    const dispatch = useDispatch();
 
    const vote = (anecdote) => {
        dispatch(getVote(anecdote))
        dispatch(showNotification(`You voted for ${anecdote.content}`, 3))
    }
  
    return (
    <>

        {anecdotes.sort((min,max)=> max.votes-min.votes).map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
            </div>
        </div>
        )}
        
    </>
    )
  
};

export default AnecdoteList;
