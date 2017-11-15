import { Dispatch } from '../../../RootReducer'
import { API } from '../../../../services/http'

import { IUser } from '../../../users/types'

export const FETCH_ASSIGNEES_LIST = 'FETCH_ASSIGNEES_LIST'
export const FETCH_ASSIGNEES_LIST_ERROR = 'FETCH_ASSIGNEES_LIST_ERROR'
export const FETCH_ASSIGNEES_LIST_SUCCESS = 'FETCH_ASSIGNEES_LIST_SUCCESS'

export type Actions = {
    FETCH_ASSIGNEES_LIST: {  
        type: typeof FETCH_ASSIGNEES_LIST,
        cardID: number
    },
    FETCH_ASSIGNEES_LIST_ERROR: {
        type: typeof FETCH_ASSIGNEES_LIST_ERROR,
        error: string,
        cardID: number
    },
    FETCH_ASSIGNEES_LIST_SUCCESS: {    
        type: typeof FETCH_ASSIGNEES_LIST_SUCCESS,
        assignees: IUser[],
        cardID: number
    }
}

export const actionCreators = {
    fetchAssigneesListRequest: (cardID: number): Actions[typeof FETCH_ASSIGNEES_LIST] => ({     
        type: FETCH_ASSIGNEES_LIST,
        cardID
    }),
    fetchAssigneesListRequestError: (cardID: number, error: string): Actions[typeof FETCH_ASSIGNEES_LIST_ERROR] => ({
        type: FETCH_ASSIGNEES_LIST_ERROR,
        error,
        cardID
    }),
    fetchAssigneesListRequestSuccess: (cardID: number, assignees: IUser[]): 
    Actions[typeof FETCH_ASSIGNEES_LIST_SUCCESS] => ({
        type: FETCH_ASSIGNEES_LIST_SUCCESS,
        assignees,
        cardID
    }),
    fetchAssigneesList: (cardID: number) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchAssigneesListRequest(cardID))
            return API.get(`/cards/${cardID}/members`).then(
                assignees => dispatch(actionCreators.fetchAssigneesListRequestSuccess(cardID, assignees)),
                error => dispatch(actionCreators.fetchAssigneesListRequestError(cardID, error.message)),
            )
        }
    }
}
