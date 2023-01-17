import { createSlice } from '@reduxjs/toolkit'
const initialState = {type: null, text: ""}
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'success':
        console.log('success: ', action.text, action.type)
        return action
      case 'error':

        console.log('error: ', action.text, action.type)
        return action 
      case 'timeout':

        return action
      default:
        return state
    }
  }
export default notificationReducer