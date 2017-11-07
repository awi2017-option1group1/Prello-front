import { Dispatch } from '../../RootReducer'
import { API } from '../../../services/http'

import { ICheckList } from '../types'

export const CREATE_CHECKLIST = 'CREATE_CHECKLIST'
export const CREATE_CHECKLIST_SUCCESS = 'CREATE_CHECKLIST_SUCCESS'
export const CREATE_CHECKLIST_ERROR = 'CREATE_CHECKLIST_ERROR'

export type Actions = {
    CREATE_CHECKLIST: {   
        type: typeof CREATE_CHECKLIST,
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
    createCheckListRequest: ():  
    Actions[typeof CREATE_CHECKLIST] => ({
        type: CREATE_CHECKLIST,
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
    createBackendCheckLists: (checkList: ICheckList) => {    
        return (dispatch: Dispatch) => {
            dispatch(actionCreators.createCheckListRequest())
            return API.post(`/cards/${checkList.cardId}/checklists`, checkList).then(
                response => dispatch(actionCreators.createCheckListSuccess(response.checkList)),
                error => dispatch(actionCreators.createCheckListError(error.message)),
            )
        }
    }
}
