import { TEST } from '../testActions'
import { reducer } from './reducers'
import { ICheckItem } from '../checkItems/types'

import { CREATE_CHECKITEM_SUCCESS, CREATE_CHECKITEM_ERROR } from './actions/create'
import { REMOVE_CHECKITEM_SUCCESS, REMOVE_CHECKITEM_ERROR } from './actions/delete'
import { UPDATE_CHECKITEM_SUCCESS, UPDATE_CHECKITEM_ERROR } from './actions/update'

describe('Register reducer', () => {

    const checkItemDefault: ICheckItem = {
        id: -1,
        name: 'Default Check Item',
        pos: 1,
        state: false
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            checkItem: checkItemDefault,
            error: null,
            isProcessing: false
        })
    })

    it('should handle CREATE_CHECKITEM_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKITEM_SUCCESS,
                    checkItem: checkItemDefault,
                    checkListId: 1
                }
            )
        ).toEqual({
            checkItem: checkItemDefault,
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkItem: checkItemDefault,
                    error: null,
                    isProcessing: false
                },
                {
                    type: CREATE_CHECKITEM_SUCCESS,
                    checkItem: checkItemDefault,
                    checkListId: 1
                }
            )
        ).toEqual({
            checkItem: checkItemDefault,
            error: null,
            isProcessing: false
        })
    })

    it('should handle CREATE_CHECKITEM_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKITEM_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkItem: checkItemDefault,
                    error: 'ID requested',
                    isProcessing: true
                },
                {
                    type: CREATE_CHECKITEM_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })
    })

    it('should handle REMOVE_CHECKITEM_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: REMOVE_CHECKITEM_SUCCESS,
                    checkItem: checkItemDefault,
                }
            )
        ).toEqual({
            checkItem: null,
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkItem: checkItemDefault,
                    error: null,
                    isProcessing: true
                },
                {
                    type: REMOVE_CHECKITEM_SUCCESS,
                    checkItem: checkItemDefault,
                }
            )
        ).toEqual({
            checkItem: null,
            error: null,
            isProcessing: false
        })
    })

    it('should handle REMOVE_CHECKITEM_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: REMOVE_CHECKITEM_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkItem: checkItemDefault,
                    error: 'ID requested',
                    isProcessing: false
                },
                {
                    type: REMOVE_CHECKITEM_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })
    })

    it('should handle UPDATE_CHECKITEM_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CHECKITEM_SUCCESS,
                    checkItem: checkItemDefault,
                }
            )
        ).toEqual({
            checkItem: checkItemDefault,
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkItem: checkItemDefault,
                    error: null,
                    isProcessing: false
                },
                {
                    type: UPDATE_CHECKITEM_SUCCESS,
                    checkItem: checkItemDefault,
                }
            )
        ).toEqual({
            checkItem: checkItemDefault,
            error: null,
            isProcessing: false
        })
    })

    it('should handle UPDATE_CHECKITEM_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CHECKITEM_ERROR,
                    error: 'ID requested'
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkItem: checkItemDefault,
                    error: 'ID requested',
                    isProcessing: false
                },
                {
                    type: UPDATE_CHECKITEM_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })
    })
})
