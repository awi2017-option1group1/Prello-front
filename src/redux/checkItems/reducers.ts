import { FETCH_CHECKITEM, CHECKITEM_ERROR, FETCH_CHECKITEM_SUCCESS } from './actions/fetch'
import { CREATE_CHECKITEM_SUCCESS, CREATE_CHECKITEM_ERROR } from './actions/create'
import { UPDATE_CHECKITEM_SUCCESS, UPDATE_CHECKITEM_ERROR } from './actions/update'
import { REMOVE_CHECKITEM_SUCCESS, REMOVE_CHECKITEM_ERROR } from './actions/delete'

import { RootAction } from '../RootAction'
import { ICheckItem } from '../checkItems/types'

export type State = {
    checkItem: ICheckItem,
    error: string | null,
    isProcessing: boolean,
}

const checkItemDefault: ICheckItem = {
    id: -1,
    name: 'Default Check Item',
    pos: 1,
    state: false,
    checkListId: -1
}

const defaultValue: State = {
    checkItem: checkItemDefault,
    error: null,
    isProcessing: false
}
export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {

        case CHECKITEM_ERROR:
            return {
                error: action.error,
                isProcessing: false
        }

        case FETCH_CHECKITEM:
            return {
                checkItem: null,
                error: null,
                isProcessing: true
        }

        case FETCH_CHECKITEM_SUCCESS:
            return {
                checkItem: action.checkItem,
                error: null,
                isProcessing: false
        }

        case CREATE_CHECKITEM_SUCCESS:
            return {
                ...state,
                checkItem: action.checkItem,
                error: null
        }

        case CREATE_CHECKITEM_ERROR:
            return {
                ...state,
                error: action.error
        }

        case UPDATE_CHECKITEM_SUCCESS:
            return {
                ...state,
                checkItem: action.checkItem,
                error: null
        }

        case UPDATE_CHECKITEM_ERROR:
            return {
                ...state,
                error: action.error
        }

        case REMOVE_CHECKITEM_SUCCESS:
            return {
                ...state,
                checkItem: null,
                error: null
        }

        case REMOVE_CHECKITEM_ERROR:
            return {
                ...state,
                error: action.error
        }

        default:
            return state
}
}
