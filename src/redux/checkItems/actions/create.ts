import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../types'

export const CREATE_CHECKITEM = 'CREATE_CHECKITEM'
export const CREATE_CHECKITEM_SUCCESS = 'CREATE_CHECKITEM_SUCCESS'
export const CREATE_CHECKITEM_ERROR = 'CREATE_CHECKITEM_ERROR'

export type Actions = {
    CREATE_CHECKITEM: {
        type: typeof CREATE_CHECKITEM,
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
    createCheckItemRequest: ():
    Actions[typeof CREATE_CHECKITEM] => ({
        type: CREATE_CHECKITEM,
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
    createBackendCheckItems: (checkItem: ICheckItem) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createCheckItemRequest())
            return API.post(`/checklists/${checkItem.checkListId}/checkItems`, checkItem).then(
                response => dispatch(actionCreators.createCheckItemSuccess(response.checkItem)),
                error => dispatch(actionCreators.createCheckItemError(error.message)),
            )
        }
    }
}
