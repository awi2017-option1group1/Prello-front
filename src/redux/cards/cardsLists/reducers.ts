import { FETCH_BOARD_LISTS_SUCCESS } from '../../lists/actions/fetch'
import { CREATE_BOARD_LIST_SUCCESS } from '../../lists/actions/create'
import { CREATE_CARD_SUCCESS } from '../actions/create'
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

// const updateCardsList = (cards: ICard[], card: ICard): ICard[] => {
//     const newLists: ICard[] = []
//     let newListAdded = false
//     cards.forEach(c => {
//         if (c.id !== card.id) {
//             if (!newListAdded && c.pos >= card.pos) {
//                 newLists.push(card)
//                 newListAdded = true
//             }
//             newLists.push(c)
//         }
//     })
//     if (!newListAdded) {
//         newLists.push(card)
//     }
//     return newLists
// }

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

        case CREATE_CARD_SUCCESS:
            return {
                ...state,
                [action.listId]: {
                    ...state[action.listId],
                    cards: state[action.listId].cards.concat(action.card)
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

        default:
            return state
    }
}
