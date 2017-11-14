
import { actionCreators as CreateActionCreators, CREATE_CHECKITEM_ERROR, CREATE_CHECKITEM_SUCCESS, CREATE_CHECKITEM } from './actions/create'
import { actionCreators as FetchActionCreators, FETCH_CHECKITEM, FETCH_CHECKITEM_SUCCESS } from './actions/fetch'
import { actionCreators as DeleteActionCreators, REMOVE_CHECKITEM, REMOVE_CHECKITEM_SUCCESS, REMOVE_CHECKITEM_ERROR } from './actions/delete'
import { actionCreators as UpdateActionCreators, UPDATE_CHECKITEM, UPDATE_CHECKITEM_SUCCESS, UPDATE_CHECKITEM_ERROR } from './actions/update'

import { ICheckItem } from '../checkItems/types'

/*
import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'
*/

describe('CheckItems sync actions', () => {

    const checkItemModel: ICheckItem = {
        id: -1,
        name: 'Default Check Item',
        pos: 1,
        state: false,
        checkListId: -1
    }

    /* CREATE ACTIONS */
    it('should create an action to notify a success CHECKITEM creation request', () => {
        const expectedAction = {
            type: CREATE_CHECKITEM,
        }
        expect(CreateActionCreators.createCheckItemRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success CHECKITEM creation', () => {
        const expectedAction = {
            type: CREATE_CHECKITEM_SUCCESS,
            checkItem: {
                id: -1,
                name: 'Default Check Item',
                pos: 1,
                state: false,
                checkListId: -1
            }
        }
        expect(CreateActionCreators.createCheckItemSuccess(checkItemModel)).toEqual(expectedAction)
    })

    it('should create an action to create a CHECKITEM error', () => {
        const expectedAction = {
            type: CREATE_CHECKITEM_ERROR,
            error: "error message"
        }
        expect(CreateActionCreators.createCheckItemError("error message")).toEqual(expectedAction)
    })

    /* FETCH actions */
    it('should create an action to notify a success CHECKITEM fetch', () => {
        const expectedAction = {
            type: FETCH_CHECKITEM,
        }
        expect(FetchActionCreators.fetchCheckItemRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a success CHECKITEM fetch', () => {
        const expectedAction = {
            type: FETCH_CHECKITEM_SUCCESS,
            checkItem: {
                id: -1,
                name: 'Default Check Item',
                pos: 1,
                state: false,
                checkListId: -1
            }
        }
        expect(FetchActionCreators.fetchCheckItemSuccess(checkItemModel)).toEqual(expectedAction)
    })

    /* DELETE actions */
    it('should create an action to notify a success CHECKITEM delete request', () => {
        const expectedAction = {
            type: REMOVE_CHECKITEM,
        }
        expect(DeleteActionCreators.removeCheckItemRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a successfull CHECKITEM delete', () => {
        const expectedAction = {
            type: REMOVE_CHECKITEM_SUCCESS,
            checkItem: {
                id: -1,
                name: 'Default Check Item',
                pos: 1,
                state: false,
                checkListId: -1
            }
        }
        expect(DeleteActionCreators.removeCheckItemRequestSucess(checkItemModel)).toEqual(expectedAction)
    })

    it('should create an action to notify a CHECKITEM delete error', () => {
        const expectedAction = {
            type: REMOVE_CHECKITEM_ERROR,
            error: "error message"
        }
        expect(DeleteActionCreators.removeCheckItemRequestError("error message")).toEqual(expectedAction)
    })

    /*Update*/
    it('should create an action to notify a success CHECKITEM update', () => {
        const expectedAction = {
            type: UPDATE_CHECKITEM,
        }
        expect(UpdateActionCreators.updateCheckItemRequest()).toEqual(expectedAction)
    })

    it('should create an action to notify a successfull CHECKITEM update', () => {
        const expectedAction = {
            type: UPDATE_CHECKITEM_SUCCESS,
            checkItem: {
                id: -1,
                name: 'Default Check Item',
                pos: 1,
                state: false,
                checkListId: -1
            }
        }
        expect(UpdateActionCreators.updateCheckItemRequestSuccess(checkItemModel)).toEqual(expectedAction)
    })

    it('should create an action to notify a CHECKITEM update error', () => {
        const expectedAction = {
            type: UPDATE_CHECKITEM_ERROR,
            error: "error message"
        }
        expect(UpdateActionCreators.updateCheckItemRequestError("error message")).toEqual(expectedAction)
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
