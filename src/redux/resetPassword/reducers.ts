import { RootAction } from '../RootAction'

import {    SEND_MAIL, SEND_MAIL_ERROR, SEND_MAIL_SUCCESS,
            CONFIRM_LINK, CONFIRM_LINK_ERROR, CONFIRM_LINK_SUCCESS } from './actions'

import { FormErrors } from '../forms'

export type State = {
    errors: FormErrors,
    isProcessing: boolean,
    error: string | null
}

const defaultValue: State = {
    errors: [],
    isProcessing: false,
    error: null,
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case SEND_MAIL: 
            return {
                ...state,
                errors: [],
                isProcessing: true,
            }
        
        case SEND_MAIL_ERROR: 
            return {
                ...state, 
                errors: action.errors,
                isProcessing: false,
            }

        case SEND_MAIL_SUCCESS: 
            return {
                ...state, 
                errors: [],
                isProcessing: false,
            }

        case CONFIRM_LINK: 
            return {
                ...state,
                error: null,
                isProcessing: true,
            }
        
        case CONFIRM_LINK_ERROR: 
            return {
                ...state,
                error: action.error,
                isProcessing: false,
            }
        
        case CONFIRM_LINK_SUCCESS: 
        return {
            ...state,
            error: null,
            isProcessing: false,
        }

        default:
            return state
    }
}
