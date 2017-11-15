
import { actionCreators as CreateActionCreators, CREATE_CHECKLIST_ERROR, CREATE_CHECKLIST_SUCCESS, CREATE_CHECKLIST } from './actions/create'
/*import { actionCreators as FetchActionCreators, FETCH_CHECKITEM, FETCH_CHECKITEM_SUCCESS } from './actions/fetch'
import { actionCreators as DeleteActionCreators, REMOVE_CHECKITEM, REMOVE_CHECKITEM_SUCCESS, REMOVE_CHECKITEM_ERROR } from './actions/delete'
import { actionCreators as UpdateActionCreators, UPDATE_CHECKITEM, UPDATE_CHECKITEM_SUCCESS, UPDATE_CHECKITEM_ERROR } from './actions/update'
*/

import { ICheckList } from '../checkLists/types'

/*
import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'
*/

describe('CheckLists sync actions', () => {

    const checkListModel: ICheckList = {
        id: -1,
        name: 'Default Check Item',
        pos: 1,
        cardId: -1,
        checkItems: []
    }

    /* CREATE ACTIONS */
    it('should create an action to notify a success CHECKLIST creation request', () => {
        const expectedAction = {
            type: CREATE_CHECKLIST,
        }
        expect(CreateActionCreators.createCheckListRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success CHECKLIST creation', () => {
        const expectedAction = {
            type: CREATE_CHECKLIST_SUCCESS,
            checkList: {
                id: -1,
                name: 'Default Check Item',
                pos: 1,
                cardId: -1,
                checkItems: []
            }
        }
        expect(CreateActionCreators.createCheckListSuccess(checkListModel)).toEqual(expectedAction)
    })

    it('should create an action to create a CHECKLIST error', () => {
        const expectedAction = {
            type: CREATE_CHECKLIST_ERROR,
            error: "error message"
        }
        expect(CreateActionCreators.createCheckListError("error message")).toEqual(expectedAction)
    })
})

/*
const mockStore = configureMockStore([thunk])

describe('Board async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })


    it('should create FETCH_CHECKITEM_SUCCESS', () => {
        nock(getBaseUrl())
        .get('checkitems/8')
        .reply(200, { checkItem: [{ id: 8, name: 'EmptyName', pos: 4, state: false, checkListId: 4}] })

        const expectedActions = [
            { type: FETCH_CHECKITEM },
            { type: FETCH_CHECKITEM_SUCCESS,
                checkItem: [{ id: 8, name: 'EmptyName', pos: 4, state: false, checkListId: 4}]
            }
        ]

        const store = mockStore({ checkItem: [{ id: 8, name: 'EmptyName', pos: 4, state: false, checkListId: 4}] })

        return store.dispatch(FetchActionCreators.fetchCheckItem(8)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create CREATE_CHECKITEM_SUCCESS', () => {
        nock(getBaseUrl())
        .post('/checklists/1/checkItems')
        .reply(200, { checkItem: [{ id: 1, name: 'CheckItem', pos: 4, state: false, checkListId: 4}] })

        const expectedActions = [
            { type: CREATE_CHECKITEM },
            { type: CREATE_CHECKITEM_SUCCESS,
                checkItem: [{ id: 1, name: 'CheckItem', pos: 4, state: false, checkListId: 4}]
                // I don't know the id of the created CheckItem
            }
        ]

        const store = mockStore({ checkItem: [{ id: 1, name: 'CheckItem', pos: 4, state: false, checkListId: 4}] })

        return store.dispatch(CreateActionCreators.createCheckItemFromCheckListId(4, {name: "CheckItem"})).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create REMOVE_CHECKITEM_SUCCESS', () => {
        nock(getBaseUrl())
        .delete('/checkItems/1')
        .reply(200, true)

        const expectedActions = [
            { type: REMOVE_CHECKITEM },
            { type: REMOVE_CHECKITEM_SUCCESS,
                checkItem: null
            }
        ]

        const store = mockStore({ id: 1, name: 'CheckItem', pos: 4, state: false, checkListId: 4})

        return store.dispatch(DeleteActionCreators.removeBackendCheckItem(
            { id: 1, name: 'CheckItem', pos: 4, state: false, checkListId: 4}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create UPDATE_CHECKITEM_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/checkItems/1')
        .reply(200, { checkItem: [{ id: 1, name: 'NewCheckItem', pos: 4, state: false, checkListId: 4}] })

        const expectedActions = [
            { type: UPDATE_CHECKITEM },
            { type: UPDATE_CHECKITEM_SUCCESS,
                checkItem: [{ id: 1, name: 'NewCheckItem', pos: 4, state: false, checkListId: 4}]
            }
        ]

        const store = mockStore({ checkItem: [{ id: 1, name: 'CheckItem', pos: 4, state: false, checkListId: 4}] })

        return store.dispatch(UpdateActionCreators.updateBackendCheckItem(
            { id: 1, name: 'CheckItem', pos: 4, state: false, checkListId: 4},
            { id: 1, name: 'NewCheckItem', pos: 4, state: false, checkListId: 4}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
})*/
