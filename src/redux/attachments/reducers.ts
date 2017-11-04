import { FETCH_ATTACHMENT, ATTACHMENT_ERROR, FETCH_ATTACHMENT_SUCCESS } from './actions/fetch'
import { CREATE_ATTACHMENT_SUCCESS, CREATE_ATTACHMENT_ERROR } from './actions/create'
import { REMOVE_ATTACHMENT_SUCCESS, REMOVE_ATTACHMENT_ERROR } from './actions/delete'

import { RootAction } from '../RootAction'
import { IAttachment } from '../attachments/types'

export type State = {
    attachment: IAttachment | null,
    error: string | null,
    isProcessing: boolean,
}

const defaultValue: State = {
    attachment: null,
    error: null,
    isProcessing: false
}
export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {

        case ATTACHMENT_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
        }
        
        case FETCH_ATTACHMENT:
            return {
                ...state,
                attachment: null,
                error: null,
                isProcessing: true
        }

        case FETCH_ATTACHMENT_SUCCESS: 
            return {
                ...state,
                attachment: action.attachment,
                error: null,
                isProcessing: false
        }

        case CREATE_ATTACHMENT_SUCCESS:
            return {
                ...state,
                attachment: action.attachment,
                error: null,
                isProcessing: false
        }
    
        case CREATE_ATTACHMENT_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
        }

        case REMOVE_ATTACHMENT_SUCCESS:
            return {
                ...state,
                attachment: null,
                error: null,
                isProcessing: false
        }

        case REMOVE_ATTACHMENT_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
        }

        default:
            return state
}
}
