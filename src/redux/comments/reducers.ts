import { RootAction } from '../RootAction'
import { CREATE_COMMENT, CREATE_COMMENT_SUCCESS, CREATE_COMMENT_ERROR } from './actions/create'
import { UPDATE_COMMENT, UPDATE_COMMENT_ERROR, UPDATE_COMMENT_SUCCESS } from './actions/update'
import { DELETE_COMMENT, DELETE_COMMENT_ERROR, DELETE_COMMENT_SUCCESS } from './actions/delete'
import { FETCH_COMMENTS_LIST, FETCH_COMMENTS_LIST_ERROR, FETCH_COMMENTS_LIST_SUCCESS } from './actions/fetchAll'

import { IComment } from '../comments/types'

type CommentsState = {
    comments: IComment[],
    error: string | null,
    isProcessing: boolean,
}

export type State = CommentsState

const defaultValue: State = {
    comments: [],
    error: null,
    isProcessing: true
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {

/*---------------- CREATE ----------------*/
        case CREATE_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.comment as IComment)
            }

        case CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                comments: state.comments
                    .filter(c => c.id !== null && c.id !== undefined && c.id !== action.comment.id)
                    .concat(action.comment),
                isProcessing: false
            }

        case CREATE_COMMENT_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }

/*---------------- FETCH ----------------*/
        case FETCH_COMMENTS_LIST:
            return {
                ...state,
                isProcessing: true
            }

        case FETCH_COMMENTS_LIST_ERROR:
            return {
                ...state,
                comments: [],
                error: action.error,
                isProcessing: false
            }

        case FETCH_COMMENTS_LIST_SUCCESS:
            return {
                ...state,
                comments: action.comments,
                error: null,
                isProcessing: false
            }

/*---------------- UPDATE ----------------*/
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: state.comments
                    .map(c => {
                        if (c.id === action.comment.id) {
                            return action.comment
                        } else {
                            return c
                        }
                    })
            }

        case UPDATE_COMMENT_ERROR:
            return {
                ...state,
                comments: [],
                error: action.error,
                isProcessing: false
            }

        case UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                isProcessing: false
            }

/*---------------- DELETE ----------------*/
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments
                    .filter(c => c.id !== action.comment.id)
            }

        case DELETE_COMMENT_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }

        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                isProcessing: false
            }

/*---------------- default ----------------*/
        default:
            return state
    }
}
