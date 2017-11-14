import { Dispatch } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { ITag } from '../../types'

export const FETCH_CARD_LABELS = 'FETCH_CARD_LABELS'
export const FETCH_CARD_LABELS_ERROR = 'FETCH_CARD_LABELS_ERROR'
export const FETCH_CARD_LABELS_SUCCESS = 'FETCH_CARD_LABELS_SUCCESS'

export type Actions = {
    FETCH_CARD_LABELS: {  
        type: typeof FETCH_CARD_LABELS,
        cardId: number
    },
    FETCH_CARD_LABELS_ERROR: {
        type: typeof FETCH_CARD_LABELS_ERROR,
        error: string,
        cardId: number
    },
    FETCH_CARD_LABELS_SUCCESS: {    
        type: typeof FETCH_CARD_LABELS_SUCCESS,
        labels: ITag[],
        cardId: number
    }
}

export const actionCreators = {
    fetchCardLabelsRequest: (cardId: number): Actions[typeof FETCH_CARD_LABELS] => ({     
        type: FETCH_CARD_LABELS,
        cardId
    }),
    fetchCardLabelsRequestError: (cardId: number, error: string): Actions[typeof FETCH_CARD_LABELS_ERROR] => ({
        type: FETCH_CARD_LABELS_ERROR,
        error,
        cardId
    }),
    fetchCardLabelsRequestSuccess: (cardId: number, labels: ITag[]): Actions[typeof FETCH_CARD_LABELS_SUCCESS] => ({
        type: FETCH_CARD_LABELS_SUCCESS,
        labels,
        cardId
    }),
    fetchCardLabels: (cardId: number) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCardLabelsRequest(cardId))
            return API.get(`/cards/${cardId}/labels`).then(
                labels => dispatch(actionCreators.fetchCardLabelsRequestSuccess(cardId, labels)),
                error => dispatch(actionCreators.fetchCardLabelsRequestError(cardId, error.message)),
            )
        }
    }
}
