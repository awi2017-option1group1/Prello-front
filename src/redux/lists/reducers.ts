import { RootAction } from '../RootAction'
import { 
    FETCH_BOARD_LISTS, 
    FETCH_BOARD_LISTS_ERROR, 
    FETCH_BOARD_LISTS_SUCCESS,
    CREATE_BOARD_LIST_SUCCESS,
    CREATE_BOARD_LIST_ERROR,
    UPDATE_BOARD_LIST_SUCCESS,
    UPDATE_BOARD_LIST_ERROR,
    DELETE_BOARD_LIST_SUCCESS,
    DELETE_BOARD_LIST_ERROR
} from './actions'

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

const updateList = (lists: IList[], list: IList): IList[] => {
    const newLists: IList[] = []
    let newListAdded = false
    lists.forEach(l => {
        if (l.id !== list.id) {
            if (!newListAdded && l.pos >= list.pos) {
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

        case UPDATE_BOARD_LIST_SUCCESS:
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

        case DELETE_BOARD_LIST_SUCCESS:
            const index = state.lists.indexOf(action.list)
            return {
                ...state,
                error: null,
                lists: [
                    ...state.lists.slice(0, index),
                    ...state.lists.slice(index + 1)
                ]
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
