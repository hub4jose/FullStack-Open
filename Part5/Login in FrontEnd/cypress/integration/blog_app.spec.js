/* eslint-disable linebreak-style */
describe('Blog app', () => {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Joseph',
      username: 'admin',
      password: 'admin',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened', () => {
    cy.contains('Blogs')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2021')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
  })

  it('user can log in', function() {
    cy.contains('log in').click()
    cy.get('#userName').type('admin')
    cy.get('#password').type('admin')
    cy.get('#login').click()

    cy.contains('Joseph logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click()
      cy.get('#userName').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login').click()
    })

    it('a new blog can be created', function() {
      cy.contains('Create').click()
      cy.get('.inputTitle').type('a blog created by cypress')
      cy.get('.inputAuthor').type('Joshan')
      cy.get('.inputUrl').type('http:/www.feb.com')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })
  })

  describe('Login', function () {
    it('user can login with correct credentials', function () {
      cy.contains('log in').click()
      cy.get('#userName').type('admin')
      cy.get('#password').type('admin')
      cy.get('#login').click()
      cy.contains('Joseph logged-in')
    })

    it('login fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#userName').type('admin')
      cy.get('#password').type('password')
      cy.get('#login').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('html').should('not.contain', 'Joseph logged-in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'admin' })
    })

    it('a new blog can be created', function () {
      cy.contains('Create').click()
      cy.get('.inputTitle').type('Cypress')
      cy.get('.inputAuthor').type('Mr. C.Y. Press')
      cy.get('.inputUrl').type('cypress.com')
      cy.contains('create').click()
      cy.get('html').should('contain', 'Cypress by Mr. C.Y. Press')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress Test Blog',
          author: 'Tester MC',
          url: 'test.com',
          likes: 0,
        })
      })

      it('it can be liked', function () {
        cy.contains('Cypress Test Blog')
        cy.contains('view').click()
        cy.contains('like').click()
        cy.get('.content').contains('Likes:1')
        cy.contains('like').click()
        cy.get('.content').contains('Likes:2')
      })
    })

    describe('blog can be created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Cypress Test Blog',
          author: 'Tester MC',
          url: 'test.com',
          likes: 0,
        })
      })

      it('and deleted by creator', function () {
        cy.contains('Cypress Test Blog')
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.get('html').should('not.contain', 'Cypress Test Blog')
      })
    })

    describe('several blogs can be created', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog with 1 like',
          author: 'Tester 1',
          url: 'test.com3',
          likes: 1,
        })
        cy.createBlog({
          title: 'Blog with 12 likes',
          author: 'Tester 2',
          url: 'test.com2',
          likes: 15,
        })
        cy.createBlog({
          title: 'Blog with 6 likes',
          author: 'Tester 3',
          url: 'test.com1',
          likes: 6,
        })
      })

      it('and they are automatically sorted by likes', function () {
        cy.get('.content>.blogTitle').should((items) => {
          expect(items[0]).to.contain('Blog with 12 likes')
          expect(items[1]).to.contain('Blog with 6 likes')
          expect(items[2]).to.contain('Blog with 1 like')
        })
      })
    })
  })
})