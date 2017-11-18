import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../types'
import { actionCreators as uiActionCreators } from '../../ui/actions'

export const REMOVE_CHECKITEM = 'REMOVE_CHECKITEM'
export const REMOVE_CHECKITEM_ERROR = 'REMOVE_CHECKITEM_ERROR'
export const REMOVE_CHECKITEM_SUCCESS = 'REMOVE_CHECKITEM_SUCCESS'

export type Actions = {
    REMOVE_CHECKITEM: {   
        type: typeof REMOVE_CHECKITEM,
        checkItem: ICheckItem,
        checkListId: number
    },
    REMOVE_CHECKITEM_ERROR: {     
        type: typeof REMOVE_CHECKITEM_ERROR,
        error: string
    },
    REMOVE_CHECKITEM_SUCCESS: {   
        type: typeof REMOVE_CHECKITEM_SUCCESS,
        checkItem: ICheckItem
    },
}

export const actionCreators = {
    removeCheckItemRequest: (checkListId: number, checkItem: ICheckItem): Actions[typeof REMOVE_CHECKITEM] => ({
        type: REMOVE_CHECKITEM,
        checkItem,
        checkListId
    }),
    removeCheckItemRequestError: (error: string): Actions[typeof REMOVE_CHECKITEM_ERROR] => ({
        type: REMOVE_CHECKITEM_ERROR,
        error
    }),
    removeCheckItemRequestSuccess: (checkItem: ICheckItem): Actions[typeof REMOVE_CHECKITEM_SUCCESS] => ({
        type: REMOVE_CHECKITEM_SUCCESS,
        checkItem
    }),
    removeCheckItem: (checkListId: number, checkItem: ICheckItem) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeCheckItemRequest(checkListId, checkItem))
            return API.delete(`/checkitems/${checkItem.id}`).then(
                response => {
                    dispatch(actionCreators.removeCheckItemRequestSuccess(checkItem))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.removeCheckItemRequestError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
