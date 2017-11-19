import { FETCH_BOARD_LISTS_SUCCESS } from '../../lists/actions/fetch'
import { CREATE_BOARD_LIST_SUCCESS } from '../../lists/actions/create'
import { CREATE_CARD, CREATE_CARD_SUCCESS } from '../actions/create'
import { UPDATE_CARD } from '../actions/update'
import { DELETE_CARD } from '../actions/delete'
import { MOVE_CARD, MOVE_CARD_SUCCESS } from '../actions/move'
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

// Find the list where is the card
const findCardListId = (lists: State, card: ICard): number | undefined => {
    const keys = Object.keys(lists)
    const listId = keys.find(key => {
        return lists[key].cards.find((c: ICard) => c.id === card.id) !== undefined
    })
    if (listId) {
        return Number(listId)
    } else {
        return undefined
    }
}

// Update a list
const updateCardsList = (cards: ICard[], card: ICard): ICard[] => {
    const newLists: ICard[] = []
    let newListAdded = false
    cards.forEach(c => {
        if (c.id !== card.id) {
            if (!newListAdded && c.pos >= card.pos) {
                newLists.push(card)
                newListAdded = true
            }
            newLists.push(c)
        }
    })
    if (!newListAdded) {
        newLists.push(card)
    }
    return newLists
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {

        case FETCH_BOARD_LISTS_SUCCESS:
            const newStateFetchList = Object.assign({}, state)
            action.lists.forEach(list => newStateFetchList[list.id] = { 
                cards: [],
                error: null,
                isProcessing: false               
             })
            return newStateFetchList

        case CREATE_BOARD_LIST_SUCCESS:
            const newStateCreateList = Object.assign({}, state)
            newStateCreateList[action.list.id] = { 
                cards: [],
                error: null,
                isProcessing: false               
            }
            return newStateCreateList

        case CREATE_CARD:
            return {
                ...state,
                [action.listId]: {
                    ...state[action.listId],
                    cards: state[action.listId].cards.concat(action.card as ICard)
                }
            }

        case CREATE_CARD_SUCCESS:
            return {
                ...state,
                [action.listId]: {
                    ...state[action.listId],
                    cards: state[action.listId].cards
                        .filter(c => c.id !== null && c.id !== undefined && c.id !== action.card .id)
                        .concat(action.card)
                }
            }

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

        case MOVE_CARD:
            return {
                ...state,
                [action.sourceList.listId]: {
                    ...state[action.sourceList.listId],
                    cards: action.sourceList.list
                },
                [action.destinationList.listId]: {
                    ...state[action.destinationList.listId],
                    cards: action.destinationList.list
                }
            }

        case MOVE_CARD_SUCCESS:
            return {
                ...state,
                [action.destinationList.listId]: {
                    ...state[action.destinationList.listId],
                    cards: action.destinationList.list
                }              
            }

        case UPDATE_CARD:
            const listIdUpdate = findCardListId(state, action.card)!
            return {
                ...state,
                [listIdUpdate]: {
                    ...state[listIdUpdate],
                    cards: updateCardsList(state[listIdUpdate].cards, action.card)
                }
            }

        case DELETE_CARD:
            const listIdDelete = findCardListId(state, action.card)
            if (listIdDelete) {
                const index = state[listIdDelete].cards.findIndex(c => c.id === action.card.id)
                return {
                    ...state,
                    [listIdDelete]: {
                        ...state[listIdDelete],
                        cards: [
                            ...state[listIdDelete].cards.slice(0, index),
                            ...state[listIdDelete].cards.slice(index + 1)
                        ]
                    }
                }
            } else {
                return state
            }

        default:
            return state
    }
}
