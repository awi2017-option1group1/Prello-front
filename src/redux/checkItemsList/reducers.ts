import { FETCH_CHECKITEMS, FETCH_CHECKITEMS_ERROR, FETCH_CHECKITEMS_SUCCESS } from './actions/fetchAll'
import { RootAction } from '../RootAction'
import { ICheckItem } from '../checkItems/types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    checkItems: ICheckItem[],
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    checkItems: []
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {
            case FETCH_CHECKITEMS:
                return {
                    ...state,
                    error: null,
                    isProcessing: true,
                }

            case FETCH_CHECKITEMS_SUCCESS:
                return {
                    ...state,
                    error: null,
                    isProcessing: false,
                    checkItems: action.checkItems
                }

            case FETCH_CHECKITEMS_ERROR:
                return {
                    ...state,
                    error: action.error,
                    isProcessing: false
                }

            default:
                return state
    }
  }
