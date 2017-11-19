import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { IComment } from '../../comments/types'

export const CREATE_COMMENT = 'CREATE_COMMENT'
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS'
export const CREATE_COMMENT_ERROR = 'CREATE_COMMENT_ERROR'

export type Actions = {

    CREATE_COMMENT: {
        type: typeof CREATE_COMMENT
        comment: Partial<IComment>,
    },
    CREATE_COMMENT_ERROR: {
        type: typeof CREATE_COMMENT_ERROR,
        error: string
    },
    CREATE_COMMENT_SUCCESS: {
        type: typeof CREATE_COMMENT_SUCCESS,
        comment: IComment,
    }
}

export const actionCreators = {
    createCommentRequest: (cardId: number, comment: Partial<IComment>): Actions[typeof CREATE_COMMENT] => ({
        type: CREATE_COMMENT,
        comment
    }),
    createCommentRequestError: (error: string): Actions[typeof CREATE_COMMENT_ERROR] => ({
        type: CREATE_COMMENT_ERROR,
        error
    }),
    createCommentRequestSuccess: (comment: IComment, cardId: number): Actions[typeof CREATE_COMMENT_SUCCESS] => ({
        type: CREATE_COMMENT_SUCCESS,
        comment,
    }),
    createComment: (values: Partial<IComment>) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            const cardId = getState().card!.id
            dispatch(actionCreators.createCommentRequest(cardId, values))
            return API.post(`/cards/${cardId}/comments`, values).then(
                commentRes => dispatch(actionCreators.createCommentRequestSuccess(commentRes, cardId)),
                error => dispatch(actionCreators.createCommentRequestError(error.error.error))
            )
        }
    }
}
