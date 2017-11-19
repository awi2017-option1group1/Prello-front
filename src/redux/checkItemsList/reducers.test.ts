import { TEST } from '../testActions'
import { reducer } from './reducers'
import { ICheckItem } from '../checkItems/types'
import { ICheckList } from '../checkLists/types'

import { FETCH_CHECKLISTS_SUCCESS } from '../checkListsList/actions/fetchAll'
import { CREATE_CHECKLIST_SUCCESS } from '../checkLists/actions/create'
import { CREATE_CHECKITEM, CREATE_CHECKITEM_SUCCESS } from '../checkItems/actions/create'
import { UPDATE_CHECKITEM } from '../checkItems/actions/update'
import { REMOVE_CHECKITEM } from '../checkItems/actions/delete'
import { FETCH_CHECKITEMS, FETCH_CHECKITEMS_ERROR, FETCH_CHECKITEMS_SUCCESS } from './actions/fetchAll'

describe('Register reducer', () => {

    const checkItemDefault: ICheckItem = {
        id: 1,
        name: 'DefaultCheckItem',
        pos: 1,
        state: false
    }

    const checkListDefault: ICheckList = {
        id: 9,
        name: 'DefaultCheckList',
        pos: 1,
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual( {} )
    })

    it('should handle FETCH_CHECKLISTS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CHECKLISTS_SUCCESS,
                    checkLists: [checkListDefault],
                }
            )
        ).toEqual({
            9: { error: null, isProcessing: false, items: [] }
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
            9: { error: null, isProcessing: false, items: [] }
        })
    })

    it('should handle FETCH_CHECKITEMS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CHECKITEMS,
                    checkListId: 9,
                }
            )
        ).toEqual({
            9: { error: null, isProcessing: true, items: [] }
        })
    })

    it('should handle FETCH_CHECKITEMS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CHECKITEMS_SUCCESS,
                    checkListId: 9,
                    checkItems: [checkItemDefault]
                }
            )
        ).toEqual({
            9: { error: null, isProcessing: false, items: [checkItemDefault] }
        })
    })

    it('should handle FETCH_CHECKITEMS_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CHECKITEMS_ERROR,
                    checkListId: 9,
                    error: 'messageError'
                }
            )
        ).toEqual({
            9: { error: 'messageError', isProcessing: false, items: [] }
        })
    })

    it('should handle CREATE_CHECKITEM', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKITEM,
                    checkListId: 9,
                    checkItem: checkItemDefault
                }
            )
        ).toEqual({
            9: { error: null, isProcessing: false, items: [checkItemDefault] }
        })
    })

    it('should handle CREATE_CHECKITEM_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CHECKITEM_SUCCESS,
                    checkListId: 9,
                    checkItem: checkItemDefault
                }
            )
        ).toEqual({
            9: { error: null, isProcessing: false, items: [checkItemDefault] }
        })
    })

    it('should handle UPDATE_CHECKITEM', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CHECKITEM,
                    checkListId: 9,
                    checkItem: checkItemDefault
                }
            )
        ).toEqual({
            9: { error: null, isProcessing: false, items: [] }
        })
    })

    it('should handle REMOVE_CHECKITEM', () => {
        expect(
            reducer(
                undefined,
                {
                    type: REMOVE_CHECKITEM,
                    checkListId: 9,
                    checkItem: checkItemDefault
                }
            )
        ).toEqual({
            9: { error: null, isProcessing: false, items: [] }
        })
    })

})
