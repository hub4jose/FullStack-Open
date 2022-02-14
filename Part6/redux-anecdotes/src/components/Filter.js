import React from 'react';
import {setFilter} from '../reducers/filterReducer'
import { connect } from 'react-redux';

const Filter = (props) => {
  
  const handleChange = (event) => {  
      props.setFilter(event.target.value);
  }
  return (<div>Filter:<input onChange={handleChange}/></div>)
};

export default connect(null, {setFilter})(Filter);
