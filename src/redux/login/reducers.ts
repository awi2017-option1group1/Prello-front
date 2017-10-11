import { LOGIN_REQUEST, LOGIN_RESPONSE_ERROR, LOGIN_RESPONSE_SUCCESS } from './actions'
import { RootAction } from '../RootAction'

export type State = {
    content: {}
    error: string | null,
    isProcessing: boolean
}

const defaultValue: State = {
    content: {},
    error: null,
    isProcessing: false
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
                content: action.content
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
