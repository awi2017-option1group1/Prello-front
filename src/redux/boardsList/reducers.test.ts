import { TEST } from '../testActions'
import { reducer } from './reducers'

import { IBoard } from '../boards/types'

import { FETCH_BOARDS, FETCH_BOARDS_ERROR, FETCH_BOARDS_SUCCESS } from './actions/fetchAll'
import { CREATE_BOARD, CREATE_BOARD_ERROR, CREATE_BOARD_SUCCESS } from './actions/create'

describe('Register reducer', () => {

    const boardModel: IBoard = {
        id: 1,
        name: 'Default Board',
        isPrivate: true
    }

    const boardsModel: IBoard[] = [
        boardModel
    ]

    const newBoardModel: IBoard = {
        id: 2,
        name: 'new board',
        isPrivate: true
    }

    const newBoardModelPartial: Partial<IBoard> = {
        name: 'new board'
    }

    const newBoardsModel: IBoard[] = [
        boardModel,
        newBoardModel
    ]

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            error: null,
            isProcessing: false,
            boards: []
        })
    })

    it('should handle FETCH_BOARDS', () => {
        expect(reducer(undefined, { type: FETCH_BOARDS })).toEqual({
            error: null,
            isProcessing: true,
            boards: []
        })
    })

    it('should handle FETCH_BOARDS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_BOARDS_SUCCESS,
                    boards: newBoardsModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            boards: newBoardsModel
        })

        expect(
            reducer(
                {
                    error: 'ID requested',
                    isProcessing: true,
                    boards: boardsModel
                },
                {
                    type: FETCH_BOARDS_SUCCESS,
                    boards: newBoardsModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            boards: newBoardsModel
        })
    })

    it('should handle FETCH_BOARD_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_BOARDS_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            boards: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    boards: boardsModel
                },
                {
                    type: FETCH_BOARDS_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            boards: boardsModel
        })
    })

    it('should handle CREATE_BOARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_BOARD,
                    board: newBoardModelPartial
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            boards: [newBoardModelPartial as IBoard]
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    boards: boardsModel
                },
                {
                    type: CREATE_BOARD,
                    board: newBoardModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            boards: newBoardsModel
        })
    })

    it('should handle CREATE_BOARD_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_BOARD_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            boards: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    boards: boardsModel
                },
                {
                    type: CREATE_BOARD_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            boards: boardsModel
        })
    })

    it('should handle CREATE_BOARD_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_BOARD_SUCCESS,
                    board: boardModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            boards: boardsModel
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    boards: boardsModel
                },
                {
                    type: CREATE_BOARD_SUCCESS,
                    board: newBoardModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            boards: newBoardsModel
        })
    })
}) 
