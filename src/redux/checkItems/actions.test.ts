
import { actionCreators as CreateActionCreators,
    CREATE_CHECKITEM_ERROR, CREATE_CHECKITEM_SUCCESS, CREATE_CHECKITEM } from './actions/create'
import { actionCreators as DeleteActionCreators,
    REMOVE_CHECKITEM, REMOVE_CHECKITEM_SUCCESS, REMOVE_CHECKITEM_ERROR } from './actions/delete'
import { actionCreators as UpdateActionCreators,
    UPDATE_CHECKITEM, UPDATE_CHECKITEM_SUCCESS, UPDATE_CHECKITEM_ERROR } from './actions/update'

import { ICheckItem } from '../checkItems/types'

import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

describe('CheckItems sync actions', () => {

    const checkItemModel: ICheckItem = {
        id: 1,
        name: 'Default Check Item',
        pos: 1,
        state: false,
    }

    /* CREATE ACTIONS */
    it('should create an action CREATE_CHECKITEM', () => {
        const expectedAction = {
            type: CREATE_CHECKITEM,
            checkItem: {
                name: 'DefaultCheckItem',
            },
            checkListId: 1
        }
        expect(CreateActionCreators.createCheckItemRequest(
            1, { name: 'DefaultCheckItem' }
        )).toEqual(expectedAction)
    })

    it('should create an action CREATE_CHECKITEM_SUCCESS', () => {
        const expectedAction = {
            type: CREATE_CHECKITEM_SUCCESS,
            checkItem: { id: 1, name: 'Default Check Item', pos: 1, state: false},
            checkListId: 1
        }
        expect(CreateActionCreators.createCheckItemSuccess(1, checkItemModel)).toEqual(expectedAction)
    })

    it('should create an action CREATE_CHECKITEM_ERROR ', () => {
        const expectedAction = {
            type: CREATE_CHECKITEM_ERROR,
            error: 'error message'
        }
        expect(CreateActionCreators.createCheckItemError('error message')).toEqual(expectedAction)
    })

    /* DELETE actions */
    it('should create an action REMOVE_CHECKITEM', () => {
        const expectedAction = {
            type: REMOVE_CHECKITEM,
            checkListId: 1,
            checkItem: { id: 1, name: 'Default Check Item', pos: 1, state: false}

        }
        expect(DeleteActionCreators.removeCheckItemRequest(1, checkItemModel)).toEqual(expectedAction)
    })

    it('should create an action REMOVE_CHECKITEM_SUCCESS', () => {
        const expectedAction = {
            type: REMOVE_CHECKITEM_SUCCESS,
            checkItem: { id: 1, name: 'Default Check Item', pos: 1, state: false}
        }
        expect(DeleteActionCreators.removeCheckItemRequestSuccess(checkItemModel)).toEqual(expectedAction)
    })

    it('should create an action REMOVE_CHECKITEM_ERROR', () => {
        const expectedAction = {
            type: REMOVE_CHECKITEM_ERROR,
            error: 'error message'
        }
        expect(DeleteActionCreators.removeCheckItemRequestError('error message')).toEqual(expectedAction)
    })

    /*Update*/
    it('should create an action UPDATE_CHECKITEM', () => {
        const expectedAction = {
            type: UPDATE_CHECKITEM,
            checkItem: { id: 1, name: 'CheckItem', pos: 4, state: false},
            checkListId: 2
        }
        expect(UpdateActionCreators.updateCheckItemRequest(
            2, { id: 1, name: 'CheckItem', pos: 4, state: false}
        )).toEqual(expectedAction)
    })

    it('should create an action UPDATE_CHECKITEM_SUCCESS', () => {
        const expectedAction = {
            type: UPDATE_CHECKITEM_SUCCESS,
            checkItem: { id: 1, name: 'Default Check Item', pos: 1, state: false},
        }
        expect(UpdateActionCreators.updateCheckItemRequestSuccess(checkItemModel)).toEqual(expectedAction)
    })

    it('should create an action UPDATE_CHECKITEM_ERROR', () => {
        const expectedAction = {
            type: UPDATE_CHECKITEM_ERROR,
            error: 'error message'
        }
        expect(UpdateActionCreators.updateCheckItemRequestError('error message')).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('CheckItems async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create UPDATE_CHECKITEM_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/checkitems/1')
        .reply(200, { id: 1, name: 'NewCheckItem', pos: 4, state: false} )

        const expectedActions = [
            { type: UPDATE_CHECKITEM,
                checkItem: { id: 1, name: 'NewCheckItem', pos: 4, state: false},
                checkListId: 2
            },
            { type: UPDATE_CHECKITEM_SUCCESS,
                checkItem: { id: 1, name: 'NewCheckItem', pos: 4, state: false}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(UpdateActionCreators.updateCheckItem(
            2,
            { id: 1, name: 'CheckItem', pos: 4, state: false},
            { name: 'NewCheckItem' }
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    /*
    it('should create CREATE_CHECKITEM_SUCCESS', () => {
        nock(getBaseUrl())
        .post('/checklists/2/checkitems')
        .reply(200, { id: 1, name: 'CheckItemCreated', pos: 4, state: false} )

        const expectedActions = [
            { type: CREATE_CHECKITEM,
                checkItem: { name: 'CheckItemCreated' },
                checkListId: 2
            },
            { type: CREATE_CHECKITEM_SUCCESS,
                checkItem: { id: 1, name: 'CheckItemCreated', pos: 4, state: false},
                checkListId: 2
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(CreateActionCreators.createCheckItemFromCheckListId(
            2, { name: 'CheckItemCreated'}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
    */

    it('should create REMOVE_CHECKITEM_SUCCESS', () => {
        nock(getBaseUrl())
        .delete('/checkitems/1')
        .reply(200, { id: 1, name: 'CheckItem', pos: 4, state: false } )

        const expectedActions = [
            { type: REMOVE_CHECKITEM,
                checkItem: { id: 1, name: 'CheckItem', pos: 4, state: false},
                checkListId: 2
            },
            { type: REMOVE_CHECKITEM_SUCCESS,
                checkItem: { id: 1, name: 'CheckItem', pos: 4, state: false}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(DeleteActionCreators.removeCheckItem(
            2, { id: 1, name: 'CheckItem', pos: 4, state: false}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

})
