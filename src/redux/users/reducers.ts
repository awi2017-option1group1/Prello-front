import { RootAction } from '../RootAction'
import {    FETCH_USER, 
            FETCH_USER_ERROR, 
            FETCH_USER_SUCCESS, 
            CONFIRM_EMAIL, 
            CONFIRM_EMAIL_ERROR, 
            CONFIRM_EMAIL_SUCCESS } from './actions/fetch'
import { UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from './actions/update'

import { IUser } from './types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    user: IUser
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    user: {
        id: -1,
        username: '',
        email: '',
        password: '',
        notificationsEnabled: false,
    }
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_USER:
            return {
                ...state,
                error: null,
                isProcessing: true
            }

        case FETCH_USER_SUCCESS:
            return {
                ...state,
                error: null,
                isProcessing: false,
                user: action.user
            }

        case FETCH_USER_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }

        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                error: null,
                user: action.user
            }

        case UPDATE_USER_ERROR:
            return {
                ...state,
                error: action.error
            }
        
        case CONFIRM_EMAIL:
            return {
                ...state,
                error: null,
                isProcessing: true,
            }
        
        case CONFIRM_EMAIL_ERROR: 
            return {
                ...state,
                error: action.error,
                isProcessing: false,
            }
        
        case CONFIRM_EMAIL_SUCCESS: 
            return {
                ...state, 
                error: null,
                isProcessing: false,
                user: action.user,
            }

        default:
            return state
    }
}
