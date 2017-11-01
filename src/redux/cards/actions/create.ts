import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICard } from '../types'

export const CREATE_CARD = 'CREATE_CARD'
export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS'
export const CREATE_CARD_ERROR = 'CREATE_CARD_ERROR'

export type Actions = {
    CREATE_CARD: {   
        type: typeof CREATE_CARD,
    },
    CREATE_CARD_SUCCESS: {   
        type: typeof CREATE_CARD_SUCCESS,
        card: ICard,
    },
    CREATE_CARD_ERROR: {     
        type: typeof CREATE_CARD_ERROR,
        error: string
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //

    createCardRequest: ():  
    Actions[typeof CREATE_CARD] => ({
        type: CREATE_CARD,
    }),
    createCardSuccess: (card: ICard):    
    Actions[typeof CREATE_CARD_SUCCESS] => ({
        type: CREATE_CARD_SUCCESS,
        card,
    }),
    createCardError: (error: string):    
    Actions[typeof CREATE_CARD_ERROR] => ({
        type: CREATE_CARD_ERROR,
        error,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    createBackendCard: (card: ICard) => {    
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createCardRequest())
            return API.post(`/lists/${card.list.id}/cards`).then(
                response => dispatch(actionCreators.createCardSuccess(response.card)),
                error => dispatch(actionCreators.createCardError(error.message)),
            )
        }
    }
}

