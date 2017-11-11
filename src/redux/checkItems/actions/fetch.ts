import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../types'

export const CHECKITEM_SUCCESS = 'CHECKITEM_SUCCESS'
export const CHECKITEM_ERROR = 'CHECKITEM_ERROR'

export const FETCH_CHECKITEM = 'FETCH_CHECKITEM'
export const FETCH_CHECKITEM_SUCCESS = 'FETCH_CHECKITEM_SUCCESS'

export type Actions = {
    CHECKITEM_ERROR: {
        type: typeof CHECKITEM_ERROR,
        error: string,
    },
    CHECKITEM_SUCCESS: {
        type: typeof CHECKITEM_SUCCESS,
        successMessage: string,
    },
    FETCH_CHECKITEM: {
        type: typeof FETCH_CHECKITEM,
    },
    FETCH_CHECKITEM_SUCCESS: {
        type: typeof FETCH_CHECKITEM_SUCCESS,
        checkItem: ICheckItem,
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    checkItemError: (error: string): Actions[typeof CHECKITEM_ERROR] => ({
        type: CHECKITEM_ERROR,
        error,
    }),
    checkItemSuccess: (successMessage: string): Actions[typeof CHECKITEM_SUCCESS] => ({
        type: CHECKITEM_SUCCESS,
        successMessage,
    }),

    fetchCheckItemRequest: (): Actions[typeof FETCH_CHECKITEM] => ({
        type: FETCH_CHECKITEM,
    }),
    fetchCheckItemSuccess: (checkItem: ICheckItem):
    Actions[typeof FETCH_CHECKITEM_SUCCESS] => ({
        type: FETCH_CHECKITEM_SUCCESS,
        checkItem,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    fetchCheckItem: (checkItemId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCheckItemRequest())
            return API.get(`/checkitems/${checkItemId}`).then(
                checkItem => dispatch(actionCreators.fetchCheckItemSuccess(checkItem)),
                error => dispatch(actionCreators.checkItemError(error.message)),
            )
        }
    },
}
