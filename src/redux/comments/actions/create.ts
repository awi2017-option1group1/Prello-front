import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IComment } from '../types'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR'

export type Actions = {

    CREATE_COMMENT: {
        type: typeof CREATE_COMMENT
    },
    CREATE_COMMENT_ERROR: {
        type: typeof CREATE_COMMENT_ERROR,
        error: string
    },
    CREATE_COMMENT_SUCCESS: {
        type: typeof CREATE_COMMENT_SUCCESS,
        comment: IComment,
    },
}

export const actionCreators = {    
    createCommentRequest: (): Actions[typeof CREATE_COMMENT] => ({
        type: CREATE_COMMENT
    }),
    createCommentRequestError: (error: string): Actions[typeof CREATE_COMMENT_ERROR] => ({
        type: CREATE_COMMENT_ERROR,
        error
    }),
    createCommentRequestSuccess: (comment: IComment): Actions[typeof CREATE_COMMENT_SUCCESS] => ({
        type: CREATE_COMMENT_SUCCESS,
        comment
    }),
    createComment: (cardId: number, comment: Comment) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createCommentRequest())
            return API.post(`/cards/${cardId}/comments`).then(
                commentRes => dispatch(actionCreators.createCommentRequestSuccess(commentRes)),
                error => dispatch(actionCreators.createCommentRequestError(error.error.error))
            )
        }
    }
}
