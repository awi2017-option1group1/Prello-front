import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { IBoard } from '../../boards/types'

export const CREATE_BOARD = 'CREATE_BOARD'
export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS'
export const CREATE_BOARD_ERROR = 'CREATE_BOARD_ERROR'

export type Actions = {
    CREATE_BOARD: {
        type: typeof CREATE_BOARD,
        board: Partial<IBoard>
    },
    CREATE_BOARD_ERROR: {
        type: typeof CREATE_BOARD_ERROR,
        error: string
    },
    CREATE_BOARD_SUCCESS: {
        type: typeof CREATE_BOARD_SUCCESS,
        board: IBoard
    }
}

export const actionCreators = {
    createBoardRequest: (board: Partial<IBoard>): Actions[typeof CREATE_BOARD] => ({
        type: CREATE_BOARD,
        board
    }),
    createBoardRequestError: (error: string): Actions[typeof CREATE_BOARD_ERROR] => ({
        type: CREATE_BOARD_ERROR,
        error
    }),
    createBoardRequestSuccess: (board: IBoard): Actions[typeof CREATE_BOARD_SUCCESS] => ({
        type: CREATE_BOARD_SUCCESS,
        board
    }),
    createBoard: () => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.createBoardRequest({
                name: 'EmptyBoard'
            }))
            const userId = getState().auth.user!.uid
            return API.post(`/users/${userId}/boards`).then(
                board => {
                    dispatch(actionCreators.createBoardRequestSuccess(board))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.createBoardRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}
