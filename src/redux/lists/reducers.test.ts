import { TEST } from '../testActions'
import { reducer } from './reducers'
import { IList } from '../lists/types'

import { FETCH_BOARD_LISTS, FETCH_BOARD_LISTS_SUCCESS, FETCH_BOARD_LISTS_ERROR } from './actions/fetch'
import { CREATE_BOARD_LIST, CREATE_BOARD_LIST_SUCCESS, CREATE_BOARD_LIST_ERROR } from './actions/create'
import { DELETE_BOARD_LIST_ERROR, DELETE_BOARD_LIST } from './actions/delete'
import { UPDATE_BOARD_LIST, UPDATE_BOARD_LIST_ERROR } from './actions/update'
import { MOVE_BOARD_LIST, MOVE_BOARD_LIST_ERROR } from './actions/move'

describe('Register reducer', () => {

    const listDefault: IList = {
        id: -1,
        name: 'Default List',
        pos: 1
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            lists: [],
            error: null,
            isProcessing: false
        })
    })

    it('should handle FETCH_BOARD_LISTS', () => {
        expect(reducer(undefined, { type: FETCH_BOARD_LISTS })).toEqual({
            error: null,
            isProcessing: true,
            lists: []
        })
    })

    it('should handle FETCH_BOARD_LISTS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_BOARD_LISTS_SUCCESS,
                    lists: [listDefault],
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })

        expect(
            reducer(
                {
                    lists: [listDefault],
                    error: null,
                    isProcessing: false
                },
                {
                    type: FETCH_BOARD_LISTS_SUCCESS,
                    lists: [listDefault],
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })
    })

    it('should handle FETCH_BOARD_LISTS_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_BOARD_LISTS_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            lists: []
        })

        expect(
            reducer(
                {
                    lists: [listDefault],
                    error: 'ID requested',
                    isProcessing: false
                },
                {
                    type: FETCH_BOARD_LISTS_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            lists: [listDefault],
        })
    })

    it('should handle CREATE_BOARD_LIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_BOARD_LIST,
                    list: listDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })

        expect(
            reducer(
                {
                    lists: [listDefault],
                    error: null,
                    isProcessing: false
                },
                {
                    type: CREATE_BOARD_LIST,
                    list: listDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault, listDefault]
        })
    })

    it('should handle CREATE_BOARD_LIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_BOARD_LIST_SUCCESS,
                    list: listDefault,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    lists: []
                },
                {
                    type: CREATE_BOARD_LIST_SUCCESS,
                    list: listDefault,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })
    })

    it('should handle CREATE_BOARD_LIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_BOARD_LIST_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            lists: [],
            error: 'ID requested',
            isProcessing: false
        })

        expect(
            reducer(
                {
                    lists: [listDefault],
                    error: null,
                    isProcessing: false
                },
                {
                    type: CREATE_BOARD_LIST_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            lists: [listDefault],
            error: 'ID requested',
            isProcessing: false
        })
    })

    it('should handle UPDATE_BOARD_LIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_BOARD_LIST,
                    list: listDefault,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: true,
                    lists: []
                },
                {
                    type: UPDATE_BOARD_LIST,
                    list: listDefault,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            lists: [listDefault]
        })
    })

    it('should handle UPDATE_BOARD_LIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_BOARD_LIST_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            lists: [],
            error: 'ID requested',
            isProcessing: false
        })

        expect(
            reducer(
                {
                    lists: [listDefault],
                    error: null,
                    isProcessing: true
                },
                {
                    type: UPDATE_BOARD_LIST_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            lists: [listDefault],
            error: 'ID requested',
            isProcessing: true
        })
    })

    it('should handle MOVE_BOARD_LIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: MOVE_BOARD_LIST,
                    lists: [listDefault]
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    lists: [listDefault]
                },
                {
                    type: MOVE_BOARD_LIST,
                    lists: [listDefault]
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault]
        })
    })

    it('should handle MOVE_BOARD_LIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: MOVE_BOARD_LIST_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            lists: [],
            oldLists: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    lists: [listDefault]
                },
                {
                    type: MOVE_BOARD_LIST_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            lists: [listDefault],
            oldLists: []
        })
    })

    it('should handle DELETE_BOARD_LIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: DELETE_BOARD_LIST_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            lists: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    lists: [listDefault]
                },
                {
                    type: DELETE_BOARD_LIST_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false,
            lists: [listDefault]
        })
    })

    it('should handle DELETE_BOARD_LIST', () => {
        const listDefault2: IList = {
            id: 1,
            name: 'Default List 2',
            pos: 2
        }
        const listDefault3: IList = {
            id: 2,
            name: 'Default List 3',
            pos: 3
        }

        expect(
            reducer(
                undefined,
                {
                    type: DELETE_BOARD_LIST,
                    list: listDefault,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: []
        })

        expect(
            reducer(
                {
                    error: null,
                    isProcessing: false,
                    lists: [listDefault, listDefault2, listDefault3]
                },
                {
                    type: DELETE_BOARD_LIST,
                    list: listDefault2,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            lists: [listDefault, listDefault3]
        })
    })
})
