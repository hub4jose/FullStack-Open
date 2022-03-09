const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users.map(user => user.toJSON()));
  })

userRouter.post('/',async (request,response) => {

 
    const body = request.body

    if(body.password === undefined || body.username === undefined){
        return request.status(400).send({ error: "Username or Password missing" })
    }
    else if(body.password.length < 3){
       return request.status(400).send({ error: "Password must be atleast 3 characters long" })
    }

    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password,saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
      })
    
      const savedUser = await user.save()
    
      response.json(savedUser)
})

module.exports = userRouter