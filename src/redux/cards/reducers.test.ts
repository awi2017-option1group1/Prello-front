import { TEST } from '../testActions'
import { reducer } from './reducers'
import { ICard } from '../cards/types'

import { OPEN_CARD, CLOSE_CARD } from './actions/select'
import { UPDATE_CARD } from './actions/update'

describe('Register reducer', () => {

    const cardDefault: ICard = {
        id: 1,
        name: 'DefaultName',
        desc: 'DefaultDescription',
        due: new Date('2015-03-25'),
        dueComplete: false,
        pos: 1
    }

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: TEST })).toEqual( null )
    })

    it('should handle OPEN_CARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: OPEN_CARD,
                    card: cardDefault,
                }
            )
        ).toEqual( cardDefault )

        expect(
            reducer(
                cardDefault,
                {
                    type: OPEN_CARD,
                    card: cardDefault,
                }
            )
        ).toEqual( cardDefault )
    })

    it('should handle CLOSE_CARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: CLOSE_CARD
                }
            )
        ).toEqual( null )

        expect(
            reducer(
                cardDefault,
                {
                    type: CLOSE_CARD,
                }
            )
        ).toEqual( null )
    })

    it('should handle UPDATE_CARD', () => {
        expect(
            reducer(
                undefined,
                {
                    type: UPDATE_CARD,
                    card: cardDefault,
                }
            )
        ).toEqual( cardDefault )

        expect(
            reducer(
                cardDefault,
                {
                    type: UPDATE_CARD,
                    card: cardDefault,
                }
            )
        ).toEqual( cardDefault )
    })
})
