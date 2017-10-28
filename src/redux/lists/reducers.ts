import { RootAction } from '../RootAction'
import { FETCH_BOARD_LISTS, FETCH_BOARD_LISTS_ERROR, FETCH_BOARD_LISTS_SUCCESS } from './actions'

import { IList } from '../lists/types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    lists: IList[]
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    lists: []
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_BOARD_LISTS:
            return {
                ...state,
                error: null,
                isProcessing: true,
                lists: []
            }
        
        case FETCH_BOARD_LISTS_SUCCESS: 
            return {
                ...state,
                error: null,
                isProcessing: false,
                lists: action.lists
            }    

        case FETCH_BOARD_LISTS_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }
        
        default:
            return state
    }
}
