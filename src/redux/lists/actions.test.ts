import { actionCreators as CreateActionCreators,
    CREATE_BOARD_LIST, CREATE_BOARD_LIST_ERROR, CREATE_BOARD_LIST_SUCCESS} from './actions/create'
import { actionCreators as FetchActionCreators,
    FETCH_BOARD_LISTS, FETCH_BOARD_LISTS_SUCCESS, FETCH_BOARD_LISTS_ERROR } from './actions/fetch'
import { actionCreators as DeleteActionCreators,
    DELETE_BOARD_LIST, DELETE_BOARD_LIST_ERROR, DELETE_BOARD_LIST_SUCCESS} from './actions/delete'
import { actionCreators as UpdateActionCreators,
    UPDATE_BOARD_LIST, UPDATE_BOARD_LIST_SUCCESS, UPDATE_BOARD_LIST_ERROR } from './actions/update'
import { actionCreators as MoveActionCreators,
    MOVE_BOARD_LIST, MOVE_BOARD_LIST_SUCCESS, MOVE_BOARD_LIST_ERROR } from './actions/move'

import { IList } from '../lists/types'

import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

describe('Lists sync actions', () => {

    const listModel: IList = {
        id: 1,
        name: 'Default List',
        pos: 1,
    }

    it('should create an action CREATE_BOARD_LIST', () => {
        const expectedAction = {
            type: CREATE_BOARD_LIST,
            list: {
                id: 1,
                name: 'Default List',
                pos: 1,
            }
        }
        expect(CreateActionCreators.createBoardListRequest(listModel)).toEqual(expectedAction)
    })

    it('should create an action CREATE_BOARD_LIST_ERROR', () => {
        const expectedAction = {
            type: CREATE_BOARD_LIST_ERROR,
            error: 'error message'
        }
        expect(CreateActionCreators.createBoardListRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action CREATE_BOARD_LIST_SUCCESS', () => {
        const expectedAction = {
            type: CREATE_BOARD_LIST_SUCCESS,
            list: {
                id: 1,
                name: 'Default List',
                pos: 1,
            }
        }
        expect(CreateActionCreators.createBoardListRequestSuccess(listModel)).toEqual(expectedAction)
    })

    it('should create an action DELETE_BOARD_LIST', () => {
        const expectedAction = {
            type: DELETE_BOARD_LIST,
            list: {
                id: 1,
                name: 'Default List',
                pos: 1,
            }
        }
        expect(DeleteActionCreators.deleteBoardListRequest(listModel)).toEqual(expectedAction)
    })

    it('should create an action DELETE_BOARD_LIST_ERROR', () => {
        const expectedAction = {
            type: DELETE_BOARD_LIST_ERROR,
            error: 'error message'
        }
        expect(DeleteActionCreators.deleteBoardListRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action DELETE_BOARD_LIST_SUCCESS', () => {
        const expectedAction = {
            type: DELETE_BOARD_LIST_SUCCESS,
            list: {
                id: 1,
                name: 'Default List',
                pos: 1,
            }
        }
        expect(DeleteActionCreators.deleteBoardListRequestSuccess(listModel)).toEqual(expectedAction)
    })

    it('should create an action FETCH_BOARD_LISTS', () => {
        const expectedAction = {
            type: FETCH_BOARD_LISTS,
        }
        expect(FetchActionCreators.fetchBoardListsRequest()).toEqual(expectedAction)
    })

    it('should create an action FETCH_BOARD_LISTS_ERROR', () => {
        const expectedAction = {
            type: FETCH_BOARD_LISTS_ERROR,
            error: 'error message'
        }
        expect(FetchActionCreators.fetchBoardListsRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action FETCH_BOARD_LISTS_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_BOARD_LISTS_SUCCESS,
            lists: [{
                id: 1,
                name: 'Default List',
                pos: 1,
            }]
        }
        expect(FetchActionCreators.fetchBoardListsRequestSuccess([listModel])).toEqual(expectedAction)
    })

    it('should create an action UPDATE_BOARD_LIST', () => {
        const expectedAction = {
            type: UPDATE_BOARD_LIST,
            list: {
                id: 1,
                name: 'Default List',
                pos: 1,
            }
        }
        expect(UpdateActionCreators.updateBoardListRequest(listModel)).toEqual(expectedAction)
    })

    it('should create an action UPDATE_BOARD_LIST_ERROR', () => {
        const expectedAction = {
            type: UPDATE_BOARD_LIST_ERROR,
            error: 'error message'
        }
        expect(UpdateActionCreators.updateBoardListRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action UPDATE_BOARD_LIST_SUCCESS', () => {
        const expectedAction = {
            type: UPDATE_BOARD_LIST_SUCCESS,
            list: {
                id: 1,
                name: 'Default List',
                pos: 1,
            }
        }
        expect(UpdateActionCreators.updateBoardListRequestSuccess(listModel)).toEqual(expectedAction)
    })

    it('should create an action MOVE_BOARD_LIST', () => {
        const expectedAction = {
            type: MOVE_BOARD_LIST,
            lists: [{
                id: 1,
                name: 'Default List',
                pos: 1,
            }]
        }
        expect(MoveActionCreators.moveBoardListRequest([listModel])).toEqual(expectedAction)
    })

    it('should create an action MOVE_BOARD_LIST_ERROR', () => {
        const expectedAction = {
            type: MOVE_BOARD_LIST_ERROR,
            error: 'error message'
        }
        expect(MoveActionCreators.moveBoardListRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action MOVE_BOARD_LIST_SUCCESS', () => {
        const expectedAction = {
            type: MOVE_BOARD_LIST_SUCCESS,
            lists: [{
                id: 1,
                name: 'Default List',
                pos: 1,
            }]
        }
        expect(MoveActionCreators.moveBoardListRequestSuccess([listModel])).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('Lists async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create FETCH_BOARD_LISTS_SUCCESS', () => {
        nock(getBaseUrl())
        .get('/boards/1/lists')
        .reply(200, [ { id: 1, name: 'CheckList', pos: 4},
                      { id: 2, name: 'CheckList2', pos: 5} ])

        const expectedActions = [
            { type: FETCH_BOARD_LISTS },
            { type: FETCH_BOARD_LISTS_SUCCESS,
                lists: [ { id: 1, name: 'CheckList', pos: 4},
                         { id: 2, name: 'CheckList2', pos: 5} ]
            }
        ]
        const store = mockStore()

        return store.dispatch(FetchActionCreators.fetchBoardLists(1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create DELETE_BOARD_LIST_SUCCESS', () => {
        nock(getBaseUrl())
        .delete('/lists/1')
        .reply(200, { id: 1, name: 'List', pos: 4, cardId: 4, checkItems: []} )

        const expectedActions = [
            { type: DELETE_BOARD_LIST,
                list: { id: 1, name: 'List', pos: 4}
            },
            { type: DELETE_BOARD_LIST_SUCCESS,
                list: { id: 1, name: 'List', pos: 4}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(DeleteActionCreators.deleteBoardList(
            { id: 1, name: 'List', pos: 4}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create UPDATE_BOARD_LIST_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/lists/1')
        .reply(200, { id: 1, name: 'NewList', pos: 4} )

        const expectedActions = [
            { type: UPDATE_BOARD_LIST,
                list: { id: 1, name: 'NewList', pos: 4}
            },
            { type: UPDATE_BOARD_LIST_SUCCESS,
                list: { id: 1, name: 'NewList', pos: 4}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(UpdateActionCreators.updateBoardList(
            { id: 1, name: 'List', pos: 4},
            { id: 1, name: 'NewList', pos: 4}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create CREATE_BOARD_LIST_SUCCESS', () => {
        nock(getBaseUrl())
        .post('/boards/1/lists')
        .reply(200, { id: 1, name: 'EmptyName', pos: 4} )

        const expectedActions = [
            { type: CREATE_BOARD_LIST,
                list: { name: 'EmptyName'}
            },
            { type: CREATE_BOARD_LIST_SUCCESS,
                list: { id: 1, name: 'EmptyName', pos: 4}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(CreateActionCreators.createBoardList(1
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    /*
    it('should create MOVE_BOARD_LIST_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/lists/1')
        .reply(200, { id: 1, name: 'NewList', pos: 5} )

        const expectedActions = [
            { type: MOVE_BOARD_LIST,
                list: { id: 1, name: 'NewList', pos: 5}
            },
            { type: MOVE_BOARD_LIST_SUCCESS,
                list: { id: 1, name: 'NewList', pos: 5}
            },
            { type: 'SHOW_ALERT_MESSAGE',
                payload: {'msg': 'Content saved!', 'type': 'success'},
            }
        ]
        const store = mockStore()

        return store.dispatch(MoveActionCreators.moveBoardList(4,5)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })*/

})
