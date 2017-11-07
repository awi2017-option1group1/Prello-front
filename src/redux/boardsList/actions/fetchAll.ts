import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IBoard } from '../../boards/types'

export const FETCH_BOARDS = 'FETCH_BOARDS'
export const FETCH_BOARDS_SUCCESS = 'FETCH_BOARDS_SUCCESS'
export const FETCH_BOARDS_ERROR = 'FETCH_BOARDS_ERROR'

export type Actions = {
    FETCH_BOARDS: {
        type: typeof FETCH_BOARDS
    },
    FETCH_BOARDS_ERROR: {
        type: typeof FETCH_BOARDS_ERROR,
        error: string
    },
    FETCH_BOARDS_SUCCESS: {
        type: typeof FETCH_BOARDS_SUCCESS,
        boards: IBoard[]
    }
}

export const actionCreators = {
    fetchBoardsRequest: (): Actions[typeof FETCH_BOARDS] => ({
        type: FETCH_BOARDS
    }),
    fetchBoardsRequestError: (error: string): Actions[typeof FETCH_BOARDS_ERROR] => ({
        type: FETCH_BOARDS_ERROR,
        error
    }),
    fetchBoardsRequestSuccess: (boards: IBoard[]): Actions[typeof FETCH_BOARDS_SUCCESS] => ({
        type: FETCH_BOARDS_SUCCESS,
        boards
    }),
    fetchBoards: () => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardsRequest())
            return API.get(`/users/1/boards`).then(
                boards => dispatch(actionCreators.fetchBoardsRequestSuccess(boards)),
                error => dispatch(actionCreators.fetchBoardsRequestError(error.error.error))
            )
        }
    }
}
