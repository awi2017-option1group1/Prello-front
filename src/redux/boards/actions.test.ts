import thunk from 'redux-thunk'
import * as nock from 'nock'

import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

import { FETCH_BOARD, FETCH_BOARD_SUCCESS, FETCH_BOARD_ERROR } from './actions/fetch'
import { UPDATE_BOARD, UPDATE_BOARD_ERROR, UPDATE_BOARD_SUCCESS } from './actions/update'
import { OPEN_CREATE_CARD_MODEL, CLOSE_CREATE_CARD_MODAL } from './actions/openModal'

import { actionCreators } from './actions'

import { IBoard } from './types'
import  { IList } from '../lists/types'

const boardModel: IBoard = {
    id: 1,
    name: 'Default Board',
    isPrivate: true
}

const listModel: IList = {
    id: 1,
    name: 'Default List',
    pos: 1
}

describe('Board sync actions', () => {

    /*---------------- FETCH BOARD ----------------*/
    it('should create an action FFETCH_BOARD', () => {
        const expectedAction = {
            type: FETCH_BOARD,
        }
        expect(actionCreators.fetchBoardRequest()).toEqual(expectedAction)
    })

    it('should create an action FETCH_BOARD_ERROR', () => {
        const expectedAction = {
            type: FETCH_BOARD_ERROR,
            error: 'error message'
        }
        expect(actionCreators.fetchBoardRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action FETCH_BOARD_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_BOARD_SUCCESS,
            board: {
                id: 1,
                name: 'Default Board',
                isPrivate: true
            }
        }
        expect(actionCreators.fetchBoardRequestSuccess(boardModel)).toEqual(expectedAction)
    })

    /*---------------- UPDATE BOARD ----------------*/
    it('should create an action UPDATE_BOARD', () => {
        const expectedAction = {
            type: UPDATE_BOARD,
        }
        expect(actionCreators.updateBoardRequest()).toEqual(expectedAction)
    })

    it('should create an action UPDATE_BOARD_ERROR', () => {
        const expectedAction = {
            type: UPDATE_BOARD_ERROR,
            error: 'error message'
        }
        expect(actionCreators.updateBoardRequestError('error message')).toEqual(expectedAction)
    })

    it('should create an action UPDATE_BOARD_SUCCESS', () => {
        const expectedAction = {
            type: UPDATE_BOARD_SUCCESS,
            board: {
                id: 1,
                name: 'Default Board',
                isPrivate: true
            }
        }
        expect(actionCreators.updateBoardRequestSuccess(boardModel)).toEqual(expectedAction)
    })
    
    /*---------------- MODAL BOARD ----------------*/
    it('should create an action UPDATE_BOARD', () => {
        const expectedAction = {
            type: OPEN_CREATE_CARD_MODEL,
            list: {
                id: 1,
                name: 'Default List',
                pos: 1
            }
        }
        expect(actionCreators.openCreateCardModal(listModel)).toEqual(expectedAction)
    })

    it('should create an action CLOSE_CREATE_CARD_MODAL', () => {
        const expectedAction = {
            type: CLOSE_CREATE_CARD_MODAL
        }
        expect(actionCreators.closeCreateCardModal()).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])
describe('Board async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })
    
    it('should create FETCH_BOARD_SUCCESS', () => {
        nock(getBaseUrl())
        .get('/boards/1')
        .reply(200, {
            id: 1,
            name: 'Default Board',
            isPrivate: true
        })

        const expectedActions = [
            { type: FETCH_BOARD },
            { type: FETCH_BOARD_SUCCESS,
                board: boardModel
            }
        ]
        const store = mockStore()

        return store.dispatch(actionCreators.fetchBoard(1)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
    
    it('should create UPDATE_BOARD_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/boards/1')
        .reply(200, {
            id: 1,
            name: 'newName',
            isPrivate: true
        })

        const expectedActions = [
            { type: UPDATE_BOARD },
            { type: UPDATE_BOARD_SUCCESS,
                board:
                {
                    id: 1,
                    name: 'newName',
                    isPrivate: true
                }
            }
        ]
        const store = mockStore()

        return store.dispatch(actionCreators.updateBoard(
            boardModel,
            {
                name: 'newName'
            }
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })      
})

describe('', () => {
    it('temporary test', () => {
        expect(0).toBe(0)
    })
})
