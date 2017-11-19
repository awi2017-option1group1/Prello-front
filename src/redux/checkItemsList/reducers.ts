import { FETCH_CHECKLISTS_SUCCESS } from '../checkListsList/actions/fetchAll'
import { CREATE_CHECKLIST_SUCCESS } from '../checkLists/actions/create'
import { CREATE_CHECKITEM, CREATE_CHECKITEM_SUCCESS } from '../checkItems/actions/create'
import { UPDATE_CHECKITEM } from '../checkItems/actions/update'
import { REMOVE_CHECKITEM } from '../checkItems/actions/delete'
import { FETCH_CHECKITEMS, FETCH_CHECKITEMS_ERROR, FETCH_CHECKITEMS_SUCCESS } from './actions/fetchAll'
import { RootAction } from '../RootAction'
import { ICheckItem } from '../checkItems/types'

export type CheckListState = {
    items: ICheckItem[],
    error: string | null,
    isProcessing: boolean
}

export type State = {
    [checkList: number]: CheckListState
}

const defaultValue: State = {}

export const reducer = (state: State = defaultValue, action: RootAction) => {
        switch (action.type) {

            case FETCH_CHECKLISTS_SUCCESS:
                const newState = defaultValue
                action.checkLists.forEach(c => {
                    newState[c.id] = {
                        items: [],
                        error: null,
                        isProcessing: false
                    }
                })
                return newState

            case CREATE_CHECKLIST_SUCCESS:
                return {
                    ...state,
                    [action.checkList.id]: {
                        items: [],
                        error: null,
                        isProcessing: false
                    }
                }

            case FETCH_CHECKITEMS:
                return {
                    ...state,
                    [action.checkListId]: {
                        items: [],
                        error: null,
                        isProcessing: true
                    }
                }

            case FETCH_CHECKITEMS_SUCCESS:
                return {
                    ...state,
                    [action.checkListId]: {
                        items: action.checkItems,
                        error: null,
                        isProcessing: false
                    }
                }

            case FETCH_CHECKITEMS_ERROR:
                return {
                    ...state,
                    [action.checkListId]: {
                        items: [],
                        error: action.error,
                        isProcessing: false
                    }
                }

            case CREATE_CHECKITEM:
                return {
                    ...state,
                    [action.checkListId]: {
                        ...state[action.checkListId],
                        items: state[action.checkListId].items.concat(action.checkItem as ICheckItem)
                    }
                }

            case CREATE_CHECKITEM_SUCCESS:
                return {
                    ...state,
                    [action.checkListId]: {
                        ...state[action.checkListId],
                        items: state[action.checkListId].items
                            .filter(i => i.id !== null && i.id !== undefined)
                            .concat(action.checkItem as ICheckItem)
                    }
                }

            case UPDATE_CHECKITEM:
                return {
                    ...state,
                    [action.checkListId]: {
                        ...state[action.checkListId],
                        items: state[action.checkListId].items.map(i => {
                            if (i.id === action.checkItem.id) {
                                return action.checkItem
                            } else {
                                return i
                            }
                        })
                    }
                }

            case REMOVE_CHECKITEM:
                return {
                    ...state,
                    [action.checkListId]: {
                        ...state[action.checkListId],
                        items: state[action.checkListId].items
                            .filter(i => i.id !== action.checkItem.id)
                    }
                }

            default:
                return state
    }
  }
