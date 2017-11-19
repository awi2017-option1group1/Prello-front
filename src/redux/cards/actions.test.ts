import { actionCreators as CreateActionCreators,
    CREATE_CARD, CREATE_CARD_SUCCESS, CREATE_CARD_ERROR } from './actions/create'
import { actionCreators as FetchActionCreators,
    FETCH_CARD, FETCH_CARD_SUCCESS, FETCH_CARD_ERROR } from './actions/fetch'
import { actionCreators as FetchAllActionCreators,
    FETCH_CARDS_LIST, FETCH_CARDS_LIST_SUCCESS, FETCH_CARDS_LIST_ERROR } from './actions/fetchAll'
import { actionCreators as DeleteActionCreators,
    DELETE_CARD, DELETE_CARD_ERROR, DELETE_CARD_SUCCESS } from './actions/delete'
import { actionCreators as UpdateActionCreators,
    UPDATE_CARD, UPDATE_CARD_ERROR, UPDATE_CARD_SUCCESS } from './actions/update'
import { actionCreators as MoveActionCreators,
    MOVE_CARD, MOVE_CARD_SUCCESS, MOVE_CARD_ERROR } from './actions/move'
import { actionCreators as SelectActionCreators,
    OPEN_CARD, CLOSE_CARD } from './actions/select'

import { ICard } from './types'

import thunk from 'redux-thunk'
import * as nock from 'nock'
import configureMockStore from 'redux-mock-store'
import { getBaseUrl } from '../../services/http'

describe('Cards sync actions', () => {

    const cardDefault: ICard = {
        id: 1,
        name: 'DefaultName',
        desc: 'DefaultDescription',
        due: new Date('2015-03-25'),
        dueComplete: false,
        pos: 1
    }

    it('should create an action CREATE_CARD', () => {
        const expectedAction = {
            type: CREATE_CARD,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            },
            listId: 9
        }
        expect(CreateActionCreators.createCardRequest(9, cardDefault)).toEqual(expectedAction)
    })

    it('should create an action CREATE_CARD_SUCCESS', () => {
        const expectedAction = {
            type: CREATE_CARD_SUCCESS,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            },
            listId: 9
        }
        expect(CreateActionCreators.createCardSuccess(9, cardDefault)).toEqual(expectedAction)
    })

    it('should create an action CREATE_CARD_ERROR', () => {
        const expectedAction = {
            type: CREATE_CARD_ERROR,
            error: 'ErrorMessage'
        }
        expect(CreateActionCreators.createCardError('ErrorMessage')).toEqual(expectedAction)
    })

    it('should create an action DELETE_CARD', () => {
        const expectedAction = {
            type: DELETE_CARD,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            }
        }
        expect(DeleteActionCreators.deleteCardRequest(cardDefault)).toEqual(expectedAction)
    })

    it('should create an action DELETE_CARD_SUCCESS', () => {
        const expectedAction = {
            type: DELETE_CARD_SUCCESS,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            }
        }
        expect(DeleteActionCreators.deleteCardRequestSuccess(cardDefault)).toEqual(expectedAction)
    })

    it('should create an action DELETE_CARD_ERROR', () => {
        const expectedAction = {
            type: DELETE_CARD_ERROR,
            error: 'ErrorMessage'
        }
        expect(DeleteActionCreators.deleteCardRequestError('ErrorMessage')).toEqual(expectedAction)
    })

    it('should create an action FETCH_CARD', () => {
        const expectedAction = {
            type: FETCH_CARD,
        }
        expect(FetchActionCreators.fetchCardRequest()).toEqual(expectedAction)
    })

    it('should create an action FETCH_CARD_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_CARD_SUCCESS,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            }
        }
        expect(FetchActionCreators.fetchCardRequestSuccess(cardDefault)).toEqual(expectedAction)
    })

    it('should create an action FETCH_CARD_ERROR', () => {
        const expectedAction = {
            type: FETCH_CARD_ERROR,
            error: 'ErrorMessage'
        }
        expect(FetchActionCreators.fetchCardRequestError('ErrorMessage')).toEqual(expectedAction)
    })

    it('should create an action FETCH_CARDS_LIST', () => {
        const expectedAction = {
            type: FETCH_CARDS_LIST,
            listId: 9
        }
        expect(FetchAllActionCreators.fetchCardsListRequest(9)).toEqual(expectedAction)
    })

    it('should create an action FETCH_CARDS_LIST_SUCCESS', () => {
        const expectedAction = {
            type: FETCH_CARDS_LIST_SUCCESS,
            cards: [{
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            }],
            listId: 9
        }
        expect(FetchAllActionCreators.fetchCardsListRequestSuccess(9, [cardDefault])).toEqual(expectedAction)
    })

    it('should create an action FETCH_CARDS_LIST_ERROR', () => {
        const expectedAction = {
            type: FETCH_CARDS_LIST_ERROR,
            error: 'ErrorMessage',
            listId: 9
        }
        expect(FetchAllActionCreators.fetchCardsListRequestError(9, 'ErrorMessage')).toEqual(expectedAction)
    })

    it('should create an action MOVE_CARD', () => {
        const expectedAction = {
            type: MOVE_CARD,
            sourceList: {listId: 9, list: [cardDefault] },
            destinationList: {listId: 8, list: [cardDefault] }
        }
        expect(MoveActionCreators.moveCardRequest(
            {listId: 9, list: [cardDefault] },
            {listId: 8, list: [cardDefault] }
        )).toEqual(expectedAction)
    })

    it('should create an action MOVE_CARD_SUCCESS', () => {
        const expectedAction = {
            type: MOVE_CARD_SUCCESS,
            destinationList: {listId: 8, list: [cardDefault] }
        }
        expect(MoveActionCreators.moveCardRequestSuccess(
            {listId: 8, list: [cardDefault] }
        )).toEqual(expectedAction)
    })

    it('should create an action MOVE_CARD_ERROR', () => {
        const expectedAction = {
            type: MOVE_CARD_ERROR,
            error: 'ErrorMessage'
        }
        expect(MoveActionCreators.moveCardRequestError('ErrorMessage')).toEqual(expectedAction)
    })

    /*
    it('should create an action OPEN_CARD', () => {
        const expectedAction = {
            type: OPEN_CARD,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            }
        }
        expect(SelectActionCreators.openCard( cardDefault )).toEqual(expectedAction)
    })
    */

    /*
    it('should create an action CLOSE_CARD', () => {
        const expectedAction = {
            type: CLOSE_CARD,
        }
        expect(SelectActionCreators.closeCard()).toEqual(expectedAction)
    })
    */

    it('should create an action UPDATE_CARD', () => {
        const expectedAction = {
            type: UPDATE_CARD,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            }
        }
        expect(UpdateActionCreators.updateCardRequest(cardDefault)).toEqual(expectedAction)
    })

    it('should create an action UPDATE_CARD_SUCCESS', () => {
        const expectedAction = {
            type: UPDATE_CARD_SUCCESS,
            card: {
                id: 1,
                name: 'DefaultName',
                desc: 'DefaultDescription',
                due: new Date('2015-03-25'),
                dueComplete: false,
                pos: 1
            }
        }
        expect(UpdateActionCreators.updateCardRequestSuccess(cardDefault)).toEqual(expectedAction)
    })

    it('should create an action UPDATE_CARD_ERROR', () => {
        const expectedAction = {
            type: UPDATE_CARD_ERROR,
            error: 'ErrorMessage'
        }
        expect(UpdateActionCreators.updateCardRequestError('ErrorMessage')).toEqual(expectedAction)
    })
})

const mockStore = configureMockStore([thunk])

describe('Cards async actions', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    const cardDefault: ICard = {
        id: 1,
        name: 'DefaultName',
        desc: 'DefaultDescription',
        due: new Date('2015-03-25'),
        dueComplete: false,
        pos: 1
    }

    it('should create DELETE_CARD_SUCCESS', () => {
        nock(getBaseUrl())
        .delete('/cards/1')
        .reply(200, {
            id: 1,
            name: 'DefaultName',
            desc: 'DefaultDescription',
            due: new Date('2015-03-25'),
            dueComplete: false,
            pos: 1
        })

        const expectedActions = [
            { type: DELETE_CARD,
                card: {
                    id: 1,
                    name: 'DefaultName',
                    desc: 'DefaultDescription',
                    due: new Date('2015-03-25'),
                    dueComplete: false,
                    pos: 1
                }
            },
            { type: DELETE_CARD_SUCCESS,
                card: {
                    id: 1,
                    name: 'DefaultName',
                    desc: 'DefaultDescription',
                    due: new Date('2015-03-25'),
                    dueComplete: false,
                    pos: 1
                }
            },
            {
                payload: {'msg': 'Content saved!', 'type': 'success'},
                type: 'SHOW_ALERT_MESSAGE'
            }
        ]
        const store = mockStore()

        return store.dispatch(DeleteActionCreators.deleteCard(cardDefault)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create FETCH_CARD_SUCCESS', () => {
        nock(getBaseUrl())
        .get('/cards/1')
        .reply(200, {
            id: 1,
            name: 'DefaultName',
            desc: 'DefaultDescription',
            due: new Date('2015-03-25'),
            dueComplete: false,
            pos: 1
        })

        const expectedActions = [
            { type: FETCH_CARD },
            { type: FETCH_CARD_SUCCESS,
                card: {
                    id: 1,
                    name: 'DefaultName',
                    desc: 'DefaultDescription',
                    due: '2015-03-25T00:00:00.000Z',
                    dueComplete: false,
                    pos: 1
                }
            }
        ]
        const store = mockStore()

        return store.dispatch(FetchActionCreators.fetchCard('1')).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    it('should create FETCH_CARDS_LIST_SUCCESS', () => {
        nock(getBaseUrl())
        .get('/lists/9/cards')
        .reply(200, {
            id: 1,
            name: 'DefaultName',
            desc: 'DefaultDescription',
            due: new Date('2015-03-25'),
            dueComplete: false,
            pos: 1
        })

        const expectedActions = [
            { type: FETCH_CARDS_LIST,
                listId: 9
            },
            { type: FETCH_CARDS_LIST_SUCCESS,
                cards: {
                    id: 1,
                    name: 'DefaultName',
                    desc: 'DefaultDescription',
                    due: '2015-03-25T00:00:00.000Z',
                    dueComplete: false,
                    pos: 1
                },
                listId: 9
            }
        ]
        const store = mockStore()

        return store.dispatch(FetchAllActionCreators.fetchCardsList(9)).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })

    /*
    it('should create UPDATE_CARD_SUCCESS', () => {
        nock(getBaseUrl())
        .put('/cards/1/')
        .reply(200, {
            id: 1,
            name: 'NewName',
            desc: 'DefaultDescription',
            due: new Date('2015-03-25'),
            dueComplete: false,
            pos: 1
        })

        const expectedActions = [
            { type: UPDATE_CARD,
                card: {
                    id: 1,
                    name: 'NewName',
                    desc: 'DefaultDescription',
                    due: new Date('2015-03-25'),
                    dueComplete: false,
                    pos: 1
                },
            },
            { type: UPDATE_CARD_SUCCESS,
                card: {
                    id: 1,
                    name: 'NewName',
                    desc: 'DefaultDescription',
                    due: new Date('2015-03-25'),
                    dueComplete: false,
                    pos: 1
                },

            },
            {
                payload: {'msg': 'Content saved!', 'type': 'success'},
                type: 'SHOW_ALERT_MESSAGE'
            }
        ]
        const store = mockStore()

        return store.dispatch(UpdateActionCreators.updateCard(
            {id: 1,name: 'DefaultName',desc: 'DefaultDescription',due: new Date('2015-03-25'),
                dueComplete: false,pos: 1},
            {name: 'NewName'}
        )).then(() => {
            expect(store.getActions()).toEqual(expectedActions) })
    })
    */
})
