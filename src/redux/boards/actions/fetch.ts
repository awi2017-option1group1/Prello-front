import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { IBoard } from '../types'
import { IUser } from '../../users/types'

export const FETCH_BOARD = 'FETCH_BOARD'
export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS'
export const FETCH_BOARD_USERS_SUCCESS = 'FETCH_BOARD_USERS_SUCCESS'
export const FETCH_BOARD_ERROR = 'FETCH_BOARD_ERROR'

export type Actions = {
    FETCH_BOARD: {
        type: typeof FETCH_BOARD
    },
    FETCH_BOARD_ERROR: {
        type: typeof FETCH_BOARD_ERROR,
        error: string
    },
    FETCH_BOARD_SUCCESS: {
        type: typeof FETCH_BOARD_SUCCESS,
        board: IBoard
    },
    FETCH_BOARD_USERS_SUCCESS: {
        type: typeof FETCH_BOARD_USERS_SUCCESS,
        users: IUser[]
    }
}

export const actionCreators = {
    fetchBoardRequest: (): Actions[typeof FETCH_BOARD] => ({
        type: FETCH_BOARD
    }),
    fetchBoardRequestError: (error: string): Actions[typeof FETCH_BOARD_ERROR] => ({
        type: FETCH_BOARD_ERROR,
        error
    }),
    fetchBoardRequestSuccess: (board: IBoard): Actions[typeof FETCH_BOARD_SUCCESS] => ({
        type: FETCH_BOARD_SUCCESS,
        board
    }),
    fetchBoardUsersRequestSuccess: (users: IUser[]): Actions[typeof FETCH_BOARD_USERS_SUCCESS] => ({
        type: FETCH_BOARD_USERS_SUCCESS,
        users
    }),
    fetchBoard: (boardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardRequest())
            return API.get(`/boards/${boardId}`).then(
                board => {
                    dispatch(actionCreators.fetchBoardRequestSuccess(board))
                    dispatch(actionCreators.fetchBoardUsers(boardId))
                },
                error => dispatch(actionCreators.fetchBoardRequestError(error.error.error))
            )
        }
    },
    fetchBoardUsers: (boardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardRequest())
            return API.get(`/boards/${boardId}/members`).then(
                users => dispatch(actionCreators.fetchBoardUsersRequestSuccess(users)),
                error => dispatch(actionCreators.fetchBoardRequestError(error.error.error))
            )
        }
    }
}
