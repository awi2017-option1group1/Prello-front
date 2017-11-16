import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../../checkItems/types'

export const FETCH_CHECKITEMS = 'FETCH_CHECKITEMS'
export const FETCH_CHECKITEMS_ERROR = 'FETCH_CHECKITEMS_ERROR'
export const FETCH_CHECKITEMS_SUCCESS = 'FETCH_CHECKITEMS_SUCCESS'

export type Actions = {
    FETCH_CHECKITEMS: {
        type: typeof FETCH_CHECKITEMS,
        checkListId: number
    },
    FETCH_CHECKITEMS_ERROR: {
        type: typeof FETCH_CHECKITEMS_ERROR,
        error: string,
        checkListId: number
    },
    FETCH_CHECKITEMS_SUCCESS: {
        type: typeof FETCH_CHECKITEMS_SUCCESS,
        checkItems: ICheckItem[],
        checkListId: number
    }
}

export const actionCreators = {
    fetchCheckItemsRequest: (checkListId: number): Actions[typeof FETCH_CHECKITEMS] => ({
        type: FETCH_CHECKITEMS,
        checkListId
    }),
    fetchCheckItemsRequestError: (checkListId: number, error: string): Actions[typeof FETCH_CHECKITEMS_ERROR] => ({
        type: FETCH_CHECKITEMS_ERROR,
        error,
        checkListId
    }),
    fetchCheckItemsRequestSuccess: (checkListId: number, checkItems: ICheckItem[]): 
        Actions[typeof FETCH_CHECKITEMS_SUCCESS] => ({
        type: FETCH_CHECKITEMS_SUCCESS,
        checkItems,
        checkListId
    }),
    fetchCheckItemsFromCheckListId: (checkListId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCheckItemsRequest(checkListId))
            return API.get(`/checklists/${checkListId}/checkItems`).then(
                listOfCheckItems => dispatch(
                    actionCreators.fetchCheckItemsRequestSuccess(checkListId, listOfCheckItems)
                ),
                error => dispatch(actionCreators.fetchCheckItemsRequestError(checkListId, error.message))
            )
        }
    }
}
