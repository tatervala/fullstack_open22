import blogService from '../services/blogs'
const initialState = []
const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_BLOG': {
            return action.payload
        }
        case 'ADD_BLOG': {
            return [...state, action.payload]
        }
        case 'REMOVE_BLOG': {
            const id = action.payload
            return state.filter((blog) => blog.id !== action.payload);
        }
        case 'LIKE': {
            const id = action.payload
            const newBlog = state.find((blog) => blog.id === id)
            
        }
        default:
            return state
    }

}
export const initializeBlog = (payload) => {
    return async dispatch => {
        const response = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOG',
            payload: response
        })
    }
}
export const addBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.create(blog)
        dispatch({
            type: 'ADD_BLOG',
            payload: response
        })
    }
}
export const deleteBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.remove(blog)
        dispatch({
            type: 'REMOVE_BLOG',
            payload: response
        })
    }
}
export const voteBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.update(blog)
        dispatch({
            type: 'LIKE',
            payload: response
        })
    }
}
export default blogReducer