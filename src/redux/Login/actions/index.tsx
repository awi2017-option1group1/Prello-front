import { Dispatch } from '../../RootReducer'
import { API } from '../../../services'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE_SUCCESS = 'LOGIN_RESPONSE_SUCCESS'
export const LOGIN_RESPONSE_ERROR = 'LOGIN_RESPONSE_ERROR'

export type Actions = {
    LOGIN_REQUEST: {
        type: typeof LOGIN_REQUEST
    },
    LOGIN_RESPONSE_SUCCESS: {
        type: typeof LOGIN_RESPONSE_SUCCESS,
        content: {}
    },
    LOGIN_RESPONSE_ERROR: {
        type: typeof LOGIN_RESPONSE_ERROR,
        error: string
    }
}

export const actionCreators = {
    loginRequest: (): Actions[typeof LOGIN_REQUEST] => ({
        type: LOGIN_REQUEST
    }),

    loginError: (error: string): Actions[typeof LOGIN_RESPONSE_ERROR] => ({
        type: LOGIN_RESPONSE_ERROR,
        error
    }),

    loginSuccess: (content: {}): Actions[typeof LOGIN_RESPONSE_SUCCESS] => ({
        type: LOGIN_RESPONSE_SUCCESS,
        content
    }),

    login: (email: string, password: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.loginRequest())
            return API.post('/login', { email, password }).then(
                response => dispatch(actionCreators.loginSuccess(response)),
                error => dispatch(actionCreators.loginError(error.error.message))
            )
        }
    }
}
