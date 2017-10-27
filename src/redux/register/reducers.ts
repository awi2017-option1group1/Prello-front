import { REGISTER_REQUEST, REGISTER_RESPONSE_ERROR, REGISTER_RESPONSE_SUCCESS } from './actions'
import { RootAction } from '../RootAction'
import { FormErrors } from '../forms'

export type State = {
    errors: FormErrors,
    isProcessing: boolean,
}

const defaultValue: State = {
    errors: [],
    isProcessing: false
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                isProcessing: true
            }

        case REGISTER_RESPONSE_SUCCESS:
            return {
                ...state,
                errors: [],
                isProcessing: false
            } 

        case REGISTER_RESPONSE_ERROR: 
            return {
                ...state,
                isProcessing: false,
                errors: action.errors
            }

        default:
            return state
    }
}
