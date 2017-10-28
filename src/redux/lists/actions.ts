import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { IList } from './types'

export const FETCH_BOARD_LISTS = 'FETCH_BOARD_LISTS'
export const FETCH_BOARD_LISTS_SUCCESS = 'FETCH_BOARD_LISTS_SUCCESS'
export const FETCH_BOARD_LISTS_ERROR = 'FETCH_BOARD_LISTS_ERROR'

export type Actions = {
    FETCH_BOARD_LISTS: {
        type: typeof FETCH_BOARD_LISTS
    },
    FETCH_BOARD_LISTS_ERROR: {
        type: typeof FETCH_BOARD_LISTS_ERROR,
        error: string
    },
    FETCH_BOARD_LISTS_SUCCESS: {
        type: typeof FETCH_BOARD_LISTS_SUCCESS,
        lists: IList[]
    },
}

export const actionCreators = {
    fetchBoardListsRequest: (): Actions[typeof FETCH_BOARD_LISTS] => ({
        type: FETCH_BOARD_LISTS
    }),
    fetchBoardListsRequestError: (error: string): Actions[typeof FETCH_BOARD_LISTS_ERROR] => ({
        type: FETCH_BOARD_LISTS_ERROR,
        error,
    }),
    fetchBoardListsRequestSuccess: (lists: IList[]): Actions[typeof FETCH_BOARD_LISTS_SUCCESS] => ({
        type: FETCH_BOARD_LISTS_SUCCESS,
        lists,
    }),
    fetchBoardLists: (boardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardListsRequest())
            return API.get(`/boards/${boardId}/lists`).then(
                lists => dispatch(actionCreators.fetchBoardListsRequestSuccess(lists)),
                error => dispatch(actionCreators.fetchBoardListsRequestError(error.error))
            )
        }
    }
}
