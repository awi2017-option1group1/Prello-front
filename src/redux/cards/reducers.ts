import { 
    FETCH_CARD, 
    FETCH_CARD_SUCCESS, 
    CARD_ERROR, 
    CREATE_CARD_SUCCESS ,
    CREATE_CARD_ERROR,
    REMOVE_CARD_ERROR,
    REMOVE_CARD_SUCCESS,
    UPDATE_CARD_ERROR,
    UPDATE_CARD_SUCCESS
} from './actions'

import { RootAction } from '../RootAction'
import { ICard } from '../cards/types'

export type State = {
    card: ICard | null,
    error: string | null,
    isProcessing: boolean,
}

const defaultValue: State = {
    card: null,
    error: null,
    isProcessing: false
}
export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {

            case CARD_ERROR:
                return {
                    ...state,
                    error: action.error,
                    isProcessing: false
            }
            
            case FETCH_CARD:
                return {
                    ...state,
                    card: null,
                    error: null,
                    isProcessing: true
            }

            case FETCH_CARD_SUCCESS: 
                return {
                    ...state,
                    card: action.card,
                    error: null,
                    isProcessing: false
            }

            case CREATE_CARD_SUCCESS:
                return {
                    ...state,
                    card: action.card,
                    error: null
            }
        
            case CREATE_CARD_ERROR:
                return {
                    ...state,
                    error: action.error
            }

            case UPDATE_CARD_SUCCESS:
                return {
                    ...state,
                    card: action.card,
                    error: null
            }

            case UPDATE_CARD_ERROR:
                return {
                    ...state,
                    error: action.error
            }

            case REMOVE_CARD_SUCCESS:
                return {
                    ...state,
                    card: null,
                    error: null
            }

            case REMOVE_CARD_ERROR:
                return {
                    ...state,
                    error: action.error
            }

            default:
                return state
    }
}
