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

const checkListDefault: ICheckList = {
    id: -1,
    name: 'Default Check List',
    pos: 1
}

const defaultValue: State = {
    checkList: checkListDefault,
    error: null,
    isProcessing: false
}
export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {

        case CREATE_CHECKLIST_SUCCESS:
            return {
                checkList: action.checkList,
                error: null,
                isProcessing: false
        }

        case CREATE_CHECKLIST_ERROR:
            return {
                error: action.error,
                isProcessing: false
        }

        case UPDATE_CHECKLIST_SUCCESS:
            return {
                checkList: action.checkList,
                error: null,
                isProcessing: false
        }

        case UPDATE_CHECKLIST_ERROR:
            return {
                error: action.error,
                isProcessing: false
        }

        case REMOVE_CHECKLIST_SUCCESS:
            return {
                checkList: null,
                error: null,
                isProcessing: false
        }

        case REMOVE_CHECKLIST_ERROR:
            return {
                error: action.error,
                isProcessing: false
        }

        default:
            return state
    }
}
