import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICard } from '../types'

export const FETCH_CARDS_LIST = 'FETCH_CARDS_LIST'
export const FETCH_CARDS_LIST_ERROR = 'FETCH_CARDS_LIST_ERROR'
export const FETCH_CARDS_LIST_SUCCESS = 'FETCH_CARDS_LIST_SUCCESS'

export type Actions = {
    FETCH_CARDS_LIST: {  
        type: typeof FETCH_CARDS_LIST,
        listId: number
    },
    FETCH_CARDS_LIST_ERROR: {
        type: typeof FETCH_CARDS_LIST_ERROR,
        error: string,
        listId: number
    },
    FETCH_CARDS_LIST_SUCCESS: {    
        type: typeof FETCH_CARDS_LIST_SUCCESS,
        cards: ICard[],
        listId: number
    }
}

export const actionCreators = {
    fetchCardsListRequest: (listId: number): Actions[typeof FETCH_CARDS_LIST] => ({     
        type: FETCH_CARDS_LIST,
        listId
    }),
    fetchCardsListRequestError: (listId: number, error: string): Actions[typeof FETCH_CARDS_LIST_ERROR] => ({
        type: FETCH_CARDS_LIST_ERROR,
        error,
        listId
    }),
    fetchCardsListRequestSuccess: (listId: number, cards: ICard[]): Actions[typeof FETCH_CARDS_LIST_SUCCESS] => ({
        type: FETCH_CARDS_LIST_SUCCESS,
        cards,
        listId
    }),
    fetchCardsList: (listId: number) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCardsListRequest(listId))
            return API.get(`/lists/${listId}/cards`).then(
                cards => dispatch(actionCreators.fetchCardsListRequestSuccess(listId, cards)),
                error => dispatch(actionCreators.fetchCardsListRequestError(listId, error.message)),
            )
        }
    }
}
