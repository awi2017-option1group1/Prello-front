import { push } from 'react-router-redux'

import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'
import { AUTH } from '../../services/auth'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE_SUCCESS = 'LOGIN_RESPONSE_SUCCESS'
export const LOGIN_RESPONSE_ERROR = 'LOGIN_RESPONSE_ERROR'
export const LOGOUT = 'LOGOUT'

export type Actions = {
    LOGIN_REQUEST: {
        type: typeof LOGIN_REQUEST
    },
    LOGIN_RESPONSE_SUCCESS: {
        type: typeof LOGIN_RESPONSE_SUCCESS,
        token: string
    },
    LOGIN_RESPONSE_ERROR: {
        type: typeof LOGIN_RESPONSE_ERROR,
        error: string
    },
    LOGOUT: {
        type: typeof LOGOUT
    },
}

export const actionCreators = {
    logout: () => {
        return (dispatch: Dispatch) => {
            AUTH.removeUserToken()
            dispatch(push('/'))
        }
    },

    loginRequest: (): Actions[typeof LOGIN_REQUEST] => ({
        type: LOGIN_REQUEST
    }),

    loginError: (error: string): Actions[typeof LOGIN_RESPONSE_ERROR] => {
        AUTH.removeUserToken()
        return {
            type: LOGIN_RESPONSE_ERROR,
            error
        }
    },

    loginSuccess: (token: string): Actions[typeof LOGIN_RESPONSE_SUCCESS] => {
        AUTH.setUserToken(token)
        return {
            type: LOGIN_RESPONSE_SUCCESS,
            token
        }
    },

    login: (email: string, password: string, redirect = '/') => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.loginRequest())
            return API.post('/login', { email, password }).then(
                response => {
                    dispatch(actionCreators.loginSuccess(response.token))
                    dispatch(push(redirect))
                },
                error => dispatch(actionCreators.loginError(error.error.message))
            )
        }
    }
}
