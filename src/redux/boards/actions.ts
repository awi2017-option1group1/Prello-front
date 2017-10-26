import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { IBoard } from './types'

export const FETCH_BOARD = 'FETCH_BOARD'
export const FETCH_BOARD_SUCCESS = 'FETCH_BOARD_SUCCESS'
export const FETCH_BOARD_ERROR = 'FETCH_BOARD_ERROR'

// export const CREATE_BOARD = 'CREATE_BOARD'
// export const CREATE_BOARD_SUCCESS = 'CREATE_BOARD_SUCCESS'
// export const CREATE_BOARD_ERROR = 'CREATE_BOARD_ERROR'
// export const REMOVE_BOARD = 'REMOVE_BOARD'
// export const REMOVE_BOARD_SUCCESS = 'REMOVE_BOARD_SUCCESS'
// export const REMOVE_BOARD_ERROR = 'REMOVE_BOARD_ERROR'
// export const UPDATE_BOARD = 'UPDATE_BOARD'
// export const UPDATE_BOARD_SUCCESS = 'UPDATE_BOARD_SUCCESS'
// export const UPDATE_BOARD_ERROR = 'UPDATE_BOARD_ERROR'
export type Actions = {

    FETCH_BOARD: {
        type: typeof FETCH_BOARD,
        boardId: number
    },
    FETCH_BOARD_ERROR: {
        type: typeof FETCH_BOARD_ERROR,
        error: string,
    },
    FETCH_BOARD_SUCCESS: {
        type: typeof FETCH_BOARD_SUCCESS,
        board: IBoard
    },

    // CREATE_BOARD: {
    //     type: typeof CREATE_BOARD,
    //     title: string,
    //     isPrivate: boolean,
    //     lists: IList[],
    //     tags: ITag[],
    //     userRole: IUserRoleInBoard[],
    // },
    // CREATE_BOARD_SUCCESS: {
    //     type: typeof CREATE_BOARD_SUCCESS,
    //     board: IBoard,
    // },
    // REMOVE_BOARD: {
    //     type: typeof REMOVE_BOARD,
    // },
    // UPDATE_BOARD: {
    //     type: typeof UPDATE_BOARD,
    //     board: IBoard,
    // }
}

export const actionCreators = {
    fetchBoardRequest: (boardId: number): Actions[typeof FETCH_BOARD] => ({
        type: FETCH_BOARD,
        boardId
    }),
    fetchBoardRequestError: (error: string): Actions[typeof FETCH_BOARD_ERROR] => ({
        type: FETCH_BOARD_ERROR,
        error,
    }),
    fetchBoardRequestSuccess: (board: IBoard): Actions[typeof FETCH_BOARD_SUCCESS] => ({
        type: FETCH_BOARD_SUCCESS,
        board,
    }),
    fetchBoard: (boardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchBoardRequest(boardId))
            return API.get(`/boards/${boardId}`).then(
                board => dispatch(actionCreators.fetchBoardRequestSuccess(board)),
                error => dispatch(actionCreators.fetchBoardRequestError(error.error.error))
            )
        }
    }

    // createBoardRequest: (   title: string, 
    //                         isPrivate: boolean, 
    //                         lists: IList[], 
    //                         tags: ITag[], 
    //                         userRole: IUserRoleInBoard[]): 
    // Actions[typeof CREATE_BOARD] => ({
    //     type: CREATE_BOARD,
    //     title,
    //     isPrivate,
    //     lists,
    //     tags,
    //     userRole,
    // }),
    // createBoardSuccess: (board: IBoard):
    // Actions[typeof CREATE_BOARD_SUCCESS] => ({
    //     type: CREATE_BOARD_SUCCESS,
    //     board,
    // }),
    // removeBoardRequest: (id: number): Actions[typeof REMOVE_BOARD] => ({
    //     type: REMOVE_BOARD,
    // }),
    // updateBoardRequest: (board: IBoard): Actions[typeof UPDATE_BOARD] => ({
    //     type: UPDATE_BOARD,
    //     board,
    // }),
    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    // createBackendBoard: (board: IBoard) => {
    //     return (dispatch: Dispatch) => {
    //         dispatch(actionCreators.createBoardRequest(board.title, board.isPrivate, [], [], []))
    //         return API.post('/boards', board).then(
    //             response => dispatch(actionCreators.createBoardSuccess(response.board)),
    //             error => dispatch(actionCreators.boardError(error.message)),
    //         )
    //     }
    // },
    // removeBackendBoard: (id: number) => {
    //     return (dispatch: Dispatch) => {
    //         dispatch(actionCreators.removeBoardRequest(id))
    //         return API.delete('/boards', id).then(
    //             response => dispatch(actionCreators.boardSuccess(response.message)),
    //             error => dispatch(actionCreators.boardError(error.message)),
    //         )
    //     }
    // },
    // updateBackendBoard: (board: IBoard) => {
    //     return (dispatch: Dispatch) => {
    //         dispatch(actionCreators.updateBoardRequest(board))
    //         return API.put(`/boards/${board.id}`, board).then(
    //             response => dispatch(actionCreators.createBoardSuccess(response.board)),
    //             error => dispatch(actionCreators.boardError(error.message)),
    //         )
    //     }
    // }
}
