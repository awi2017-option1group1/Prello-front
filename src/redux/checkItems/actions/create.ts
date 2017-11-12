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
        checkItem: Partial<ICheckItem>
    },
    CREATE_CHECKITEM_SUCCESS: {
        type: typeof CREATE_CHECKITEM_SUCCESS,
        checkItem: ICheckItem,
    },
    CREATE_CHECKITEM_ERROR: {
        type: typeof CREATE_CHECKITEM_ERROR,
        error: string
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    createCheckItemRequest: (checkItem: Partial<ICheckItem>):
    Actions[typeof CREATE_CHECKITEM] => ({
        type: CREATE_CHECKITEM,
        checkItem
    }),
    createCheckItemSuccess: (checkItem: ICheckItem):
    Actions[typeof CREATE_CHECKITEM_SUCCESS] => ({
        type: CREATE_CHECKITEM_SUCCESS,
        checkItem,
    }),
    createCheckItemError: (error: string):
    Actions[typeof CREATE_CHECKITEM_ERROR] => ({
        type: CREATE_CHECKITEM_ERROR,
        error,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    createCheckItemFromCheckListId: (checkListId: number, params: {name: string}) => {
        return (dispatch: Dispatch) => {
                dispatch(actionCreators.createCheckItemRequest({
                    name: params.name
                }))
                return API.post(`/checklists/${checkListId}/checkItems`, params.name).then(
                    item => {
                        dispatch(actionCreators.createCheckItemSuccess(item))
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
