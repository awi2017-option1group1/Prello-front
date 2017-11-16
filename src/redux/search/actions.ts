import { Dispatch } from '../RootReducer'
import { API } from '../../services/http'
import { push } from 'react-router-redux'

import { ISearchCategory, ISearchObject } from './types'

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
        type: typeof FETCH_SEARCH_CATEGORIES
    },
    FETCH_SEARCH_CATEGORIES_SUCCESS: {
        type: typeof FETCH_SEARCH_CATEGORIES_SUCCESS,
        categories: ISearchCategory[],
    },

    RESET: {
        type: typeof RESET
    },

    RESULT_SELECT: {
        type: typeof RESULT_SELECT,
        result: ISearchObject,
    },

}

export const actionCreators = {
    RequestError: (error: string): Actions[typeof ERROR] => ({
        type: ERROR,
        error
    }),
    
    fetchCategoriesRequest: (): Actions[typeof FETCH_SEARCH_CATEGORIES] => ({
        type: FETCH_SEARCH_CATEGORIES
    }),
    fetchCategoriesRequestSuccess: (categories: ISearchCategory[]): 
    Actions[typeof FETCH_SEARCH_CATEGORIES_SUCCESS] => ({
        type: FETCH_SEARCH_CATEGORIES_SUCCESS,
        categories
    }),
    fetchCategories: (userID: number, value: string) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCategoriesRequest())
            return API.get(`search/${userID}/${value}`).then( // TODO
                categories => dispatch(actionCreators.fetchCategoriesRequestSuccess(categories)),
                error => dispatch(actionCreators.RequestError(error.error.error))
            )
        }
    },

    reset: (): Actions[typeof RESET] => ({
        type: RESET
    }),

    resultSelect: (result: ISearchObject) => {
        return (dispatch: Dispatch) => {      
            dispatch(push(result.link))
        }
    },
}
