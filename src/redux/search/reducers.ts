import { RootAction } from '../RootAction'

import { ISearchCategory } from './types'
import {    FETCH_SEARCH_CATEGORIES, 
            FETCH_SEARCH_CATEGORIES_SUCCESS, 
            ERROR, 
            RESET, 
            RESULT_SELECT } from './actions'

export type State = {
    isProcessing: boolean,
    error?: string,

    categories: ISearchCategory[],
    value: string,
}

const defaultValue: State = {
    isProcessing: false,
    error: null,

    categories: [],
    value: '',
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_SEARCH_CATEGORIES:
            return {
                ...state,
                isProcessing: true
            }

        case FETCH_SEARCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                error: null,
                categories: action.categories
            }
        
        case ERROR:
            return {
                ...state,
                isProcessing: false,
                error: action.error
            }

        case RESET:
            return {
                ...state,
                isProcessing: false,
                error: null
            }

        default:
            return state
    }
}
