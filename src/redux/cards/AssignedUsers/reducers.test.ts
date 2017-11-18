import { TEST } from '../../testActions'
import { reducer } from './reducers'
import { ICard } from '../../cards/types'

import { CREATE_CARD_SUCCESS } from '../../cards/actions/create'
import { FETCH_CARDS_LIST_SUCCESS } from '../../cards/actions/fetchAll'
import { FETCH_ASSIGNEES_LIST, FETCH_ASSIGNEES_LIST_ERROR, FETCH_ASSIGNEES_LIST_SUCCESS } from './actions/fetchAll'
// import { ASSIGN_USER } from './actions/assign'
// import { UNASSIGN_USER } from './actions/unassign'

import { IUser } from '../../users/types'

describe('Register reducer', () => {

    const cardDefault: ICard = {
        id: 1,
        name: 'DefaultName',
        desc: 'DefaultDescription',
        due: new Date('2015-03-25'),
        dueComplete: false,
        pos: 1
    }

    const userDefault: IUser = {
        id: 4,
        fullName: 'JeanJacquesRousseau',
        username: 'JJR',
        bio: 'ItIsMeMario',
        notificationsEnabled: true,
        email: 'jeanjacquesrousseau@gmail.com',
        password: 'jeanjacques',
        uuidToken: null,
        avatarColor: 'red'
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual( {} )
    })

    it('should handle FETCH_CARDS_LIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_CARDS_LIST_SUCCESS,
                    cards: [cardDefault],
                    listId: 9
                }
            )
        ).toEqual({
            1: { assignees: [], error: null, isProcessing: false }
        })
    })

    it('should handle CREATE_CARD_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CREATE_CARD_SUCCESS,
                    card: cardDefault,
                    listId: 9
                }
            )
        ).toEqual({
            1: { assignees: [], error: null, isProcessing: false }
        })
    })

    it('should handle FETCH_ASSIGNEES_LIST', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_ASSIGNEES_LIST,
                    cardID: 1
                }
            )
        ).toEqual({
            1: { assignees: [], error: null, isProcessing: true }
        })
    })

    it('should handle FETCH_ASSIGNEES_LIST_SUCCESS', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_ASSIGNEES_LIST_SUCCESS,
                    cardID: 1,
                    assignees: [userDefault]
                }
            )
        ).toEqual({
            1: { assignees: [userDefault], error: null, isProcessing: false }
        })
    })

    it('should handle FETCH_ASSIGNEES_LIST_ERROR', () => {
        expect(
            reducer(
                undefined,
                {
                    type: FETCH_ASSIGNEES_LIST_ERROR,
                    cardID: 1,
                    error: 'ErrorMessage'
                }
            )
        ).toEqual({
            1: { assignees: [], error: 'ErrorMessage', isProcessing: false }
        })
    })

    /*
    it('should handle ASSIGN_USER', () => {
        expect(
            reducer(
                undefined,
                {
                    type: ASSIGN_USER,
                    cardId: 1,
                    user: userDefault
                }
            )
        ).toEqual({
            1: { assignees: [userDefault], error: null, isProcessing: false }
        })
    })

    it('should handle UNASSIGN_USER', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UNASSIGN_USER,
                    cardId: 1,
                    user: userDefault
                }
            )
        ).toEqual({
            1: { assignees: [], error: null, isProcessing: false }
        })
    })
    */
})
