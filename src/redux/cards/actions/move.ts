import { Dispatch, RootState } from '../../RootReducer'

import { ICard } from '../types'

export const MOVE_CARD = 'MOVE_CARD'
export const MOVE_CARD_SUCCESS = 'MOVE_CARD_SUCCESS'
export const MOVE_CARD_ERROR = 'MOVE_CARD_ERROR'

export type Actions = {
    MOVE_CARD: {
        type: typeof MOVE_CARD,
        listId: number,
        cards: ICard[]
    },
    MOVE_CARD_ERROR: {
        type: typeof MOVE_CARD_ERROR,
        error: string
    },
    MOVE_CARD_SUCCESS: {
        type: typeof MOVE_CARD_SUCCESS,
        listId: number,
        cards: ICard[]
    }
}

export const actionCreators = {
    moveCardRequest: (listId: number, cards: ICard[]): Actions[typeof MOVE_CARD] => ({
        type: MOVE_CARD,
        listId,
        cards
    }),
    moveCardRequestError: (error: string): Actions[typeof MOVE_CARD_ERROR] => ({
        type: MOVE_CARD_ERROR,
        error
    }),
    moveCardRequestSuccess: (listId: number, cards: ICard[]): Actions[typeof MOVE_CARD_SUCCESS] => ({
        type: MOVE_CARD_SUCCESS,
        listId,
        cards
    }),
    moveCard: (sourceList: number, sourcePos: number, destinationList: number, destinationPos: number) => {
        return (dispatch: Dispatch, getState: () => RootState) => {
            // 
        }
    }
}
