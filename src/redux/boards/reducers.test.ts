import { TEST } from '../testActions'
import { reducer } from './reducers'

import { IBoard } from './types'
import { IList } from '../lists/types'
import { IUser } from '../users/types'

import { FETCH_BOARD, FETCH_BOARD_SUCCESS, FETCH_BOARD_ERROR } from './actions/fetch'
import { UPDATE_BOARD, UPDATE_BOARD_ERROR, UPDATE_BOARD_SUCCESS } from './actions/update'
import { OPEN_CREATE_CARD_MODEL, CLOSE_CREATE_CARD_MODAL } from './actions/openModal'

describe('Register reducer', () => {
    const owner: IUser = {
        id: -1,
        username: '',
        email: '',
        password: '',
        notificationsEnabled: false,
    }

    const listModel: IList = {
        id: 1,
        name: 'Default List',
        pos: 1
    }

    const newListModel: IList = {
        id: 2,
        name: 'List 2',
        pos: 2
    }

    const boardModel: IBoard = {
        id: 1,
        name: 'Default Board',
        isPrivate: true,
        owner: owner
    }

    const boardDefault: IBoard = {
        id: -1,
        name: '',
        isPrivate: false,
        owner: owner
    }

    const newBoardModel: IBoard = {
        id: 2,
        name: 'new board',
        isPrivate: true,
        owner: owner
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            board: {
                id: -1,
                name: '',
                isPrivate: false,
                owner: {
                    id: -1,
                    username: '',
                    email: '',
                    password: '',
                    notificationsEnabled: false,
                }
            },
            error: null,
            isProcessing: false,
            listToAppendCard: null,
            users: []
        })
    })

    it('should handle FETCH_BOARD', () => {
        expect(reducer(undefined, { type: FETCH_BOARD })).toEqual({
            error: null,
            isProcessing: true,
            board: boardDefault,
            listToAppendCard: null,
            users: []
        })
    })

    it('should handle FETCH_BOARD_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_BOARD_SUCCESS,
                    board: newBoardModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: newBoardModel,
            listToAppendCard: null,
            users: []
        })

        expect(
            reducer(
                {
                    error: 'ID requested',
                    isProcessing: true,
                    board: boardModel,
                    listToAppendCard: listModel,
                    users: []
                },
                {
                    type: FETCH_BOARD_SUCCESS,
                    board: newBoardModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: newBoardModel,
            listToAppendCard: listModel,
            users: []
        })
    })

    it('should handle FETCH_BOARD_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_BOARD_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            board: boardDefault,
            listToAppendCard: null,
            users: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    board: boardDefault,
                    listToAppendCard: null,
                    users: []
                },
                {
                    type: FETCH_BOARD_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            board: boardDefault,
            listToAppendCard: null,
            users: []
        })
    })

    it('should handle UPDATE_BOARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_BOARD
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: boardDefault,
            listToAppendCard: null,
            users: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    board: boardModel,
                    listToAppendCard: listModel,
                    users: []
                },
                {
                    type: UPDATE_BOARD
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            board: boardModel,
            listToAppendCard: listModel,
            users: []
        })
    })

    it('should handle UPDATE_BOARD_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_BOARD_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            board: boardDefault,
            listToAppendCard: null,
            users: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    board: boardModel,
                    listToAppendCard: listModel,
                    users: []
                },
                {
                    type: UPDATE_BOARD_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            board: boardModel,
            listToAppendCard: listModel,
            users: []
        })
    })

    it('should handle UPDATE_BOARD_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_BOARD_SUCCESS,
                    board: newBoardModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: newBoardModel,
            listToAppendCard: null,
            users: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    board: boardModel,
                    listToAppendCard: listModel,
                    users: []
                },
                {
                    type: UPDATE_BOARD_SUCCESS,
                    board: newBoardModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: newBoardModel,
            listToAppendCard: listModel,
            users: []
        })
    })

    it('should handle OPEN_CREATE_CARD_MODEL', () => {
        expect(
            reducer(
                undefined,
                {
                    type: OPEN_CREATE_CARD_MODEL,
                    list: newListModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: boardDefault,
            listToAppendCard: newListModel,
            users: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    board: boardModel,
                    listToAppendCard: listModel,
                    users: []
                },
                {
                    type: OPEN_CREATE_CARD_MODEL,
                    list: newListModel
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: boardModel,
            listToAppendCard: newListModel,
            users: []
        })
    })

    it('should handle CLOSE_CREATE_CARD_MODAL', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CLOSE_CREATE_CARD_MODAL
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: boardDefault,
            listToAppendCard: null,
            users: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    board: boardModel,
                    listToAppendCard: listModel,
                    users: []
                },
                {
                    type: CLOSE_CREATE_CARD_MODAL
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            board: boardModel,
            listToAppendCard: null,
            users: []
        })
    })

})
