import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { IComment } from '../comments/types'

export const COMMENT_SUCCESS = 'COMMENT_SUCCESS'
export const COMMENT_ERROR = 'COMMENT_ERROR'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'

export const REMOVE_COMMENT = 'REMOVE_COMMENT'

/*export const UPDATE_COMMENT = 'UPDATE_COMMENT'*/

export type Actions = {
    
    COMMENT_ERROR: {
        type: typeof COMMENT_ERROR,
        error: string,
    },
    COMMENT_SUCCESS: {
        type: typeof COMMENT_SUCCESS, 
        successMessage: string,
    },

    CREATE_COMMENT: {
        type: typeof CREATE_COMMENT,
        content: string,
        createdDate: Date,
        userId: number
    },
    CREATE_COMMENT_SUCCESS: {
        type: typeof CREATE_COMMENT_SUCCESS,
        comment: IComment,
    },

    REMOVE_COMMENT: {
        type: typeof REMOVE_COMMENT,
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    commentError: (error: string): Actions[typeof COMMENT_ERROR] => ({
        type: COMMENT_ERROR,
        error,
    }),
    commentSuccess: (successMessage: string): Actions[typeof COMMENT_SUCCESS] => ({
        type: COMMENT_SUCCESS,
        successMessage,
    }),

    createCommentRequest: ( content: string, 
                            createdDate: Date, 
                            userId: number
    ): Actions[typeof CREATE_COMMENT] => ({
        type: CREATE_COMMENT,
        content,
        createdDate,
        userId
    }),
    createCommentSuccess: (comment: IComment):
    Actions[typeof CREATE_COMMENT_SUCCESS] => ({
        type: CREATE_COMMENT_SUCCESS,
        comment,
    }),

    removeCommentRequest: (id: number): Actions[typeof REMOVE_COMMENT] => ({
        type: REMOVE_COMMENT,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    createBackendComment: (comment: IComment) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createCommentRequest(comment.content, comment.createdDate, comment.user.id))
            return API.post('/comments', comment).then(
                response => dispatch(actionCreators.createCommentSuccess(response.comment)),
                error => dispatch(actionCreators.commentError(error.message)),
            )
        }
    },

    removeBackendComment: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeCommentRequest(id))
            return API.delete('/comments', id).then(
                response => dispatch(actionCreators.commentSuccess(response.message)),
                error => dispatch(actionCreators.commentError(error.message)),
            )
        }
    },

    /*updateBackendComment: (comment: IComment) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCommentRequest(comment))
            return API.put(`/comments/${comment.id}`, comment).then(
                response => dispatch(actionCreators.createCommentSuccess(response.comment)),
                error => dispatch(actionCreators.commentError(error.message)),
            )
        }
    }*/

}
