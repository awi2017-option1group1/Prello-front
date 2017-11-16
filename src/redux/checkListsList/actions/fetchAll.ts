import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckList } from '../../checkLists/types'

export const FETCH_CHECKLISTS = 'FETCH_CHECKLISTS'
export const FETCH_CHECKLISTS_ERROR = 'FETCH_CHECKLISTS_ERROR'
export const FETCH_CHECKLISTS_SUCCESS = 'FETCH_CHECKLISTS_SUCCESS'

export type Actions = {
    FETCH_CHECKLISTS: {
        type: typeof FETCH_CHECKLISTS
    },
    FETCH_CHECKLISTS_ERROR: {
        type: typeof FETCH_CHECKLISTS_ERROR,
        error: string
    },
    FETCH_CHECKLISTS_SUCCESS: {
        type: typeof FETCH_CHECKLISTS_SUCCESS,
        checkLists: ICheckList[]
    }
}

export const actionCreators = {
    fetchCheckItemsRequest: (): Actions[typeof FETCH_CHECKLISTS] => ({
        type: FETCH_CHECKLISTS
    }),
    fetchCheckItemsRequestError: (error: string): Actions[typeof FETCH_CHECKLISTS_ERROR] => ({
        type: FETCH_CHECKLISTS_ERROR,
        error
    }),
    fetchCheckItemsRequestSuccess: (checkLists: ICheckList[]): Actions[typeof FETCH_CHECKLISTS_SUCCESS] => ({
        type: FETCH_CHECKLISTS_SUCCESS,
        checkLists
    }),
    fetchCheckListsFromCardId: (cardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCheckItemsRequest())
            return API.get(`/cards/${cardId}/checklists`).then(
                listOfCheckLists => dispatch(actionCreators.fetchCheckItemsRequestSuccess(listOfCheckLists)),
                error => dispatch(actionCreators.fetchCheckItemsRequestError(error.error.error))
            )
        }
    }
}
