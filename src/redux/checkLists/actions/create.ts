import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { actionCreators as uiActionCreators } from '../../ui/actions'

import { ICheckList } from '../types'

export const CREATE_CHECKLIST = 'CREATE_CHECKLIST'
export const CREATE_CHECKLIST_SUCCESS = 'CREATE_CHECKLIST_SUCCESS'
export const CREATE_CHECKLIST_ERROR = 'CREATE_CHECKLIST_ERROR'

export type Actions = {
    CREATE_CHECKLIST: {
        type: typeof CREATE_CHECKLIST,
        checkList: Partial<ICheckList>
    },
    CREATE_CHECKLIST_SUCCESS: {
        type: typeof CREATE_CHECKLIST_SUCCESS,
        checkList: ICheckList,
    },
    CREATE_CHECKLIST_ERROR: {
        type: typeof CREATE_CHECKLIST_ERROR,
        error: string
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    createCheckListRequest: (checkList: Partial<ICheckList>):
    Actions[typeof CREATE_CHECKLIST] => ({
        type: CREATE_CHECKLIST,
        checkList
    }),
    createCheckListSuccess: (checkList: ICheckList):
    Actions[typeof CREATE_CHECKLIST_SUCCESS] => ({
        type: CREATE_CHECKLIST_SUCCESS,
        checkList,
    }),
    createCheckListError: (error: string):
    Actions[typeof CREATE_CHECKLIST_ERROR] => ({
        type: CREATE_CHECKLIST_ERROR,
        error,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    createCheckListFromCardId: (cardId: number) => {
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createCheckListRequest({
                name: 'EmptyName'
            }))
            return API.post(`/cards/${cardId}/checkLists`).then(
                checkListCreated => {
                    dispatch(actionCreators.createCheckListSuccess(checkListCreated))
                    dispatch(uiActionCreators.showSaveMessage())
                },
                error => {
                    dispatch(actionCreators.createCheckListError(error.error.error))
                    dispatch(uiActionCreators.showCanNotSaveMessage())
                }
            )
        }
    }
}