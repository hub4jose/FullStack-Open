import React from 'react'

const Filter =(props) => {
    return (

        <div> find countries <input  id="country" onChange ={props.GetFilter}/></div>  

    )


};

export default Filter;