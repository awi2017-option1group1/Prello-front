import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'

import { ICard } from '../cards/types'

export const CARD_SUCCESS = 'CARD_SUCCESS'
export const CARD_ERROR = 'CARD_ERROR'

export const FETCH_CARD = 'FETCH_CARD'
export const FETCH_CARD_SUCCESS = 'FETCH_CARD_SUCCESS'

export const CREATE_CARD = 'CREATE_CARD'
export const CREATE_CARD_SUCCESS = 'CREATE_CARD_SUCCESS'
export const CREATE_CARD_ERROR = 'CREATE_CARD_ERROR'

export const REMOVE_CARD = 'REMOVE_CARD'
export const REMOVE_CARD_ERROR = 'REMOVE_CARD_ERROR'
export const REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS'

export const UPDATE_CARD = 'UPDATE_CARD'
export const UPDATE_CARD_ERROR = 'UPDATE_CARD_ERROR'
export const UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS'

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
    },

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
},

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
},
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
    createBackendCard: (card: ICard) => {    
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createCardRequest())
            return API.post(`/lists/${card.list.id}/cards`).then(
                response => dispatch(actionCreators.createCardSuccess(response.card)),
                error => dispatch(actionCreators.createCardError(error.message)),
            )
        }
    },

    removeBackendCard: (card: ICard) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeCardRequest())
            return API.delete('/cards/', card.id).then(
                response => dispatch(actionCreators.removeCardRequestSucess(response.card)),
                error => dispatch(actionCreators.removeCardRequestError(error.message)),
            )
        }
    },

    updateBackendCard: (card: ICard, newValues: Partial<ICard>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCardRequest())
            return API.put(`/cards/${card.id}`, newValues).then(
                response => dispatch(actionCreators.createCardSuccess(response.card)),
                error => dispatch(actionCreators.createCardError(error.message)),
            )
        }
    },

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
