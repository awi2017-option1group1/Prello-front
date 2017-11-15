import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckList } from '../types'

export const UPDATE_CHECKLIST = 'UPDATE_CHECKLIST'
export const UPDATE_CHECKLIST_ERROR = 'UPDATE_CHECKLIST_ERROR'
export const UPDATE_CHECKLIST_SUCCESS = 'UPDATE_CHECKLIST_SUCCESS'

export type Actions = {
    UPDATE_CHECKLIST: {
        type: typeof UPDATE_CHECKLIST,
    },
    UPDATE_CHECKLIST_ERROR: {
        type: typeof UPDATE_CHECKLIST_ERROR,
        error: string
    },
    UPDATE_CHECKLIST_SUCCESS: {
        type: typeof UPDATE_CHECKLIST_SUCCESS,
        checkList: ICheckList
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    updateCheckListRequest: (): Actions[typeof UPDATE_CHECKLIST] => ({
        type: UPDATE_CHECKLIST,
    }),
    updateCheckListRequestError: (error: string): Actions[typeof UPDATE_CHECKLIST_ERROR] => ({
        type: UPDATE_CHECKLIST_ERROR,
        error
    }),
    updateCheckListRequestSuccess: (checkList: ICheckList): Actions[typeof UPDATE_CHECKLIST_SUCCESS] => ({
        type: UPDATE_CHECKLIST_SUCCESS,
        checkList
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    updateBackendCheckList: (checkList: ICheckList, newValues: Partial<ICheckList>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCheckListRequest())
            return API.put(`/checklists/${checkList.id}`, newValues).then(
                checkListResponse => dispatch(actionCreators.updateCheckListRequestSuccess(checkListResponse)),
                error => dispatch(actionCreators.updateCheckListRequestError(error.message)),
            )
        }
    },
    updateCheckListTitle: (id: number, params: {name?: string}) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCheckListRequest())
            return API.put(`/checklists/${id}`, params).then(
                newCheckList => dispatch(actionCreators.updateCheckListRequestSuccess(newCheckList)),
                error => dispatch(actionCreators.updateCheckListRequestError(error.error.error))
            )
        }
    }
}
