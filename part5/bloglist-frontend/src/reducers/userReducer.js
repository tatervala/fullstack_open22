const initialState = []
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_USERS': {
            return action.payload
        }
        default:
            return state
    }
}
export const initUsers = (payload) => {
    return async dispatch => {
        dispatch({
            type: 'INIT_USERS',
            payload
        })
    }
}
export default userReducer