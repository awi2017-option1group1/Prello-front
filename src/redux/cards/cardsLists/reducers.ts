import { FETCH_BOARD_LISTS_SUCCESS } from '../../lists/actions/fetch'
import { CREATE_BOARD_LIST_SUCCESS } from '../../lists/actions/create'
import { FETCH_CARDS_LIST, FETCH_CARDS_LIST_ERROR, FETCH_CARDS_LIST_SUCCESS } from '../actions/fetchAll'

import { RootAction } from '../../RootAction'
import { ICard } from '../../cards/types'

export type CardsState = {
    cards: ICard[],
    error: string | null,
    isProcessing: boolean,
}

export type State = {
    [list: number]: CardsState
}

const defaultValue: State = {}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {

        case FETCH_BOARD_LISTS_SUCCESS:
            const newStateFetch = Object.assign({}, state)
            action.lists.forEach(list => newStateFetch[list.id] = { 
                cards: [],
                error: null,
                isProcessing: false               
             })
            return newStateFetch

        case CREATE_BOARD_LIST_SUCCESS:
            const newStateCreate = Object.assign({}, state)
            newStateCreate[action.list.id] = { 
                cards: [],
                error: null,
                isProcessing: false               
            }
            return newStateCreate

        case FETCH_CARDS_LIST:
            return {
                ...state,
                [action.listId]: {
                    cards: [],
                    error: null,
                    isProcessing: true
                }
            }

        case FETCH_CARDS_LIST_ERROR:
            return {
                ...state,
                [action.listId]: {
                    cards: [],
                    error: action.error,
                    isProcessing: false
                }
            }

        case FETCH_CARDS_LIST_SUCCESS:
            return {
                ...state,
                [action.listId]: {
                    cards: action.cards,
                    error: null,
                    isProcessing: false
                }
            }

        default:
            return state
    }
}
