import { Dispatch } from '../RootReducer'
import { API } from '../../services'

import { IList } from '../lists/types'
import { ITag } from '../tags/types'
import { IBoard, IUserRoleInBoard } from '../boards/types'

export const BOARD_SUCCESS = 'BOARD_SUCCESS'
export const BOARD_ERROR = 'BOARD_ERROR'

export const CREATE_BOARD = 'CREATE_BOARD'
export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS'

export const REMOVE_BOARD = 'REMOVE_BOARD'

export const UPDATE_BOARD = 'UPDATE_BOARD'

/**
 * TODO : FOR MATHIEU
 * 
 * Try to think if an action to add a list into the board, if this is important or not
 * 
 * If it is, add an add element action
 * 
 * If not, try to think how to do it
 * 
 * Implement, thanks to the examples
 */

export type Actions = {

    BOARD_ERROR: {
        type: typeof BOARD_ERROR,
        error: string,
    },
    BOARD_SUCCESS: {
        type: typeof BOARD_SUCCESS, 
        successMessage: string,
    },

    CREATE_BOARD: {
        type: typeof CREATE_BOARD,
        title: string,
        isPrivate: boolean,
        lists: IList[],
        tags: ITag[],
        userRole: IUserRoleInBoard[],
    },
    CREATE_BOARD_SUCCESS: {
        type: typeof CREATE_BOARD_SUCCESS,
        board: IBoard,
    },

    REMOVE_BOARD: {
        type: typeof REMOVE_BOARD,
    },

    UPDATE_BOARD: {
        type: typeof UPDATE_BOARD,
        board: IBoard,
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    boardError: (error: string): Actions[typeof BOARD_ERROR] => ({
        type: BOARD_ERROR,
        error,
    }),
    boardSuccess: (successMessage: string): Actions[typeof BOARD_SUCCESS] => ({
        type: BOARD_SUCCESS,
        successMessage,
    }),

    createBoardRequest: (   title: string, 
                            isPrivate: boolean, 
                            lists: IList[], 
                            tags: ITag[], 
                            userRole: IUserRoleInBoard[]): 
    Actions[typeof CREATE_BOARD] => ({
        type: CREATE_BOARD,
        title,
        isPrivate,
        lists,
        tags,
        userRole,
    }),
    createBoardSuccess: (board: IBoard):
    Actions[typeof CREATE_BOARD_SUCCESS] => ({
        type: CREATE_BOARD_SUCCESS,
        board,
    }),

    removeBoardRequest: (id: number): Actions[typeof REMOVE_BOARD] => ({
        type: REMOVE_BOARD,
    }),

    updateBoardRequest: (board: IBoard): Actions[typeof UPDATE_BOARD] => ({
        type: UPDATE_BOARD,
        board,
    }),
    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    createBackendBoard: (board: IBoard) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createBoardRequest(board.title, board.isPrivate, [], [], []))
            return API.post('/boards', board).then(
                response => dispatch(actionCreators.createBoardSuccess(response.board)),
                error => dispatch(actionCreators.boardError(error.message)),
            )
        }
    },

    removeBackendBoard: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeBoardRequest(id))
            return API.delete('/boards', id).then(
                response => dispatch(actionCreators.boardSuccess(response.message)),
                error => dispatch(actionCreators.boardError(error.message)),
            )
        }
    },

    updateBackendBoard: (board: IBoard) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateBoardRequest(board))
            return API.put(`/boards/${board.id}`, board).then(
                response => dispatch(actionCreators.createBoardSuccess(response.board)),
                error => dispatch(actionCreators.boardError(error.message)),
            )
        }
    }

}
