let timeId = 0
const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case "SHOW":
            return action.data
        case "HIDE":
            return action.data   
        default:
            return state         
    }

};

export const showNotification = (message, showTime) => { 
    return async dispatch => {
      
         clearTimeout(timeId) 

          timeId = setTimeout(() => {
          dispatch({
            type: 'HIDE',
            data: null
          })
        }, showTime * 1000)

        dispatch({
          type: 'SHOW',
          data: message,
        })
      }
}



export default notificationReducer;
