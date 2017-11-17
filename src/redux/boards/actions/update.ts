import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { IUser } from '../../users/types'
import { IBoard } from '../types'

export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_BOARD_TITLE = 'UPDATE_BOARD_TITLE'
export const UPDATE_BOARD_SUCCESS = 'UPDATE_BOARD_SUCCESS'
export const UPDATE_BOARD_USERS_SUCCESS = 'UPDATE_BOARD_USERS_SUCCESS'
export const REMOVE_BOARD_USER_SUCCESS = 'REMOVE_BOARD_USER_SUCCESS'
export const UPDATE_BOARD_ERROR = 'UPDATE_BOARD_ERROR'

export type Actions = {
    UPDATE_BOARD: {
        type: typeof UPDATE_BOARD,
    },
    UPDATE_BOARD_ERROR: {
        type: typeof UPDATE_BOARD_ERROR,
        error: string
    },
    UPDATE_BOARD_SUCCESS: {
        type: typeof UPDATE_BOARD_SUCCESS,
        board: IBoard
    }
    UPDATE_BOARD_USERS_SUCCESS: {
        type: typeof UPDATE_BOARD_USERS_SUCCESS,
        user: IUser
    }
    REMOVE_BOARD_USER_SUCCESS: {
        type: typeof REMOVE_BOARD_USER_SUCCESS,
        user: IUser
    }
    UPDATE_BOARD_TITLE: {
        type: typeof UPDATE_BOARD_TITLE,
        name: string
    }
}

export const actionCreators = {
    updateBoardRequest: (): Actions[typeof UPDATE_BOARD] => ({
        type: UPDATE_BOARD
    }),
    updateBoardRequestError: (error: string): Actions[typeof UPDATE_BOARD_ERROR] => ({
        type: UPDATE_BOARD_ERROR,
        error
    }),
    updateBoardRequestSuccess: (board: IBoard): Actions[typeof UPDATE_BOARD_SUCCESS] => ({
        type: UPDATE_BOARD_SUCCESS,
        board
    }),
    updateBoardUsersRequestSuccess: (user: IUser): Actions[typeof UPDATE_BOARD_USERS_SUCCESS] => ({
        type: UPDATE_BOARD_USERS_SUCCESS,
        user
    }),
    removeBoardUserRequestSuccess: (user: IUser): Actions[typeof REMOVE_BOARD_USER_SUCCESS] => ({
        type: REMOVE_BOARD_USER_SUCCESS,
        user
    }),
    updateBoard: (currentBoard: IBoard, newValues: Partial<IBoard>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateBoardRequest())
            return API.put(`/boards/${currentBoard.id}`, newValues).then(
                board => dispatch(actionCreators.updateBoardRequestSuccess(board)),
                error => dispatch(actionCreators.updateBoardRequestError(error.error.error))
            )
        }
    },
    updateBoardTitle: (id: number, params: { name?: string }) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateBoardRequest())
            return API.put(`/boards/${id}`, params).then(
                board => {
                    dispatch(actionCreators.updateBoardRequestSuccess(board))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.updateBoardRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    },
    addUser: (id: number, username: String) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateBoardRequest())
            return API.post(`/boards/${id}/members`, {username: username}).then(
                user => {
                    dispatch(actionCreators.updateBoardUsersRequestSuccess(user))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.updateBoardRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    },
    removeUser: (id: number, user: IUser) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateBoardRequest())
            return API.delete(`/boards/${id}/members/${user.id}`, user).then(
                emptyResponse => {
                    dispatch(actionCreators.removeBoardUserRequestSuccess(user))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.updateBoardRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
