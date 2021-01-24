const express = require('express')
var morgan = require('morgan')

const app = express()

app.use(express.json())

app.use(morgan('tiny'))

morgan.token('PostMessage', function (req) {
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :PostMessage'))

let persons = [ {
                id: 1,
                name: "Arto Hellas",
                number: "123-54321"
                },
                {
                id: 2,
                name: "Ada Lovelace",
                number: "39-44-54321"
                },
                {
                id: 3,
                name: "Dan Abramov",
                number: "12-43-54321"
                },
                {
                id: 4,
                name: "Mary Poppendick",
                number: "23-39-54321"

                }]
    const len = persons.length 
    const date = new Date()   

    //GET Requests            
    app.get('/',(request,response) =>{
        response.send(`<h1> home Page</h1>`)
    })    

    app.get('/api/persons',(request,response) =>{
        response.json(persons)
    })  
    
    app.get('/api/persons/:id',(request,response) =>{
        const id = Number(request.params.id)
        const person = persons.find(person=>person.id === id)
        if(person){
        response.json(person)
        }
        else{
          response.status(404).end()  
        }
    })

    app.get('/info',(request,response) =>{
        response.send(`<h2>Phonebook has info for ${len} people</h2><h2>${date}</h2>`)
    }) 

    //DELETE Requests
    app.delete('/api/persons/:id',(request,response) =>{
        const id = Number(request.params.id)
         persons = persons.filter(person=>person.id !== id)
        
          response.status(204).end()  
        
    })

    const generateId = () => {
        const maxId = persons.length > 0 ? Math.max(...persons.map(p=>p.id)) : 0
        return maxId + 1
      }

   

    //POST Requests
    app.post('/api/persons',(request,response) =>{
        const body = request.body
        
        if (!body.name) {
            return response.status(400).json({ 
              error: 'name missing' 
            })
         }
         if (!body.number) {
            return response.status(400).json({ 
              error: 'number missing' 
            })
         }

         if (persons.find(p=> p.name === body.name)) {
            return response.status(400).json({ 
              error: 'name must be unique' 
            })
         }
          
         const person = {
            id: generateId(),
            name: body.name,
            number: body.number 
         }
        
        persons = persons.concat(person)

        response.json(person)
        
    })
    

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})