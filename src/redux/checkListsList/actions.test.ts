import { actionCreators as FetchAllActionCreators,
    FETCH_CHECKLISTS, FETCH_CHECKLISTS_ERROR, FETCH_CHECKLISTS_SUCCESS } from './actions/fetchAll'

import { ICheckList } from '../checkLists/types'

import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

describe('CheckListsLists sync actions', () => {

    const checkListsDefault: ICheckList = {
        id: -1,
        name: 'Default CheckList',
        pos: 1
    }

    it('should create an action FETCH_CHECKLISTS', () => {
        const expectedAction = {
            type: FETCH_CHECKLISTS,
        }
        expect(FetchAllActionCreators.fetchCheckItemsRequest()).toEqual(expectedAction)
    })

    it('should create an action FETCH_CHECKLISTS_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_CHECKLISTS_SUCCESS,
            checkLists: [checkListsDefault]
        }
        expect(FetchAllActionCreators.fetchCheckItemsRequestSuccess([checkListsDefault])).toEqual(expectedAction)
    })

    it('should create an action FETCH_CHECKLISTS_ERROR', () => {
        const expectedAction = {
            type: FETCH_CHECKLISTS_ERROR,
            error: 'messageError'
        }
        expect(FetchAllActionCreators.fetchCheckItemsRequestError('messageError')).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('CheckListsLists async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('should create FETCH_CHECKLISTS_SUCCESS', () => {
        nock(getBaseUrl())
        .get(`/cards/1/checklists`)
        .reply(200, [ { id: 1, name: 'CheckList', pos: 4},
                      { id: 2, name: 'CheckList2', pos: 5} ])

        const expectedActions = [
            { type: FETCH_CHECKLISTS },
            { type: FETCH_CHECKLISTS_SUCCESS,
                checkLists: [
                    { id: 1, name: 'CheckList', pos: 4},
                    { id: 2, name: 'CheckList2', pos: 5} ]
            }
        ]
        const store = mockStore()

        return store.dispatch(FetchAllActionCreators.fetchCheckListsFromCardId(1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

})
