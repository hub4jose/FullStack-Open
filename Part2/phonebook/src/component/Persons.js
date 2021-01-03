import React from 'react'

const Persons = (props) => {
console.log(props.personsToShow)
    return (
    <div>
        { props.personsToShow.map(p =>
          
            <p key = {p.name}>
                {p.name} {p.number}
            <button id= {p.id} name={p.name} onClick={props.deletePerson}>Delete</button>
            </p>
 
            )
         }    

    </div>


    )


}

export default Persons 