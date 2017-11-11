import { FETCH_CHECKLISTS, FETCH_CHECKLISTS_ERROR, FETCH_CHECKLISTS_SUCCESS } from './actions/fetchAll'
import { RootAction } from '../RootAction'
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
                    ...state,
                    error: null,
                    isProcessing: false,
                    checkLists: action.checkLists
                }

            case FETCH_CHECKLISTS_ERROR:
                return {
                    ...state,
                    error: action.error,
                    isProcessing: false
                }

            default:
                return state
    }
  }
