
require('dotenv').config()
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const Person =require('./models/person')

const app = express()

app.use(express.static('build'))

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

morgan.token('PostMessage', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :PostMessage'))

// let persons = [ {
//                 id: 1,
//                 name: "Arto Hellas",
//                 number: "123-54321"
//                 },
//                 {
//                 id: 2,
//                 name: "Ada Lovelace",
//                 number: "39-44-54321"
//                 },
//                 {
//                 id: 3,
//                 name: "Dan Abramov",
//                 number: "12-43-54321"
//                 },
//                 {
//                 id: 4,
//                 name: "Mary Poppendick",
//                 number: "23-39-54321"

//                 }]
//     const len = persons.length 
//     const date = new Date()   

    //GET Requests            
    app.get('/',(request,response) =>{
        response.send(`<h1> home Page</h1>`)
    })    

    app.get('/api/persons',(request,response) =>{
       // response.json(persons)
       Person.find({}).then(persons => {
            response.json(persons)
       })
    })  

    //Get by ID requests
    app.get('/api/persons/:id',(request,response, next) =>{
        //const id = Number(request.params.id)
        // const person = persons.find(person=>person.id === id)
        // if(person){
        // response.json(person)
        // }
        // else{
        //   response.status(404).end()  
        // }
        Person.findById(request.params.id)
        .then(person=>{
          if(person){
          response.json(person)
          }else{
            response.status(404).end()
          }
        })
        .catch(error=>
          next(error)
          // console.log(error)
          // response.status(400).send({error: 'malformatted id'})
        )
    })

    // app.get('/info',(request,response) =>{
    //     response.send(`<h2>Phonebook has info for ${len} people</h2><h2>${date}</h2>`)
    // }) 

    //DELETE Requests
    app.delete('/api/persons/:id',(request,response, next) =>{
        // const id = Number(request.params.id)
        //  persons = persons.filter(person=>person.id !== id)
        
        //   response.status(204).end()  

        Person.findByIdAndRemove(request.params.id)
        .then(result => {
          response.status(204).end()
        })
        .catch(error=>next(error))
    })

    // const generateId = () => {
    //     const maxId = persons.length > 0 ? Math.max(...persons.map(p=>p.id)) : 0
    //     return maxId + 1
    //   }

   

    //POST Requests
    app.post('/api/persons',(request,response, next) =>{
        const body = request.body

            // if (body.content === undefined) {
            // return response.status(400).json({ error: 'content missing' })
            // }

            // if (!body.name) {
            // return response.status(400).json({   error: 'name missing' })
            // }
            // if (!body.number) {
            // return response.status(400).json({ error: 'number missing' })
            // }

        //  if (persons.find(p=> p.name === body.name)) {
        //     return response.status(400).json({ 
        //       error: 'name must be unique' 
        //     })
        //  }


          
         const person = new Person({
            name: body.name,
            number: body.number 
         })
        
        //persons = persons.concat(person)

        person.save().then(savedPerson => {
          response.json(savedPerson)
        })
        .catch(error=>next(error))
       
        
    })
    //PUT Request
    app.put('/api/persons/:id', (request, response, next) => {
      const body = request.body
    
  
 //console.log(content)
    Person.findByIdAndUpdate(request.params.id, body, { new: true })
      .then(updatedPerson => {
        response.json(updatedPerson.toJSON());
    })
    .catch(error => next(error));
    })


    const unknownEndpoint = (req,res) => {
      res.status(404).send({ error: 'Unknown Endpoint' })
    }
    
    app.use(unknownEndpoint)


    //ERROR Handler
    const errorHandler = (error, request, response, next) => {
      console.error(error.message)
    
      if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }
    
      next(error)
    }
    
    app.use(errorHandler)
    

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})