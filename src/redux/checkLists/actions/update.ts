import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckList } from '../types'
import { actionCreators as uiActionCreators } from '../../ui/actions'

export const UPDATE_CHECKLIST = 'UPDATE_CHECKLIST'
export const UPDATE_CHECKLIST_ERROR = 'UPDATE_CHECKLIST_ERROR'
export const UPDATE_CHECKLIST_SUCCESS = 'UPDATE_CHECKLIST_SUCCESS'

export type Actions = {
    UPDATE_CHECKLIST: {
        type: typeof UPDATE_CHECKLIST,
        checkList: ICheckList
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
    updateCheckListRequest: (checkList: ICheckList): Actions[typeof UPDATE_CHECKLIST] => ({
        type: UPDATE_CHECKLIST,
        checkList
    }),
    updateCheckListRequestError: (error: string): Actions[typeof UPDATE_CHECKLIST_ERROR] => ({
        type: UPDATE_CHECKLIST_ERROR,
        error
    }),
    updateCheckListRequestSuccess: (checkList: ICheckList): Actions[typeof UPDATE_CHECKLIST_SUCCESS] => ({
        type: UPDATE_CHECKLIST_SUCCESS,
        checkList
    }),
    updateCheckList: (checkList: ICheckList, newValues: Partial<ICheckList>) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.updateCheckListRequest(
                Object.assign({}, checkList, newValues)
            ))
            return API.put(`/checklists/${checkList.id}`, newValues).then(
                checkListResponse => {
                    dispatch(actionCreators.updateCheckListRequestSuccess(checkListResponse))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.updateCheckListRequestError(error.message))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                },
            )
        }
    }
}
