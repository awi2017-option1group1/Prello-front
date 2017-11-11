import { Dispatch, RootState } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'
import { actionCreators as cardActionCreators } from '../actions'

import { ICard } from '../types'

export const DELETE_CARD = 'DELETE_CARD'
export const DELETE_CARD_ERROR = 'DELETE_CARD_ERROR'
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS'

export type Actions = {
    DELETE_CARD: {   
        type: typeof DELETE_CARD,
        card: ICard
    },
    DELETE_CARD_ERROR: {     
        type: typeof DELETE_CARD_ERROR,
        error: string
    },
    DELETE_CARD_SUCCESS: {   
        type: typeof DELETE_CARD_SUCCESS,
        card: ICard
    }
}

export const actionCreators = {
    deleteCardRequest: (card: ICard): Actions[typeof DELETE_CARD] => ({
        type: DELETE_CARD,
        card
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
        return (dispatch: Dispatch, getState: () => RootState) => {
            dispatch(actionCreators.deleteCardRequest(card))

            if (getState().card && getState().card!.id === card.id) {
                dispatch(cardActionCreators.closeCard())
            }

            return API.delete(`/cards/${card.id}`).then(
                response => {
                    dispatch(actionCreators.deleteCardRequestSuccess(card))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.deleteCardRequestError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
