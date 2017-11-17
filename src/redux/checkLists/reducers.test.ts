import { TEST } from '../testActions'
import { reducer } from './reducers'
import { ICheckList } from '../checkLists/types'

import { CREATE_CHECKLIST_SUCCESS, CREATE_CHECKLIST_ERROR } from './actions/create'
import { REMOVE_CHECKLIST_SUCCESS, REMOVE_CHECKLIST_ERROR } from './actions/delete'
import { UPDATE_CHECKLIST_SUCCESS, UPDATE_CHECKLIST_ERROR } from './actions/update'

describe('Register reducer', () => {

    const checkListDefault: ICheckList = {
        id: -1,
        name: 'Default Check List',
        pos: 1
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            checkList: checkListDefault,
            error: null,
            isProcessing: false
        })
    })

    it('should handle CREATE_CHECKLIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKLIST_SUCCESS,
                    checkList: checkListDefault,
                }
            )
        ).toEqual({
            checkList: checkListDefault,
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkList: checkListDefault,
                    error: null,
                    isProcessing: false
                },
                {
                    type: CREATE_CHECKLIST_SUCCESS,
                    checkList: checkListDefault,
                }
            )
        ).toEqual({
            checkList: checkListDefault,
            error: null,
            isProcessing: false
        })
    })

    it('should handle CREATE_CHECKLIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKLIST_ERROR,
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
                    checkList: checkListDefault,
                    error: 'ID requested',
                    isProcessing: true
                },
                {
                    type: CREATE_CHECKLIST_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })
    })

    it('should handle REMOVE_CHECKLIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: REMOVE_CHECKLIST_SUCCESS,
                    checkList: checkListDefault,
                }
            )
        ).toEqual({
            checkList: null,
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkList: checkListDefault,
                    error: null,
                    isProcessing: true
                },
                {
                    type: REMOVE_CHECKLIST_SUCCESS,
                    checkList: checkListDefault,
                }
            )
        ).toEqual({
            checkList: null,
            error: null,
            isProcessing: false
        })
    })

    it('should handle REMOVE_CHECKLIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: REMOVE_CHECKLIST_ERROR,
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
                    checkList: checkListDefault,
                    error: 'ID requested',
                    isProcessing: false
                },
                {
                    type: REMOVE_CHECKLIST_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })
    })

    it('should handle UPDATE_CHECKLIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CHECKLIST_SUCCESS,
                    checkList: checkListDefault,
                }
            )
        ).toEqual({
            checkList: checkListDefault,
            error: null,
            isProcessing: false
        })

        expect(
            reducer(
                {
                    checkList: checkListDefault,
                    error: null,
                    isProcessing: false
                },
                {
                    type: UPDATE_CHECKLIST_SUCCESS,
                    checkList: checkListDefault,
                }
            )
        ).toEqual({
            checkList: checkListDefault,
            error: null,
            isProcessing: false
        })
    })

    it('should handle UPDATE_CHECKLIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CHECKLIST_ERROR,
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
                    checkList: checkListDefault,
                    error: 'ID requested',
                    isProcessing: false
                },
                {
                    type: UPDATE_CHECKLIST_ERROR,
                    error: 'ID requested',
                }
            )
        ).toEqual({
            error: 'ID requested',
            isProcessing: false
        })
    })
})
