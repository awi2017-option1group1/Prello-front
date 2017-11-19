import { TEST } from '../../testActions'
import { reducer } from './reducers'
import { ICard } from '../../cards/types'
import { IList } from '../../lists/types'

import { FETCH_BOARD_LISTS_SUCCESS } from '../../lists/actions/fetch'
import { CREATE_BOARD_LIST_SUCCESS } from '../../lists/actions/create'
// import { CREATE_CARD, CREATE_CARD_SUCCESS } from '../actions/create'
// import { UPDATE_CARD } from '../actions/update'
// import { DELETE_CARD } from '../actions/delete'
import { MOVE_CARD, MOVE_CARD_SUCCESS } from '../actions/move'
import { FETCH_CARDS_LIST, FETCH_CARDS_LIST_ERROR, FETCH_CARDS_LIST_SUCCESS } from '../actions/fetchAll'

describe('Register reducer', () => {

    const cardDefault: ICard = {
        id: 9,
        name: 'DefaultName',
        desc: 'DefaultDescription',
        due: new Date('2015-03-25'),
        dueComplete: false,
        pos: 1
    }

    const cardDefaultTwo: ICard = {
        id: 8,
        name: 'DefaultNameSecond',
        desc: 'DefaultDescriptionSecondCard',
        due: new Date('2016-04-26'),
        dueComplete: true,
        pos: 2
    }

    const cardListDefaultOne: IList = { id: 1, name: 'ListOne', pos: 1 }
    const cardListDefaultTwo: IList = { id: 2, name: 'ListTwo', pos: 2 }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual({})
    })

    it('should handle FETCH_BOARD_LISTS_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_BOARD_LISTS_SUCCESS,
                    lists: [cardListDefaultOne, cardListDefaultTwo],
                }
            )
        ).toEqual({
            1: {cards: [], error: null, isProcessing: false},
            2: {cards: [], error: null, isProcessing: false}
        })
    })

    it('should handle CREATE_BOARD_LIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_BOARD_LIST_SUCCESS,
                    list: cardListDefaultOne,
                }
            )
        ).toEqual({
            1: {cards: [], error: null, isProcessing: false}
        })
    })

    /* Problems
    it('should handle CREATE_CARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CARD,
                    card: cardDefault,
                    listId: 1
                }
            )
        ).toEqual({
        })
    })*/

    /*
    it('should handle CREATE_CARD_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CARD_SUCCESS,
                    card: cardDefault,
                    listId: 1
                }
            )
        ).toEqual({
        })
    })
    */

    it('should handle FETCH_CARDS_LIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CARDS_LIST,
                    listId: 1,
                }
            )
        ).toEqual({
            1: {cards: [], error: null, isProcessing: true}
        })
    })

    it('should handle FETCH_CARDS_LIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CARDS_LIST_ERROR,
                    listId: 1,
                    error: 'errorMessage'
                }
            )
        ).toEqual({
            1: {cards: [], error: 'errorMessage', isProcessing: false}
        })
    })

    it('should handle FETCH_CARDS_LIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CARDS_LIST_SUCCESS,
                    listId: 1,
                    cards: [cardDefault]
                }
            )
        ).toEqual({
            1: {cards: [cardDefault], error: null, isProcessing: false}
        })
    })

    it('should handle MOVE_CARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: MOVE_CARD,
                    sourceList: {
                        listId: 1,
                        list: [cardDefault]
                    },
                    destinationList: {
                        listId: 1,
                        list: [cardDefaultTwo]
                    },
                }
            )
        ).toEqual({
            1: {cards: [cardDefaultTwo]}
        })
    })

    it('should handle MOVE_CARD_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: MOVE_CARD_SUCCESS,
                    destinationList: {
                        listId: 1,
                        list: [cardDefaultTwo]
                    }
                }
            )
        ).toEqual({ })
    })

    /*
    it('should handle UPDATE_CARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CARD,
                    card: cardDefault
                }
            )
        ).toEqual({
            1: {cards: [cardDefault]}
        })
    })*/

        /*
    it('should handle DELETE_CARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: DELETE_CARD,
                    card: cardDefault
                }
            )
        ).toEqual({
            1: {cards: [cardDefault]}
        })
    })*/
})
