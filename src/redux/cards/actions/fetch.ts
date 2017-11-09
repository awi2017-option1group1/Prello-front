import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICard } from '../types'

export const FETCH_CARD = 'FETCH_CARD'
export const FETCH_CARD_ERROR = 'FETCH_CARD_ERROR'
export const FETCH_CARD_SUCCESS = 'FETCH_CARD_SUCCESS'

export type Actions = {
    FETCH_CARD: {  
        type: typeof FETCH_CARD,
    },
    FETCH_CARD_ERROR: {
        type: typeof FETCH_CARD_ERROR,
        error: string
    },
    FETCH_CARD_SUCCESS: {    
        type: typeof FETCH_CARD_SUCCESS,
        card: ICard
    }
}

export const actionCreators = {
    fetchCardRequest: (): Actions[typeof FETCH_CARD] => ({     
        type: FETCH_CARD,
    }),
    fetchCardRequestError: (error: string): Actions[typeof FETCH_CARD_ERROR] => ({
        type: FETCH_CARD_ERROR,
        error
    }),
    fetchCardRequestSuccess: (card: ICard): Actions[typeof FETCH_CARD_SUCCESS] => ({
        type: FETCH_CARD_SUCCESS,
        card
    }),
    fetchCard: (cardId: string) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCardRequest())
            return API.get(`/cards/${cardId}`).then(
                card => dispatch(actionCreators.fetchCardRequestSuccess(card)),
                error => dispatch(actionCreators.fetchCardRequestError(error.message)),
            )
        }
    }
}
