import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IComment } from '../types'

export const FETCH_COMMENTS = 'FETCH_COMMENTS'
export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS'
export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR'

export type Actions = {
    FETCH_COMMENTS: {
        type: typeof FETCH_COMMENTS
    },
    FETCH_COMMENTS_ERROR: {
        type: typeof FETCH_COMMENTS_ERROR,
        error: string
    },
    FETCH_COMMENTS_SUCCESS: {
        type: typeof FETCH_COMMENTS_SUCCESS,
        comments: IComment[]
    }
}

export const actionCreators = {
    fetchCommentsRequest: (): Actions[typeof FETCH_COMMENTS] => ({
        type: FETCH_COMMENTS
    }),
    fetchCommentsRequestError: (error: string): Actions[typeof FETCH_COMMENTS_ERROR] => ({
        type: FETCH_COMMENTS_ERROR,
        error
    }),
    fetchCommentsRequestSuccess: (comments: IComment[]): Actions[typeof FETCH_COMMENTS_SUCCESS] => ({
        type: FETCH_COMMENTS_SUCCESS,
        comments
    }),
    fetchComments: (cardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCommentsRequest())
            return API.get(`/cards/${cardId}/comments`).then(
                comments => dispatch(actionCreators.fetchCommentsRequestSuccess(comments)),
                error => dispatch(actionCreators.fetchCommentsRequestError(error.error.error))
            )
        }
    }
}
