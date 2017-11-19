import { RootAction } from '../../RootAction'
import { FETCH_BOARD_LABELS, FETCH_BOARD_LABELS_ERROR, FETCH_BOARD_LABELS_SUCCESS } from './actions/fetchAll'
import { CREATE_LABEL, CREATE_LABEL_SUCCESS } from './actions/create'
import { UPDATE_LABEL } from './actions/update'
import { DELETE_LABEL } from './actions/delete'

import { ITag } from '../types'

export type State = {
    labels: ITag[],
    error: string | null,
    isProcessing: boolean,
}

const defaultValue: State = {
    labels: [],
    error: null,
    isProcessing: false
}

export const reducer = (state: State = defaultValue, action: RootAction) => {
    switch (action.type) {
        case FETCH_BOARD_LABELS:
            return {
                ...state,
                isProcessing: true
            }

        case FETCH_BOARD_LABELS_ERROR:
            return {
                ...state,
                isProcessing: false,
                error: action.error
            }

        case FETCH_BOARD_LABELS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                labels: action.labels
            }

        case CREATE_LABEL: 
            return {
                ...state,
                labels: state.labels.concat(action.label as ITag)
            }

        case CREATE_LABEL_SUCCESS: 
            return {
                ...state,
                labels: state.labels
                    .filter(l => l.id !== null && l.id !== undefined && l.id !== action.label.id)
                    .concat(action.label)
            }

        case UPDATE_LABEL: 
            return {
                ...state,
                labels: state.labels.map(l => {
                    if (l.id === action.label.id) {
                        return action.label
                    } else {
                        return l
                    }
                })
            }

        case DELETE_LABEL:
            return {
                ...state,
                labels: state.labels.filter(l => l.id !== action.label.id)
            }

        default:
            return state
    }
}
