let timeId = 0
const notificationReducers = (state = {}, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return { message: action.data, type: 'success' }
    case 'ERROR':
      return { message: action.data, type: 'error' }
    default:
      return state
  }
}

export const setMessage = (msg) => {
  return async (dispatch) => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      dispatch({
        type: 'MESSAGE',
        data: null,
      })
    }, 5000)

    dispatch({
      type: 'MESSAGE',
      data: msg,
    })
  }
}

export const setError = (err) => {
  return async (dispatch) => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      dispatch({
        type: 'ERROR',
        data: null,
      })
    }, 5000)

    dispatch({
      type: 'ERROR',
      data: err,
    })
  }
}

export default notificationReducers
