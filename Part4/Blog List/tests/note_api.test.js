/* eslint-disable linebreak-style */
const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  
})

beforeEach(async () => {
  await Blog.deleteMany({})
  // let noteObject = new Blog(helper.InitialBlogs[0])
  // await noteObject.save()
  // noteObject = new Blog(helper.InitialBlogs[1])
  // await noteObject.save()

  for (let blog of helper.InitialBlogs) {
    let noteObject = new Blog(blog)
    await noteObject.save()
  }
})

describe('when there is initially some blogs saved',() => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.InitialBlogs.length)
  })


  test('unique identifier to be named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })


  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'Go To Statement Considered Harmful'
    )
  })

})

describe('viewing a specific note', () => {

  test('blog without likes to return 0', async () => {
    const newBlog = {
      title: 'No likes',
      author: 'Robert C. Martin',
      url: 'https://wwww.google.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })


  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultBlog.body).toEqual(processedBlogToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

})

describe('adding and updating blog posts', () => {

  test('a new blog post', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.InitialBlogs.length + 1)

    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain('First class tests')
  })

  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.InitialBlogs.length)
  })

  test('updating a blog', async () => {
    const blogs = await api.get('/api/blogs')
    const id = blogs.body[0].id
    console.log(id)
    const blogUpdate = { likes: 23 }

    const updatedBlog = await api.put(`/api/blogs/${id}`).send(blogUpdate)

    expect(updatedBlog.body).toHaveProperty('likes', blogUpdate.likes)
  })

})

describe('deletion of a blog', () => {

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.InitialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })


})

afterAll(() => {
  mongoose.connection.close()
})