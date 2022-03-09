import React from 'react'
import blogServices from '../services/blogs'

const noteReducers = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_BLOGS':
      return action.data
    case 'CREATE_BLOGS':
      return [...state, action.data]
    case 'REMOVE_BLOGS':
      return state.filter((blog) => blog.id !== action.data.blogId)
    case 'UPDATE_LIKES':
      return state.map((blog) =>
        blog.id === action.data.blogId
          ? { ...blog, likes: action.data.likes }
          : blog
      )
    case 'UPDATE_COMMENTS':
      return state.map((blog) =>
        blog.id === action.data.blogId
          ? { ...blog, comments: action.data.comments }
          : blog
      )
    default:
      return state
  }
}

export const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll()
    dispatch({
      type: 'FETCH_BLOGS',
      data: blogs,
    })
  }
}

export const createBlogs = (blogObject) => {
  return async (dispatch) => {
    const blog = await blogServices.create(blogObject)

    dispatch({
      type: 'CREATE_BLOGS',
      data: blog,
    })
  }
}

export const removeBlogs = (blogId) => {
  return async (dispatch) => {
    await blogServices.remove(blogId)

    dispatch({
      type: 'REMOVE_BLOGS',
      data: { blogId },
    })
  }
}

export const updateBlogs = (blogId, updatedBlog) => {
  return async (dispatch) => {
    await blogServices.update(blogId, updatedBlog)

    dispatch({
      type: 'UPDATE_LIKES',
      data: { blogId, likes: updatedBlog.likes },
    })
  }
}

export const updateComment = (blogId, updatedBlog) => {
  return async (dispatch) => {
    await blogServices.update(blogId, updatedBlog)

    dispatch({
      type: 'UPDATE_COMMENTS',
      data: { blogId, comments: updatedBlog.comments },
    })
  }
}

export default noteReducers
