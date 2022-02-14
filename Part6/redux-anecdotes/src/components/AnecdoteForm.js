import React from 'react';

import { connect } from 'react-redux'
import { getNewData} from '../reducers/anecdoteReducer';
import {showNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
   
    const addNew = (event) => {
        event.preventDefault();
        props.getNewData(event.target.newValue.value)
        props.showNotification('New Anecdote added!', 3)
           
      }
      
    return (<form onSubmit={addNew}>
    <div><input name='newValue' /></div>
    <button type="submit" >create</button>
    </form>)            
};

export default connect(null, {getNewData, showNotification})(AnecdoteForm);
