import React from 'react'


const PersonForm = (Props) => {

return (

<form>
          <div> name: <input value ={Props.newName} onChange ={Props.GetName}/></div>  

          <div> number: <input value ={Props.newNumber} onChange ={Props.GetNumber}/></div>
          
          <div><button onClick={Props.AddName}>add</button></div>
</form>

)

}

export default PersonForm