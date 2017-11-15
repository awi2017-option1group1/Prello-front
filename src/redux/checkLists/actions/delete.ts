import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckList } from '../types'

import { actionCreators as uiActionCreators } from '../../ui/actions'

export const REMOVE_CHECKLIST = 'REMOVE_CHECKLIST'
export const REMOVE_CHECKLIST_ERROR = 'REMOVE_CHECKLIST_ERROR'
export const REMOVE_CHECKLIST_SUCCESS = 'REMOVE_CHECKLIST_SUCCESS'

export type Actions = {
    REMOVE_CHECKLIST: {
        type: typeof REMOVE_CHECKLIST,
        checkList: ICheckList
    },
    REMOVE_CHECKLIST_ERROR: {
        type: typeof REMOVE_CHECKLIST_ERROR,
        error: string
    },
    REMOVE_CHECKLIST_SUCCESS: {
        type: typeof REMOVE_CHECKLIST_SUCCESS,
        checkList: ICheckList
    },
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    removeCheckListRequest: (checkList: ICheckList): Actions[typeof REMOVE_CHECKLIST] => ({
        type: REMOVE_CHECKLIST,
        checkList
    }),
    removeCheckListRequestError: (error: string): Actions[typeof REMOVE_CHECKLIST_ERROR] => ({
        type: REMOVE_CHECKLIST_ERROR,
        error
    }),
    removeCheckListRequestSucess: (checkList: ICheckList): Actions[typeof REMOVE_CHECKLIST_SUCCESS] => ({
        type: REMOVE_CHECKLIST_SUCCESS,
        checkList
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    removeCheckList: (checkList: ICheckList) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.removeCheckListRequest(checkList))
            return API.delete(`/checklists/${checkList.id}`).then(
                response => {
                    dispatch(actionCreators.removeCheckListRequestSucess(checkList))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.removeCheckListRequestError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}