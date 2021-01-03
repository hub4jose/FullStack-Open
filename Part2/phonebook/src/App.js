import React, { useState,useEffect} from 'react'
import Persons from './component/Persons'
import Filter from './component/Filter'
import PersonForm from './component/PersonForm'
//import axios from 'axios'
import personService from './services/person'
import Notification from './component/Notification'
 

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [ newFilter, setNewFilter] = useState('')
  const [showChange, setShowChange] = useState(false)
  const [errorMessage,setErrorMessage] = useState(null)
  const [isError,setIsError] = useState(false)

  const personsToShow = showAll
  ? persons
  : persons.filter(person => person.name.toLowerCase().indexOf(newFilter.toLowerCase()) !== -1)

//get input name and assign to newName 
const GetFilter = (event) =>{
  setNewFilter(event.target.value)
    if(event.target.value !== '') {
      setShowAll(false)}
    else {
      setShowAll(true)}
}
  //get input name and assign to newName 
  const GetName = (event) =>{
      console.log(event.target.value);
      setNewName(event.target.value);
  }
//get input number and assign to newNumber
const GetNumber = (event) =>{
  console.log(event.target.value);
  setNewNumber(event.target.value);
}

    
//Add names to persons array
  const AddName =(event) => {
  
   event.preventDefault();
//new person
  const personObject ={
    name: newName,
    number: newNumber
    //id: persons[persons.length-1].id +1 
  }
    // flag to create or update the list
    let flag = true
  //Check if the person already exists
        persons.forEach(pn =>{
          if (pn.name.toLowerCase() === newName.toLowerCase() ) {
            //Alert for Update 
            let result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
           if (result) { // Update

            personService
            .update(pn.id,personObject)
            .then(()=>{setShowChange(!showChange)})
            .then(()=>{
              setErrorMessage(`Number Updated for ${newName}`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
              .catch(error=>{
                setShowChange(!showChange)
                setIsError(true)
                setErrorMessage(`${pn.name} was already deleted from the server`)
                setTimeout(() => {
                  setIsError(false)
                  setErrorMessage(null)
                }, 5000)
              })
     

           }

           else{ // do not Update
            setNewName('')
            setNewNumber('')
            
            return
           }
           flag = false
          }
        }
        ) 
 //Create Person if not already in the list   
 if (flag){ 
    personService
    .create(personObject)
    .then(returnedPerson =>{

          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNewFilter('')
        })
        .then(()=>{
          setErrorMessage(`Added ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
     }
     
  }
 

 const deletePerson = (event) => {
  let result = window.confirm(`Delete ${event.target.name} ?`)
  if(result){
    personService
    .remove(event.target.id)
    .then(()=>{setShowChange(!showChange)})
    .then(()=>{
      setErrorMessage(`Deleted ${event.target.name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
    .catch(error=>{
      setIsError(true)
      setErrorMessage(`${event.target.name} was already deleted from the server`)
      setShowChange(!showChange)
      setTimeout(() => {
        setIsError(false)
        setErrorMessage(null)
      }, 5000)
    })
  } 
 }

//Get all the contact list
 useEffect(() =>{
console.log("GetAll")
   personService
   .getAll()
   .then(initialPerson =>{
     setPersons(initialPerson)
   })

  },[showChange])


  
 

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} isError={isError}/>
          <Filter GetFilter = {GetFilter}/>
      <h2>Add New</h2>

      <PersonForm GetName={GetName} GetNumber={GetNumber} newName={newName} newNumber={newNumber} AddName={AddName}/>

      <h2>Numbers</h2>
     
        <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
  
    </div>
  )
}

export default App
