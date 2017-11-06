import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICard } from '../types'

export const UPDATE_CARD = 'UPDATE_CARD'
export const UPDATE_CARD_ERROR = 'UPDATE_CARD_ERROR'
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS'

export type Actions = {
    UPDATE_CARD: {   
        type: typeof UPDATE_CARD,
    },
    UPDATE_CARD_ERROR: {
        type: typeof UPDATE_CARD_ERROR,
        error: string
    },
    UPDATE_CARD_SUCCESS: {
        type: typeof UPDATE_CARD_SUCCESS,
        card: ICard
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //

    updateCardRequest: (): Actions[typeof UPDATE_CARD] => ({
        type: UPDATE_CARD,
    }),
    updateCardRequestError: (error: string): Actions[typeof UPDATE_CARD_ERROR] => ({
        type: UPDATE_CARD_ERROR,
        error
    }),
    updateCardRequestSuccess: (card: ICard): Actions[typeof UPDATE_CARD_SUCCESS] => ({
        type: UPDATE_CARD_SUCCESS,
        card
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //

    updateBackendCard: (card: ICard, newValues: Partial<ICard>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCardRequest())
            return API.put(`/cards/${card.id}`, newValues).then(
                card => dispatch(actionCreators.updateCardRequestSuccess(card)),
                error => dispatch(actionCreators.updateCardRequestError(error.message)),
            )
        }
    }
}
