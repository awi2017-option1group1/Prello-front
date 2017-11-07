import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../types'

export const REMOVE_CHECKITEM = 'REMOVE_CHECKITEM'
export const REMOVE_CHECKITEM_ERROR = 'REMOVE_CHECKITEM_ERROR'
export const REMOVE_CHECKITEM_SUCCESS = 'REMOVE_CHECKITEM_SUCCESS'

export type Actions = {
    REMOVE_CHECKITEM: {   
        type: typeof REMOVE_CHECKITEM,
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
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    removeCheckItemRequest: (): Actions[typeof REMOVE_CHECKITEM] => ({
        type: REMOVE_CHECKITEM,
    }),
    removeCheckItemRequestError: (error: string): Actions[typeof REMOVE_CHECKITEM_ERROR] => ({
        type: REMOVE_CHECKITEM_ERROR,
        error
    }),
    removeCheckItemRequestSucess: (checkItem: ICheckItem): Actions[typeof REMOVE_CHECKITEM_SUCCESS] => ({
        type: REMOVE_CHECKITEM_SUCCESS,
        checkItem
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    removeBackendCheckItem: (checkItem: ICheckItem) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeCheckItemRequest())
            return API.delete('/checkitems/', checkItem.id).then(
                response => dispatch(actionCreators.removeCheckItemRequestSucess(response.checkItem)),
                error => dispatch(actionCreators.removeCheckItemRequestError(error.message)),
            )
        }
    }
}
