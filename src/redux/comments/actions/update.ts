import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { IComment } from '../types'

export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const UPDATE_COMMENT_ERROR = 'UPDATE_COMMENT_ERROR'
export const UPDATE_COMMENT_SUCCESS = 'UPDATE_COMMENT_SUCCESS'

export type Actions = {
    UPDATE_COMMENT: {
        type: typeof UPDATE_COMMENT,
    },
    UPDATE_COMMENT_ERROR: {
        type: typeof UPDATE_COMMENT_ERROR,
        error: string
    },
    UPDATE_COMMENT_SUCCESS: {
        type: typeof UPDATE_COMMENT_SUCCESS,
        comment: IComment
    }
}

export const actionCreators = {
    updateCommentRequest: (): Actions[typeof UPDATE_COMMENT] => ({
        type: UPDATE_COMMENT
    }),
    updateCommentRequestError: (error: string): Actions[typeof UPDATE_COMMENT_ERROR] => ({
        type: UPDATE_COMMENT_ERROR,
        error
    }),
    updateCommentRequestSuccess: (comment: IComment): Actions[typeof UPDATE_COMMENT_SUCCESS] => ({
        type: UPDATE_COMMENT_SUCCESS,
        comment
    }),
    updateComment: (currentComment: IComment, newValues: Partial<IComment>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCommentRequest())
            return API.put(`/comments/${currentComment.id}`, newValues).then(
                newComment => {
                    dispatch(actionCreators.updateCommentRequestSuccess(newComment))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.updateCommentRequestError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
