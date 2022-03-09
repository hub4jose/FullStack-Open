/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'


describe('Testing Blog component', () => {
  const blog = {
    title: 'This is test render.',
    author: 'Renderer',
    url: 'https:/www.newurl.com',
    likes: 5,
    user: { username: 'joseph', name: 'joseph' }
  }

  const user = { username: 'joseph', name: 'joseph' }

  let component
  const likeMockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={blog} user={user} updateLikes={likeMockHandler} />)
  })

  test('renders content', () => {

    // method 1
    expect(component.container).toHaveTextContent('This is test render.')

    expect(component.container.url).toBeUndefined()
    expect(component.container.likes).toBeUndefined()

  })

  test('renders blogs title and author, but not likes and url', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)

    const contentHiddenByDefault = component.container.querySelector('.display')
    expect(contentHiddenByDefault).toHaveStyle('display: none')
    expect(contentHiddenByDefault).not.toBeVisible()
  })

  test('renders additional content (likes, url) when View button is pressed', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const contentHiddenByDefault = component.container.querySelector(
      '.display'
    )
    expect(contentHiddenByDefault).not.toHaveStyle('display: none')
    expect(contentHiddenByDefault).toBeVisible()

    expect(contentHiddenByDefault).toHaveTextContent(blog.likes)
    expect(contentHiddenByDefault).toHaveTextContent(blog.url)
  })

  test('if the Like button is clicked twice, the event handler is also called twice', () => {

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeMockHandler.mock.calls).toHaveLength(2)
  })
})