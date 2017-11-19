import { RootAction } from '../../RootAction'
import { CREATE_CARD_SUCCESS } from '../../cards/actions/create'
import { FETCH_CARDS_LIST_SUCCESS } from '../../cards/actions/fetchAll'
import { DELETE_LABEL } from '../boardTags/actions/delete'
import { FETCH_CARD_LABELS, FETCH_CARD_LABELS_SUCCESS, FETCH_CARD_LABELS_ERROR } from './actions/fetchAll'
import { ASSIGN_LABEL } from './actions/assign'
import { UNASSIGN_LABEL } from './actions/unassign'

import { ITag } from '../types'

export type LabelsState = {
    labels: ITag[],
    error: string | null,
    isProcessing: boolean,
}

export type State = {
    [card: number]: LabelsState
}

const defaultValue: State = {}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_CARDS_LIST_SUCCESS:
            const newStateFetchList = Object.assign({}, state)
            action.cards.forEach(card => newStateFetchList[card.id] = { 
                labels: [],
                error: null,
                isProcessing: false               
            })
            return newStateFetchList   

        case CREATE_CARD_SUCCESS: 
            return {
                ...state,
                [action.card.id]: {
                    labels: [],
                    error: null,
                    isProcessing: false
                }
            }

        case FETCH_CARD_LABELS:
            return {
                ...state,
                [action.cardId]: {
                    labels: [],
                    error: null,
                    isProcessing: true
                }
            }

        case FETCH_CARD_LABELS_SUCCESS:
            return {
                ...state,
                [action.cardId]: {
                    labels: action.labels,
                    error: null,
                    isProcessing: false
                }
            }

        case FETCH_CARD_LABELS_ERROR:
            return {
                ...state,
                [action.cardId]: {
                    labels: [],
                    error: action.error,
                    isProcessing: false
                }
            }

        case ASSIGN_LABEL:
            return {
                ...state,
                [action.cardId]: {
                    labels: state[action.cardId].labels
                        .filter(l => l.id !== undefined && l.id !== action.label.id)
                        .concat(action.label),
                    error: null,
                    isProcessing: false
                }
            }   
            
        case UNASSIGN_LABEL:
            return {
                ...state,
                [action.cardId]: {
                    labels: state[action.cardId].labels.filter(l => l.id !== action.label.id),
                    error: null,
                    isProcessing: false
                }
            } 

        case DELETE_LABEL:
            const newState = {}
            Object.keys(state).forEach(key => {
                newState[key] = {
                    ...state[key],
                    labels: state[key].labels.filter((l: ITag) => l.id !== action.label.id)
                }
            })
            return {
                ...state,
                ...newState
            } 

        default:
            return state
    }
}
