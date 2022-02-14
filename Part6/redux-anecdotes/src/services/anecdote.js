import React from 'react'

import axios from 'axios';
const baseUrl = "http://localhost:3001/anecdotes"

const getAll = async () => {

    const res =  await axios.get(baseUrl)
    return res.data
}

const createAnecdote = async (newContent) => {

    const newAnecdote = {
        content: newContent,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0 
    }

    const res =  await axios.post(baseUrl,newAnecdote)
    return res.data
}

const update = async (anecnoteToUpdate) => {
    const res = await axios.put(`${baseUrl}/${anecnoteToUpdate.id}`, anecnoteToUpdate)
    return res.data
} 

export default {getAll, createAnecdote, update}