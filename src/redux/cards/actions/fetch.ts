import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICard } from '../types'

export const CARD_SUCCESS = 'CARD_SUCCESS'
export const CARD_ERROR = 'CARD_ERROR'

export const FETCH_CARD = 'FETCH_CARD'
export const FETCH_CARD_SUCCESS = 'FETCH_CARD_SUCCESS'

export type Actions = {
    CARD_ERROR: {    
        type: typeof CARD_ERROR,
        error: string,
    },
    CARD_SUCCESS: {
        type: typeof CARD_SUCCESS,
        successMessage: string,
    },
    FETCH_CARD: {  
        type: typeof FETCH_CARD,
    },
    FETCH_CARD_SUCCESS: {    
        type: typeof FETCH_CARD_SUCCESS,
        card: ICard,
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    cardError: (error: string): Actions[typeof CARD_ERROR] => ({      
        type: CARD_ERROR,
        error,
    }),
    cardSuccess: (successMessage: string): Actions[typeof CARD_SUCCESS] => ({
        type: CARD_SUCCESS,
        successMessage,
    }),

    fetchCardRequest: (): Actions[typeof FETCH_CARD] => ({     
        type: FETCH_CARD,
    }),
    fetchCardSuccess: (card: ICard):       
    Actions[typeof FETCH_CARD_SUCCESS] => ({
        type: FETCH_CARD_SUCCESS,
        card,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    fetchCard: (cardId: string) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCardRequest())
            return API.get(`/cards/${cardId}`).then(
                response => dispatch(actionCreators.fetchCardSuccess(response.card)),
                error => dispatch(actionCreators.cardError(error.message)),
            )
        }
    }
}

