import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'
import { actionCreators as notificationsActionsCreators } from '../../notifications/actions'

import { IBoard } from '../types'

export const UPDATE_BOARD = 'UPDATE_BOARD'
export const UPDATE_BOARD_TITLE = 'UPDATE_BOARD_TITLE'
export const UPDATE_BOARD_SUCCESS = 'UPDATE_BOARD_SUCCESS'
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
                    dispatch(notificationsActionsCreators.fetchNotifications())
                },
                error => {
                    dispatch(actionCreators.updateBoardRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
