import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'
import { push } from 'react-router-redux'
import { SearchResultData } from 'semantic-ui-react'

import { ISearchCategory } from './types'

export const ERROR = 'ERROR'

export const FETCH_SEARCH_CATEGORIES = 'FETCH_SEARCH_CATEGORIES'
export const FETCH_SEARCH_CATEGORIES_SUCCESS = 'FETCH_SEARCH_CATEGORIES_SUCCESS'

export const RESET = 'RESET'

export const RESULT_SELECT = 'RESULT_SELECT'

export type Actions = {
    ERROR: {
        type: typeof ERROR,
        error: string,
    },

    FETCH_SEARCH_CATEGORIES: {
        type: typeof FETCH_SEARCH_CATEGORIES,
        value: string
    },
    FETCH_SEARCH_CATEGORIES_SUCCESS: {
        type: typeof FETCH_SEARCH_CATEGORIES_SUCCESS,
        categories: ISearchCategory,
    },

    RESET: {
        type: typeof RESET
    },

    RESULT_SELECT: {
        type: typeof RESULT_SELECT,
        result: SearchResultData,
    },

}

export const actionCreators = {
    RequestError: (error: string): Actions[typeof ERROR] => ({
        type: ERROR,
        error
    }),
    
    fetchCategoriesRequest: (value: string): Actions[typeof FETCH_SEARCH_CATEGORIES] => ({
        type: FETCH_SEARCH_CATEGORIES,
        value: value
    }),
    fetchCategoriesRequestSuccess: (categories: ISearchCategory): 
    Actions[typeof FETCH_SEARCH_CATEGORIES_SUCCESS] => ({
        type: FETCH_SEARCH_CATEGORIES_SUCCESS,
        categories
    }),
    fetchCategories: (userID: number, value: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCategoriesRequest(value))
            return API.get(`/users/${userID}/search/${value}`).then(
                categories => dispatch(actionCreators.fetchCategoriesRequestSuccess(categories)),
                error => dispatch(actionCreators.RequestError(error.error.error))
            )
        }
    },

    reset: (): Actions[typeof RESET] => ({
        type: RESET
    }),

    resultSelect: (result: SearchResultData) => {
        return (dispatch: Dispatch) => {    
            dispatch(push(result.result.link))
        }
    },
}
