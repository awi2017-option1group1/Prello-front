import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../types'
import { actionCreators as uiActionCreators } from '../../ui/actions'

export const UPDATE_CHECKITEM = 'UPDATE_CHECKITEM'
export const UPDATE_CHECKITEM_ERROR = 'UPDATE_CHECKITEM_ERROR'
export const UPDATE_CHECKITEM_SUCCESS = 'UPDATE_CHECKITEM_SUCCESS'

export type Actions = {
    UPDATE_CHECKITEM: {   
        type: typeof UPDATE_CHECKITEM,
        checkItem: ICheckItem,
        checkListId: number
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
    updateCheckItemRequest: (checkListId: number, checkItem: ICheckItem): Actions[typeof UPDATE_CHECKITEM] => ({
        type: UPDATE_CHECKITEM,
        checkItem,
        checkListId
    }),
    updateCheckItemRequestError: (error: string): Actions[typeof UPDATE_CHECKITEM_ERROR] => ({
        type: UPDATE_CHECKITEM_ERROR,
        error
    }),
    updateCheckItemRequestSuccess: (checkItem: ICheckItem): Actions[typeof UPDATE_CHECKITEM_SUCCESS] => ({
        type: UPDATE_CHECKITEM_SUCCESS,
        checkItem
    }),
    updateCheckItem: (checkListId: number, checkItem: ICheckItem, newValues: Partial<ICheckItem>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCheckItemRequest(
                checkListId,
                Object.assign({}, checkItem, newValues)
            ))
            return API.put(`/checkitems/${checkItem.id}`, newValues).then(
                response => {
                    dispatch(actionCreators.updateCheckItemRequestSuccess(response.checkItem))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.updateCheckItemRequestError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
