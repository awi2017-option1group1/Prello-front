import { RootAction } from '../RootAction'
import { FETCH_COMMENTS, FETCH_COMMENTS_ERROR, FETCH_COMMENTS_SUCCESS } from './actions/fetch'
import { CREATE_COMMENT_SUCCESS, CREATE_COMMENT_ERROR } from './actions/create'
import { DELETE_COMMENT_SUCCESS, DELETE_COMMENT_ERROR } from './actions/delete'

import { IComment } from './types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    comments: IComment[]
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    comments: []
}

export const reducer = (state: State = defaultValue, action: RootAction) => { 
        switch (action.type) {
            case CREATE_COMMENT_SUCCESS:
                return {
                    ...state,
                    error: null,
                    comments: state.comments.push(action.comment)
                }
            
            case CREATE_COMMENT_ERROR:
                return {
                    ...state,
                    error: action.error
                }

            case FETCH_COMMENTS:
                return {
                    ...state,
                    error: null,
                    isProcessing: true,
                    comments: []
                }

            case FETCH_COMMENTS_SUCCESS: 
                return {
                    ...state,
                    error: null,
                    isProcessing: false,
                    comments: action.comments
                }    

            case FETCH_COMMENTS_ERROR:
                return {
                    ...state,
                    error: action.error,
                    isProcessing: false
                }

            case DELETE_COMMENT_SUCCESS:
                const index = state.comments.indexOf(action.comment)
                return {
                    ...state,
                    error: null,
                    lists: [
                        ...state.comments.slice(0, index),
                        ...state.comments.slice(index + 1)
                    ]
                }

            case DELETE_COMMENT_ERROR:
                return {
                    ...state,
                    error: action.error
                }

            default:
            return state

    }
}
