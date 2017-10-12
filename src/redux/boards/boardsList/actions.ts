import { Dispatch } from '../../RootReducer'
import { API } from '../../../services'

import { IList } from '../../lists/types'
import { ITag } from '../../tags/types'
import { IBoard } from '../types'

export const BOARDS_SUCCESS = 'BOARDS_SUCCESS'
export const BOARDS_ERROR = 'BOARDS_ERROR'

export const ADD_BOARD = 'ADD_BOARD'
export const ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS'

export const REMOVE_SINGLE_BOARD = 'REMOVE_SINGLE_BOARD'

export type Actions = {
    BOARDS_SUCCESS: {
        type: typeof BOARDS_SUCCESS,
        successMessage: string,
    },
    BOARDS_ERROR: {
        type: typeof BOARDS_ERROR,
        errorMessage: string,
    },

    ADD_BOARD: {
        type: typeof ADD_BOARD,
        title: string,
        isPrivate: boolean,
        lists: IList[],
        tags: ITag[],
    },
    ADD_BOARD_SUCCESS: {
        type: typeof ADD_BOARD_SUCCESS,
        id: number,
        title: string,
        isPrivate: boolean,
        lists: IList[],
        tags: ITag[],
    },

    REMOVE_SINGLE_BOARD: {
        type: typeof REMOVE_SINGLE_BOARD,
        index: number,
    },
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    boardError: (errorMessage: string): Actions[typeof BOARDS_ERROR] => ({
        type: BOARDS_ERROR,
        errorMessage,
    }),
    boardSuccess: (successMessage: string): Actions[typeof BOARDS_SUCCESS] => ({
        type: BOARDS_SUCCESS,
        successMessage,
    }),

    addBoardRequest: (title: string, isPrivate: boolean, lists: IList[], tags: ITag[]): Actions[typeof ADD_BOARD] => ({
        type: ADD_BOARD,
        title,
        isPrivate,
        lists,
        tags,
    }),
    addBoardSuccess: (id: number, title: string, isPrivate: boolean, lists: IList[], tags: ITag[]):
    Actions[typeof ADD_BOARD_SUCCESS] => ({
        type: ADD_BOARD_SUCCESS,
        id,
        title,
        isPrivate,
        lists,
        tags,
    }),

    removeBoardRequest: (index: number): Actions[typeof REMOVE_SINGLE_BOARD] => ({
        type: REMOVE_SINGLE_BOARD,
        index,
    }),
    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    addBackendBoard: (board: IBoard) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.addBoardRequest(board.title, board.isPrivate, [], []))
            return API.post('/boards', board).then( // This is supposed to add a board in the 
                                                    // list of the users board, so a single post to that route 
                                                    // may not be the solution
                response => dispatch(actionCreators.addBoardSuccess(    response.id,
                                                                        response.title, 
                                                                        response.isPrivate, 
                                                                        response.lists, 
                                                                        response.tags)),
                error => dispatch(actionCreators.boardError('Create error : ' + error.message)),
            )
        }
    },
    
    removeBackendBoard: (id: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeBoardRequest(id))
            return API.delete('/boards', id).then(
                response => dispatch(actionCreators.boardSuccess('remove successful : ' + response.message)),
                error => dispatch(actionCreators.boardError('Remove error : ' + error.message)),
            )
        }
    },
}
