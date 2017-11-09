import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICard } from '../types'

export const DELETE_CARD = 'DELETE_CARD'
export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR'
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS'

export type Actions = {
    DELETE_CARD: {   
        type: typeof DELETE_CARD,
    },
    DELETE_CARD_ERROR: {     
        type: typeof DELETE_CARD_ERROR,
        error: string
    },
    DELETE_CARD_SUCCESS: {   
        type: typeof DELETE_CARD_SUCCESS,
        card: ICard
    },
}

export const actionCreators = {
    deleteCardRequest: (): Actions[typeof DELETE_CARD] => ({
        type: DELETE_CARD
    }),
    deleteCardRequestError: (error: string): Actions[typeof DELETE_CARD_ERROR] => ({
        type: DELETE_CARD_ERROR,
        error
    }),
    deleteCardRequestSuccess: (card: ICard): Actions[typeof DELETE_CARD_SUCCESS] => ({
        type: DELETE_CARD_SUCCESS,
        card
    }),
    deleteCard: (card: ICard) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.deleteCardRequest())
            return API.delete('/cards/', card.id).then(
                response => dispatch(actionCreators.deleteCardRequestSuccess(card)),
                error => dispatch(actionCreators.deleteCardRequestError(error.message)),
            )
        }
    }
}
