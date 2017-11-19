import { TEST } from '../testActions'
import { reducer } from './reducers'
import { ICheckList } from '../checkLists/types'

import { FETCH_CHECKLISTS, FETCH_CHECKLISTS_SUCCESS, FETCH_CHECKLISTS_ERROR } from './actions/fetchAll'
import { CREATE_CHECKLIST, CREATE_CHECKLIST_SUCCESS } from './../checkLists/actions/create'
import { UPDATE_CHECKLIST } from './../checkLists/actions/update'
import { REMOVE_CHECKLIST } from './../checkLists/actions/delete'

describe('CheckListsList reducer', () => {

    const checkListsDefault: ICheckList = {
        id: -1,
        name: 'Default CheckList',
        pos: 1
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({
            checkLists: [],
            error: null,
            isProcessing: false
        })
    })

    it('should handle FETCH_CHECKLISTS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CHECKLISTS,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            checkLists: [],
        })

        expect(
            reducer(
                {
                    checkLists: [checkListsDefault],
                    error: null,
                    isProcessing: false
                },
                {
                    type: FETCH_CHECKLISTS,
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            checkLists: [checkListsDefault],
        })
    })

    it('should handle FETCH_CHECKLISTS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CHECKLISTS_SUCCESS,
                    checkLists: [checkListsDefault]
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [checkListsDefault],
        })

        expect(
            reducer(
                {
                    checkLists: [],
                    error: null,
                    isProcessing: true
                },
                {
                    type: FETCH_CHECKLISTS_SUCCESS,
                    checkLists: [checkListsDefault]
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [checkListsDefault],
        })
    })

    it('should handle FETCH_CHECKLISTS_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CHECKLISTS_ERROR,
                    error: 'errorMessage'
                }
            )
        ).toEqual({
            error: 'errorMessage',
            isProcessing: false,
            checkLists: [],
        })

        expect(
            reducer(
                {
                    checkLists: [],
                    error: null,
                    isProcessing: true
                },
                {
                    type: FETCH_CHECKLISTS_ERROR,
                    error: 'errorMessage'
                }
            )
        ).toEqual({
            error: 'errorMessage',
            isProcessing: false,
            checkLists: [],
        })
    })

    it('should handle CREATE_CHECKLIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKLIST,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            checkLists: [checkListsDefault],
        })

        expect(
            reducer(
                {
                    checkLists: [],
                    error: null,
                    isProcessing: false
                },
                {
                    type: CREATE_CHECKLIST,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: true,
            checkLists: [checkListsDefault],
        })
    })

    it('should handle CREATE_CHECKLIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKLIST_SUCCESS,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [checkListsDefault],
        })

        expect(
            reducer(
                {
                    checkLists: [],
                    error: null,
                    isProcessing: false
                },
                {
                    type: CREATE_CHECKLIST_SUCCESS,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [checkListsDefault],
        })
    })

    it('should handle UPDATE_CHECKLIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CHECKLIST,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [],
        })

        expect(
            reducer(
                {
                    checkLists: [checkListsDefault],
                    error: null,
                    isProcessing: false
                },
                {
                    type: UPDATE_CHECKLIST,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [checkListsDefault],
        })
    })

    it('should handle REMOVE_CHECKLIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: REMOVE_CHECKLIST,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [],
        })

        expect(
            reducer(
                {
                    checkLists: [checkListsDefault],
                    error: null,
                    isProcessing: false
                },
                {
                    type: REMOVE_CHECKLIST,
                    checkList: checkListsDefault
                }
            )
        ).toEqual({
            error: null,
            isProcessing: false,
            checkLists: [],
        })
    })
})
