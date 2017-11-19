import { actionCreators as FetchAllActionCreators,
    FETCH_CHECKITEMS, FETCH_CHECKITEMS_SUCCESS, FETCH_CHECKITEMS_ERROR } from './actions/fetchAll'

import { ICheckItem } from '../checkItems/types'

import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

const checkItemDefault: ICheckItem = {
    id: 1,
    name: 'DefaultCheckItem',
    pos: 1,
    state: false
}

describe('CheckItemsList sync actions', () => {

    it('should create an action CREATE_BOARD_LIST', () => {
        const expectedAction = {
            type: FETCH_CHECKITEMS,
            checkListId: 9
        }
        expect(FetchAllActionCreators.fetchCheckItemsRequest( 9 )).toEqual(expectedAction)
    })

    it('should create an action FETCH_CHECKITEMS_ERROR', () => {
        const expectedAction = {
            type: FETCH_CHECKITEMS_ERROR,
            checkListId: 9,
            error: 'errorMessage'
        }
        expect(FetchAllActionCreators.fetchCheckItemsRequestError( 9, 'errorMessage' )).toEqual(expectedAction)
    })

    it('should create an action FETCH_CHECKITEMS_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_CHECKITEMS_SUCCESS,
            checkListId: 9,
            checkItems: [checkItemDefault]
        }
        expect(FetchAllActionCreators.fetchCheckItemsRequestSuccess(
            9, [checkItemDefault]
        )).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('CheckItemsList async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create FETCH_CHECKITEMS_SUCCESS', () => {
        nock(getBaseUrl())
        .get('/checklists/9/checkItems')
        .reply(200, [ checkItemDefault ])

        const expectedActions = [
            { type: FETCH_CHECKITEMS, checkListId: 9 },
            { type: FETCH_CHECKITEMS_SUCCESS,
                checkItems: [ checkItemDefault ],
                checkListId: 9
            }
        ]
        const store = mockStore()

        return store.dispatch(FetchAllActionCreators.fetchCheckItemsFromCheckListId(9)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
})
