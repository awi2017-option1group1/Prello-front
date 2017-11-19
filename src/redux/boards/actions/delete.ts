import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { IBoard } from '../types'

export const DELETE_BOARD = 'DELETE_BOARD'
export const DELETE_BOARD_ERROR = 'DELETE_BOARD_ERROR'
export const DELETE_BOARD_SUCCESS = 'DELETE_BOARD_SUCCESS'

export type Actions = {
    DELETE_BOARD: {
        type: typeof DELETE_BOARD,
        board: IBoard
    },
    DELETE_BOARD_ERROR: {
        type: typeof DELETE_BOARD_ERROR,
        error: string
    },
    DELETE_BOARD_SUCCESS: {
        type: typeof DELETE_BOARD_SUCCESS,
        board: IBoard
    }
}

export const actionCreators = {
    deleteBoardRequest: (board: IBoard): Actions[typeof DELETE_BOARD] => ({
        type: DELETE_BOARD,
        board
    }),
    deleteBoardRequestError: (error: string): Actions[typeof DELETE_BOARD_ERROR] => ({
        type: DELETE_BOARD_ERROR,
        error
    }),
    deleteBoardRequestSuccess: (board: IBoard): Actions[typeof DELETE_BOARD_SUCCESS] => ({
        type: DELETE_BOARD_SUCCESS,
        board
    }),
    deleteBoard: (board: IBoard) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.deleteBoardRequest(board))

            if (getState().board && getState().board.board.id === board.id) {
                dispatch(actionCreators.closeBoard)
            }

            return API.delete(`/boards/${board.id}`).then(
                response => {
                    dispatch(actionCreators.deleteBoardRequestSuccess(board))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.deleteBoardRequestError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    },
    closeBoard: () => {
        window.location.replace(`/overview`)
    }
}
