import { RootAction } from '../RootAction'

import { SEND_MAIL, SEND_MAIL_ERROR, SEND_MAIL_SUCCESS } from './actions'

import { FormErrors } from '../forms'

export type State = {
    errors: FormErrors,
    isProcessing: boolean,
}

const defaultValue: State = {
    errors: [],
    isProcessing: false,
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case SEND_MAIL: 
            return {
                ...state,
                error: [],
                isProcessing: true,
            }
        
        case SEND_MAIL_ERROR: 
            return {
                ...state, 
                error: action.errors,
                isProcessing: false,
            }

        case SEND_MAIL_SUCCESS: 
            return {
                ...state, 
                error: [],
                isProcessing: false,
            }

        default:
            return state
    }
}
