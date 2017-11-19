import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IComment } from '../types'

export const FETCH_COMMENTS_LIST = 'FETCH_COMMENTS_LIST'
export const FETCH_COMMENTS_LIST_ERROR = 'FETCH_COMMENTS_LIST_ERROR'
export const FETCH_COMMENTS_LIST_SUCCESS = 'FETCH_COMMENTS_LIST_SUCCESS'

export type Actions = {
    FETCH_COMMENTS_LIST: {
        type: typeof FETCH_COMMENTS_LIST,
    },
    FETCH_COMMENTS_LIST_ERROR: {
        type: typeof FETCH_COMMENTS_LIST_ERROR,
        error: string,
    },
    FETCH_COMMENTS_LIST_SUCCESS: {
        type: typeof FETCH_COMMENTS_LIST_SUCCESS,
        comments: IComment[],
    }
}

export const actionCreators = {
    fetchCommentsListRequest: (): Actions[typeof FETCH_COMMENTS_LIST] => ({
        type: FETCH_COMMENTS_LIST,
    }),
    fetchCommentsListRequestError: (cardId: number, error: string): Actions[typeof FETCH_COMMENTS_LIST_ERROR] => ({
        type: FETCH_COMMENTS_LIST_ERROR,
        error
    }),
    fetchCommentsListRequestSuccess: (cardId: number, comments: IComment[]):
    Actions[typeof FETCH_COMMENTS_LIST_SUCCESS] => ({
        type: FETCH_COMMENTS_LIST_SUCCESS,
        comments
    }),
    fetchCommentsList: (cardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCommentsListRequest())
            return API.get(`/cards/${cardId}/comments`).then(
                comments => dispatch(actionCreators.fetchCommentsListRequestSuccess(cardId, comments)),
                error => dispatch(actionCreators.fetchCommentsListRequestError(cardId, error.message)),
            )
        }
    }
}
