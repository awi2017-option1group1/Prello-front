import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICard } from '../types'

export const REMOVE_CARD = 'REMOVE_CARD'
export const REMOVE_CARD_ERROR = 'REMOVE_CARD_ERROR'
export const REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS'

export type Actions = {
    REMOVE_CARD: {   
        type: typeof REMOVE_CARD,
    },
    REMOVE_CARD_ERROR: {     
        type: typeof REMOVE_CARD_ERROR,
        error: string
    },
    REMOVE_CARD_SUCCESS: {   
        type: typeof REMOVE_CARD_SUCCESS,
        card: ICard
    },
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //

    removeCardRequest: (): Actions[typeof REMOVE_CARD] => ({
        type: REMOVE_CARD,
    }),
    removeCardRequestError: (error: string): Actions[typeof REMOVE_CARD_ERROR] => ({
        type: REMOVE_CARD_ERROR,
        error
    }),
    removeCardRequestSucess: (card: ICard): Actions[typeof REMOVE_CARD_SUCCESS] => ({
        type: REMOVE_CARD_SUCCESS,
        card
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //

    removeBackendCard: (card: ICard) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeCardRequest())
            return API.delete('/cards/', card.id).then(
                card => dispatch(actionCreators.removeCardRequestSucess(card)),
                error => dispatch(actionCreators.removeCardRequestError(error.message)),
            )
        }
    }
}
