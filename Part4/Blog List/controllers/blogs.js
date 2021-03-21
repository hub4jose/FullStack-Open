/* eslint-disable indent */
/* eslint-disable linebreak-style */
const blogRouter = require('express').Router()

const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')


//GET Requests
blogRouter.get('/', async (request,response) => {

  const blogs = await Blog.find({}).populate('user',{username: 1, name: 1})
  response.json(blogs)
})


//Get by ID requests
blogRouter.get('/:id', async (request,response) => {

      const blog = await Blog.findById(request.params.id)
      if(blog){
        response.json(blog)
      }else{
        response.status(404).end()
      }

})


//DELETE Requests
blogRouter.delete('/:id',async (request,response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const id = request.params.id
  const blog = await Blog.findById(id)
  
	if(blog.user.toString() === decodedToken.id){
		await Blog.findByIdAndDelete(id)
		response.status(204).end()
  }
  else{
		return response.status(401).json({
			error: "Unauthorized to delete the blog"
		})
	}

})



//POST Requests
blogRouter.post('/', async (request,response) => {
  //const body = request.body
  //const user = await User.findById(request.body.userId)
 const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id
})

  //const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)

})
//PUT Request
blogRouter.put('/:id', async (request, response) => {
  const body = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
}

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    response.json(updatedBlog.toJSON())

})

module.exports = blogRouter