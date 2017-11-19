import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'
import { IComment } from '../types'

export const DELETE_COMMENT = 'DELETE_COMMENT'
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS'
export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR'

export type Actions = {
    DELETE_COMMENT: {
        type: typeof DELETE_COMMENT,
    },
    DELETE_COMMENT_ERROR: {
        type: typeof DELETE_COMMENT_ERROR,
        error: string
    },
    DELETE_COMMENT_SUCCESS: {
        type: typeof DELETE_COMMENT_SUCCESS,
        comment: IComment
    }
}

export const actionCreators = {
    deleteCommentRequest: (comment: IComment): Actions[typeof DELETE_COMMENT] => ({
        type: DELETE_COMMENT
    }),
    deleteCommentRequestError: (error: string): Actions[typeof DELETE_COMMENT_ERROR] => ({
        type: DELETE_COMMENT_ERROR,
        error
    }),
    deleteCommentRequestSuccess: (comment: IComment): Actions[typeof DELETE_COMMENT_SUCCESS] => ({
        type: DELETE_COMMENT_SUCCESS,
        comment
    }),
    deleteComment: (comment: IComment) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.deleteCommentRequest(comment))
            return API.delete(`/comments/${comment.id}`).then(
                response => {
                    dispatch(actionCreators.deleteCommentRequestSuccess(comment)),
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.deleteCommentRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
