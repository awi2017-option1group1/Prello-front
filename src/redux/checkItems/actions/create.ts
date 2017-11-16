import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../types'
import { actionCreators as uiActionCreators } from '../../ui/actions'

export const CREATE_CHECKITEM = 'CREATE_CHECKITEM'
export const CREATE_CHECKITEM_SUCCESS = 'CREATE_CHECKITEM_SUCCESS'
export const CREATE_CHECKITEM_ERROR = 'CREATE_CHECKITEM_ERROR'

export type Actions = {
    CREATE_CHECKITEM: {
        type: typeof CREATE_CHECKITEM,
        checkItem: Partial<ICheckItem>,
        checkListId: number
    },
    CREATE_CHECKITEM_SUCCESS: {
        type: typeof CREATE_CHECKITEM_SUCCESS,
        checkItem: ICheckItem,
        checkListId: number
    },
    CREATE_CHECKITEM_ERROR: {
        type: typeof CREATE_CHECKITEM_ERROR,
        error: string
    }
}

export const actionCreators = {
    createCheckItemRequest: (checkListId: number, checkItem: Partial<ICheckItem>): 
        Actions[typeof CREATE_CHECKITEM] => ({
        type: CREATE_CHECKITEM,
        checkItem,
        checkListId
    }),
    createCheckItemSuccess: (checkListId: number, checkItem: ICheckItem): Actions[typeof CREATE_CHECKITEM_SUCCESS] => ({
        type: CREATE_CHECKITEM_SUCCESS,
        checkItem,
        checkListId
    }),
    createCheckItemError: (error: string): Actions[typeof CREATE_CHECKITEM_ERROR] => ({
        type: CREATE_CHECKITEM_ERROR,
        error
    }),
    createCheckItemFromCheckListId: (checkListId: number, params: { name: string }) => {
        return (dispatch: Dispatch) => {
                dispatch(actionCreators.createCheckItemRequest(checkListId, {
                    name: params.name
                }))
                return API.post(`/checklists/${checkListId}/checkitems`, { name: params.name }).then(
                    item => {
                        dispatch(actionCreators.createCheckItemSuccess(checkListId, item))
                        dispatch(uiActionCreators.showSaveMessage())
                    },
                    error => {
                        dispatch(actionCreators.createCheckItemError(error.error.error))
                        dispatch(uiActionCreators.showCanNotSaveMessage())
                    }
                )
            }
        }
}
