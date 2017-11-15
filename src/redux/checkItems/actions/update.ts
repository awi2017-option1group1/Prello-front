import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../types'

export const UPDATE_CHECKITEM = 'UPDATE_CHECKITEM'
export const UPDATE_CHECKITEM_ERROR = 'UPDATE_CHECKITEM_ERROR'
export const UPDATE_CHECKITEM_SUCCESS = 'UPDATE_CHECKITEM_SUCCESS'

export type Actions = {
    UPDATE_CHECKITEM: {
        type: typeof UPDATE_CHECKITEM,
    },
    UPDATE_CHECKITEM_ERROR: {
        type: typeof UPDATE_CHECKITEM_ERROR,
        error: string
    },
    UPDATE_CHECKITEM_SUCCESS: {
        type: typeof UPDATE_CHECKITEM_SUCCESS,
        checkItem: ICheckItem
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    updateCheckItemRequest: (): Actions[typeof UPDATE_CHECKITEM] => ({
        type: UPDATE_CHECKITEM,
    }),
    updateCheckItemRequestError: (error: string): Actions[typeof UPDATE_CHECKITEM_ERROR] => ({
        type: UPDATE_CHECKITEM_ERROR,
        error
    }),
    updateCheckItemRequestSuccess: (checkItem: ICheckItem): Actions[typeof UPDATE_CHECKITEM_SUCCESS] => ({
        type: UPDATE_CHECKITEM_SUCCESS,
        checkItem
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    updateBackendCheckItem: (checkItem: ICheckItem, newValues: Partial<ICheckItem>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCheckItemRequest())
            return API.put(`/checkitems/${checkItem.id}`, newValues).then(
                checkItem => dispatch(actionCreators.updateCheckItemRequestSuccess(checkItem)),
                error => dispatch(actionCreators.updateCheckItemRequestError(error.message)),
            )
        }
    }
}
