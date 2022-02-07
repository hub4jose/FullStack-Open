/* eslint-disable linebreak-style */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const addBlogMock = jest.fn()

  const component = render(
    <BlogForm addBlog={addBlogMock} />
  )

  const inputTitle = component.container.querySelector('.inputTitle')
  const inputAuthor = component.container.querySelector('.inputAuthor')
  const inputUrl = component.container.querySelector('.inputUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'title to test' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'author to test' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'url to test' }
  })

  fireEvent.submit(form)

  expect(addBlogMock.mock.calls).toHaveLength(1)
  expect(addBlogMock.mock.calls[0][0].title).toBe('title to test' )
  expect(addBlogMock.mock.calls[0][0].author).toBe('author to test' )
  expect(addBlogMock.mock.calls[0][0].url).toBe('url to test' )
})