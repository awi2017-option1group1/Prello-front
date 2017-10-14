import { LOGIN_REQUEST, LOGIN_RESPONSE_ERROR, LOGIN_RESPONSE_SUCCESS } from './actions'
import { RootAction } from '../RootAction'

export type State = {
    token: string | null
    error: string | null,
    isProcessing: boolean,
    isAuthenticated: false
}

const defaultValue: State = {
    token: null,
    error: null,
    isProcessing: false,
    isAuthenticated: false
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isProcessing: true
            }

        case LOGIN_RESPONSE_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                isAuthenticated: true,
                token: action.token
            }
            
        case LOGIN_RESPONSE_ERROR:
            return {
                ...state,
                isProcessing: false,
                error: action.error
            }

        default:
            return state
    }
}
