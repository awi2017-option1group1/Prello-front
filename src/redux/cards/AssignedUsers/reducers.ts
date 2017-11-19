import { RootAction } from '../../RootAction'
import { CREATE_CARD_SUCCESS } from '../../cards/actions/create'
import { FETCH_CARDS_LIST_SUCCESS } from '../../cards/actions/fetchAll'
import { FETCH_ASSIGNEES_LIST, FETCH_ASSIGNEES_LIST_ERROR, FETCH_ASSIGNEES_LIST_SUCCESS } from './actions/fetchAll'
import { ASSIGN_USER } from './actions/assign'
import { UNASSIGN_USER } from './actions/unassign'

import { IUser } from '../../users/types'

export type AssigneesState = {
    assignees: IUser[],
    error: string | null,
    isProcessing: boolean,
}

export type State = {
    [card: number]: AssigneesState
}

const defaultValue: State = {}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_CARDS_LIST_SUCCESS:
            const newStateFetchList = Object.assign({}, state)
            action.cards.forEach(card => newStateFetchList[card.id] = { 
                assignees: [],
                error: null,
                isProcessing: false               
            })
            return newStateFetchList

        case CREATE_CARD_SUCCESS: 
            return {
                ...state,
                [action.card.id]: {
                    assignees: [],
                    error: null,
                    isProcessing: false
                }
            }
        case FETCH_ASSIGNEES_LIST: 
            return {
                ...state, 
                [action.cardID]: {
                    assignees: [],
                    error: null,
                    isProcessing: true
                }
            }
        case FETCH_ASSIGNEES_LIST_SUCCESS:
            return {
                ...state,
                [action.cardID]: {
                    assignees: action.assignees,
                    error: null,
                    isProcessing: false
                }               
            }
        
        case FETCH_ASSIGNEES_LIST_ERROR: 
            return {
                ...state,
                [action.cardID]: {
                    assignees: [],
                    error: action.error,
                    isProcessing: false
                }
            }

        case ASSIGN_USER:
            return {
                ...state,
                [action.cardId]: {
                    assignees: state[action.cardId].assignees
                        .filter(a => a.id !== action.user.id)
                        .concat(action.user),
                    error: null,
                    isProcessing: false
                }
            }
        
        case UNASSIGN_USER:
            return {
                ...state,
                [action.cardId]: {
                    assignees: state[action.cardId].assignees.filter(l => l.id !== action.user.id),
                    error: null,
                    isProcessing: false
                }
            }
            
        default:
            return state
    }
}
