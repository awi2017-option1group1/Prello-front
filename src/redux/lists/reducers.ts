import { RootAction } from '../RootAction'
import { FETCH_BOARD_LISTS, FETCH_BOARD_LISTS_ERROR, FETCH_BOARD_LISTS_SUCCESS } from './actions/fetch'
import { CREATE_BOARD_LIST, CREATE_BOARD_LIST_SUCCESS, CREATE_BOARD_LIST_ERROR } from './actions/create'
import { UPDATE_BOARD_LIST, UPDATE_BOARD_LIST_ERROR } from './actions/update'
import { MOVE_BOARD_LIST, MOVE_BOARD_LIST_ERROR } from './actions/move'
import { DELETE_BOARD_LIST, DELETE_BOARD_LIST_ERROR } from './actions/delete'

import { IList } from '../lists/types'

export type State = {
    error: string | null,
    isProcessing: boolean,
    lists: IList[]
}

const defaultValue: State = {
    error: null,
    isProcessing: false,
    lists: []
}

// Reorder the list on update
const updateList = (lists: IList[], list: IList): IList[] => {
    const newLists: IList[] = []
    let newListAdded = false
    lists.forEach(l => {
        if (l.id && l.id !== list.id) {
            if (!newListAdded && list.id && l.pos >= list.pos) {
                newLists.push(list)
                newListAdded = true
            }
            newLists.push(l)
        }
    })
    if (!newListAdded) {
        newLists.push(list)
    }
    return newLists
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_BOARD_LISTS:
            return {
                ...state,
                error: null,
                isProcessing: true,
                lists: []
            }
        
        case FETCH_BOARD_LISTS_SUCCESS: 
            return {
                ...state,
                error: null,
                isProcessing: false,
                lists: action.lists
            }    

        case FETCH_BOARD_LISTS_ERROR:
            return {
                ...state,
                error: action.error,
                isProcessing: false
            }

        case CREATE_BOARD_LIST:
            return {
                ...state,
                error: null,
                lists: state.lists.concat(action.list as IList)
            }

        case CREATE_BOARD_LIST_SUCCESS:
            return {
                ...state,
                error: null,
                lists: updateList(state.lists, action.list)
            }
        
        case CREATE_BOARD_LIST_ERROR:
            return {
                ...state,
                error: action.error
            }

        case UPDATE_BOARD_LIST:
            return {
                ...state,
                error: null,
                lists: updateList(state.lists, action.list)
            }

        case UPDATE_BOARD_LIST_ERROR:
            return {
                ...state,
                error: action.error
            }

        case MOVE_BOARD_LIST:
            return {
                ...state,
                error: null,
                lists: action.lists
            }

        case MOVE_BOARD_LIST_ERROR:
            return {
                ...state,
                oldLists: [],
                error: action.error
            }

        case DELETE_BOARD_LIST:
            const index = state.lists.findIndex(l => l.id === action.list.id)
            if (index === -1) {
                return {
                    ...state,
                    error: null
                }
            } else {
                return {
                    ...state,
                    error: null,
                    lists: [
                        ...state.lists.slice(0, index),
                        ...state.lists.slice(index + 1)
                    ]
                }
            }

        case DELETE_BOARD_LIST_ERROR:
            return {
                ...state,
                error: action.error
            }

        default:
            return state
    }
}
