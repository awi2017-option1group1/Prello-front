import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckList } from '../types'

export const CHECKLIST_SUCCESS = 'CHECKLIST_SUCCESS'
export const CHECKLIST_ERROR = 'CHECKLIST_ERROR'

export const FETCH_CHECKLIST = 'FETCH_CHECKLIST'
export const FETCH_CHECKLIST_SUCCESS = 'FETCH_CHECKLIST_SUCCESS'

export type Actions = {
    CHECKLIST_ERROR: {    
        type: typeof CHECKLIST_ERROR,
        error: string,
    },
    CHECKLIST_SUCCESS: {
        type: typeof CHECKLIST_SUCCESS,
        successMessage: string,
    },
    FETCH_CHECKLIST: {  
        type: typeof FETCH_CHECKLIST,
    },
    FETCH_CHECKLIST_SUCCESS: {    
        type: typeof FETCH_CHECKLIST_SUCCESS,
        checkList: ICheckList,
    }
}

export const actionCreators = {
    // --------------------------------------- //
    //                    SYNC                 //
    // --------------------------------------- //
    checkListError: (error: string): Actions[typeof CHECKLIST_ERROR] => ({      
        type: CHECKLIST_ERROR,
        error,
    }),
    checkListSuccess: (successMessage: string): Actions[typeof CHECKLIST_SUCCESS] => ({
        type: CHECKLIST_SUCCESS,
        successMessage,
    }),

    fetchCheckListRequest: (): Actions[typeof FETCH_CHECKLIST] => ({     
        type: FETCH_CHECKLIST,
    }),
    fetchCheckListSuccess: (checkList: ICheckList):       
    Actions[typeof FETCH_CHECKLIST_SUCCESS] => ({
        type: FETCH_CHECKLIST_SUCCESS,
        checkList,
    }),

    // --------------------------------------- //
    //                   ASYNC                 //
    // --------------------------------------- //
    fetchCheckList: (checkListId: string) => {     
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.fetchCheckListRequest())
            return API.get(`/checklists/${checkListId}`).then(
                response => dispatch(actionCreators.fetchCheckListSuccess(response.checkList)),
                error => dispatch(actionCreators.checkListError(error.message)),
            )
        }
    }
}
