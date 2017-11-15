
import { actionCreators as CreateActionCreators,
    CREATE_CHECKLIST_ERROR, CREATE_CHECKLIST_SUCCESS, CREATE_CHECKLIST } from './actions/create'
import { actionCreators as FetchActionCreators,
    FETCH_CHECKLIST, FETCH_CHECKLIST_SUCCESS } from './actions/fetch'
import { actionCreators as DeleteActionCreators,
    REMOVE_CHECKLIST, REMOVE_CHECKLIST_SUCCESS, REMOVE_CHECKLIST_ERROR } from './actions/delete'
import { actionCreators as UpdateActionCreators,
    UPDATE_CHECKLIST, UPDATE_CHECKLIST_SUCCESS, UPDATE_CHECKLIST_ERROR } from './actions/update'

import { ICheckList } from '../checkLists/types'

import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

describe('CheckLists sync actions', () => {

    const checkListModel: ICheckList = {
        id: -1,
        name: 'Default Check List',
        pos: 1,
        cardId: -1,
        checkItems: []
    }

    /* CREATE ACTIONS */
    it('should create an action to notify a success CHECKLIST creation request', () => {
        const expectedAction = {
            type: CREATE_CHECKLIST,
            checkList: {
                id: -1,
                name: 'Default Check List',
                pos: 1,
                cardId: -1,
                checkItems: []
            }

        }
        expect(CreateActionCreators.createCheckListRequest(checkListModel)).toEqual(expectedAction)
    })

    it('should create an action to notify a success CHECKLIST creation', () => {
        const expectedAction = {
            type: CREATE_CHECKLIST_SUCCESS,
            checkList: {
                id: -1,
                name: 'Default Check List',
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
            error: 'error message'
        }
        expect(CreateActionCreators.createCheckListError('error message')).toEqual(expectedAction)
    })

    /* FETCH actions */
    it('should create an action FETCH_CHECKLIST', () => {
        const expectedAction = {
            type: FETCH_CHECKLIST,
        }
        expect(FetchActionCreators.fetchCheckListRequest()).toEqual(expectedAction)
    })

    it('should create an action FETCH_CHECKLIST_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_CHECKLIST_SUCCESS,
            checkList: {
                id: -1,
                name: 'Default Check List',
                pos: 1,
                cardId: -1,
                checkItems: []
            }
        }
        expect(FetchActionCreators.fetchCheckListSuccess(checkListModel)).toEqual(expectedAction)
    })

    /* DELETE actions */
    it('should create an action REMOVE_CHECKLIST', () => {
        const expectedAction = {
            type: REMOVE_CHECKLIST,
            checkList: {
                id: -1,
                name: 'Default Check List',
                pos: 1,
                cardId: -1,
                checkItems: []
            }
        }
        expect(DeleteActionCreators.removeCheckListRequest(checkListModel)).toEqual(expectedAction)
    })

    it('should create an action REMOVE_CHECKLIST_SUCCESS', () => {
        const expectedAction = {
            type: REMOVE_CHECKLIST_SUCCESS,
            checkList: {
                id: -1,
                name: 'Default Check List',
                pos: 1,
                cardId: -1,
                checkItems: []
            }
        }
        expect(DeleteActionCreators.removeCheckListRequestSucess(checkListModel)).toEqual(expectedAction)
    })

    it('should create an action REMOVE_CHECKLIST_ERROR ', () => {
        const expectedAction = {
            type: REMOVE_CHECKLIST_ERROR,
            error: 'error message'
        }
        expect(DeleteActionCreators.removeCheckListRequestError('error message')).toEqual(expectedAction)
    })

    /*Update*/
    it('should create an action UPDATE_CHECKLIST', () => {
        const expectedAction = {
            type: UPDATE_CHECKLIST,
        }
        expect(UpdateActionCreators.updateCheckListRequest()).toEqual(expectedAction)
    })

    it('should create an action UPDATE_CHECKLIST_SUCCESS', () => {
        const expectedAction = {
            type: UPDATE_CHECKLIST_SUCCESS,
            checkList: {
                id: -1,
                name: 'Default Check List',
                pos: 1,
                cardId: -1,
                checkItems: []
            }
        }
        expect(UpdateActionCreators.updateCheckListRequestSuccess(checkListModel)).toEqual(expectedAction)
    })

    it('should create an action UPDATE_CHECKLIST_ERROR', () => {
        const expectedAction = {
            type: UPDATE_CHECKLIST_ERROR,
            error: 'error message'
        }
        expect(UpdateActionCreators.updateCheckListRequestError('error message')).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('CheckLists async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create FETCH_CHECKLIST_SUCCESS', () => {
        nock(getBaseUrl())
        .get('/checklists/1')
        .reply(200, { id: 1, name: 'CheckList', pos: 4, cardId: 4, checkItems: []} )

        const expectedActions = [
            { type: FETCH_CHECKLIST },
            { type: FETCH_CHECKLIST_SUCCESS,
                checkList: { id: 1, name: 'CheckList', pos: 4, cardId: 4, checkItems: []}
            }
        ]
        const store = mockStore()

        return store.dispatch(FetchActionCreators.fetchCheckList(1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create UPDATE_CHECKLIST_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/checklists/1')
        .reply(200, { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []} )

        const expectedActions = [
            { type: UPDATE_CHECKLIST },
            { type: UPDATE_CHECKLIST_SUCCESS,
                checkList: { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []}
            }
        ]
        const store = mockStore()

        return store.dispatch(UpdateActionCreators.updateBackendCheckList(
            { id: 1, name: 'CheckList', pos: 4, cardId: 4, checkItems: []},
            { name: 'NewCheckList' }
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create UPDATE_CHECKLIST_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/checklists/1')
        .reply(200, { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []} )

        const expectedActions = [
            { type: UPDATE_CHECKLIST },
            { type: UPDATE_CHECKLIST_SUCCESS,
                checkList: { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []}
            }
        ]
        const store = mockStore()

        return store.dispatch(UpdateActionCreators.updateCheckListTitle(
            1, { name: 'NewCheckList' }
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    /* Problem here
    it('should create CREATE_CHECKLIST_SUCCESS', () => {
        nock(getBaseUrl())
        .post('/cards/4/checklists')
        .reply(200, { id: 1, name: 'EmptyName', pos: 4, cardId: 4, checkItems: []} )

        const expectedActions = [
            { type: CREATE_CHECKLIST,
                checkList: { id: 1, name: 'EmptyName', pos: 4, cardId: 4, checkItems: []}
            },
            { type: CREATE_CHECKLIST_SUCCESS,
                checkList: { id: 1, name: 'EmptyName', pos: 4, cardId: 4, checkItems: []}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(CreateActionCreators.createCheckListFromCardId( 4 )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
    */

    it('should create REMOVE_CHECKLIST_SUCCESS', () => {
        nock(getBaseUrl())
        .delete('/checklists/1')
        .reply(200, { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []} )

        const expectedActions = [
            { type: REMOVE_CHECKLIST,
                checkList: { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []}
            },
            { type: REMOVE_CHECKLIST_SUCCESS,
                checkList: { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]

        const store = mockStore()

        return store.dispatch(DeleteActionCreators.removeCheckList(
            { id: 1, name: 'NewCheckList', pos: 4, cardId: 4, checkItems: []}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

})
