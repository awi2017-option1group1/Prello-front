import { push } from 'react-router-redux'

import { Dispatch } from '../RootReducer'
import { FormErrors } from '../forms'

import { API } from '../../services/http'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_RESPONSE_SUCCESS = 'REGISTER_RESPONSE_SUCCESS'
export const REGISTER_RESPONSE_ERROR = 'REGISTER_RESPONSE_ERROR'

export type Actions = {
    REGISTER_REQUEST: {
        type: typeof REGISTER_REQUEST
    },
    REGISTER_RESPONSE_SUCCESS: {
        type: typeof REGISTER_RESPONSE_SUCCESS
    },
    REGISTER_RESPONSE_ERROR: {
        type: typeof REGISTER_RESPONSE_ERROR,
        errors: FormErrors
    }
}

export const actionCreators = {
    registerRequest: (): Actions[typeof REGISTER_REQUEST] => ({
        type: REGISTER_REQUEST
    }),

    registerError: (errors: FormErrors): Actions[typeof REGISTER_RESPONSE_ERROR] => {
        return {
            type: REGISTER_RESPONSE_ERROR,
            errors
        }
    },

    registerSuccess: (): Actions[typeof REGISTER_RESPONSE_SUCCESS] => {
        return {
            type: REGISTER_RESPONSE_SUCCESS
        }
    },

    register: (email: string, username: string, password: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.registerRequest())
            return API.post('/register', { email, username, password }).then(
                response => {
                    dispatch(actionCreators.registerSuccess())
                    dispatch(push('/register/success'))
                },
                error => dispatch(actionCreators.registerError(error.error.errors))
            )
        }
    }
}
