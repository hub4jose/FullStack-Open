import React from 'react'


const Countries = (props)=>{
//for Show button Click

  const Show =(name)=>{

    document.getElementById('country').value = name
    props.setNewFilter(name)
 
  }


 
  if(props.noOfCountries>10){
      return(<div>Too many matches, specify another filter</div>)
    }  

  else if (props.noOfCountries===1){
  
     return ( 
      <div>
      {props.countriesToShow.map(p=>
        <div key ={p.alpha2Code}>
            <h2>{p.name}</h2>
            <p>{p.capital}</p>
            <p>population {p.population}</p>
            <h3>languages</h3>
            {p.languages.map(lan=><li key={lan.name}>{lan.name}</li>)}
            <br/>
            <img src={p.flag} width='100' height='100' alt='Country flag unavailable'></img>
            
            {props.setCapitalCity(p.capital)}
       </div>
       )}
     
      </div>
     )
  }
  else {
      return(
        <div>
        {props.countriesToShow.map(p=>
              <div key= {p.alpha2Code}> {p.name} <button onClick ={()=>Show(p.name)}>Show</button> </div>
              
                )}
        </div>
      )
  }



};

export default Countries