import { RootAction } from '../RootAction'

import { ISearchCategory } from './types'
import {    FETCH_SEARCH_CATEGORIES, 
            FETCH_SEARCH_CATEGORIES_SUCCESS, 
            ERROR, 
            RESET } from './actions'

export type State = {
    isProcessing: boolean,
    error?: string | null,

    categories: ISearchCategory,
    value: string,
}

const defaultValue: State = {
    isProcessing: false,
    error: null,

    categories: { },
    value: '',
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_SEARCH_CATEGORIES:
            return {
                ...state,
                isProcessing: true,
                value: action.value
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
                error: null,
                value: ''
            }

        default:
            return state
    }
}
