import { RootAction } from '../RootAction'
import { FETCH_CHECKLISTS, FETCH_CHECKLISTS_ERROR, FETCH_CHECKLISTS_SUCCESS } from './actions/fetchAll'
import { CREATE_CHECKLIST, CREATE_CHECKLIST_SUCCESS } from '../checkLists/actions/create'
import { UPDATE_CHECKLIST } from '../checkLists/actions/update'
import { REMOVE_CHECKLIST } from '../checkLists/actions/delete'

import { ICheckList } from '../checkLists/types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    checkLists: ICheckList[],
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    checkLists: []
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {
            case FETCH_CHECKLISTS:
                return {
                    ...state,
                    error: null,
                    isProcessing: true,
                }

            case FETCH_CHECKLISTS_SUCCESS:
                return {
                    error: null,
                    isProcessing: false,
                    checkLists: action.checkLists
                }

            case FETCH_CHECKLISTS_ERROR:
                return {
                    checkLists: [],
                    error: action.error,
                    isProcessing: false
                }

            case CREATE_CHECKLIST:
                return {
                    isProcessing: true,
                    error: null,
                    checkLists: state.checkLists.concat(action.checkList as ICheckList)
                }

            case CREATE_CHECKLIST_SUCCESS:
                return {
                    isProcessing: false,
                    error: null,
                    checkLists: state.checkLists
                        .filter(c => c.id !== null && c.id !== undefined)
                        .concat(action.checkList)
                }

            case UPDATE_CHECKLIST:
                return {
                    isProcessing: false,
                    error: null,
                    checkLists: state.checkLists.map(l => {
                        if (l.id === action.checkList.id) {
                            return action.checkList
                        } else {
                            return l
                        }
                    })
                }

            case REMOVE_CHECKLIST:
                return {
                    isProcessing: false,
                    error: null,
                    checkLists: state.checkLists
                        .filter(c => c.id !== action.checkList.id)
                }

            default:
                return state
    }
  }
