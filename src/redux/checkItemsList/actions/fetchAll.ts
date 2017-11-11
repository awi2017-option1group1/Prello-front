import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckItem } from '../../checkItems/types'

export const FETCH_CHECKITEMS = 'FETCH_CHECKITEMS'
export const FETCH_CHECKITEMS_ERROR = 'FETCH_CHECKITEMS_ERROR'
export const FETCH_CHECKITEMS_SUCCESS = 'FETCH_CHECKITEMS_SUCCESS'

export type Actions = {
    FETCH_CHECKITEMS: {
        type: typeof FETCH_CHECKITEMS
    },
    FETCH_CHECKITEMS_ERROR: {
        type: typeof FETCH_CHECKITEMS_ERROR,
        error: string
    },
    FETCH_CHECKITEMS_SUCCESS: {
        type: typeof FETCH_CHECKITEMS_SUCCESS,
        checkItems: ICheckItem[]
    }
}

export const actionCreators = {
    fetchCheckItemsRequest: (): Actions[typeof FETCH_CHECKITEMS] => ({
        type: FETCH_CHECKITEMS
    }),
    fetchCheckItemsRequestError: (error: string): Actions[typeof FETCH_CHECKITEMS_ERROR] => ({
        type: FETCH_CHECKITEMS_ERROR,
        error
    }),
    fetchCheckItemsRequestSuccess: (checkItems: ICheckItem[]): Actions[typeof FETCH_CHECKITEMS_SUCCESS] => ({
        type: FETCH_CHECKITEMS_SUCCESS,
        checkItems
    }),
    fetchCheckItemsFromCheckListId: (checkListId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCheckItemsRequest())
            return API.get(`/checklists/${checkListId}/checkItems`).then(
                listOfCheckItems => dispatch(actionCreators.fetchCheckItemsRequestSuccess(listOfCheckItems)),
                error => dispatch(actionCreators.fetchCheckItemsRequestError(error.error.error))
            )
        }
    }
}
