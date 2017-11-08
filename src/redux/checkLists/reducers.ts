import { FETCH_CHECKLIST, CHECKLIST_ERROR, FETCH_CHECKLIST_SUCCESS } from './actions/fetch'
import { CREATE_CHECKLIST_SUCCESS, CREATE_CHECKLIST_ERROR } from './actions/create'
import { UPDATE_CHECKLIST_SUCCESS, UPDATE_CHECKLIST_ERROR } from './actions/update'
import { REMOVE_CHECKLIST_SUCCESS, REMOVE_CHECKLIST_ERROR } from './actions/delete'

import { RootAction } from '../RootAction'
import { ICheckList } from '../checkLists/types'

export type State = {
    checkList: ICheckList | null,
    error: string | null,
    isProcessing: boolean,
}

const defaultValue: State = {
    checkList: null,
    error: null,
    isProcessing: false
}
export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {

        case CHECKLIST_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
        }
        
        case FETCH_CHECKLIST:
            return {
                ...state,
                checkList: null,
                error: null,
                isProcessing: true
        }

        case FETCH_CHECKLIST_SUCCESS: 
            return {
                ...state,
                checkList: action.checkList,
                error: null,
                isProcessing: false
        }

        case CREATE_CHECKLIST_SUCCESS:
            return {
                ...state,
                checkList: action.checkList,
                error: null
        }
    
        case CREATE_CHECKLIST_ERROR:
            return {
                ...state,
                error: action.error
        }

        case UPDATE_CHECKLIST_SUCCESS:
            return {
                ...state,
                checkList: action.checkList,
                error: null
        }

        case UPDATE_CHECKLIST_ERROR:
            return {
                ...state,
                error: action.error
        }

        case REMOVE_CHECKLIST_SUCCESS:
            return {
                ...state,
                checkList: null,
                error: null
        }

        case REMOVE_CHECKLIST_ERROR:
            return {
                ...state,
                error: action.error
        }

        default:
            return state
}
}
